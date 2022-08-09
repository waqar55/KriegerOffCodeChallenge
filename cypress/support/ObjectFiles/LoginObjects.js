
class LoginObjects {

    LogoutLink() {
        return cy.xpath("//a[contains(@href,'logout')]").first();
    }

    LoginButton() {
        return cy.get('button[id="login-submit"]');
    }

    LoginEmailField() {
        return cy.get('input[id="loginEmail"]')
    }

    LoginPasswordField() {
        return cy.get('input[id="loginPassword"]')
    }

    IncorrectPwdError() {
        return cy.get('label[id="loginEmail-error"]')
    }

}

export default LoginObjects;
