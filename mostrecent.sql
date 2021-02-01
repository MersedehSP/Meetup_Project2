CREATE TABLE event_city (
	id Int PRIMARY KEY,
	state VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	city_lat FLOAT,
	city_lng FLOAT
	
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

 
  
   
   
   

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   