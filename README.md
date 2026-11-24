# AI Recommendation Engine

## UNAI TECH Virtual Internship Program 2026

An AI Recommendation Engine designed to help users discover relevant learning resources through a course catalog and user interaction tracking.

## Project Overview

The AI Recommendation Engine is a web-based application developed as part of the UNAI TECH Virtual Internship Program 2026.

The project aims to provide users with relevant learning resources and personalized recommendations based on their interests and interactions.

## Phase 1 – Day 5 Implementation

**Selected Module:** Course Catalog and User Interaction Module

### Implemented Features

- Display a catalog of learning resources.
- Retrieve catalog data from the Flask backend.
- Show course names, categories and descriptions.
- Record user interactions.
- Provide API responses in JSON format.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Website structure |
| CSS | Website styling |
| JavaScript | Frontend functionality |
| Python | Backend programming |
| Flask | REST API development |
| Flask-CORS | Frontend-backend communication |

## Project Structure

```text
UNAI-TECH-Internship-2026/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── script.js
│
└── README.md
```

**Note:** The `venv/` folder is a local environment and should not be uploaded to GitHub.

## Backend API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Backend status |
| `/api/items` | GET | Retrieve catalog items |
| `/api/interactions` | POST | Record user interactions |
| `/api/interactions` | GET | View recorded interactions |

## Installation and Execution

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd UNAI-TECH-Internship-2026
```

### 3. Install backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Start the Flask backend

```bash
python app.py
```

Backend URL:

```text
http://127.0.0.1:5000
```

### 5. Run the frontend

Open `frontend/index.html` using VS Code Live Server.

## Testing

The backend can be tested using:

```text
http://127.0.0.1:5000/
http://127.0.0.1:5000/api/items
http://127.0.0.1:5000/api/interactions
```

The frontend should retrieve data from `/api/items`
