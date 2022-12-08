const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    require: true
  },
  img1: {
    type: String
  },
  img2: {
    type: String
  },
  img3: {
    type: String
  },
  img4: {
    type: String
  },
  long_desc: {
    type: String,
    required: true
  },
  short_desc: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Product', productSchema);