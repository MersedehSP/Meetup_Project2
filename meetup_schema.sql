CREATE TABLE city (
	id SERIAL PRIMARY KEY,
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
	event_link VARCHAR(255) NOT NULL,
	attendees_num INTEGER NOT NULL,
	city_id INTEGER,
	map_link VARCHAR(255) NOT NULL,
	event_city VARCHAR NOT NULL,
	event_street VARCHAR(255) NOT NULL,
	event_lat FLOAT,
	event_lng FLOAT,
	event_state VARCHAR,
	FOREIGN KEY (city_id) REFERENCES city(id)
);

SELECT * FROM city;
SELECT * FROM events;
