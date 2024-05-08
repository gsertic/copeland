import streamlit as st
import io
import pandas as pd
import snowflake.connector as sc

@st.cache_resource
def sf_con():
   return sc.connect(
      user="SRVC_SIGMA_INT",
      account="yp30528.east-us-2.azure",
      password="gx@B8_e%cQ6",
      database="SIGMA",
      warehouse="SIGMA_WH",
      schema="SUPPLYCHAIN",
      autocommit=True)
conn = sf_con()

@st.cache_data()
def fetch_query_pd(query):
    with conn.cursor() as cur:
        cur.execute(query)
        return cur.fetch_pandas_all()

#selections = st.text_input("Enter the fields (comma and space-separated) you would like to see in your output (Example: SOURCE, ACCTG_DATE)")
#if selections:
data_pd=fetch_query_pd('select SOURCE, ACCTG_DATE, ACCTG_FISCAL_PERIOD, BUSINESS_ENTITY, BUSINESS_SEGMENT_NAME, BUSINESS_UNIT_NAME, OU_ORG_ID, OU_NAME from SUPPLYCHAIN.ALL_DIRECT_MATERIALS_V limit 100000')

st.title ('From Snowflake to Excel via Streamlit')
#st.dataframe (data_pd)
columns = st.multiselect("Select your columns:",data_pd.columns)
#confirm = st.checkbox("Click here when you're OK with your selection")

if columns:
   data_pd[columns]

   @st.cache_data()
   def create_xlsx(data_pd):
      buffer = io.BytesIO()
      with pd.ExcelWriter(buffer) as writer:
          data_pd.to_excel(writer)
      return buffer

   if st.download_button(
      label="Download",
      data=create_xlsx(data_pd[columns]) ,
      file_name='export.xlsx',
      mime="application/vnd.ms-excel"):
    
      st.write("Thank you for downloading!")
