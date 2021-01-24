from flask_sqlalchemy import SQLAlchemy
 
db = SQLAlchemy()
 
class meetupCity(db.Model):
    __tablename__ = 'city'
    id=db.Column(db.Integer, primary_key = True)
    state=db.Column(db.String())
    city=db.Column(db.String())
    city_lat=db.Column(db.Float())
    city_lng=db.Column(db.Float())
    city_population=db.Column(db.String())
    events = db.relationship('meetupEvents', backref='city_id', lazy=True)
    # One to Many Relationship
 
    def __init__(self, state, city, city_lat, city_lng, city_population):
        self.city = city
        self.state = state
        self.city_lat = city_lat
        self.city_lng = city_lng
        self.city_population=city_population
 
    def __repr__(self):
        return f"{self.city}:{self.state}:{self.city_lat}:{self.city.lng}"

class meetupEvents(db.Model):
    __tablename__ = 'events'

    id=db.Column(db.Integer, primary_key = True)
    event_name=db.Column(db.String())
    group_name=db.Column(db.String())
    attendees=db.Column(db.Integer())
    venue_event_link=db.Column(db.String())
    event_state=db.Column(db.String())
    event_city=db.Column(db.String()) 
    event_street=db.Column(db.String())
    Google_Map_Link=db.Column(db.String())
    event_lat=db.Column(db.Float())
    event_lng=db.Column(db.Float())
    region_id = db.Column(db.Integer, db.ForeignKey('meetupCity.id'),nullable=False)

    def __init__(self: id, event_name, group_name, attendees, venue_event_link, event_state, event_city, event_street,
                Google_Map_Link, event_lat, event_lng, region_id):
        self.event_name = event_name
        self.group_name = group_name
        self.attendees = attendees
        self.venue_event_link = venue_event_link
        self.event_state = event_state
        self.event_city = event_city
        self.event_street = event_street
        self.Google_Map_Link = Google_Map_Link
        self.event_lat = event_lat
        self.event_lng = event_lng
        self.region_id = region_id

    def __repr__(self):
        return f"{self.event_name}"

