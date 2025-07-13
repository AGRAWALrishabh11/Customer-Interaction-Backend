const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
});

module.exports = mongoose.model('User', userSchema);
