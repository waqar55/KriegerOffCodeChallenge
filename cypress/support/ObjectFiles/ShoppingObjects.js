
class ShoppingObjects {

    SearchField() {
        return cy.get("#searchFieldInputId");
    }

    AddToCartIcon() {
        return cy.get('*[class="button button--addToCart"]');
    }

    WishListIcon() {
        return cy.get(".headerElement__link.headerElement__link--wishlist");
    }

    ZipCodeField() {
        return cy.get(".wishlist__postalCodeArea #zipcode-logistic-input");
    }

    AddToWishListIcon() {
        return cy.get("#addAddToWishlist");
    }

}

export default ShoppingObjects;
