
class RegistrationObjects {

    AcceptCookieButton() {
        return cy.get('div[class="consentForm__acceptButton"] button').last();
    }

    CookieCheckBox() {
        return cy.get('div[class="checkbox"]');
    }

    RegistrationIcon() {
        return cy.get('div[class="headerElement headerElement--login"] a');
    }

    RegistrationButton() {
        return cy.get('button[id="registerAccount"]');
    }

    RegFirstNameField() {
        return cy.get('input[id="firstName"]');
    }

    RegLastNameField() {
        return cy.get('input[id="lastName"]');
    }

    RegEmailField() {
        return cy.get('input[id="email"]').first();
    }

    RegPasswordField() {
        return cy.get('input[id="password"]');
    }

    RegConfirmPasswordField() {
        return cy.get('input[id="password2"]');
    }

    RegAgreementCheckBox() {
        return cy.xpath("//div[contains(@class,'agbCheckbox')]//span").first();
    }

    NewsLetterCheckBox() {
        return cy.xpath("//div[contains(@class,'newsletterCheckbox')]//span").first();
    }

    RegContinueButton() {
        return cy.get('button[id="register-submit"]').first();
    }

    RefreshTokenLink() {
        return cy.get('a[id="refreshTokenBtn"]');
    }

    YourAccountLabel() {
        return cy.get('div[class="headerElement headerElement--login"] span').last();
    }

    WelcomeUserLabel() {
        return cy.get('div[class="titleHeadline"]');
    }

    ForgotPasswordLink() {
        return cy.get(".existingAccount__forgotten");
    }

    ForgottenEmail() {
        return cy.get('#passwordForgottenEmail');
    }

    ForgotEmailSubmitButton() {
        return cy.get('#passwordForgottenSubmitId');
    }

    NewPasswordField() {
        return cy.get('input[name="newPassword"]');
    }

    ConfirmNewPasswordField() {
        return cy.get('input[name="newPasswordRepeat"]');
    }

    NewPasswordSubmitButton() {
        return cy.get(".passwordNew__button");
    }

}

export default RegistrationObjects;
