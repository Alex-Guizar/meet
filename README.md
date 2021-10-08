# Meet

## Objective

To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Key Features

1. Filter events by city.
2. Show/hide event details.
3. Specify number of events.
4. Use the app when offline.
5. Add an app shortcut to the home screen.
6. View a chart showing the number of upcoming events by city.

## User Stories

### Feature 1: Filter Events By City
As a user\
I should be able to “filter events by city”\
So that I can see the list of events that take place in that city

#### Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
Given user hasn’t searched for any city\
When the user opens the app\
Then the user should see a list of all upcoming events

#### Scenario 2: User should see a list of suggestions when they search for a city.
Given the main page is open\
When user starts typing in the city textbox\
Then the user should see a list of cities (suggestions) that match what they’ve typed

#### Scenario 3: User can select a city from the suggested list.
Given the user was typing “Berlin” in the city textbox\
And the list of suggested cities is showing\
When the user selects a city (e.g., “Berlin, Germany”) from the list\
Then their city should be changed to that city (i.e., “Berlin, Germany”)\
And the user should receive a list of upcoming events in that city

### Feature 2: Show/Hide an Event’s Details
As a user\
I should be able to “show and hide an event’s details”\
So that I can look at or hide an event’s information

#### Scenario 1: An event element is collapsed by default
Given user hasn’t interacted with details\
When the user opens the app\
Then the user should see all event details collapsed

#### Scenario 2: User can expand an event to see its details
Given user wanted to expand an event’s details\
When the user clicks on an event’s details\
Then the event’s details should expand

#### Scenario 3: User can collapse an event to hide its details
Given user wanted to collapse an event’s details\
When the user clicks on an event’s details\
Then the event’s details should collapse

### Feature 3: Specify Number of Events
As a user\
I should be able to “specify the number of events”\
So that I can change how many events I am viewing

#### Scenario 1: When user hasn’t specified a number, 32 is the default number
Given user hasn’t specified a number\
When the user opens the app\
Then the number of events shown should default to 32

#### Scenario 2: User can change the number of events they want to see
Given user wanted to change the number of events shown\
When the user edits the number of events shown\
Then the displayed number of events should change

### Feature 4: Use the App When Offline
As a user\
I should be able to “use the app when offline”\
So that I don’t have to rely on an internet connection

#### Scenario 1: Show cached data when there’s no internet connection
Given user wanted  to view the app with no reception\
When the user opens the app\
Then the events should be displayed based on the cached data

#### Scenario 2: Show error when user changes the settings (city, time range)
Given user tried to change the filter settings\
When the user views the events\
Then an error should be displayed

### Feature 5: Data Visualization
As a user\
I should be able to “visualize the data provided”\
So that I can more easily see what events are coming up

#### Scenario 1: Show a chart with the number of upcoming events in each city
Given user wanted to view a calendar with upcoming events\
When the user clicks upcoming events link\
Then a visualized version of event data should come up

## Techinical Requirements
* The app must be a React application.
* The app must be built using the TDD technique.
* The app must use the Google Calendar API and OAuth2 authentication flow.
* The app must use serverless functions (AWS lambda is preferred) for the authorization server instead of using a traditional server.
* The app’s code must be hosted in a Git repository on GitHub.
* The app must work on the latest versions of Chrome, Firefox, Safari, Edge, and Opera, as well as on IE11.
* The app must display well on all screen sizes (including mobile and tablet) widths of 1920px and 320px.
* The app must pass Lighthouse’s PWA checklist.
* The app must work offline or in slow network conditions with the help of a service worker.
* Users may be able to install the app on desktop and add the app to their home screen on mobile.
* The app must be deployed on GitHub Pages.
* The API call must use React axios and async/await.
* The app must implement an alert system using an OOP approach to show information to the user.
* The app must make use of data visualization (recharts preferred).
* The app must be covered by tests with a coverage rate >= 90%.
* The app must be monitored using an online monitoring tool.
