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

@app.route('/')
def home():

    return render_template('index.html')

@app.route('/heatMap')
def heatMap():
    session = Session(bind=engine)
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
    return jsonify(result_dict)

@app.route('/markerMap')
@app.route('/markerMap/<city>')
def markerMap(city='All'):

    session = Session(bind=engine)
    if (city=='All'):
        results=session.query(meetupEvents.event_name, meetupEvents.event_lat, meetupEvents.event_lng, meetupEvents.venue_event_link, meetupEvents.attendees, meetupEvents.google_map_link).all()
        result_dict=[]
        for name, lat, lng, link, attendees, gmap in results:
            record={}
            record['name']=name
            record['lat']=lat
            record['lng']=lng
            record['link']=link
            record['attendees']=attendees
            record['gmap']=gmap
            result_dict.append(record)
        session.close()
    else:
        results=session.query(meetupEvents.event_name, meetupEvents.event_lat,meetupEvents.event_lng, 
            meetupEvents.venue_event_link, meetupEvents.attendees, meetupEvents.google_map_link).\
            filter(meetupEvents.event_city==city).all()

        result_dict=[]
        for name, lat, lng, link, attendees, gmap in results:
            record={}
            record['name']=name
            record['lat']=lat
            record['lng']=lng
            record['link']=link
            record['attendees']=attendees
            record['gmap']=gmap
            result_dict.append(record)
        session.close()        
    return jsonify(result_dict)

@app.route('/citydropDown')
@app.route('/citydropDown/<state>')
def citydropDown(state='All'):

    session = Session(bind=engine)
    if (state=='All'):
        results=session.query(meetupEvents.event_city).\
            order_by(meetupEvents.event_city).all()
        result_dict=[]
        for city in results:
            record={}
            record['city']=city
            result_dict.append(record)
        session.close()
    else:
        results=session.query(meetupEvents.event_city).\
            filter(meetupEvents.event_state==state).\
            group_by(meetupEvents.event_city).\
            order_by(meetupEvents.event_city).all()

        result_dict=[]
        for city in results:
            record={}
            record['city']=city
            result_dict.append(record)
        session.close()        
    return jsonify(result_dict)    

@app.route('/categorydropDown')
def categorydropDown():

    session = Session(bind=engine)
    results=session.query(meetupEvents.event_category).\
        order_by(meetupEvents.event_category).all()
    result_dict=[]
    for category in results:
        record={}
        record['category']=category
        result_dict.append(record)
    session.close()
    return jsonify(result_dict)

@app.route('/dataTable')
@app.route('/dataTable/<state>/<city>/<category>')
def dataTable(state='All', city='All',category='All'):

    session = Session(bind=engine)
    if (state=='All' and city=='All' and category=='All'):
        results=session.query(meetupEvents.event_name, meetupEvents.group_name,
                meetupEvents.google_map_link, meetupEvents.attendees).\
                order_by(meetupEvents.event_city).all()

    elif (state!='All' and city=='All' and category=='All'):
        results=session.query(meetupEvents.event_name, meetupEvents.group_name,
                meetupEvents.google_map_link, meetupEvents.attendees).\
                filter(meetupEvents.event_state==state).\
                order_by(meetupEvents.event_city).all()

    elif (state!='All' and city!='All' and category=='All'):
        results=session.query(meetupEvents.event_name, meetupEvents.group_name,
                meetupEvents.google_map_link, meetupEvents.attendees).\
                filter(meetupEvents.event_state==state and meetupEvents.event_city==city).\
                order_by(meetupEvents.event_city).all()

    elif (state!='All' and city!='All' and category!='All'):   
        results=session.query(meetupEvents.event_city, meetupEvents.group_name,
                meetupEvents.google_map_link, meetupEvents.attendees).\
                filter(meetupEvents.event_state==state and meetupEvents.event_city==city and meetupEvents.event_category==category).\
                group_by(meetupEvents.event_city).\
                order_by(meetupEvents.event_city).all()

    elif (state=='All' and city!='All' and category=='All'):   
        results=session.query(meetupEvents.event_city, meetupEvents.group_name,
                meetupEvents.google_map_link, meetupEvents.attendees).\
                filter(meetupEvents.event_city==city).\
                group_by(meetupEvents.event_city).\
                order_by(meetupEvents.event_city).all()

    elif (state=='All' and city!='All' and category!='All'):   
        results=session.query(meetupEvents.event_city, meetupEvents.group_name,
                meetupEvents.google_map_link, meetupEvents.attendees).\
                filter(meetupEvents.event_city==city and meetupEvents.event_category==category).\
                group_by(meetupEvents.event_city).\
                order_by(meetupEvents.event_city).all() 

    elif (state=='All' and city=='All' and category!='All'):   
        results=session.query(meetupEvents.event_city, meetupEvents.group_name,
                meetupEvents.google_map_link, meetupEvents.attendees).\
                filter(meetupEvents.event_category==category).\
                group_by(meetupEvents.event_city).\
                order_by(meetupEvents.event_city).all()

    elif (state!='All' and city=='All' and category!='All'):   
        results=session.query(meetupEvents.event_city, meetupEvents.group_name,
                meetupEvents.google_map_link, meetupEvents.attendees).\
                filter(meetupEvents.event_state==state and meetupEvents.event_category==category).\
                group_by(meetupEvents.event_city).\
                order_by(meetupEvents.event_city).all()  

    result_dict=[]
    for city, group, gmap, attendees in results:
        record={}
        record['city']=city
        record['group']=group
        record['attendees']=attendees
        record['gmap']=gmap
        result_dict.append(record)
    session.close()        
    return jsonify(result_dict)           

if __name__=="__main__":
    app.run(debug=True)