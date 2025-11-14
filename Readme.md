🌐 Blogify – Modern Full-Stack Blogging Platform

A full-featured blogging platform built with React + Node.js + MongoDB + Redis + Google OAuth, featuring authentication, caching, image uploads, post management, and a clean user experience.

<p align="center"> <img src="https://img.shields.io/badge/Frontend-React%2FVite-blue?style=for-the-badge"> <img src="https://img.shields.io/badge/Backend-Node.js%2FExpress-green?style=for-the-badge"> <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge"> <img src="https://img.shields.io/badge/Cache-Redis-red?style=for-the-badge"> <img src="https://img.shields.io/badge/Auth-Google%20OAuth-yellow?style=for-the-badge"> </p>

📑 Table of Contents

📌 Overview

✨ Features

🚀 Tech Stack

📁 Folder Structure

🔐 Authentication Flow

⚡ Redis Caching

⚙️ Environment Variables

🛠 Setup & Installation

🐳 Docker Support

🌍 Deployment Guide

📸 Screenshots

🤝 Contributing

📜 License

📌 Overview

BlogPost is a modern full-stack web application where users can:

✔️ Register & Login
✔️ Sign in using Google OAuth
✔️ Create, edit, delete blog posts
✔️ Upload images
✔️ Manage profiles
✔️ View, search, and browse blogs
✔️ Enjoy faster loading with Redis caching

Built using an elegant MVC backend and a fast React frontend.


✨ Features
👤 Authentication

JWT-based login

Google OAuth 2.0 login

Protected routes

Password hashing (bcrypt)

📝 Blogging

Create, update, delete posts

Upload images

Rich-text content

View all posts or user-specific posts

⚡ Optimizations

Redis caching for faster reads

Rate limiting support

Optimized API responses

🛡 Security

Sanitized requests

Protected routes with middleware

Environment variable encryption support

Frontend

React

Vite

Tailwind CSS

React Router

Context API

Framer Motion (optional)

Backend

Node.js

Express

MongoDB (Mongoose)

Redis (Caching & state)

Google OAuth 2.0

Multer (File uploads)

Nodemailer

Others

Docker support

MVC architecture

JWT authentication

📁 Folder Structure

<img width="834" height="679" alt="Screenshot 2025-11-14 123123" src="https://github.com/user-attachments/assets/c15b7862-832d-4989-bbda-b6e2e5967c1a" />

🔐 Authentication Flow
📧 Email/Password Login

User registers → Password hashed using bcrypt

User logs in → Server generates JWT

Frontend stores token in localStorage

Auth middleware validates every protected route

route

🟦 Google OAuth 2.0 Login

User clicks “Sign in with Google”

Redirect to Google OAuth

Google returns profile → Server verifies token

User created (if new) or logged in

JWT returned to frontend

⚡ Redis Caching

Used to speed up:

Post fetching

Homepage content

User profile reads

Search results

Redis server can run locally or via Docker:
<img width="1039" height="71" alt="Screenshot 2025-11-14 123350" src="https://github.com/user-attachments/assets/bd1b539b-c5c6-4c94-87d5-142f22a4371e" />
or
<img width="681" height="70" alt="Screenshot 2025-11-14 123451" src="https://github.com/user-attachments/assets/e934342d-5f46-4568-a0f4-58f63ee62a12" />

Environment Variables

Create a file in /server/.env:


<img width="610" height="324" alt="Screenshot 2025-11-14 123542" src="https://github.com/user-attachments/assets/49de4333-2d19-464a-b369-7b33f0281e29" />

🛠 Setup & Installation
Backend
<img width="610" height="324" alt="Screenshot 2025-11-14 123542" src="https://github.com/user-attachments/assets/ade5e32d-b602-411a-8a5c-2db231167a56" />

Frontend

<img width="763" height="120" alt="Screenshot 2025-11-14 123640" src="https://github.com/user-attachments/assets/647f3c25-e0bc-4db8-a066-ed708aeced90" />


🤝 Contributing

Pull requests are welcome.
For major changes, open an issue first to discuss your ideas.

📜 License

MIT License © 2025
