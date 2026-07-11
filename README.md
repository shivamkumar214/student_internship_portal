# 🎓 Student Internship Portal

A full-stack **Student Internship Portal** built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**. This application allows students to register, upload their resumes, receive internship tasks from an administrator, and track their progress. Administrators can manage students, assign tasks, monitor completion status, and view uploaded resumes.

---

## 🚀 Live Demo

<p align="center">

<a href="https://student-internship-portal.netlify.app">
    <img src="https://img.shields.io/badge/🎓%20Student%20Portal-Live-blue?style=for-the-badge">
</a>

<a href="https://student-portal-adminp.netlify.app/">
    <img src="https://img.shields.io/badge/🛠️%20Admin%20Panel-Live-success?style=for-the-badge">
</a>

</p>

---

# ✨ Features

## 👨‍🎓 Student

- Student Registration
- Secure Login
- JWT Authentication
- Upload Resume (PDF)
- Resume Stored on Cloudinary
- View Assigned Internship Tasks
- Mark Tasks as Completed
- Daily Progress Tracking
- View Profile
- Edit Profile
- Logout

---

## 👨‍💼 Admin

- Admin Login
- Dashboard
- View All Students
- View Uploaded Resumes
- Assign Internship Tasks
- Track Student Progress
- View Completed Tasks
- Logout

---

# 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT
- HTTP Only Cookies
- bcrypt

### File Upload

- Multer
- Cloudinary

### Deployment

- Netlify
- Render

---

# 📁 Project Structure

```text
Student Internship Portal
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── public
│   └── index.js
│
├── frontend
│   ├── css
│   ├── js
│   ├── assets
│   └── *.html
│
└── admin_panel
    ├── css
    ├── js
    └── *.html
```

---

# 📄 Resume Upload Flow

```text
Student
    │
    ▼
Choose PDF
    │
    ▼
FormData
    │
    ▼
Express Route
    │
    ▼
Multer
    │
    ▼
Cloudinary
    │
    ▼
Secure URL
    │
    ▼
MongoDB
```

---

# 🔐 Authentication Flow

- Register/Login
- Password Hashing using bcrypt
- JWT Token Generation
- HTTP Only Cookie Authentication
- Protected Student Routes
- Protected Admin Routes

---

# 📌 API Endpoints

## Authentication

- POST /api/auth/signup
- POST /api/auth/login
- POST /api/logout

## Profile

- GET /api/profile
- PUT /api/profile/update

## Resume

- POST /api/resume/upload
- DELETE /api/resume/delete

## Tasks

- GET /api/tasks
- PUT /api/tasks/complete/:taskId

## Progress

- GET /api/progress

## Admin

- GET /api/admin/dashboard
- GET /api/admin/users
- GET /api/admin/user/:id
- POST /api/admin/assign-task/:id
- GET /api/admin/progress/:id

---

# 🔒 Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- HTTP Only Cookies
- Protected Routes
- Admin Authorization
- PDF-only Resume Upload
- Cloudinary Secure Storage
- Temporary File Deletion after Upload

---

# ⚙️ Installation

```bash
git clone <repository-url>

cd student-internship-portal

npm install
```

Create a `.env` file

```env
MONGO_URI=

JWT_SECRET=

CLOUD_NAME=

API_KEY=

API_SECRET=

ADMIN_EMAIL=

ADMIN_PASSWORD=
```

Run Project

```bash
npm run dev
```

---

# 👥 Team

| Name | Role | GitHub |
|------|------|--------|
| **Shivam Kumar** | Backend Development, Database Design, Authentication, API Development, Resume Upload (Cloudinary), Task Management, Deployment | [@shivamkumar214](https://github.com/shivamkumar214) |
| **Mouli Ghansal** | Frontend Development | [@moulighansal](https://github.com/moulighansal) |
| **Aarif** | Frontend Development | [@Aarifcode](https://github.com/Aarifcode) |
| **Manish Yadav** | Frontend Development | [@133manish-yadav456](https://github.com/133manish-yadav456) |

GitHub:
https://github.com/shivamkumar214

---

⭐ If you like this project, don't forget to give it a Star.
