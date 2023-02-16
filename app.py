from flask import Flask, render_template, request
import sqlite3 as sql
app = Flask(__name__)

conn = sql.connect('path_to_db_goes_here')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/data', methods = ['GET'])
def data():
   
   conn.row_factory = sql.Row
   cur = conn.cursor()
   cur.execute("sql_query_goes_here")
   rows = cur.fetchall()

   return render_template("data.html",rows = rows)

if __name__ == "__main__":
    app.run(debug=True)