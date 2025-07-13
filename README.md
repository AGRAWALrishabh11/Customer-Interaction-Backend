
---

## ✅ `README.md` for **Backend** (`Customer-Interaction-Backend`)

```markdown
# Customer Interaction Portal – Backend

This is the backend API for the Customer Interaction Portal, built with **Node.js**, **Express**, and **MongoDB**. It handles user authentication, customer data submission, and admin access.

🌐 **Live API**: [https://customer-interaction-backend.onrender.com](https://customer-interaction-backend.onrender.com)

---

## 🧩 Features

- Register/Login (admin and customer roles)
- Password reset with phone verification
- Save customer details to MongoDB
- Export customer data as CSV (admin-only)
- CORS-enabled to support frontend from Vercel

---

## 📦 Tech Stack

- Node.js
- Express
- MongoDB Atlas (via Mongoose)
- CORS
- dotenv
- body-parser
- csv-writer

---

## 📁 Folder Structure

```bash
backend/
├── server/
│   ├── server.js
│   ├── db.js
│   └── models/
│       ├── User.js
│       └── Customer.js
├── data/
│   └── customers.csv
├── .env
├── package.json
