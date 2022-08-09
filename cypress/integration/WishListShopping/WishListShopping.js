import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import Utility from '../../support/Utility/utility'
import ShoppingObjects from '../../support/ObjectFiles/ShoppingObjects'
import RegistrationObjects from '../../support/ObjectFiles/RegistrationObjects'

let utility = new Utility();
let ShoppingObj = new ShoppingObjects();
let RegObj = new RegistrationObjects();

Given('User logs in with correct email/ password', async function () {
  
    await cy.visit(Cypress.env('url'));  
    await utility.AcceptCookies();
    await RegObj.RegistrationIcon().click();

    await cy.readFile('cypress/fixtures/data.json').then((user) => {
        utility.ApplicationLogin(user.Email, user.NewPassword);
    })

    await cy.url().should('eq', Cypress.env('url'));
    await RegObj.YourAccountLabel().should('contain', 'Dein Konto');
  
})

When('User clicks on 5 items from the given list to add them in wishlist', async function () {

    let counter = 5;
    for(let i = 1; i <= counter; i++){
      cy.wait(10000)
      cy.scrollTo(0, 1000);  
  
      // let x = cy.xpath('//body[1]/div[12]/div[3]/div[5]/div[5]/div[1]/div[1]/center[1]/div[1]/div[1]/a[1]')
      let path = '//body[1]/div[12]/div[3]/div[5]/div[5]/div[1]/div[1]/center[1]/div[1]/div[' + counter + ']/a[1]'
      console.log(path)
      cy.xpath(path)
      .invoke('attr', 'href')
      .then(href => {
        // cy.visit(href);

        href = href.slice(9,);

        let articleId = '';
        for(let j = 0; j < href.length; j++){
          if(href[j] == '?'){
            break;
          }
          else{
            articleId += href[j]
          }
        }
        console.log("artic = ",articleId);
        console.log("i = ",i);
        // console.log("artic = ",articleId);

        cy.scrollTo(0, -1000); 
        ShoppingObj.SearchField().type(articleId + "{enter}");
        
        ShoppingObj.AddToCartIcon().then((x) => {
          if (!x.is(':disabled')) {
            // console.log("should be added to wishlist")
            cy.get(`[data-wish-list-entry-number="${articleId}"]`).click()
            cy.xpath(`//div[@data-wish-list-entry-number="${articleId}" and @class="wishlistIcon wishlistIcon--filled wishlistIcon--pointer"]`, { timeout: 10000 }).should("exist")
           
      
          } else {
            // console.log("not added to wishlist")
            counter +=1
            
    
          }
        });
        
      });
  
      cy.visit("https://www.deinbett.de/")

    }
  
})


And('User then adds all 5 items to the basket', async function () {

    let itemsTotal = 0;
    let merchTotal = 0;

    cy.wait(5000)
   
    ShoppingObj.WishListIcon().click()

    ShoppingObj.ZipCodeField().type(10115);
    ShoppingObj.AddToWishListIcon().scrollIntoView({ duration: 2000 }).click({ force: true });
    cy.wait(5000)

    cy.contains('.button','Zum Warenkorb').click()
    
    cy.wait(5000)

    cy.xpath("//div[@class='cartEntry__newPrice' or @class='cartEntry__price']//div[@class='articlePrice__integer']").each(($int) => {
      console.log("$int.text() = ", $int.text())  
      itemsTotal = itemsTotal + (+($int.text()));
      console.log("itmsTotal = ",itemsTotal)
    })

    cy.xpath("//div[@class='cartEntry__newPrice' or @class='cartEntry__price']//div[@class='articlePrice__fraction articlePrice__fraction--']").each(($fraction) => {
      console.log("($fraction.text())/100 = ", ($fraction.text())/100)
      itemsTotal = itemsTotal + (+($fraction.text())/100);
      console.log("itmsTotal = ",itemsTotal)
    })
    
    console.log("merchTotal = ",merchTotal)
    
    cy.xpath("//div[text()='Warenwert']/following-sibling::div[@class='summaryBox__value']//div[@class='articlePrice__integer']").then((integerTotal) => {
      console.log("integerTotal ", integerTotal[0].innerText)
      merchTotal =  (+parseInt(integerTotal[0].innerText));  
      console.log("merchTotal = ",merchTotal)     
    });


    cy.xpath("//div[text()='Warenwert']/following-sibling::div[@class='summaryBox__value']//div[@class='articlePrice__fraction articlePrice__fraction--']").then((fractionTotal) => {
      console.log("fractionTotal ", parseInt(fractionTotal[0].innerText))
      merchTotal = merchTotal + (+parseFloat(fractionTotal[0].innerText)) / 100;
      console.log("merchTotal = ",merchTotal)
    });

    console.log("Math.round(merchTotal) = ", Math.round(merchTotal))
    console.log("Math.round(itmsTotal) = ", Math.round(itemsTotal))    
    
})

Then('The added items in the basket and their prices should be correct', async function () {

    await expect(Math.round(merchTotal)).to.equal(Math.round(itemsTotal));

})

//////////////////////////

