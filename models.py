from flask_sqlalchemy import SQLAlchemy
 
db = SQLAlchemy()
 
class meetupCity(db.Model):
    __tablename__ = 'city'
    id=db.Column(db.Integer, primary_key = True)
    state=db.Column(db.String())
    city=db.Column(db.String())
    lat=db.Column(db.Float())
    lng=db.Column(db.Float())
    population=db.Column(db.String())
    children = db.relationship("meetupEvents", primaryjoin='meetupCity.id==meetupEvents.region_id')
    # One to Many Relationship
 
    def __init__(self,id, state, city, lat, lng, population):
        self.id = id
        self.city = city
        self.state = state
        self.lat = lat
        self.lng = lng
        self.population=population
 
    def __repr__(self):
        return f"{self.city}:{self.state}:{self.lat}:{self.lng}"

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
    google_map_link=db.Column(db.String())
    event_lat=db.Column(db.Float())
    event_lng=db.Column(db.Float())
    address=db.Column(db.String())
    region_id = db.Column(db.Integer, db.ForeignKey(meetupCity.id),nullable=False)

    def __init__(self:id, event_name, group_name, attendees, venue_event_link, event_state, event_city, event_street, 
                google_map_link, event_lat, event_lng, address, region_id):
        self.id = id
        self.event_name = event_name
        self.group_name = group_name
        self.attendees = attendees
        self.venue_event_link = venue_event_link
        self.event_state = event_state
        self.event_city = event_city
        self.event_street = event_street
        self.google_map_link = google_map_link
        self.event_lat = event_lat
        self.event_lng = event_lng
        self.address=address
        self.region_id = region_id

    def __repr__(self):
        return f"{self.event_name}"

