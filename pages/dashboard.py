import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
from datetime import datetime, date
import calendar

def render_dashboard():
    # Month Selection with proper error handling
    try:
        current_year = datetime.now().year
        months = [date(current_year, m, 1) for m in range(1, 13)]
        
        selected_month = st.select_slider(
            "Select Month",
            options=months,
            format_func=lambda x: x.strftime("%B %Y"),
            value=st.session_state.selected_month
        )
        st.session_state.selected_month = selected_month
    except Exception as e:
        st.error(f"Error with date selection: {str(e)}")
        # Fallback to current month
        st.session_state.selected_month = date.today().replace(day=1)

    # Convert expenses to DataFrame
    try:
        df = pd.DataFrame(st.session_state.expenses)
        if not df.empty:
            df['date'] = pd.to_datetime(df['date'])
            df['amount'] = df['amount'].astype(float)
            
            # Filter for selected month
            month_mask = (df['date'].dt.year == st.session_state.selected_month.year) & \
                        (df['date'].dt.month == st.session_state.selected_month.month)
            month_df = df[month_mask]

            # Monthly Overview with enhanced styling
            col1, col2, col3 = st.columns(3)
            
            total_budget = sum(float(cat['budget']) for cat in st.session_state.categories)
            total_expenses = month_df['amount'].sum() if not month_df.empty else 0
            remaining_budget = total_budget - total_expenses
            
            with col1:
                st.metric(
                    "Total Budget",
                    f"${total_budget:,.2f}",
                    delta=None,
                    help="Total budget across all categories"
                )
            
            with col2:
                st.metric(
                    "Total Expenses",
                    f"${total_expenses:,.2f}",
                    delta=f"-${total_expenses:,.2f}",
                    delta_color="inverse",
                    help="Total spending this month"
                )
            
            with col3:
                st.metric(
                    "Remaining Budget",
                    f"${remaining_budget:,.2f}",
                    delta=f"${remaining_budget:,.2f}",
                    delta_color="normal",
                    help="Amount left to spend this month"
                )

            # Spending by Category with enhanced visualization
            st.subheader("Spending by Category")
            
            # Create category spending summary
            category_spending = month_df.groupby('category_id')['amount'].sum().reset_index()
            category_dict = {cat['id']: cat['name'] for cat in st.session_state.categories}
            budget_dict = {cat['id']: float(cat['budget']) for cat in st.session_state.categories}
            
            category_spending['category'] = category_spending['category_id'].map(category_dict)
            category_spending['budget'] = category_spending['category_id'].map(budget_dict)
            
            # Add categories with no expenses
            for cat in st.session_state.categories:
                if cat['id'] not in category_spending['category_id'].values:
                    category_spending = pd.concat([
                        category_spending,
                        pd.DataFrame({
                            'category_id': [cat['id']],
                            'amount': [0],
                            'category': [cat['name']],
                            'budget': [float(cat['budget'])]
                        })
                    ])
            
            # Calculate percentage of budget used
            category_spending['percentage'] = (category_spending['amount'] / category_spending['budget'] * 100).round(1)
            
            # Sort by percentage of budget used
            category_spending = category_spending.sort_values('percentage', ascending=False)
            
            # Create progress bars for each category with enhanced styling
            for _, row in category_spending.iterrows():
                with st.container():
                    st.write(f"### {row['category']}")
                    progress = min(100, row['percentage'])
                    color = 'normal' if progress <= 100 else 'inverse'
                    
                    # Enhanced progress bar with gradient
                    progress_color = "#4CAF50" if progress <= 100 else "#ff4444"
                    st.markdown(f"""
                        <div class="budget-progress">
                            <div style="width: {progress}%; height: 100%; background: {progress_color};
                                     transition: width 0.5s ease-in-out;"></div>
                        </div>
                    """, unsafe_allow_html=True)
                    
                    # Metrics with enhanced layout
                    col1, col2, col3 = st.columns(3)
                    col1.metric(
                        "Spent",
                        f"${row['amount']:,.2f}",
                        help="Amount spent in this category"
                    )
                    col2.metric(
                        "Budget",
                        f"${row['budget']:,.2f}",
                        help="Total budget for this category"
                    )
                    remaining = row['budget'] - row['amount']
                    col3.metric(
                        "Remaining",
                        f"${remaining:,.2f}",
                        delta=f"${remaining:,.2f}",
                        delta_color="normal" if remaining >= 0 else "inverse",
                        help="Amount left to spend in this category"
                    )
                    st.write("")

            # Daily Spending Trend with enhanced visualization
            st.subheader("Daily Spending Trend")
            if not month_df.empty:
                daily_spending = month_df.groupby('date')['amount'].sum().reset_index()
                
                fig = go.Figure()
                # Add main spending line
                fig.add_trace(go.Scatter(
                    x=daily_spending['date'],
                    y=daily_spending['amount'],
                    mode='lines+markers',
                    name='Daily Spending',
                    line=dict(
                        color='#4CAF50',
                        width=3
                    ),
                    marker=dict(
                        size=8,
                        symbol='circle'
                    ),
                    hovertemplate='Date: %{x|%B %d}<br>Amount: $%{y:.2f}<extra></extra>'
                ))
                
                # Add average line with animation
                avg_spending = daily_spending['amount'].mean()
                fig.add_trace(go.Scatter(
                    x=[daily_spending['date'].min(), daily_spending['date'].max()],
                    y=[avg_spending, avg_spending],
                    mode='lines',
                    name='Daily Average',
                    line=dict(
                        color='rgba(255, 68, 68, 0.7)',
                        dash='dash',
                        width=2
                    ),
                    hovertemplate='Average: $%{y:.2f}<extra></extra>'
                ))
                
                # Enhanced layout
                fig.update_layout(
                    title={
                        'text': 'Daily Spending Pattern',
                        'y':0.95,
                        'x':0.5,
                        'xanchor': 'center',
                        'yanchor': 'top'
                    },
                    xaxis_title='Date',
                    yaxis_title='Amount ($)',
                    hovermode='x unified',
                    showlegend=True,
                    plot_bgcolor='rgba(0,0,0,0)',
                    paper_bgcolor='rgba(0,0,0,0)',
                    xaxis=dict(
                        showgrid=True,
                        gridwidth=1,
                        gridcolor='rgba(128,128,128,0.2)',
                        zeroline=False
                    ),
                    yaxis=dict(
                        showgrid=True,
                        gridwidth=1,
                        gridcolor='rgba(128,128,128,0.2)',
                        zeroline=False
                    )
                )
                
                st.plotly_chart(fig, use_container_width=True, config={
                    'displayModeBar': False,
                    'scrollZoom': False
                })
            else:
                st.info("No daily spending data available for the selected month.")
            
        else:
            st.info("No expenses recorded yet. Add some expenses to see your spending patterns!")
    except Exception as e:
        st.error(f"Error processing dashboard data: {str(e)}")
