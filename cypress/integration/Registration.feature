Feature: Registration for a user

    I want to register a user account by signing up in the website

    Scenario: Opening Application for registring a new user account
        Given Hit the URL of the website 
        Then URL should be opened successfully

    Scenario: Move to the registration page to create a new user account
        Given User is on the home page where Registration Icon is visible 
        When User clicks on Registration Icon
        When User clicks on Registration button to move forward
        Then Registration page should be opened

    Scenario: Registering a new user after entering the data
        Given User is on Registration page 
        When User adds data in the fields for account registration and continue with the registration process
        Then User should be registered successfully

    Scenario: Password Reset after registering the user
        When User moves to the login page
        And User clicks on Forgot Password link to request for a password reset
        And User gets an email and changes the password
        Then Password should be reset to a new one

