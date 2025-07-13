const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  company: String,
  mobile: String,
  whatsapp: String,
  products: [String],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', customerSchema);
