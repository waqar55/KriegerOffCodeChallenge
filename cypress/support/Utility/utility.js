import { faker } from '@faker-js/faker';
import RegistrationObjects from '../../support/ObjectFiles/RegistrationObjects';
import LoginObjects from '../../support/ObjectFiles/LoginObjects';
import 'cypress-mailosaur' 

let RegObj = new RegistrationObjects();
let LoginObj = new LoginObjects();
let serverDomain = '464vp3ui.mailosaur.net'

class Utility{
    
   GetRandomEmail() {
        let email = faker.random.word().toLowerCase() + "@" + serverDomain;
        return email;
    }

    GetRandomPassword() {
        var length = 3,
            CapsCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            Pwd = "";
        for (var i = 0, n = CapsCharSet.length; i < length; ++i) {
            Pwd += CapsCharSet.charAt(Math.floor(Math.random() * n));
        }
        
        length = 3;
        var LowerCharSet = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0, n = LowerCharSet.length; i < length; ++i) {
            Pwd += LowerCharSet.charAt(Math.floor(Math.random() * n));
        }

        length = 3;
        var NumCharSet = "0123456789";
        for (var i = 0, n = NumCharSet.length; i < length; ++i) {
            Pwd += NumCharSet.charAt(Math.floor(Math.random() * n));
        }

        length = 2;
        var SpecCharSet = "!@#$%^&*";
        for (var i = 0, n = SpecCharSet.length; i < length; ++i) {
            Pwd += SpecCharSet.charAt(Math.floor(Math.random() * n));
        }

        return Pwd;
    }
 
    GetRandomFirstName() {
        let FirstName = faker.name.firstName();
        return FirstName;
    }

    GetRandomLastName() {
        let LastName = faker.name.lastName();
        return LastName;
    }

    ClickAndType(selector, text) {
        selector.click();
        selector.clear();
        selector.type(text);
    }

    AcceptCookies() {
        
        RegObj.AcceptCookieButton().then($button => {
            if ($button.is(':visible')){
                RegObj.CookieCheckBox().first().click();
                RegObj.CookieCheckBox().last().click();
                RegObj.AcceptCookieButton().click();
            }
        })
    }

    UserRegistration()  {

        let email = this.GetRandomEmail();
        let Password = this.GetRandomPassword();

        this.ClickAndType(RegObj.RegFirstNameField(), this.GetRandomFirstName());

        this.ClickAndType(RegObj.RegLastNameField(), this.GetRandomLastName());
        this.ClickAndType(RegObj.RegEmailField(), email);
        this.ClickAndType(RegObj.RegPasswordField(), Password);
        this.ClickAndType(RegObj.RegConfirmPasswordField(), Password);

        RegObj.RegAgreementCheckBox().click();
        RegObj.NewsLetterCheckBox().click();

        RegObj.RegContinueButton().click();

        this.HandlingSessionExpiry();

        this.AcceptCookies();

        cy.writeFile('cypress/fixtures/data.json', { Email: email, OldPassword: Password, NewPassword: this.GetRandomPassword() });
        
    }

    ApplicationLogout() {

        LoginObj.LogoutLink().click();
    
    }

    ApplicationLogin(Email, PWd) {

        // cy.readFile('cypress/fixtures/data.json').then((user) => {
        //     LoginObj.LoginEmailField().type(user.Email);
        //     LoginObj.LoginPasswordField().type(user.OldPassword);
        //     LoginObj.LoginButton.click();
        // })

        LoginObj.LoginEmailField().type(Email);
        LoginObj.LoginPasswordField().type(PWd);
        LoginObj.LoginButton().click();

    }

    HandlingSessionExpiry() {
        
        RegObj.RefreshTokenLink().then($button => {
            if ($button.is(':visible')){
                RegObj.RefreshTokenLink().click();
                RegObj.RegContinueButton().click();
            }
        })
    }
    
}

export default Utility;
