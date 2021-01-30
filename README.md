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
Heatmap showing all events in the tri-state area - Used [Mapbox API](https://docs.mapbox.com/api/overview/) and [Leaflet JS](https://leafletjs.com/)
Marker map with layers showing events by event category type and city - Used 
Data table with state, city and event category filters
### Displayed the visualizations on a HTML webpage


### Web Scraping MeetUp.com
### Getting the latitude and longitude for target locations

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

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

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
