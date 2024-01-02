# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

The page will reload when you make changes.\
You may also see any lint errors in the console.

This project is a React application that combines a map provider component (MapProvider) using the Google Maps API with a natural language search component (NaturalLanguageSearch) powered by OpenAI's GPT-3.5-turbo model. The application allows users to perform location-based searches using natural language queries and displays the results on a Google Map.

Components
1 MapProvider Component (MapProvider.tsx)
The MapProvider component renders a Google Map and a marker at a specified position. Additionally, it can display directions on the map based on the provided origin prop, which is a Google Maps DirectionsResult.

Props:
origin?: google.maps.DirectionsResult: Optional prop for displaying directions on the map.

2. NaturalLanguageSearch Component (NaturalLanguageSearch.tsx)
   The NaturalLanguageSearch component integrates OpenAI's GPT-3.5-turbo model for natural language processing. Users can input questions related to location, directions, nearest locations, or distance. The component sends queries to the OpenAI API and interprets the responses to extract relevant information for geocoding and displaying on the map.

Props:
setOrigin: (origin: any) => void: Function to set the origin for the map.
setDestination: (destination: any) => void: Function to set the destination for the map.

Usage:
Install Dependencies: Before running the application, make sure to install the necessary dependencies. Run the following command:

### `npm install`

Set API Keys: In the MapProvider.tsx file, replace the googleMapsApiKey with your Google Maps API key, and in the NaturalLanguageSearch.tsx file, replace API_KEY with your OpenAI API key.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Notes
Ensure that your API keys are secure and not exposed in public repositories.
This application uses the @react-google-maps/api library for Google Maps integration and OpenAI GPT-3.5-turbo for natural language processing.
Feel free to customize and extend the components based on your specific requirements.
