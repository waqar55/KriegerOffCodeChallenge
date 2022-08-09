import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Utility from '../../support/Utility/utility'
import RegistrationObjects from '../../support/ObjectFiles/RegistrationObjects'
import 'cypress-mailosaur'

let utility = new Utility();
let RegObj = new RegistrationObjects();
let serverID = '464vp3ui';


Given('Hit the URL of the website', async function () {
  
  await cy.visit(Cypress.env('url'));

})

Then('URL should be opened successfully', async function () {

  await cy.url().should('eq', Cypress.env('url'));

})

//////////////////////////

Given('User is on the home page where Registration Icon is visible', async function () {

  await utility.AcceptCookies();
  await RegObj.RegistrationIcon().should('be.visible');

})

When('User clicks on Registration Icon', async function () {
  
  await RegObj.RegistrationIcon().click();

})

When('User clicks on Registration button to move forward', async function () {
  
  await RegObj.RegistrationButton().click();

})

Then('Registration page should be opened', async function () {

  await RegObj.RegFirstNameField().should('be.visible');

})

//////////////////////////

Given('User is on Registration page', async function () {

  await cy.url().should('contain', '/registrierung');

})

When('User adds data in the fields for account registration and continue with the registration process', async function () {
  
  await utility.UserRegistration();

})

Then('User should be registered successfully', async function () {

  await cy.url().should('eq', Cypress.env('url'));
  await RegObj.YourAccountLabel().should('contain', 'Dein Konto');
  await RegObj.RegistrationIcon().click();
  await RegObj.WelcomeUserLabel().should('contain', 'Hallo,');

})

//////////////////////////

When('User moves to the login page', async function () {

  await RegObj.RegistrationIcon().click();
  await utility.AcceptCookies();
  await RegObj.RegistrationIcon().click();

})

And('User clicks on Forgot Password link to request for a password reset', async function () {
  
  await RegObj.ForgotPasswordLink().click();

})

And('User gets an email and changes the password', async function () {
  
  await cy.readFile('cypress/fixtures/data.json').then((user) => {
    RegObj.ForgottenEmail().type(user.Email)
    
    RegObj.ForgotEmailSubmitButton().click()
  
    cy.wait(50000) 
    cy.mailosaurGetMessage(serverID,{
    sentTo: user.Email})
    .then(email => {
      cy.log(email.subject)
      cy.log(email.html.links[4].href)
      cy.visit(email.html.links[4].href)
  
    })
  
    RegObj.NewPasswordField().type(user.NewPassword);
    RegObj.ConfirmNewPasswordField().type(user.NewPassword);
    RegObj.NewPasswordSubmitButton().click();

  })  

})

Then('Password should be reset to a new one', async function () {

  await cy.visit(Cypress.env('url'));
  await RegObj.RegistrationIcon().click();

  await cy.readFile('cypress/fixtures/data.json').then((user) => {
    utility.ApplicationLogin(user.Email, user.NewPassword);
  })

  await cy.url().should('eq', Cypress.env('url'));
  await RegObj.YourAccountLabel().should('contain', 'Dein Konto');

})

//////////////////////////

