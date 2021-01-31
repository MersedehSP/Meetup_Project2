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