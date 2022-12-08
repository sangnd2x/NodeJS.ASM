const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  user: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  createdDate: {
    type: Date,
    required: true
  },
  messages: [
    { type: String }
  ]
});

sessionSchema.methods.addMessage = function (message) {
  this.messages.push(message);
  return this.save();
}

module.exports = mongoose.model('session', sessionSchema);