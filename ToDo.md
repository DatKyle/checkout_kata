# JavaScript - checkout kata

Implement the code for a checkout system that handles pricing schemes such as “apples cost 50 pence, three apples cost £1.30.”

Implement the code for a basket that calculates the total price of a number of items. In a normal store, things are identified using Stock Keeping Units, or SKUs. In our store, we’ll use individual letters of the alphabet (A, B, C, and so on). Our goods are priced individually. In addition, some items are multi-priced: buy ‘n’ of them, and they’ll cost you ‘y’ pence. For example, item ‘A’ might cost 50 pence individually, but this week we have a special offer: buy three ‘A’s and they’ll cost you £1.30. 

table:
- item a
    - unit price: 50
    - Special Price: 3 for 130
- item b
    - unit price: 30
    - Special Price: 2 for 45
- item c
    - unit price: 20
- item d
    - unit price: 15

Our checkout accepts items in any order, so that if we scan a B, an A, and another B, we’ll recognize the two B’s and price them at 45 (for a total price so far of 95). Because the pricing changes frequently, we need to be able to pass in a set of pricing rules each time we start handling a checkout transaction.

The solution should allow for items to input within a simple user interface, and allow for a final total to be calculated and for a running total after each item is added to the basket

> Please use JavaScript for the solution and place this onto a publicly accessible Github repository and let us know where it is.

> commit changes frequently. It is more important to see the progress than the finished product.

## Whats needed:
1. ~~Display a list of products to add to the basket~~
1. ~~Display a list of items in the users basket~~
1. ~~Ability to add products to a basket~~
1. Display the total price of the basket
1. Items with mulit-pricing should use the best price for the quanitity

## If we have time:
- Beutyfiy the UI
- Create items to add to basket
- Add the ability to support multiple multi-pricing