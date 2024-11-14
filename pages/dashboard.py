import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
from datetime import datetime, date
import calendar

def render_dashboard():
    # Month Selection
    months = [date(2024, m, 1) for m in range(1, 13)]
    selected_month = st.select_slider(
        "Select Month",
        options=months,
        format_func=lambda x: x.strftime("%B %Y"),
        value=st.session_state.selected_month
    )
    st.session_state.selected_month = selected_month

    # Convert expenses to DataFrame
    df = pd.DataFrame(st.session_state.expenses)
    if not df.empty:
        df['date'] = pd.to_datetime(df['date'])
        df['amount'] = df['amount'].astype(float)
        
        # Filter for selected month
        month_mask = (df['date'].dt.year == selected_month.year) & \
                    (df['date'].dt.month == selected_month.month)
        month_df = df[month_mask]

        # Monthly Overview
        col1, col2, col3 = st.columns(3)
        
        total_budget = sum(float(cat['budget']) for cat in st.session_state.categories)
        total_expenses = month_df['amount'].sum() if not month_df.empty else 0
        remaining_budget = total_budget - total_expenses
        
        with col1:
            st.metric(
                "Total Budget",
                f"${total_budget:,.2f}",
                delta=None
            )
        
        with col2:
            st.metric(
                "Total Expenses",
                f"${total_expenses:,.2f}",
                delta=f"-${total_expenses:,.2f}",
                delta_color="inverse"
            )
        
        with col3:
            st.metric(
                "Remaining Budget",
                f"${remaining_budget:,.2f}",
                delta=f"${remaining_budget:,.2f}",
                delta_color="normal"
            )

        # Spending by Category
        st.subheader("Spending by Category")
        
        # Create category spending summary
        category_spending = month_df.groupby('category_id')['amount'].sum().reset_index()
        category_spending['category'] = category_spending['category_id'].map({
            cat['id']: cat['name'] for cat in st.session_state.categories
        })
        category_spending['budget'] = category_spending['category_id'].map({
            cat['id']: float(cat['budget']) for cat in st.session_state.categories
        })
        
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
        
        # Create progress bars for each category
        for _, row in category_spending.iterrows():
            st.write(f"### {row['category']}")
            progress = min(100, row['percentage'])
            color = 'normal' if progress <= 100 else 'inverse'
            st.progress(progress / 100)
            col1, col2, col3 = st.columns(3)
            col1.metric("Spent", f"${row['amount']:,.2f}")
            col2.metric("Budget", f"${row['budget']:,.2f}")
            col3.metric("Remaining", f"${row['budget'] - row['amount']:,.2f}")
            st.write("")

        # Daily Spending Trend
        st.subheader("Daily Spending Trend")
        daily_spending = month_df.groupby('date')['amount'].sum().reset_index()
        
        # Create line chart
        fig = go.Figure()
        fig.add_trace(go.Scatter(
            x=daily_spending['date'],
            y=daily_spending['amount'],
            mode='lines+markers',
            name='Daily Spending',
            line=dict(color='#1f77b4'),
            hovertemplate='Date: %{x|%B %d}<br>Amount: $%{y:.2f}<extra></extra>'
        ))
        
        # Calculate and add average line
        avg_spending = daily_spending['amount'].mean()
        fig.add_trace(go.Scatter(
            x=[daily_spending['date'].min(), daily_spending['date'].max()],
            y=[avg_spending, avg_spending],
            mode='lines',
            name='Daily Average',
            line=dict(color='red', dash='dash'),
            hovertemplate='Average: $%{y:.2f}<extra></extra>'
        ))
        
        fig.update_layout(
            title='Daily Spending Pattern',
            xaxis_title='Date',
            yaxis_title='Amount ($)',
            hovermode='x unified',
            showlegend=True
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
    else:
        st.info("No expenses recorded yet. Add some expenses to see your spending patterns!")
