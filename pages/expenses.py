import streamlit as st
import pandas as pd
from datetime import datetime

def render_expenses_page():
    # Add Expense Form
    with st.form("add_expense_form", clear_on_submit=True):
        st.subheader("Add New Expense")
        
        col1, col2 = st.columns(2)
        with col1:
            category = st.selectbox(
                "Category",
                options=st.session_state.categories,
                format_func=lambda x: x['name'],
                key="expense_category"
            )
            amount = st.number_input("Amount", min_value=0.01, step=0.01, key="expense_amount")
        
        with col2:
            date = st.date_input("Date", value=datetime.now(), key="expense_date")
            description = st.text_input("Description (optional)", key="expense_description")
        
        submitted = st.form_submit_button("Add Expense")
        if submitted and category and amount > 0:
            st.session_state.add_expense(
                category['id'],
                amount,
                description,
                date
            )
            st.success(f"Expense of ${amount:.2f} added successfully!")
            st.session_state.refresh_data()

    # Display Expenses
    st.subheader("Recent Expenses")
    if not st.session_state.expenses:
        st.info("No expenses found. Add your first expense above!")
    else:
        # Convert expenses to DataFrame for better display
        df = pd.DataFrame(st.session_state.expenses)
        df['date'] = pd.to_datetime(df['date']).dt.date
        df['category'] = df['category_id'].map({
            cat['id']: cat['name'] for cat in st.session_state.categories
        })
        df['amount'] = df['amount'].astype(float)
        
        # Add filters
        col1, col2 = st.columns(2)
        with col1:
            category_filter = st.multiselect(
                "Filter by Category",
                options=[cat['name'] for cat in st.session_state.categories],
                default=[]
            )
        with col2:
            date_range = st.date_input(
                "Date Range",
                value=(df['date'].min(), df['date'].max()),
                key="expense_date_range"
            )

        # Apply filters
        if category_filter:
            df = df[df['category'].isin(category_filter)]
        if len(date_range) == 2:
            df = df[(df['date'] >= date_range[0]) & (df['date'] <= date_range[1])]

        # Display expenses with edit and delete buttons
        for _, expense in df.iterrows():
            with st.container():
                col1, col2, col3, col4 = st.columns([3, 2, 2, 1])
                
                with col1:
                    st.write(f"**{expense['category']}**")
                    if expense['description']:
                        st.write(expense['description'])
                
                with col2:
                    st.write(f"${float(expense['amount']):.2f}")
                
                with col3:
                    st.write(expense['date'])
                
                with col4:
                    if st.button("Delete", key=f"delete_{expense['id']}"):
                        st.session_state.delete_expense(expense['id'])
                        st.session_state.refresh_data()
                        st.rerun()

            st.markdown("---")

        # Show summary statistics
        st.subheader("Summary")
        col1, col2 = st.columns(2)
        with col1:
            st.metric("Total Expenses", f"${df['amount'].sum():.2f}")
        with col2:
            st.metric("Average Expense", f"${df['amount'].mean():.2f}")
