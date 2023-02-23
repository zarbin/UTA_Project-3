# Import dependencies
from flask import Flask, render_template, request, jsonify, g
import sqlite3
import json

app = Flask(__name__)

# Sqlite3 DB connection
def connect_db():
    conn = sqlite3.connect('da_job_data.sqlite')   
    conn.row_factory = sqlite3.Row
    return conn

# SQLite3 DB connection
def get_db():
    if not hasattr(g, 'sqlite3'):
        g.sqlite3_db = connect_db()
    return g.sqlite3_db

# SQLite3 DB close
@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite3_db'):
        g.sqlite3_db.close()

# Home endpoint on Flask app.route /
@app.route('/')
def home():
    return render_template('home.html')

# Map endpoint on Flask app.route /map
@app.route('/map')
def map():
    return render_template('map.html')

''' 
ORIGINAL ROUTE PULLTING DATA FROM SQLITE3 DB
@app.route('/data', methods = ['GET'])
def data():
   db = get_db()
   cursor = db.execute("SELECT * FROM da_data")
   dataset = cursor.fetchall()
   return render_template("data.html",data = dataset)   
'''

# JSON endpoint on Flask app.route /data
@app.route('/data')
def data():
    with open('data/data.json') as f:
        data = json.load(f)
        print(type(data))
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
