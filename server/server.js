const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const Customer = require('./models/Customer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
connectDB();

app.use(cors({
  origin: 'https://customer-interaction-frontend.vercel.app/' 
}));
app.use(bodyParser.json());

// 👤 Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, age, email, phone, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const user = new User({ fullName, age, email, phone, password, role });
    await user.save();
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

  res.status(200).json({ msg: 'Login success', user });
});

// 🧾 Customer Submission + CSV Logic
app.post('/api/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();

    const csvPath = path.join(__dirname, '../data/customers.csv');
    const isNew = !fs.existsSync(csvPath);

    const csvRow = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.company,
      req.body.mobile,
      req.body.whatsapp,
      (req.body.products || []).join(';'),
      new Date().toISOString()
    ].map(field => `"${field}"`).join(',');

    if (isNew) {
      const headers = `"First Name","Last Name","Email","Company","Mobile","WhatsApp","Products","Submitted At"\n`;
      fs.writeFileSync(csvPath, headers + csvRow + '\n');
    } else {
      fs.appendFileSync(csvPath, csvRow + '\n');
    }

    res.status(201).json({ msg: 'Customer saved to database and CSV' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 CSV Download Route 
app.get('/api/customers/download', (req, res) => {
  const file = path.join(__dirname, '../data/customers.csv');
  if (fs.existsSync(file)) {
    res.download(file, 'customers.csv');
  } else {
    res.status(404).send('CSV file not found');
  }
});
// 🔑 Reset Password Route
app.post('/api/reset-password', async (req, res) => {
  const { email, phone, newPassword } = req.body;
  try {
    const user = await User.findOne({ email, phone });
    if (!user) return res.status(404).json({ msg: 'User not found with provided email and phone.' });

    user.password = newPassword;
    await user.save();

    res.json({ msg: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while resetting password' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
