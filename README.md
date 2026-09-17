# Expense Tracker – CRUD-Based Web Application

## 1. Project Title
Expense Tracker – CRUD-Based Web Application

## 2. Project Overview
This project is a full-stack expense management application built with React, Django, Django REST Framework, and SQLite. It allows users to track daily expenses, update entries, delete records, view summaries, and apply filters and search operations. The app follows a clean frontend → REST API → backend → database architecture.

## 3. Problem Statement
Managing personal or small business expenses manually is time-consuming and error-prone. There is a need for a simple yet professional system that can track, categorize, and summarize expenses effectively.

## 4. Objectives
- Build a full-stack app following the required architecture.
- Support complete CRUD operations for expense records.
- Implement REST API endpoints with validation.
- Use SQLite for local development.
- Provide a responsive UI for desktop, tablet, and mobile devices.
- Include dashboard analytics from actual database data.

## 5. Features
- Add, edit, view, and delete expense entries
- Dashboard metrics and summaries
- Search and filters by category, payment method, date range, and sorting
- Form validation on frontend and backend
- Responsive layout with clean UI
- SQLite-backed persistence
- API-compatible JSON responses

## 6. Technology Stack
- Frontend: React, JavaScript, HTML, CSS
- Backend: Python, Django, Django REST Framework
- Database: SQLite
- API testing: Postman-compatible JSON endpoints
- Version control: Git / GitHub

## 7. System Architecture
User → React Frontend → REST API → Django REST Framework → Business Logic → Django ORM → SQLite Database

## 8. Project Folder Structure
expense-tracker/
├── backend/
│   ├── config/
│   ├── expenses/
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
├── .gitignore
├── README.md
└── ...

## 9. Database Design
Expense model fields:
- id
- title
- description
- amount
- category
- payment_method
- expense_date
- created_at
- updated_at

## 10. CRUD Operations
Create: Add a new expense entry
Read: View all expenses and dashboard summaries
Update: Edit expense information
Delete: Remove an expense after confirmation

## 11. API Documentation
### GET /api/expenses/
Returns all expense records.

### GET /api/expenses/{id}/
Returns a single expense.

### POST /api/expenses/
Creates a new expense.

### PUT /api/expenses/{id}/
Updates an expense.

### DELETE /api/expenses/{id}/
Deletes an expense.

### GET /api/expenses/dashboard/
Returns analytics data including totals, counts, high/average spend, category summary, monthly summary, and recent expenses.

### GET /api/expenses/search/
Returns filtered, paginated-style search results based on query parameters.

## 12. Validation
Frontend and backend validation rules include:
- Title required
- Amount required and must be > 0
- Category required
- Payment method required
- Date required
- Description optional

## 13. Testing Procedure
1. Start the Django backend server.
2. Use Postman or browser requests to test API endpoints.
3. Test valid and invalid data scenarios.
4. Confirm CRUD operations update the SQLite database.
5. Validate search, filters, dashboard metrics, and UI behavior.

## 14. Installation Steps
### Backend
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

### Frontend
cd frontend
npm install
npm run dev -- --host 0.0.0.0

## 15. How to Run Frontend
Open the Vite dev server in the browser, typically at http://localhost:5173.

## 16. How to Run Backend
Run:
python manage.py runserver 0.0.0.0:8000

## 17. Git/GitHub Instructions
1. Initialize Git: git init
2. Add files: git add .
3. Commit: git commit -m "Initial commit"
4. Create remote repository on GitHub
5. Push: git push -u origin main

## 18. Challenges and Solutions
- Handling Windows shell quirks for Node and Python was solved using PowerShell execution policy bypass and direct interpreter paths.
- Cross-origin API access was managed with django-cors-headers.
- Database consistency and validation were enforced via Django model validation and DRF serializers.

## 19. Future Enhancements
- User authentication
- Multiple user accounts
- Recurring expenses
- Budget alerts
- CSV/PDF export
- Cloud database migration
- More advanced analytics

## 20. Final Notes
This project is ready for a college mini-project demonstration and includes a working full-stack architecture with persistent database data, REST API, validation, dashboard, and responsive user interface.
