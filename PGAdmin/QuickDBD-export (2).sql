-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Events" (
    "event_id" int   NOT NULL,
    "event_name" VARCHAR   NOT NULL,
    "group_name" VARCHAR   NOT NULL,
    "event_link" VARCHAR   NOT NULL,
    "attendees_num" Int   NOT NULL,
    "city_id" int   NOT NULL,
    "map_link" VARCHAR   NOT NULL,
    "event_city" VARCHAR   NOT NULL,
    "event_street" VARCHAR   NOT NULL,
    "event_lat" float   NOT NULL,
    "event_lng" float   NOT NULL,
    "event_state" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Events" PRIMARY KEY (
        "event_id"
     )
);

CREATE TABLE "City" (
    "city_id" int   NOT NULL,
    "state" VARCHAR   NOT NULL,
    "city" VARCHAR   NOT NULL,
    "lat" float   NOT NULL,
    "lng" float   NOT NULL,
    "population" Int   NOT NULL,
    CONSTRAINT "pk_City" PRIMARY KEY (
        "city_id"
     )
);

ALTER TABLE "Events" ADD CONSTRAINT "fk_Events_city_id" FOREIGN KEY("city_id")
REFERENCES "City" ("city_id");

