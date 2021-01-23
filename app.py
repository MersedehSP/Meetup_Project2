#from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from flask import Flask, render_template, jsonify
from flask_migrate import Migrate
from models import db, meetupCity, meetupEvents
 
app = Flask(__name__)
 
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://<username>:<password>@<server>:5432/<db_name>"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
 
db.init_app(app)
migrate = Migrate(app, db)
 
#general Flask Code

@app.route('/')
def home():
    print("In home")
    return render_template('index.html')

if __name__=="__main__":
    app.run(debug=True)