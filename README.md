# Car Rental System

A full-stack vehicle rental platform built with React, Spring Boot, Spring Security, JWT authentication, and MySQL. The application supports vehicle rentals, rental management, and fleet administration through a secure role-based system.

## Live Application

**Frontend Application:**  
https://car-rental-ui-s1hb.onrender.com/

**Backend API (Swagger):**  
https://carrental-26hx.onrender.com/swagger-ui/index.html

---

## Demo Credentials

### Admin Account

Email: `admin@demo.com`  
Password: `Password123`

### User Account

Email: `user@demo.com`  
Password: `Password123`

You can also create a new account directly from the application.

---

## Quick Overview

### Users can:

- Register and authenticate with JWT
- Browse available vehicles
- Rent cars for a selected number of days
- View active and past rentals
- Return rented vehicles

### Administrators can:

- Manage the vehicle fleet
- Add new vehicles
- Edit existing vehicles
- Delete vehicles
- Create rentals on behalf of customers
- Access protected administrative functionality

### Key Features

- JWT Authentication
- Role-Based Authorization (`USER`, `ADMIN`)
- Vehicle Rental Management
- Fleet Management Dashboard
- Rental Availability Validation
- Secure API Communication using Axios
- Responsive Full-Stack Architecture

---

## Tech Stack

### Frontend

- React
- Axios
- CSS

### Backend

- Java
- Spring Boot
- Spring Security
- JWT Authentication
- BCrypt Password Encryption

### Database

- MySQL
- AWS RDS

### Deployment

- Render (Frontend)
- Render (Backend)

### Documentation & Testing

- Swagger UI
- Postman

---

## User Workflow

```text
Login
    ↓
Browse Available Cars
    ↓
Choose Rental Duration
    ↓
Rent Vehicle
    ↓
View My Rentals
    ↓
Return Vehicle
```

---

## Admin Workflow

```text
Login
    ↓
Fleet Management
    ↓
Add Vehicle
    ↓
Edit Vehicle
    ↓
Delete Vehicle
```

---

## Full-Stack Architecture

```text
React Frontend
        │
        ▼
Spring Boot REST API
        │
        ▼
Service Layer
        │
        ▼
Repository Layer
        │
        ▼
MySQL Database
```

The application follows a layered architecture where controllers handle HTTP requests, services enforce business rules, and repositories manage database interactions.

---

## Security

### Authentication

- JWT-based authentication
- Stateless security model
- Secure password hashing with BCrypt

### Authorization

#### USER

- View available vehicles
- Rent vehicles
- View personal rentals
- Return owned rentals

#### ADMIN

- View fleet inventory
- Add vehicles
- Edit vehicles
- Delete vehicles
- Create rentals for customers
- Access administrative functionality

---

## Business Rules Enforced

- Cars must be available before rental
- Cars become unavailable during active rentals
- Returned vehicles automatically become available again
- Users can only manage their own rentals
- Administrators have full system access
- Rental durations are validated before processing

---

## Highlights

- Full-stack React + Spring Boot application
- Secure JWT authentication and authorization
- Role-based access control
- Vehicle rental lifecycle management
- Fleet CRUD operations
- RESTful API integration using Axios
- Cloud-hosted MySQL database
- Separate frontend and backend deployments on Render

---

## Future Enhancements

- Customer Management Dashboard
- Rental Analytics
- Vehicle Search and Filtering
- Pagination
- Unit Testing with JUnit and Mockito
- Integration Testing
- Redis Caching
- CI/CD Pipeline with GitHub Actions

---

## Author

**Jeancarlos Guerrero**

GitHub: https://github.com/JeancarlosG97

---

## Resume Summary

Built and deployed a full-stack vehicle rental platform using React, Spring Boot, Spring Security, JWT, and MySQL. Implemented secure authentication, role-based authorization, vehicle rentals, rental returns, and administrative fleet management features while deploying both frontend and backend services to Render.
