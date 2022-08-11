# ebike_solita_assignment

This project is a part of solita web development pre-assignment project
The project perform as a full-package web application with API and UI services

The API enpoints are available at https://api.lampham.app
The demo app is available at https://web.lampham.app
The database is built in postgresql and store in VPC and the dataset is imported

# APP FUNCTIONS

## Journey list View

The url https://web.lampham.app/journeys render a list of journeys in pagination form. The data is display in table and the pagination margin is 10 item per page
There are searching and filtering function:
Searching field requires departure and return station name inputs and it query result base on stations
Filter field requires departure and return station name inputs and date range to search journey base on destinations during a period of time; as the data in use is on May/2021, date range should be within 30/4/2021 - 1/6/2021

## Stations List View

The url /stations, render a list of stations in pagination form, and displayed in table form. Every column of station data is tagged with a link for detail

## Station View

The url /stations/id shows details of chosen station with calculations likes: total number of journeys starting from the station and ending at station, average distance from and to the station and top 5 most popular departure and return stations. There are also a map to show station location on map

## Map

The map is fetch with Google map with location of list of stations or single station on Single Station component
