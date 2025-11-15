📌 Job Importer — MERN + BullMQ + Redis

Automated Job Feed Import System (Assignment Submission)

This project imports job listings from real RSS/XML feeds, parses them, stores them in MongoDB, and shows import logs in a clean frontend app.
The system is designed using Next.js, Node.js, Express, MongoDB, Redis, and BullMQ workers.

📁 Project Structure
root/
 ├── client/               # Frontend (Next.js App)
 ├── server/               # Backend (Express + MongoDB + Redis + BullMQ)
 ├── docs/
 │    └── architecture.md  # System design explanation + diagrams
 └── README.md             # You're reading this :)

🚀 Features
🔹 Backend (Node.js + Express)

Fetch jobs from real RSS/XML feeds

Parse XML using fast-xml-parser

Insert/update jobs in MongoDB

Store import logs

Background processing using BullMQ Worker

Redis queue for reliable job processing

Fully structured MVC architecture

🔹 Frontend (Next.js)

Manual “Import Jobs” UI

Display status for each feed

Import history table

Clean and simple layout

Axios-based API integration

🔹 Worker Service

Processes job import queue

Fetches & parses job feeds

Inserts/updates into MongoDB

Writes import logs efficiently

⚙️ Tech Stack
Frontend (client/)

Next.js 14 (App Router)

Axios

Tailwind CSS (optional)

Backend (server/)

Node.js + Express

Mongoose (MongoDB ORM)

Axios

fast-xml-parser

BullMQ

Redis (queue engine)

🏗 Setup Instructions (Local Development)
1️⃣ Clone the Repo
git clone https://github.com/YOUR_USERNAME/job-importer.git
cd job-importer

2️⃣ Install Dependencies
Backend:
cd server
npm install

Frontend:
cd ../client
npm install

3️⃣ Setup Environment Variables

Create:

server/.env

MONGO_URI=mongodb://127.0.0.1:27017/jobImporter
REDIS_URL=redis://127.0.0.1:6379
PORT=5000

4️⃣ Run Services
Start MongoDB

If using local MongoDB:

mongod

Start Redis Container
docker run --name redis -d -p 6379:6379 redis

5️⃣ Run Backend API
cd server
npm run dev

6️⃣ Start the Worker
npm run worker


You MUST see:

MongoDB connected
Redis connected
Worker is listening for jobs...

7️⃣ Start Frontend (Next.js)
cd ../client
npm run dev


Visit:

http://localhost:3000

🧪 API Endpoints
Trigger Import
GET /api/import/run

Get Import History
GET /api/import/history

📦 MongoDB Collections
jobs

Stores parsed jobs:

{
  jobId: String,
  title: String,
  description: String,
  company: String,
  location: String,
  jobType: String,
  category: String,
  imageUrl: String,
  link: String,
  pubDate: Date,
  sourceUrl: String
}

importlogs

Logs every import:

{
  timestamp: Date,
  fileName: String,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Array
}

🧩 Supported Feeds

The system fetches jobs from:

https://jobicy.com/?feed=job_feed
https://jobicy.com/?feed=job_feed&job_categories=data-science
https://jobicy.com/?feed=job_feed&job_categories=design-multimedia
https://jobicy.com/?feed=job_feed&job_categories=copywriting
https://jobicy.com/?feed=job_feed&job_categories=business
https://jobicy.com/?feed=job_feed&job_categories=management
https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time
https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france
https://www.higheredjobs.com/rss/articleFeed.cfm

📚 Documentation

Full architecture explanation + diagrams are in:

/docs/architecture.md

🧑‍💻 How it Works (Summary)

Frontend triggers API → /api/import/run

Backend adds a new job-import task to Redis Queue

BullMQ worker receives the job

Worker processes each RSS feed:

fetch XML

parse XML

normalize fields

insert/update MongoDB

Worker stores import log

Frontend displays:

import logs

status

job counts