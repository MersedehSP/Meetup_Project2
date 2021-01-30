# Meetup_Project2
# Find your Crew!

It's always fun to find friends with hobbies you enjoy, but this is especially true in the time of the COVID-19 pandemic. We wanted to provide those living in the tri-state area (New Jersey, New York and Pennsylvania) with safe, socially-distanced, in-person events to attend and hopefully forge meaningful connections. MeetUp.com is a great resource to find events to attend, and the goal of this project was to make it easier and faster to find relevant events near you. This was a fantastic challenge in developing a full-stack application using several techniques such as web scraping, the ETL process to create a useful dataset, storing the dataset in a SQL database, creating a Flask API to source specific data elements to enable interactive heatmap, marker map and data table visualizations on the web.

## How we built this application

### Web scraped [MeetUp.com](https://www.meetup.com/) and got all the events taking place in tri-state area
### Sourced latitude and longitude of the event cities and event locations from [OpenCage API](https://opencagedata.com/api)
### Created a python-based script to automate the clean-up, restructuring and rendering of the scraped dataset
### Transformed and loaded data to [SQL database](https://www.postgresql.org/)
### Created a Flask API to access the database and pull data on-demand based on options selected by users
### Used the datasets sourced from Flask API to make the JavaScript visualizations:
* Heatmap showing all events in the tri-state area - Used [Mapbox API](https://docs.mapbox.com/api/overview/) and [Leaflet JS](https://leafletjs.com/)
* Marker map with layers showing events by event category type and city - Used 
* Data table with state, city and event category filters
### Displayed the visualizations on a HTML webpage

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* **Brian Regan** - *Data sourcing (API)* - [bregan78](https://github.com/bregan78)
* **Joseph Lubrano** - *SQL database, Flask, visualizations* - [jlubranos](https://github.com/jlubranos)
* **Mersedeh Saniepay** - *Data cleaning and restructuring, SQL database* - [MersedehSP](https://github.com/MersedehSP)
* **Veena Uppalapati** - *Data sourcing (web scraping) and visualizations* - [veenauppalapati](https://github.com/veenauppalapati)
* **Ramyata Upmaka** - *Visualizations, webpage* - [rambunctious2050](https://github.com/rambunctious2050)

## Acknowledgments

* Rutgers Data Science Bootcamp Instructors and TAs
