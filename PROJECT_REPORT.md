# Expense Tracker Project Report

## 1. Project Overview
This project is a full-stack expense management system built using Django REST Framework on the backend and React with Vite on the frontend. The application allows users to record daily expenses, edit or remove them, monitor totals, and review dashboard insights based on category and month.

## 2. Objective
The primary goal was to build a complete, responsive, CRUD-based expense tracker that stores data in SQLite, exposes a REST API, and presents a professional dashboard for small personal or business expense tracking.

## 3. Technical Stack
- Frontend: React, Vite, JavaScript, CSS
- Backend: Python, Django, Django REST Framework
- Database: SQLite
- API communication: JSON over HTTP with CORS enabled for the frontend
- Version control: Git and GitHub

## 4. Core Features
- Add new expenses with validation
- View, edit, and delete expense records
- Dashboard summary cards for total expenses, average expense, and highest expense
- Search and filter by keyword, category, payment mode, and date range
- Monthly and category totals for reporting
- Responsive layout for desktop and mobile screens

## 5. Project Architecture
The app follows a three-layer architecture:

User Interface -> Frontend React App -> Django REST API -> SQLite Database

This separation ensures that business logic, validation, and persistence remain cleanly organized while the UI stays fast and responsive.

## 6. Backend Implementation
The backend is organized into a Django app called `expenses` and contains:
- `models.py` for the `Expense` model and validation rules
- `serializers.py` for request validation and response formatting
- `views.py` for CRUD and dashboard/search actions
- `urls.py` for route registration

The model ensures that expenses always store valid data such as a positive amount and required expense date.

## 7. Frontend Implementation
The frontend is a React application with:
- dashboard page for totals and charts-like summaries
- expense management page with table and creation form
- filter and search controls
- responsive user interactions for editing and deleting entries

## 8. Testing Coverage
The project includes Django-based API tests for the following behaviors:
- positive amount validation
- list endpoint response
- create expense success flow
- invalid zero-amount rejection
- dashboard summary totals
- search filtering

These tests validate the real API behavior and ensure the system continues to work as expected during changes.

## 9. Validation Result
The test suite was executed using Django's built-in test runner and passed successfully:

Command used:
`python manage.py test`

Outcome:
All test cases passed without failures.

## 10. Git and Commit History
The project repository was initialized and maintained with meaningful, descriptive commit messages to reflect completed work, including:
- project setup and application implementation
- backend and frontend integration
- automated test coverage
- project documentation and final reporting

## 11. Challenges Solved
- Frontend-to-backend CORS issues were resolved using Django CORS configuration.
- Windows shell compatibility was handled by using direct Python and Git executable paths.
- Validation logic was enforced both in the Django model and API serializer for consistent behavior.

## 12. Outcome
The application is functional, documented, tested, and successfully stored in GitHub. It is suitable for a mini-project demonstration and can be extended further for features such as authentication, budget alerts, recurring expenses, and export support.

## 13. Recommended Next Steps
- add user authentication
- add CSV export
- add recurring expense automation
- deploy to a cloud platform
- expand analytics with charts and budget tracking
