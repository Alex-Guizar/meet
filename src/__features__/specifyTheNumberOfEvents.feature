Feature: Specify Number of Events

Scenario: When user hasn't specified a number, 32 is the default number
Given user hasn't specified a number
When the user opens the app
Then the number of events shown should default to 32

Scenario: User can change the number of events they want to see
Given user wanted to change the number of events shown
When the user edits the number of events shown
Then the displayed number of events should change