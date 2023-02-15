# Import required modules
import csv
import sqlite3
 
# Connecting to the data_analysis database
connection = sqlite3.connect('da_job_data.sqlite')
 
# Creating a cursor object to execute
# SQL queries on a database table
cursor = connection.cursor()
 
# Table Definition
create_table = '''CREATE TABLE da_data(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title varchar(64) NOT NULL,
                company_name varchar(64) NOT NULL,
                location TEXT NULL,
                via varchar(40) NOT NULL,
                description text NOT NULL,
                extensions text NULL,
                schedule_type text NULL,
                work_from_home int NULL, 
                salary_hourly Float NULL, 
                salary_yearly Float NULL,
                salary_standardized Float NULL,
                description_tokens text NULL);'''
 
# Creating the table into our database
cursor.execute(create_table)
 
# Opening the person-records.csv file
file = open('data\gsearch_jobs.csv', encoding="utf8")
 
# Reading the contents of the gsearch_jobs.csv file
contents = csv.reader(file)
 
# SQL query to insert data into the da_data table
insert_records = "INSERT INTO da_data (title, company_name,location,via,description, extensions, schedule_type,work_from_home,salary_hourly,salary_yearly,salary_standardized,description_tokens) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"
 
# Importing the contents of the file into da_data table
cursor.executemany(insert_records, contents)
 
# SQL query to retrieve all data from the person table To verify that the
# data of the csv file has been successfully inserted into the table
select_all = "SELECT * FROM da_data"
rows = cursor.execute(select_all).fetchall()
 
# Output to the console screen
for r in rows:
    print(r)
 
# Committing the changes
connection.commit()
 
# closing the database connection
connection.close()