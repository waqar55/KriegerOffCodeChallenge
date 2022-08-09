import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Utility from '../../support/Utility/utility'
import RegistrationObjects from '../../support/ObjectFiles/RegistrationObjects'
import LoginObjects from '../../support/ObjectFiles/LoginObjects'


let utility = new Utility();
let RegObj = new RegistrationObjects();
let LoginObj = new LoginObjects();

Given('Hit the URL of the website', async function () {
  
  await cy.visit(Cypress.env('url'));

})

When('User moves to the login page', async function () {

  await utility.AcceptCookies();
  await RegObj.RegistrationIcon().click();

})

And('User adds the email/ reset password data in the login page', async function () {

  cy.readFile('cypress/fixtures/data.json').then((user) => {
    utility.ApplicationLogin(user.Email, user.NewPassword);
  })  

})

Then('User should be logged in successfully', async function () {

  await cy.url().should('eq', Cypress.env('url'));
  await RegObj.YourAccountLabel().should('contain', 'Dein Konto');

})

//////////////////////////

When('User moves to login page', async function () {
  
  await RegObj.RegistrationIcon().click();
  await utility.AcceptCookies();

})

And('User adds the email/ old password data in the login page', async function () {
  
  await cy.readFile('cypress/fixtures/data.json').then((user) => {
    utility.ApplicationLogin(user.Email, user.OldPassword);
  })

})

Then('User should not be logged in successfully', async function () {

  await LoginObj.IncorrectPwdError().should('contain', 'Benutzername nicht gefunden oder Passwort falsch');

})

//////////////////////////

