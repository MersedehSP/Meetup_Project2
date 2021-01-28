from flask_sqlalchemy import SQLAlchemy
 
db = SQLAlchemy()
 
class meetupCity(db.Model):
    __tablename__ = 'event_city'
    id=db.Column(db.Integer, primary_key = True)
    state=db.Column(db.String())
    city=db.Column(db.String())
    city_lat=db.Column(db.Float())
    city_lng=db.Column(db.Float())
    children = db.relationship("meetupEvents", primaryjoin='meetupCity.id==meetupEvents.city_id')
    # One to Many Relationship
 
    def __init__(self,id, state, city, city_lat, city_lng):
        self.id = id
        self.state = state
        self.city = city
        self.city_lat = city_lat
        self.city_lng = city_lng
 
    def __repr__(self):
        return f"{self.id}:{self.state}:{self.city}:{self.city_lat}:{self.city_lng}"

class meetupEvents(db.Model):
    __tablename__ = 'events'

    id=db.Column(db.Integer, primary_key = True)
    event_name=db.Column(db.String())
    group_name=db.Column(db.String())
    attendees=db.Column(db.Integer())
    category=db.Column(db.String())
    venue_event_link=db.Column(db.String())
    event_street=db.Column(db.String())
    google_map_link=db.Column(db.String())
    event_lat=db.Column(db.Float())
    event_lng=db.Column(db.Float())
    address=db.Column(db.String())
    city_id = db.Column(db.Integer, db.ForeignKey(meetupCity.id),nullable=False)

    def __init__(self:id, event_name, group_name, attendees, category, venue_event_link, event_street, 
                google_map_link, event_lat, event_lng, address, city_id):
        self.id = id
        self.event_name = event_name
        self.group_name = group_name
        self.attendees = attendees
        self.category = category
        self.venue_event_link = venue_event_link
        self.event_street = event_street
        self.google_map_link = google_map_link
        self.event_lat = event_lat
        self.event_lng = event_lng
        self.address=address
        self.city_id = city_id

    def __repr__(self):
        return f"{self.event_name}:{self.event.group_name}:{self.attendees}:{self.category}:{self.venue_event_link}:{self.event_street}:{self.google_map_link}:{self.event_lat}:{self.event_lng}:{self.address}:{self.city_id}"

