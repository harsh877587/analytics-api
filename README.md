Built  using **Node.js**, **Express**, and **MongoDB**, this project is a scalable and efficient backend system for tracking and analyzing user interaction events in real-time.

---

## 🧠 Problem Statement

The system collects, stores, and analyzes events such as `view`, `click`, and `location`. The goal is to provide a reliable analytics backend for client-side applications, with flexible querying and aggregation capabilities.

---

## 🛠 Tech Stack

| Tech         | Purpose                                |
|--------------|----------------------------------------|
| Node.js      | JavaScript runtime                     |
| Express.js   | Fast backend framework                 |
| MongoDB      | NoSQL database                         |
| Mongoose     | ODM for MongoDB                        |
| Faker.js     | Dummy data generation                  |
| Postman      | API testing                            |

---


## 📊 API Documentation


1. 🔸 POST /events
Ingests a new user activity event from a client (e.g., a web page or app).

✅ Method:
POST /events
✅ Headers:
| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

📥 Request Body Examples (JSON):
Event Type: view

{
  "user_id": "user123",
  "event_type": "view",
  "payload": {
    "url": "https://example.com",
    "title": "Landing Page"
  }
}
Event Type: click

{
  "user_id": "user456",
  "event_type": "click",
  "payload": {
    "element_id": "btn-123",
    "text": "Click Me",
    "xpath": "/html/body/div[1]/button[1]"
  }
}
Event Type: location

{
  "user_id": "user789",
  "event_type": "location",
  "payload": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "accuracy": 15.5
  }
}
✅ Success Response:

{
  "message": "Event accepted"
}
❌ Error Responses:
400 Bad Request: Missing fields or invalid payload

500 Internal Server Error: Server/database error
---
2. 🔹 GET /analytics/event-counts
Returns the total number of events, with optional filters.

✅ Method:
GET /analytics/event-counts
🔍 Optional Query Parameters:
| Parameter   | Type   | Description                     |
| ----------- | ------ | ------------------------------- |
| event\_type | String | `view`, `click`, or `location`  |
| start\_date | Date   | Start date (e.g., `2025-05-01`) |
| end\_date   | Date   | End date (e.g., `2025-05-29`)   |

📥 Example Request:

GET /analytics/event-counts?event_type=view&start_date=2025-05-01&end_date=2025-05-29
✅ Response:

{
  "total_events": 1320
}
❌ Error Response:
400 Bad Request: Invalid query parameter format


3. 🔹 GET /analytics/event-counts-by-type
Returns the number of events grouped by event_type, with optional date filters.

✅ Method:

GET /analytics/event-counts-by-type
🔍 Optional Query Parameters:
Parameter	Type	Description
start_date	Date	Start date (e.g., 2025-05-01)
end_date	Date	End date (e.g., 2025-05-29)

📥 Example Request:

GET /analytics/event-counts-by-type?start_date=2025-05-01&end_date=2025-05-29

✅ Response:
{
  "view": 1200,
  "click": 500,
  "location": 300
}
✅ Empty Response Example (no matches):
{}
❌ Error Response:
400 Bad Request: Invalid date format

📌 Summary of Endpoints
| Endpoint                          | Method | Filters?   | Body Required | Returns                      |
| --------------------------------- | ------ | ---------- | ------------- | ---------------------------- |
| `/events`                         | POST   | ❌          | ✅ Yes         | Accepts new user event       |
| `/analytics/event-counts`         | GET    | ✅ Optional | ❌ No          | Total event count            |
| `/analytics/event-counts-by-type` | GET    | ✅ Optional | ❌ No          | Grouped event counts by type |




