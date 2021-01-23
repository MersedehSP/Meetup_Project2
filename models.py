from flask_sqlalchemy import SQLAlchemy
 
db = SQLAlchemy()
 
class meetupCity(db.Model):
    __tablename__ = 'city'
 
    city=db.Column(db.String())
    state=db.Column(db.String())
    city_lat=db.Column(db.Float())
    city_lng=db.Column(db.Float())
    city_population=db.Column(db.String())
    city_id=db.Column(db.Integer, primary_key = True)
    events = db.relationship('meetupEvents', backref='city_id', lazy=True)
    # One to Many Relationship
 
    def __init__(self, city, state, city_lat, city_lng, city_population):
        self.city = city
        self.state = state
        self.city_lat = city_lat
        self.city_lng = city_lng
        self.city_population=city.population
 
    def __repr__(self):
        return f"{self.city}:{self.state}:{self.city_lat}:{self.city.lng}"

class meetupEvents(db.Model):
    __tablename__ = 'events'

    id=db.Column(db.Integer, primary_key = True)
    evt=db.Column(db.String())
    grp=db.Column(db.String())
    lnk=db.Column(db.String())
    attendees=db.Column(db.Integer())
    maploc=db.Column(db.String())
    city=db.Column(db.String())
    subcity=db.Column(db.String())
    state=db.Column(db.String())
    street=db.Column(db.String())
    subcity_lat=db.Column(db.Float())
    subcity_lng=db.Column(db.Float())
    city_id = db.Column(db.Integer, db.ForeignKey('meetupCity.city_id'),nullable=False)

    def __init__(self: id, evt, grp, lnk, attendees, maploc, city, subcity,
                state, street, subcity_lat, subcity_lng, city_id):
        self.evt = evt
        self.grp = grp
        self.lnk = lnk
        self.attendees = attendees
        self.maploc = maploc
        self.city = city
        self.subcity = subcity
        self.state = state
        self.street = street
        self.subcity_lat = subcity_lat
        self.subcity_lng = subcity_lng
        self.city_id = city_id

    def __repr__(self):
        return f"{self.evt}:{self.grp}:{self.lnk}:{self.attendees}"

