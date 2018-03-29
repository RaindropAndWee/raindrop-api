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

## Development Process
The development process was quite challenging and we were very fortunate that our team was flexible and had great synergy. We kicked off with what we knew -- basic testing environments all in one view, CURL scripts, event handler files, etc.

The first major breakthrough was figuring out how we would parse data pulled in from the API and store data locally to be used with simple front-end functions. User data, product inventory info, and cart info would be stored in a local file early in the user journey. Or so we thought. We quickly realized that actions such as updating cart quantity and prices accurately would need more API calls more frequently so we went through several more major front-end logic changes early on.

Stripe was a major roadblock early in the process and many of the team's man hours were devoted to deciphering the documentation and figuring out how it would work with the GA template environment. It was during this phase that we all learned some valuable lessons in reading code, reading documentation, and learning from previous developers' mistakes (via old issue threads on github).

As we neared MVP we began to start planning for our nice-to-haves - stuff we were really excited for. As we passed the harder stages of MVP requirements we began to discuss and plan for delegating work on new features, always just focusing on one or two at a time. This was a fun stage of the project where we got to stretch our creativity but it also resulted in some incredibly stressful moments when we would get stumped on some complicated problems.

All-in-all we were super lucky in many ways but also pushed ourselves and each other constantly and believe we've made something that a team of junior developers can be quite proud of.

Raindrop and Wee out.


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
![ERD1](http://res.cloudinary.com/ptavarez/image/upload/v1522329576/erd.jpg)
![ERD2](http://res.cloudinary.com/ptavarez/image/upload/c_scale,h_937/v1522329734/erd_2.jpg)

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

## Future Iterations
* Shipping and handling model and controller
* Seller model and controller

## Disclaimer
This API may be reset or altered at anytime.  The future of this API may not align with the current state and therefore the state your client application expects.  If you would like to maintain a version of this API in its current state for your future use, please fork and clone the repository and launch it on heroku.
