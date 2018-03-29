# Raindrop API
### The Future In E-Commerce

An API to store cart, user, and product data for the Raindrop Client, as well as
validate purchases using the Stripe API.
It allows shoppers to browse products, register as users, add products to their
cart, purchase the items in their cart, and view their past purchases.

## API URL

- Production: https://raindrop-api.herokuapp.com/

## Raindrop Client URL

- Live web app: https://raindropandwee.github.io/raindrop-client/
- Client Github Repo: https://github.com/RaindropAndWee/raindrop-client

## API End Points

| Verb   | URI Pattern                 | Controller#Action         |
|--------|-----------------------------|---------------------------|
| POST   | `/sign-up`                  | `users#signup`            |
| POST   | `/sign-in`                  | `users#signin`            |
| DELETE | `/sign-out`                 | `users#signout`           |
| PATCH  | `/change-password`          | `users#changepw`          |
| GET    | `/products`                 | `products#index`          |
| GET    | `/carts`                    | `carts#index`             |
| POST   | `/carts`                    | `carts#create`            |
| GET    | `/carts/:id`                | `carts#show`              |
| PATCH  | `/carts/:id`                | `carts#update`            |
| DELETE | `/carts/:id`                | `carts#destroy`           |
| POST   | `/tokens`                   | `tokens#create`           |



All data returned from API actions is formatted as JSON.

## API Guides
- [User Documentation](docs/user.md)
- [Cart Documentation](docs/cart.md)

## Entity Relationship Diagram (ERD)
![ERD1]https://imgur.com/g3d0XLB
![ERD2]https://imgur.com/upjiUyv

## Technologies Used
* Node.js
* Express.js
* MongoDB
* Mongoose
* Heroku
* mLab
* Stripe
* Git/Github
* Atom

## Future Additions

## Disclaimer
This API may be reset or altered at anytime.  The future of this API may not align with the current state and therefore the state your client application expects.  If you would like to maintain a version of this API in its current state for your future use, please fork and clone the repository and launch it on heroku.
