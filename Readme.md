🚀 BlogPost – Full-Stack Blogging Platform (React + Node.js + MongoDB + Redis + Google OAuth)

A complete, production-ready full-stack blog application built using:

Frontend: React + Vite + TailwindCSS

Backend: Node.js + Express + JWT

Database: MongoDB

OAuth: Google Login

Caching: Redis

Storage: Local uploads folder

Authentication: JWT + Google OAuth

Architecture: MVC

📁 Project Structure
NODE-BLOGSITE/
│
├── client/                 # React Vite frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── vite.config.js
│
├── server/                 # Node.js backend
│   ├── config/             # DB, Redis, Google OAuth setup
│   ├── controllers/        # All API controllers
│   ├── Middlewares/        # Auth middleware, error handlers
│   ├── Model/              # Mongoose models
│   ├── routes/             # All API routes
│   ├── uploads/            # Uploaded user images
│   ├── utils/              # Nodemailer, token, helper utils
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── .env
│   └── index.js
│
├── docker-compose.yml
└── README.md

🛠 Tech Stack
**Frontend**

React
Vite
Tailwind CSS
React Router
Context API (Auth)

**Backend**
Node.js
Express
MongoDB + Mongoose
Redis (for caching and sessions)
Google OAuth 2.0
Nodemailer
JSON Web Tokens
Bcrypt
Multer (file uploads)

🔐 **Authentication Flow
Email/Password Auth**

User registers → Password hashed using bcrypt
On login → JWT generated → Sent to client
Protected routes validated using JWT middleware
Google OAuth Login
User clicks "Continue with Google" in frontend
Google redirects to backend’s OAuth callback
Backend verifies the Google token
If user exists → login
If new user → create in DB
Send JWT to frontend
Frontend stores JWT in localStorage

**⚡ Redis Cache**

Used for:

Caching frequently fetched posts
Storing rate-limiting data
Speeding up repeated API calls
Session-like temporary storage
Redis is connected using:
redis:alpine
and accessed via custom helper functions.

**🧰 Environment Variables (.env)**
MONGO_URI=your_mongo_connection_string
MONGO_USERNAME=your_username
MONGO_PASSWORD=your_password

PORT=5000

JWT_SECRET=your_jwt_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password


Make sure your .env is inside /server and included in .gitignore.
**
🚀 How to Run the Project (Without Docker)**
1. Start Backend
cd server
npm install
npm start


OR with nodemon:

npm run dev

2. Start Frontend
cd client
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:5000

3. Start Redis locally

If you have Redis installed:

redis-server


or using Docker:

docker run --name blog_redis -p 6379:6379 redis

**🐳 Docker Deployment (Optional)**

The project includes:

client/Dockerfile

server/Dockerfile

docker-compose.yml

To run with Docker:

docker-compose up --build

**⚙️ API Base URL**

Set in frontend .env or docker-compose:

VITE_API_URL=http://localhost:5000/v1/api

**📸 Features Overview**
Users

Register

Login

Google Login

Edit Profile

Change Profile Picture

Posts

Create post

Edit post

Delete post

Upload images

View all posts

View own posts

Search posts

Admin Features

Manage users

Manage posts

**🌍 Live Deployment (Free Options)
Frontend (React)**

Netlify

Vercel

Backend (Node.js)

Render (free tier)

Railway (free tier)

Database

MongoDB Atlas (free tier)

Redis

Upstash Redis (free tier)

I can generate deployment steps for each platform as well.

🤝 Contributing

Feel free to fork this repo and submit PRs.

📜 License

MIT License © 2025 Shivakant Giri
