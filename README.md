# Find your Crew!

It's always fun to find friends with hobbies you enjoy, but this is especially true in the time of the COVID-19 pandemic. We wanted to provide those living in the tri-state area (New Jersey, New York and Pennsylvania) with safe, socially-distanced, in-person events to attend and hopefully forge meaningful connections. MeetUp.com is a great resource to find events to attend, and the goal of this project was to make it easier and faster to find relevant events near you. This was a fantastic challenge in developing a full-stack application using several techniques such as web scraping, the ETL process to create a useful dataset, storing the dataset in a SQL database, creating a Flask API to source specific data elements to enable interactive heatmap, marker map and data table visualizations on the web.

## How we built this application

* Web scraped [MeetUp.com](https://www.meetup.com/) and got all the events taking place in tri-state area
* Sourced latitude and longitude of the event cities and event locations from [OpenCage API](https://opencagedata.com/api)
* Created a python-based script to automate the clean-up, restructuring and rendering of the scraped dataset
* Transformed and loaded data to [SQL database](https://www.postgresql.org/)
* Created a Flask API to access the database and pull data on-demand based on options selected by users
* Used the datasets sourced from Flask API to make the JavaScript visualizations:
  * Heatmap showing all events in the tri-state area - [Mapbox API](https://docs.mapbox.com/api/overview/) and [Leaflet JS](https://leafletjs.com/)
  * Marker map with layers showing events by event category type and city - [Mapbox API](https://docs.mapbox.com/api/overview/) and [Leaflet JS](https://leafletjs.com/)
  * Data table with state, city and event category filters
* Displayed the visualizations on a HTML webpage

## How to use the application

1. Clone this repository on to your computer

2. Create a new database in Postgresql using PgAdmin4 and name it "Meetup". Create the following two tables.
```
CREATE TABLE event_city (
	id Int PRIMARY KEY,
	state VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	city_lat float NOT NULL,
	city_lng float NOT NULL	
);

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	event_name VARCHAR NOT NULL,
	group_name VARCHAR NOT NULL,
	attendees INTEGER NOT NULL,
	category VARCHAR  NOT NULL,
	venue_event_link VARCHAR NOT NULL,
	event_street VARCHAR NOT NULL,
	Google_Map_Link VARCHAR NOT NULL,
	event_lat FLOAT,
	event_lng FLOAT,
	address VARCHAR NOT NULL,
	city_id INTEGER NOT NULL, 
	FOREIGN KEY (city_id) REFERENCES event_city(id)
);

```
3. Load the following two .csv files into Postgresql in this order: region.csv, events.csv

4. Open the app.py file and enter your Postgres password to configure the app and create the engine
```
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:[YOUR POSTGRES PASSWORD]@127.0.0.1:5432/Meetup"
```
```
engine=create_engine("postgresql://postgres:[YOUR POSTGRES PASSWORD]@127.0.0.1:5432/Meetup")
```
4. Open your command prompt, and run app.py
```
python app.py
```
5. Run the live server, and use the application on the web!

## Authors

* **Brian Regan** - *Data sourcing (API), data cleaning* - [bregan78](https://github.com/bregan78)
* **Joseph Lubrano** - *SQL database, Flask, visualizations* - [jlubranos](https://github.com/jlubranos)
* **Mersedeh Saniepay** - *Data cleaning and restructuring, SQL database* - [MersedehSP](https://github.com/MersedehSP)
* **Veena Uppalapati** - *Data sourcing (web scraping), visualizations* - [veenauppalapati](https://github.com/veenauppalapati)
* **Ramyata Upmaka** - *Visualizations, webpage* - [rambunctious2050](https://github.com/rambunctious2050)

## Acknowledgments

* Rutgers Data Science Bootcamp Instructors and TAs
