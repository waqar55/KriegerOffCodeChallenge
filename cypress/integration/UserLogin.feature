Feature: Login with the user

    I want to login a user with a new and old password

    Scenario: Application Login after reset password
        Given Hit the URL of the website 
        When User moves to the login page 
        And User adds the email/ reset password data in the login page
        Then User should be logged in successfully

    Scenario: Application Login with Old Password
        When User moves to login page 
        And User adds the email/ old password data in the login page
        Then User should not be logged in successfully
