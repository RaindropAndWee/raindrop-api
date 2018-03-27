'use strict'

const mongoose = require('mongoose')

const Cart = require('./cart')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: 'None Given'
  },
  category: {
    type: String,
    required: true
  },
  cartInstances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
