import streamlit as st
import pandas as pd
from datetime import datetime

def render_categories_page():
    # Add Category Form
    with st.form("add_category_form", clear_on_submit=True):
        st.subheader("Add New Category")
        col1, col2 = st.columns(2)
        
        with col1:
            name = st.text_input("Category Name", key="category_name")
            budget = st.number_input("Budget Amount", min_value=0.0, step=10.0, key="category_budget")
        
        with col2:
            color = st.color_picker("Category Color", "#4CAF50", key="category_color")
        
        submitted = st.form_submit_button("Add Category")
        if submitted and name and budget > 0:
            st.session_state.add_category(name, budget, color)
            st.success(f"Category '{name}' added successfully!")
            st.session_state.refresh_data()

    # Display Categories
    st.subheader("Current Categories")
    if not st.session_state.categories:
        st.info("No categories found. Add your first category above!")
    else:
        for category in st.session_state.categories:
            col1, col2, col3 = st.columns([3, 1, 1])
            
            with col1:
                st.markdown(
                    f'<div style="background-color: {category["color"]}; width: 20px; height: 20px; display: inline-block; margin-right: 10px; border-radius: 50%;"></div>'
                    f'<span style="font-size: 1.2em;">{category["name"]}</span>',
                    unsafe_allow_html=True
                )
            
            with col2:
                st.write(f'${float(category["budget"]):,.2f}')
            
            with col3:
                col3_1, col3_2 = st.columns(2)
                with col3_1:
                    if st.button("Edit", key=f"edit_{category['id']}"):
                        st.session_state.editing_category = category
                with col3_2:
                    if st.button("Delete", key=f"delete_{category['id']}"):
                        st.session_state.delete_category(category['id'])
                        st.session_state.refresh_data()
                        st.rerun()

    # Edit Category Modal
    if hasattr(st.session_state, 'editing_category'):
        with st.form("edit_category_form"):
            st.subheader(f"Edit Category: {st.session_state.editing_category['name']}")
            
            new_name = st.text_input(
                "Category Name",
                value=st.session_state.editing_category['name']
            )
            new_budget = st.number_input(
                "Budget Amount",
                value=float(st.session_state.editing_category['budget']),
                min_value=0.0,
                step=10.0
            )
            new_color = st.color_picker(
                "Category Color",
                st.session_state.editing_category['color']
            )
            
            col1, col2 = st.columns(2)
            with col1:
                if st.form_submit_button("Save Changes"):
                    st.session_state.update_category(
                        st.session_state.editing_category['id'],
                        new_name,
                        new_budget,
                        new_color
                    )
                    del st.session_state.editing_category
                    st.session_state.refresh_data()
                    st.rerun()
            with col2:
                if st.form_submit_button("Cancel"):
                    del st.session_state.editing_category
                    st.rerun()
