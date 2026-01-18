Feature: :E-commerce app validation

    Scenario: Placing the Order in the E-commerce app
        Given Login to E-commerce application with "ravikumar18246@gmail.com" and "Welcome*12"
        When Add "ZARA COAT 3" to cart
        Then Verify "Thankyou for the order." is displayed in the page