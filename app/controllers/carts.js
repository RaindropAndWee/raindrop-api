'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Cart = models.cart

const authenticate = require('./concerns/authenticate')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Cart.find({_owner: req.user._id})
    .populate('cartProducts')
    .then(carts => res.json({
      carts: carts.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  // `req.cart._id` below is passed into the `.findById()` method to select the
  // requested car
  Cart.findById(req.cart._id)
    .populate('cartProducts')
    .then(cart => res.json({
      cart: cart.toJSON({ virtuals: true, user: req.user })
    }))
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
  { method: setModel(Cart, { forUser: true }), only: ['update', 'destroy', 'show'] }
] })
