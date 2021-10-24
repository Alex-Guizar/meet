Feature: Show/Hide an Event's Details

Scenario: An event element is collapsed by default
Given user hasn't interacted with details
When the user opens the app
Then the user should see all event details collapsed

Scenario: User can expand an event to see its details
Given user wanted to expand an event's details
When the user clicks on an event's details
Then the event's details should expand

Scenario: User can collapse an event to hide its details
Given user wanted to collapse an event's details
When the user clicks on an event's details
Then the event's details should collapse