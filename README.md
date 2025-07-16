<div align="center">
  <h1>🏢 Hostel Redressal System</h1>
  <h3>A Real-Time Complaint Management Platform for Hostel Students & Wardens</h3>
  <p>
    Built using <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express.js</strong>, <strong>MySQL</strong>, <strong>WebSocket</strong>, <strong>Web Speech API</strong>, and <strong>Chart.js</strong>
  </p>
  
</div>

---

## 🧩 Overview

**Hostel Redressal System** is a role-based, full-stack **Windows-compatible web application** built to streamline complaint management between hostel students and wardens. Students can raise issues via **text or voice input**, and communicate in **real-time chat** using **WebSocket**. Wardens can respond immediately, view stats, and resolve issues faster than traditional systems.

---

## 🚀 Features

- 🎙️ **Voice & Text Issue Submission**: Raise complaints via **Web Speech API** or manually.
- 💬 **Real-Time Chat**: Instant student-warden communication with **WebSocket** (Socket.IO).
- 🧑‍🎓👮 **Role-Based Dashboards**: Dedicated views for students and wardens.
- 📊 **Chart-Based Analytics**: Complaint status visualization using **Chart.js**.
- 🔐 **Secure Login**: Auth system for protected role-based access.
- 🗂️ **Issue Tracking**: Real-time status updates for every complaint.

---

## 🛠️ Tech Stack

| Layer         | Technology                             |
|---------------|-----------------------------------------|
| Frontend      | React.js, Web Speech API, Chart.js      |
| Backend       | Node.js, Express.js                     |
| Real-Time     | WebSocket (Socket.IO)                   |
| Database      | MySQL                                   |



---
## 💡 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shubha274/HostelRedressalSystem1.git
   cd HostelRedressalSystem1
2.Set up MySQL Database

Create a new MySQL database (e.g., hostel_redressal)

Import provided schema (if any)

Add your DB config to a .env file:

env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hostel_redressal

3.Start the backend
cd server
npm install
npm run dev

4.Start the frontend
cd ../client
npm install
npm run dev
Visit http://localhost:4000 in your browser.



