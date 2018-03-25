'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Cart = models.cart

const authenticate = require('./concerns/authenticate')
// const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

// working - showing nested object attributes
const index = (req, res, next) => {
  Cart.find({_owner: req.user._id})
    .populate('cartProducts')
    .then(carts => res.json({
      carts: carts.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    // .then((something) => {
    //   console.log('yet another log...', something)
    //   return something
    // })
    .catch(next)
}

// not working - not showing nested object attributes
const show = (req, res) => {
  // `req.cart._id` below is passed into the `.findById()` method to select the
  // requested car
  Cart.findById(req.cart._id)
    .populate('cartProducts')
    .then((something) => {
      // Console.log prints car item with all nested products showing
      // attributes. Hurray!
      console.log('after populate...', something)
      return something
    })
    // This is where we think something is messed up...
    .then(cart => res.json({
      cart: req.cart.toJSON({ virtuals: true, user: req.user })
    }))
    // This next console.log is a huge mess of server response text
    .then((serverResponse) => {
      console.log('yet another log...', serverResponse)
      return serverResponse
    })
    .catch(console.error)
}

const create = (req, res, next) => {
  const cart = Object.assign(req.body.cart, {
    _owner: req.user._id
  })
  Cart.create(cart)
    .then(cart =>
      res.status(201)
        .json({
          cart: cart.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body.cart._owner  // disallow owner reassignment.

  req.cart.update(req.body.cart)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.cart.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: authenticate },
  // { method: setModel(Cart), only: ['show'] },
  { method: setModel(Cart, { forUser: true }), only: ['update', 'destroy', 'show'] }
] })
