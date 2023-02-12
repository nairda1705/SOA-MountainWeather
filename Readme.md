# Project Name: Mountain Weather

## Overview
This project is a web application that displays the temperature and the list of the tallest 14 peaks in the world. The project is divided into three microservices and a microfrontend architecture for the frontend part. The microservices are written in NodeJS and use OpenWeatherAPI to retrieve the temperature information.

## C4 Diagram
![bP912u9048Nl-oiMx_w5A8oWWn0HT0WFaqwrg3CoZbwY_vwBGGeIsss7UUzZtsFMhO9eLrT6dLPeK-v8mP4z8-W3nPW6yXBkQACJrWqAQ2U3pEN2BKhlSepiqrXxcQxtT6EfGHsJFQAAmnwgpBmcj0D2sIvn_284a31BuGYKPGap9IHSNxtIlu4AJ-o4vhYTC2bIyR6dleDDqsH-sE9GITMEys0Ao6hZU1NsYL-1_w04Y4RQ](https://user-images.githubusercontent.com/45295092/218305677-2653c0e5-3349-4b96-a2cb-4c93f8fe86b8.png)

# Microservices
## Temperature Microservice
This microservice is responsible for retrieving the temperature information from the OpenWeatherAPI based on the location of the peak. It returns the temperature in Celsius.

## Peaks Microservice
This microservice returns a list of the tallest 14 peaks in the world, including their name, height, and location.

## Coordinator Microservice
This microservice combines the information from the temperature and peaks microservices and returns it to the frontend.

# Frontend
The frontend of the project uses a microfrontends architecture, with a main app that displays the peaks and a details app that displays the temperature for the selected peak.
