const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String, 
      required: true
    },
    address: {
      type: String,
      required: true
    }, 
    phone: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    }
  },
  orderDate: {
    type: Date,
    required: true
  },
  orderStatus: {
    type: String,
    required: true
  },
  orderDelivery: {
    type: String,
    required: true
  },
  totalBill: {
    type: Number,
    required: true
  },
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);