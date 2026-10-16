# Airbnb Full Stack Project

A full-stack, enterprise-grade Airbnb clone featuring a **Spring Boot** backend REST API and a **React + Vite + TailwindCSS** modern frontend.

---

## 🌟 Architecture Overview

- **Backend**: Java 17, Spring Boot, Spring Security, JWT Authentication, Spring Data JPA, Hibernate, PostgreSQL/MySQL.
- **Frontend**: React (Vite), TailwindCSS, Modern UI components with responsive design, search filtering, and seamless booking experience.

---

## 🚀 Key Features

### 🏨 Hotel & Room Management (Host / Admin)
- Create, update, activate, and delete hotels.
- Manage room inventories, pricing, and configurations.
- Real-time booking reports and guest management.

### 🔍 Guest & Booking Flow
- Explore & search hotels with dynamic filters (price, amenities, location).
- Room reservation workflow with availability checks and conflict resolution.
- Add and manage guest details per booking.
- Payment initiation and webhook processing.

### 🔐 Authentication & Roles
- Secure User Signup, Login, and JWT Token Refresh.
- Role-Based Access Control (Admin, Host, Guest).
- User profile & booking history management.

---

## 📁 Project Structure

```text
├── AirBnb-master/     # Spring Boot Backend API
│   ├── src/main/java/ # Domain models, Controllers, Services, DTOs, Security
│   ├── pom.xml        # Maven dependencies
│   └── Dockerfile     # Containerization setup
├── frontend/          # React + Vite Frontend UI
│   ├── src/           # Components, Pages, Context, Hooks, Utils
│   ├── package.json   # Frontend dependencies
│   └── vite.config.js # Vite configuration
├── .gitignore         # Ignored build and dependency artifacts
└── README.md          # Project documentation
```

---

## 🛠️ Getting Started

### Prerequisites
- **Java 17+** & **Maven**
- **Node.js (v18+)** & **npm**
- **PostgreSQL / MySQL** (or configured database)

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd AirBnb-master
   ```
2. Configure your database connection in `src/main/resources/application.properties` (or `application.yml`).
3. Build and run the Spring Boot service:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The backend API will start on `http://localhost:8080`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:5173`.

---

## 📌 API Endpoints Summary

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Authenticate and obtain JWT
- `POST /auth/refresh` - Refresh access token

### Hotels & Search
- `GET /hotels/search` - Search hotels with filters
- `GET /hotels/{hotelId}/info` - Get details of a hotel
- `POST /admin/hotels` - Create a hotel
- `PATCH /admin/hotels/{hotelId}/activate` - Activate hotel

### Booking Flow
- `POST /bookings/init` - Initialize reservation
- `POST /bookings/{bookingId}/addGuests` - Add guest list
- `POST /bookings/{bookingId}/payments` - Initiate payment
- `GET /bookings/{bookingId}/status` - Check booking status
- `POST /bookings/{bookingId}/cancel` - Cancel reservation

### Users & Profiles
- `GET /users/profile` - Fetch current user profile
- `GET /users/myBookings` - List user reservations

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a PR.
