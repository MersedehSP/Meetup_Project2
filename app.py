from flask import Flask, jsonify,render_template
import psycopg2
import numpy as np

conn = psycopg2.connect(
    host = "localhost", 
    database = "MeetUp",
    user = "postgres", 
    password = "datachemistry" 

)

mycurser = conn.curser()

app = Flask(__name__)


@app.route("/",methods = ['post','get'])
def welcome():
    
   return render_template('index.html')




@app.route("/data", methods = ['post','get'])
def names():
    mycurser.execute("select * from city")
    data = mycurser.fetchall()
    data = list(np.ravel(data))


    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
 