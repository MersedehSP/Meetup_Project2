CREATE TABLE city (
	id Int PRIMARY KEY,
	state VARCHAR NOT NULL,
	city VARCHAR NOT NULL,
	lat VARCHAR NOT NULL,
	lng VARCHAR NOT NULL,
	population INTEGER NOT NULL
);

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	event_name VARCHAR(255) NOT NULL,
	group_name VARCHAR(255) NOT NULL,
	attendees INTEGER NOT NULL,
	venue_event_link VARCHAR(255) NOT NULL,
	event_state VARCHAR,
	event_city VARCHAR NOT NULL,
	event_street VARCHAR(255) NOT NULL,
	Google_Map_Link VARCHAR(255) NOT NULL,
	event_lat FLOAT,
	event_lng FLOAT,
	address VARCHAR NOT NULL,
	region_id INTEGER NOT NULL, 
	FOREIGN KEY (region_id) REFERENCES city(id)
);

 
  
   
   
   

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   