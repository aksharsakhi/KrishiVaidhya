import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000/predict/"  # Adjust if deployed

st.sidebar.title("Dashboard")
app_mode = st.sidebar.selectbox("Select Page", ["Home", "About", "Disease Recognition"])

if app_mode == "Home":
    st.header("PLANT DISEASE RECOGNITION SYSTEM")
    st.image("home_page.jpeg", use_column_width=True)
    st.markdown("Upload an image and get disease details!")

elif app_mode == "About":
    st.header("About")
    st.markdown("This project helps in detecting plant diseases using AI.")

elif app_mode == "Disease Recognition":
    st.header("Disease Recognition")
    uploaded_file = st.file_uploader("Choose an Image:", type=["jpg", "png", "jpeg"])
    
    if uploaded_file:
        st.image(uploaded_file, use_column_width=True)

    if st.button("Predict"):
        with st.spinner("Processing..."):
            files = {"file": uploaded_file.getvalue()}
            response = requests.post(API_URL, files=files)
            
            if response.status_code == 200:
                data = response.json()
                st.success(f"Disease: {data['disease']}")
                st.info(f"Treatment: {data['treatment']}")
                st.info(f"Recommended Medicine: {data['medicine']}")
            else:
                st.error("Error in processing the image. Try again.")