# 🛒 ZipGrocer

**ZipGrocer** is a full-stack grocery delivery platform designed for local stores to efficiently manage online orders. It supports three distinct user roles — **Admin**, **User**, and **Delivery Partner** — each with dedicated functionality. The system features real-time notifications, email alerts, role-based access, and a clean backend API to streamline grocery ordering, delivery, and management.

## ✨ Features

- 👤 **Role-Based Access Control (RBAC)** — Admin, User, and Delivery Partner roles.
- 🔐 **Authentication & Authorization** — Secure login using JWT and bcrypt.
- 🛒 **Cart Management** — Users can manage cart items.
- 📦 **Order Lifecycle** — From order placement to delivery confirmation.
- 🧑‍✈️ **Self-Assign Orders** — Delivery partners can accept orders on their own.
- 📬 **Email Notifications** — User/partner registration, order updates, and delivery confirmation via Nodemailer.
- 🔔 **Real-Time Updates** — Socket.IO-powered live notifications.
- 🧪 **API Tested** — All routes tested using Postman with complete Postman collection.

## ⚙️ Tech Stack

### Frontend (In Progress)
- React.js
- Tailwind CSS (planned)
- ShadCN UI (planned)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO (real-time communication)
- Nodemailer (email integration)

### Security
- Bcrypt (password hashing)
- JWT (token-based auth)
- Environment variables for sensitive config


