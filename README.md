# 🏥 HealthHub - Doctor Appointment Booking System

**HealthHub** is a full-stack web application that enables users (patients) to easily search for and book appointments with doctors. It also provides dedicated panels for administrators and doctors to manage operations efficiently.

---

## 🔗 Live Demo

* 👤 **Frontend (User)**: [Visit Site](https://doctor-appointment-booking-system-fawn.vercel.app/)
* 🛠 **Admin & Doctor Panel**: [Visit Panel](https://admin-doctor-appointment-booking-sy.vercel.app/)

---

## 📌 Features

### 👤 **Patient (User)**

* ✅ Homepage with featured doctors and specialities
* ✅ View all doctors with pagination
* ✅ Filter doctors by **speciality**, **name**
* ✅ View doctor details and available time slots
* ✅ Login / Register
* ✅ Book appointments with selected date and time
* ✅ Cancel appointments
* ✅ Online payment via **Stripe**
* ✅ View and update profile

### 🛠 **Admin Panel**

* ✅ Secure login for admin only
* ✅ Dashboard with statistics:

  * Total doctors
  * Total appointments
* ✅ Add new doctors (with photo upload)
* ✅ Manage doctor list (View / Deactivate)
* ✅ Manage all appointments

### 🦤 **Doctor Panel**

* ✅ Doctor login
* ✅ Dashboard with key metrics:

  * Upcoming appointments
  * Completed consultations
  * Revenue stats
* ✅ View and manage appointments
* ✅ Mark appointments as complete or canceled
* ✅ Update profile
* ✅ Toggle **available / unavailable** status

---

## 🔐 Test Login Accounts

| Role   | Email                                             | Password |
| ------ | ------------------------------------------------- | -------- |
| User   | [pmduc@gmail.com](mailto:pmduc@gmail.com)         | 12345678 |
| Doctor | [james@healthhub.com](mailto:james@healthhub.com) | 12345678 |
| Admin  | [admin@healthhub.com](mailto:admin@healthhub.com) | 12345678 |

---

## 🛠 Tech Stack

### 👨‍💻 Frontend

* React.js (Vite)
* Tailwind CSS
* React Router DOM
* React Hook Form & Yup
* Axios
* Toastify

### 🔧 Backend

* Node.js & Express.js
* MongoDB
* JWT Authentication
* Stripe API (Checkout Session)
* RESTful API Architecture

---


## ☁️ Deployment

* **Frontend & Admin Panel**: Deployed to **Vercel**
* **Backend Server**: Recommended on **Render** or **Railway** (or VPS hosting)

> 💡 **Note**: Do **not** commit `.env` to GitHub! Use Environment Variables in Vercel/Render dashboards.

---

## 📨 Contact

For support or inquiries:
📧 **[pmduc@gmail.com](mailto:pmduc010702@gmail.com)**
