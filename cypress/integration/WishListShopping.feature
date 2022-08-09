Feature: Adding Items to Wishlist

    I want to add 5 items to the wishlist


    Scenario: Add items to the wishlist and add them to the basket
        Given User logs in with correct email/ password
        And User clicks on 5 items from the given list to add them in wishlist
        And User then adds all 5 items to the basket
        Then The added items in the basket and their prices should be correct

