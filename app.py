from flask import Flask, render_template, request
import sqlite3 as sql

app = Flask(__name__)

conn = sql.connect('da_job_data.sqlite', check_same_thread=False)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/data', methods = ['GET'])
def data():
   
   conn.row_factory = sql.Row
   rows = conn.execute("SELECT * FROM da_data").fetchall()
   
   return render_template("data.html",rows = rows)   

if __name__ == "__main__":
    app.run(debug=True)