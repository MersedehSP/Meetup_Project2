# Meetup_Project2
## scarpe arts


**INPUT** - uscities.csv<br/>
**OUTPUT** - Final_data.csv<br/>
**PROGRAM** - scrape_arts.ipynb<br/>
<br/>
- [x] Load the uscities data into a dataframe (uscities_df)<br/>
- [x] Filter out the uscities_df to just : **'NY', 'NJ', 'PA'**<br/>
- [x] Filter out the top 25 cities for each state based upon the population (top_cities_df)<br/>
- [x] Scrape categories from the meetup website<br/>
- [x] Construct URLs : `f"https://www.meetup.com/find/us--{state}--{city}/{category}/?eventType=inPerson&distance=tenMiles"`<br/>
- [x] Create a list of dataframes with the scraped data for each link</br>
    - scraped data includes: </br>
        * state (retrieve from the url)</br>
        * city (retrieve from the url)</br>
        * Event Name</br>
        * Group Name</br>
        * Number of Attendees</br>
        * Event link (directs you to that page)</br>
- [x] Concatenate all the dataframes (final_meetup_df)</br>
- [x] Modify the state and city of final_meetup_df dataframe to replace '-' with space; Title case the city; upper case the state;</br>
- [x] Modify the state and city of top_cities_df dataframe to replace '-' with space; Title case the city; upper case the state;</br>
- [x] Merge the top_cities_df and final_meetup_df together to create a final dataframe that links the latitude, longitude, and population to the state and city (new_df)</br>
- [x] Export the dataframe to a csv file : final_data.csv

*NOTE: Use the final_data.csv for the next steps*

