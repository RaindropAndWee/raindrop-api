'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Product = models.product

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  // console.log('req.query is: ', req.query)
  if (req.query.sortPrice) {
    (req.query.category === 'all'
    ? Product.find().sort({ price: req.query.order })
    : Product.find({category: req.query.category}).sort({ price: req.query.order }))
      .then(products => res.json({
        products: products.map((e) =>
          e.toJSON())
      }))
      .catch(next)
  // if a search=true parameter has been sent, use the text index $search query
  // to find all products that contain the given word/words in any text fields
  } else if (req.query.search) {
    Product.find({ $text: { $search: req.query.searchEntry } })
      .then(products => res.json({
        products: products.map((e) =>
          e.toJSON())
      }))
      .catch(next)
    // if a category query has been sent, only fetch products that are in that category
  } else if (req.query.category) {
    Product.find(req.query)
      .then(products => res.json({
        products: products.map((e) =>
        e.toJSON())
      }))
  .catch(next)
  } else {
    // Otherwise, return all products
    Product.find()
      .then(products => res.json({
        products: products.map((e) =>
          e.toJSON())
      }))
      .catch(next)
  }
}

const show = (req, res) => {
  res.json({
    product: req.product.toJSON()
  })
}

const create = (req, res, next) => {
  const product = Object.assign(req.body.product)
  Product.create(product)
    .then(product =>
      res.status(201)
        .json({
          product: product.toJSON()
        }))
    .catch(next)
}

// Does not work, may have to do with ownership and before methods
const update = (req, res, next) => {
  delete req.body.product._owner  // disallow owner reassignment.

  req.product.update(req.body.product)
    .then(() => res.sendStatus(204))
    .catch(next)
}

// Does not work, may have to do with ownership and before methods
const destroy = (req, res, next) => {
  req.product.remove()
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
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Product), only: ['show'] },
  { method: setModel(Product, { forUser: true }), only: ['destroy'] }
] })
