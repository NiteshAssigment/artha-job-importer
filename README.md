# Job Importer — MERN + BullMQ + Redis  
Automated Job Feed Import System

This project imports job listings from real RSS/XML feeds, parses them, stores them in MongoDB, and displays import logs in a clean frontend interface.  
The system is designed using **Next.js, Node.js, Express, MongoDB, Redis, and BullMQ workers**.

---

## 📁 Project Structure

```
root/
 ├── client/               # Frontend (Next.js)
 ├── server/               # Backend (Express + MongoDB + Redis + BullMQ)
 ├── docs/
 │    └── architecture.md  # System design + diagrams
 └── README.md             # Documentation
```

---

## 🚀 Features

### **Backend (Node.js + Express + BullMQ)**
- Fetch jobs from **real RSS/XML feeds**
- Parse XML with `fast-xml-parser`
- Insert / update jobs in MongoDB
- Store import logs
- Queue processing with **BullMQ**
- Background worker powered by Redis
- Modular MVC folder structure

### **Frontend (Next.js 14)**
- Run import manually
- Show import results (new, updated, failed)
- Import history page
- API integration via Axios
- Modern clean UI

### **Worker Service**
- Processes job-import tasks
- Fetches, parses, and stores jobs
- Writes import logs into MongoDB

---

## ⚙️ Tech Stack

### **Frontend**
- Next.js 14 (App Router)
- Axios
- Tailwind CSS (optional)

### **Backend**
- Node.js
- Express.js
- Mongoose
- fast-xml-parser
- BullMQ
- Redis

---

## 🏗 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/job-importer.git
cd job-importer
```

---

### 2️⃣ Install Dependencies

**Backend**
```bash
cd server
npm install
```

**Frontend**
```bash
cd ../client
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a file: `server/.env`

```
MONGO_URI=mongodb://127.0.0.1:27017/jobImporter
REDIS_URL=redis://127.0.0.1:6379
PORT=5000
```

---

### 4️⃣ Start MongoDB

Local MongoDB:
```bash
mongod
```

---

### 5️⃣ Start Redis

Using Docker:
```bash
docker run --name redis -d -p 6379:6379 redis
```

---

### 6️⃣ Start Backend

```bash
cd server
npm run dev
```

---

### 7️⃣ Start Worker

```bash
npm run worker
```

Expected logs:

```
MongoDB connected
Redis connected
Worker is listening for jobs...
```

---

### 8️⃣ Start Frontend

```bash
cd ../client
npm run dev
```

Open the app:
```
http://localhost:3000
```

---

## 🧪 API Endpoints

### **Run Import**
```
GET /api/import/run
```

### **Get Import History**
```
GET /api/import/history
```

---

## 🗄 MongoDB Collections

### **jobs**
```
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
```

### **importlogs**
```
{
  timestamp: Date,
  fileName: String,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Array
}
```

---

## 📚 Supported Job Feeds

```
https://jobicy.com/?feed=job_feed
https://jobicy.com/?feed=job_feed&job_categories=data-science
https://jobicy.com/?feed=job_feed&job_categories=design-multimedia
https://jobicy.com/?feed=job_feed&job_categories=copywriting
https://jobicy.com/?feed=job_feed&job_categories=business
https://jobicy.com/?feed=job_feed&job_categories=management
https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time
https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france
https://www.higheredjobs.com/rss/articleFeed.cfm
```

---

## 📘 Documentation

Full architectural explanation and diagrams:  
`/docs/architecture.md`

---

## 🧑‍💻 System Overview (Summary)

1. Frontend sends request → `/api/import/run`
2. Backend enqueues job → Redis Queue
3. Worker receives job → processes each feed
4. XML → parsed → normalized → saved
5. Worker writes import logs
6. Frontend displays:
   - imported jobs  
   - updated jobs  
   - failed jobs  
   - history  

