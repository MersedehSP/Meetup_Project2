from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
import psycopg2
from flask import Flask, render_template, jsonify
from flask_migrate import Migrate
from models import db, meetupCity, meetupEvents
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func

app = Flask(__name__)
 
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@127.0.0.1:5432/Meetup"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
db.init_app(app)
migrate = Migrate(app, db)

engine=create_engine("postgresql://postgres:postgres@127.0.0.1:5432/Meetup") 

#general Flask Code

@app.route('/')
def home():

    return render_template('index.html')

@app.route('/eventLocations')
def eventLocations():
    session = Session(bind=engine)
#    results=session.query(meetupEvents.event_lat, meetupEvents.event_lng, meetupEvents.event_city, func.count(meetupEvents.event_name).label('total')).\
#                        group_by(meetupEvents.event_lat,meetupEvents.event_lng,meetupEvents.event_city).\
#                        order_by(meetupEvents.event_city).all()
    results=session.query(meetupEvents.event_lat, meetupEvents.event_lng, meetupEvents.event_city).\
                        order_by(meetupEvents.event_city).all()
    result_dict=[]
    for lat, lng, city in results:
        record={}
        record['city']=city
        record['lat']=lat
        record['lng']=lng
        result_dict.append(record)
    session.close()
#  group_by(meetupEvents.event_lat,meetupEvents.event_lng,meetupEvents.event_city).\
    return jsonify(result_dict)
 

if __name__=="__main__":
    app.run(debug=True)