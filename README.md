# Project 3 - Data Analyst Job Posting Analysis
## General Info
### The Bureau of Labor and Statistics expects the number of hired Data Analysts to grow by [25%](doc:https://www.bls.gov/ooh/math/operations-research-analysts.htm) during the decade from 2020 to 2030. To better prepare ourselves getting into such a fast-growing filed with constant envolving, we are in urge of finding out the most up to date information about the current job market by analysing the job positings online about the Data Analyst poisition. 
### **Team Members**:
- ### John Quinn
- ### Justin Bernier
- ### Kimberly Sernett 
- ### Tyler Levie
- ### Xuan Di
----
## Project Outcome
### Through our research, we found a [dataset](doc:https://www.kaggle.com/datasets/lukebarousse/data-analyst-job-postings-google-search) from kaggle with over 10,000 job positings so far as well as daily updates from Google's job search results for Data Analyst positions in the United States. We successfully sourced data from kaggle, imported it into a `SQLITE` database and leveraged `python` and `javascript` to createa an web application.  

### Our web application has a landing page and links to three distinct areas to highight: 
- ### a `Leaflet` map of the United States showcases the tendency of data analyst job in demand across the country.
- ### interactive `javascript` viualization 
- ### `python` data analysis including 
   - ### job posting detail; 
   - ### job titles with average salary rate; 
   - ### `natural language processing` results on popular soft and hard skills in demand;

### Top-Level Directory Layout

    ├── data                    # datasource .csv file from Kaggle is stored here.  JSON files stored here for endpoints.
    ├── notebooks               # production notebook and files with code promoted from sandbox after testing.
    ├── sandbox                 # sandbox environment for EDA, testing, data wrangling.
    ├── static                  # static files for our application.
    │   ├── css                 # CSS stylesheet code.
    │   ├── images              # image files.
    │   ├── js                  # javascript code.
    ├── templates               # html files for use in application.
    ├── LICENSE
    └── README.md

### Technical Specifications 
- **Datasource:**  Kaggle sourced .csv file
- **Database Engine** - SQLite 
- **Web Server:** Flask - Micro web framework
- **Programming Language** - Python / JavaScript
- **Geographical Map** - Leaflet

### DA Job Posting Flow diagram
![diagram](static/images/Flow_Diagram.png)


### Screenshots of application with summary *HERE* 

![Application Screenshot](static/images/*HERE*.png)
![Application Screenshot](static/images/*HERE*.png)

----
## References
### U.S Bureau of Labor Statistics
https://www.bls.gov/ooh/math/operations-research-analysts.htm

### Dataset
https://www.kaggle.com/datasets/lukebarousse/data-analyst-job-postings-google-search
