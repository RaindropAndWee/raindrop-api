'use strict'

const mongoose = require('mongoose')

const Product = require('./product')

const cartSchema = new mongoose.Schema({
  purchased: {
    type: Boolean,
    required: true
  },
  cartProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
