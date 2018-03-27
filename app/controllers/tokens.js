'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Token = models.token
const stripe = require('stripe')(process.env.STRIPE_SECRET)

// creates a unique token that is assigned to a user. This token will allow us to bring back past purchases
const create = (req, res, next) => {
  const token = Object.assign(req.body.token)
  Token.create(token)
    .then(token =>
      res.status(201)
        .json({
          token: token.toJSON({ virtuals: true, user: req.user })
        }))
    .then(() => {
      // Set your secret key: remember to change this to your live secret key in production
      // See your keys here: https://dashboard.stripe.com/account/apikeys
      // Token is created using Checkout or Elements!
      // Get the payment token ID submitted by the form:
      const token = req.body.token.token_id // Using Express

      // Sends a charge request to Stripe's API with all needed Tx data:
      stripe.charges.create({
        amount: req.body.token.total,
        // raindrop only accepts USD, so currency is hard coded
        currency: 'usd',
        // description is hard coded TODO: make description dynamic to let administator know items that were sold
        description: 'Drop Item',
        // source is the unique token provided to each user by stripe
        source: token
      })
      .then((something) => {
        console.log('something is ', something)
        return something
      })
      .catch(console.error)
    })
    .catch(next)
}

module.exports = controller({
  create
})
