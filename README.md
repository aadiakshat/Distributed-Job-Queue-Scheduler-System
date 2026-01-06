# 🚀 Distributed Job Scheduler (BullMQ + Redis)

A **backend job scheduling system** that supports **asynchronous background processing**, **priority queues**, **delayed execution**, **automatic retries**, and **failure handling**, built using **Node.js, BullMQ, and Redis**.

This system is designed to handle workloads such as email sending, report generation, data exports, and ML inference jobs.

---

## 🧠 Why this project?

Modern backend systems often need to:
* Offload heavy tasks from request–response cycles
* Process jobs reliably in the background
* Retry failures safely
* Control execution using priorities and delays

This project demonstrates **real-world backend infrastructure concepts**, not just CRUD APIs.

---

## ✨ Features

* 🔹 Asynchronous background job processing
* 🔹 Priority-based job scheduling
* 🔹 Delayed job execution
* 🔹 Automatic retries with exponential backoff
* 🔹 Failed job tracking and inspection
* 🔹 Manual job control (pause, kill)
* 🔹 Queue metrics & monitoring
* 🔹 Worker-based execution model
* 🔹 REST APIs for job lifecycle management

---

## 🏗️ Architecture Overview

```
Client (Postman / curl)
        |
        v
Express API (Job Routes)
        |
        v
Redis Queue (BullMQ)
        |
        v
Worker Process
        |
        v
Job Execution + Retry / Failure Handling
```

* Jobs are submitted via REST APIs
* BullMQ manages scheduling using Redis
* Workers process jobs asynchronously
* Failures are retried automatically and tracked

---

## 🧩 Tech Stack

### Core Technologies
* **Node.js**
* **Express.js**
* **Redis**
* **BullMQ**

### Tools & Testing
* **Postman** (API testing)
* **curl**

---

## 📦 API Endpoints

### Enqueue a Job
```
POST /jobs/enqueue
```
```json
{
  "type": "email",
  "payload": { "to": "user@example.com" },
  "priority": 1,
  "delay": 5000
}
```

### Get Job Status
```
GET /jobs/:id
```

### List All Jobs
```
GET /jobs
```

### Queue Stats
```
GET /jobs/stats
```
Example response:
```json
{
  "waiting": 2,
  "active": 1,
  "completed": 10,
  "failed": 1,
  "delayed": 0
}
```

### Failed Jobs
```
GET /jobs/failed/jobs
```

### Pause / Resume Queue
```
POST /jobs/pause
POST /jobs/resume
```

### Kill a Job (Force Failure)
```
POST /jobs/:id/kill
```

### Delete a Job
```
DELETE /jobs/:id
```

---

## 🔁 Failure Handling Strategy

* Jobs are retried automatically using **exponential backoff**
* After retry attempts are exhausted, jobs move to the **FAILED** state
* Failed jobs can be:
  * Inspected via API
  * Retried manually
  * Killed if stuck or misbehaving

This ensures **fault tolerance and operational control**.

---

## ⚙️ Worker Model

* Workers run as **separate processes**
* Jobs are processed asynchronously
* Priority and delays are handled internally by BullMQ
* Workers are stateless and horizontally scalable

---

## 🧪 API Testing

All APIs were tested using **Postman** and **curl**.

### Sample Screenshots

*Add 1-2 Postman screenshots here showing:*
* Enqueue job request/response
* Queue stats or failed jobs response

---

## 🚀 How to Run Locally

```bash
# Start Redis
redis-server

# Install dependencies
npm install

# Start API server
npm run dev

# Start worker (separate terminal)
node src/worker.js
```

---

## 📌 Key Learnings

* Designing asynchronous systems
* Queue-based workload processing
* Retry & failure semantics
* Redis-backed job scheduling
* Worker-based system architecture

---



## 📝 License

MIT

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 👨‍💻 Author
Adarsh Akshat
