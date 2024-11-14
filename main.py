import streamlit as st
import pandas as pd
import plotly.express as px
import psycopg2
from datetime import datetime, date
import os
from decimal import Decimal
import plotly.graph_objects as go
from pages.categories import render_categories_page
from pages.expenses import render_expenses_page
from pages.dashboard import render_dashboard

# Database connection
def get_db_connection():
    return psycopg2.connect(
        host=os.environ["PGHOST"],
        database=os.environ["PGDATABASE"],
        user=os.environ["PGUSER"],
        password=os.environ["PGPASSWORD"],
        port=os.environ["PGPORT"]
    )

# Database operations with proper error handling
def fetch_categories():
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM categories ORDER BY name")
        rows = cur.fetchall()
        if cur.description:
            columns = [desc[0] for desc in cur.description]
            categories = [dict(zip(columns, row)) for row in rows]
            return categories
        return []
    except Exception as e:
        st.error(f"Error fetching categories: {str(e)}")
        return []
    finally:
        if conn:
            conn.close()

def fetch_expenses():
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM expenses ORDER BY date DESC")
        rows = cur.fetchall()
        if cur.description:
            columns = [desc[0] for desc in cur.description]
            expenses = [dict(zip(columns, row)) for row in rows]
            return expenses
        return []
    except Exception as e:
        st.error(f"Error fetching expenses: {str(e)}")
        return []
    finally:
        if conn:
            conn.close()

def add_category(name, budget, color):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO categories (name, budget, color) VALUES (%s, %s, %s) RETURNING id",
            (name, budget, color)
        )
        result = cur.fetchone()
        if result:
            category_id = result[0]
            conn.commit()
            return category_id
        return None
    except Exception as e:
        st.error(f"Error adding category: {str(e)}")
        if conn:
            conn.rollback()
        return None
    finally:
        if conn:
            conn.close()

def add_expense(category_id, amount, description, expense_date):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO expenses (category_id, amount, description, date) VALUES (%s, %s, %s, %s) RETURNING id",
            (category_id, amount, description, expense_date)
        )
        result = cur.fetchone()
        if result:
            expense_id = result[0]
            conn.commit()
            return expense_id
        return None
    except Exception as e:
        st.error(f"Error adding expense: {str(e)}")
        if conn:
            conn.rollback()
        return None
    finally:
        if conn:
            conn.close()

def delete_category(category_id):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # First delete all expenses associated with this category
        cur.execute("DELETE FROM expenses WHERE category_id = %s", (category_id,))
        # Then delete the category
        cur.execute("DELETE FROM categories WHERE id = %s", (category_id,))
        conn.commit()
        return True
    except Exception as e:
        st.error(f"Error deleting category: {str(e)}")
        if conn:
            conn.rollback()
        return False
    finally:
        if conn:
            conn.close()

def delete_expense(expense_id):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("DELETE FROM expenses WHERE id = %s", (expense_id,))
        conn.commit()
        return True
    except Exception as e:
        st.error(f"Error deleting expense: {str(e)}")
        if conn:
            conn.rollback()
        return False
    finally:
        if conn:
            conn.close()

def update_category(category_id, name, budget, color):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "UPDATE categories SET name = %s, budget = %s, color = %s WHERE id = %s",
            (name, budget, color, category_id)
        )
        conn.commit()
        return True
    except Exception as e:
        st.error(f"Error updating category: {str(e)}")
        if conn:
            conn.rollback()
        return False
    finally:
        if conn:
            conn.close()

def update_expense(expense_id, category_id, amount, description, expense_date):
    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "UPDATE expenses SET category_id = %s, amount = %s, description = %s, date = %s WHERE id = %s",
            (category_id, amount, description, expense_date, expense_id)
        )
        conn.commit()
        return True
    except Exception as e:
        st.error(f"Error updating expense: {str(e)}")
        if conn:
            conn.rollback()
        return False
    finally:
        if conn:
            conn.close()

def refresh_data():
    st.session_state.categories = fetch_categories()
    st.session_state.expenses = fetch_expenses()

# Configure Streamlit page
st.set_page_config(
    page_title="Budget Tracker",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize session state
if "active_page" not in st.session_state:
    st.session_state.active_page = "Dashboard"
if "categories" not in st.session_state:
    st.session_state.categories = []
if "expenses" not in st.session_state:
    st.session_state.expenses = []
if "selected_month" not in st.session_state:
    st.session_state.selected_month = date.today()

# Add session state functions
st.session_state.add_category = add_category
st.session_state.delete_category = delete_category
st.session_state.update_category = update_category
st.session_state.add_expense = add_expense
st.session_state.delete_expense = delete_expense
st.session_state.update_expense = update_expense
st.session_state.refresh_data = refresh_data

# Custom CSS with enhanced styling
st.markdown("""
<style>
    /* General styling */
    .stButton>button {
        width: 100%;
        transition: all 0.3s ease;
    }
    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    /* Category card styling */
    .category-card {
        border: 1px solid #e0e0e0;
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        background: white;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .category-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    /* Progress bar styling */
    .budget-progress {
        height: 12px;
        border-radius: 6px;
        margin: 0.75rem 0;
        background: #f0f0f0;
        overflow: hidden;
    }
    
    /* Custom header styling */
    .streamlit-header {
        background: linear-gradient(90deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
    }
    
    /* Custom metric styling */
    .metric-card {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }
    .metric-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
</style>
""", unsafe_allow_html=True)

# Navigation with enhanced styling
st.sidebar.markdown('<div class="streamlit-header"><h1>Budget Tracker</h1></div>', unsafe_allow_html=True)
selected_page = st.sidebar.radio(
    "Navigation",
    ["Dashboard", "Categories", "Expenses"],
    key="navigation",
    on_change=lambda: setattr(st.session_state, 'active_page', st.session_state.navigation)
)

# Load initial data
if len(st.session_state.categories) == 0:
    refresh_data()

# Main content with enhanced error handling
try:
    if selected_page == "Dashboard":
        render_dashboard()
    elif selected_page == "Categories":
        render_categories_page()
    else:  # Expenses page
        render_expenses_page()
except Exception as e:
    st.error(f"An error occurred while rendering the page: {str(e)}")
