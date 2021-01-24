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

SELECT * FROM city;
SELECT * FROM events;

---search for the food activities in Trenton 
SELECT c.city,  e.event_name, e.event_city, e.address
FROM city as c
Inner JOIN events AS e ON c.id = e.region_id
WHERE  city = 'Trenton'

-----
SELECT 
  COUNT('event_city')
FROM city as c
Inner JOIN events AS e ON c.id = e.region_id
WHERE event_city = 'Skillman'

-------------------------------------
SELECT
   DISTINCT event_city, event_state
FROM
   events
ORDER BY "event_state" DESC;
-------------------------------------------------------
CREATE VIEW "full dataset" AS
SELECT c.city, c.state, c. lat, c.lng, c.population, e.event_name, e.event_city, e.address, e.activity_type, e. group_name
FROM city AS c
Inner JOIN events AS e ON c.id = e.region_id;
SELECT * from "full dataset"

SELECT COUNT('activity_type') As act_count, activity_type
FROM "full dataset"   
GROUP BY city






DECLARE
    r record;

BEGIN
    FOR r IN SELECT
   DISTINCT city
FROM city
Inner JOIN events AS e ON c.id = e.region_id    
    LOOP
        -- can do some processing here
		SELECT 
        COUNT('event')
        FROM city as c
        Inner JOIN events AS e ON c.id = e.region_id
        WHERE city = r
				
        RETURN NEXT r; -- return current row of SELECT
    END LOOP;
    RETURN;
END   
  
   
   
   

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   