<div align="center">
  <img src="https://raw.githubusercontent.com/Sayan-das-04/PayLedge/main/frontend/public/payledger-logo.svg" alt="PayLedger Logo" width="80" height="80">
  <h1>PayLedger</h1>
  <p><strong>A Modern, Enterprise-Grade HR & Payroll Management System</strong></p>
</div>

---

## 📌 Overview

**PayLedger** is a full-stack SaaS application built on the MERN stack, designed to streamline core HR and Payroll operations. It features a beautiful, responsive, and professional UI built with React and PrimeReact, backed by a robust Express/MongoDB REST API.

This platform allows HR managers to securely track employee attendance, manage leave requests, and automate the calculation of complex monthly payrolls—complete with professional, printable HTML Payslips.

## ✨ Features

- **Role-Based Access Control:** Secure portal with dual access views for Managers and Standard Employees.
- **Smart Dashboard:** Real-time metrics, dynamic donut charts for today's attendance, and quick-action widgets.
- **Employee Management:** Complete CRUD system to onboard, track, and manage workforce data.
- **Live Attendance Tracking:** Geared to prevent duplicate check-ins with an intuitive "Mark All Present" bulk action for managers.
- **Automated Payroll Engine:** Calculates gross salary, tax deductions (TDS, PF), and net salary based on individual attendance metrics.
- **Dynamic Payslips:** Generates beautifully structured, printable document payslips natively in the browser.
- **Leave Management:** End-to-end workflow for employees to request leaves and managers to approve/reject them.
- **Premium UI/UX:** Fully responsive enterprise design utilizing a custom Burgundy & Gold visual theme.

## 💻 Tech Stack

**Frontend:**

- React.js (Vite)
- Bootstrap 5
- PrimeReact (for advanced DataTables & Cards)
- React Router DOM

**Backend:**

- Node.js & Express.js
- MongoDB (Mongoose)
- CORS & Dotenv

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and MongoDB installed on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sayan-das-04/PayLedger.git
   cd PayLedger
   ```

2. **Setup the Backend:**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` folder and add:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/payflow
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

Because this uses a split architecture, you need to run the frontend and backend concurrently.

**Start the Backend Server:**

```bash
cd backend
node server.js
# Runs on http://localhost:5000
```

**Start the Frontend Client:**

```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

## 🔐 Default Test Accounts

For demonstration purposes, the system supports logging in by typing an exact name. (Authentication layer can be hooked up to JWT later).

- **Manager:** Type `Manager` to access full administrative tools.
- **Employee:** Type `Rahul` to access standard employee capabilities.

---

_Developed by Sayan Das._
