# Device Simulator Web Application

A full-stack web application that allows users to interact with and control virtual devices (Fan and Light) inside a sandbox environment. Users can place devices into a workspace, control their settings, and save/load preset configurations.

## 🚀 Live Demo

- **Frontend Application:** [https://device-simulator-asgnmnt.vercel.app/](https://device-simulator-asgnmnt.vercel.app/)
- **Backend API:** [https://device-simulator-asgnmnt.onrender.com/api](https://device-simulator-asgnmnt.onrender.com/api)

> **Note:** The backend is deployed on Render's free tier, which spins down after periods of inactivity. Please allow up to a minute for the initial request to process while the service restarts. Subsequent requests will be processed immediately.  
  
_the spinning fan took quite sometime to implement, especially to avoid jitter and acceleration and deceleration_ 

## 📂 Project Structure

- **`web/`**: Frontend application built with React and Vite.
- **`api/`**: Backend application built with Laravel (PHP).
- **`device-simulator-protick-roy.postman_collection.json`**: Postman collection for testing API endpoints.
- **`db-dump.sql`**: SQL dump for the database setup.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, CSS modules, dnd-kit for drag-and-drop, zod
- **Backend:** PHP (Laravel).
- **Database:** MySQL.
- **ORM:** Eloquent

### Backend
The backend is built using **PHP (Laravel)** and follows a structured approach to ensure scalability and maintainability.

- **Database:** **MySQL** is used as the primary relational database management system to store application data reliably.
- **ORM:** **Eloquent ORM** is utilized for database interactions. This provides an abstraction layer that allows for flexible data operations and seamless switching between different database service providers (e.g., PostgreSQL, MySQL) without major code refactoring.
- **Request Handling:** Custom **Request** classes are used to validate incoming data before it reaches the controller. This layer also handles the conversion of data keys from JavaScript's `camelCase` convention to the `snake_case` convention used in the PHP/MySQL database columns.
- **Response Handling:** A dedicated **Response** mechanism is employed to serialize data and convert property names back from `snake_case` to `camelCase` before sending it to the client, ensuring consistent conventions across the stack.
- **API Documentation:** **Scramble** is used for automatic API documentation generation and serving, making it easy to explore and test endpoints.

### Frontend
The frontend is a **Single Page Application (SPA)** built with **React**, designed for a responsive and interactive user experience.

- **UI & Interactions:** **React** is used to build the user interface, managing the DOM and handling complex user interactions efficiently.
- **Type Safety:** **TypeScript** is employed to ensure compile-time data safety and strong typing, reducing runtime errors and improving developer experience.
- **Data Validation:** **Zod** is used for runtime data validation. It also allows for inferring TypeScript types directly from validation schemas, ensuring consistency between runtime checks and compile-time types.
- **API Client:** The native **Fetch API** is used for making HTTP requests to the backend.
- **State Management:** **React Context** and **State** are used to manage application state, providing a lightweight and effective solution for sharing data across components.
- **Error Handling:** **Error Boundaries** are implemented to gracefully handle uncaught errors in the component tree, preventing the entire app from crashing and displaying a user-friendly error page instead.
- **Architecture:** The application follows a **Modular Component-Driven Architecture**, promoting code reusability and making the codebase easy to expand and maintain in the future.

## ⚙️ Setup Instructions

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- Node.js & npm     => node v24.11.1, npm 11.6.2
- PHP & Composer    => PHP 8.2.27 , Composer 2.7.6
- MySQL             => mysql 8.0.37 

### 1. Database Setup

1. Create a new MySQL database (e.g., `device_simulator`).
2. Import the provided SQL dump file `db-dump.sql` into your database.

```bash
mysql -u your_username -p device_simulator < db-dump.sql
```

### 2. Backend Setup (API)

Navigate to the `api` directory:

```bash
cd api
```

Install PHP dependencies:

```bash
composer install
```

Set up the environment file:

```bash
cp .env.example .env
```

Open `.env` and configure your database credentials:

```ini
DB_CONNECTION=mysql
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_DATABASE=device_simulator
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Generate the application key:

```bash
php artisan key:generate
```

Start the development server:

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`.
The API Docs will be available at `http://localhost:8000/docs/api#/`.

### 3. Frontend Setup (Web)

Navigate to the `web` directory:

```bash
cd web
```

Install Node.js dependencies:

```bash
npm install
```

Set up the environment file:

```bash
cp .env.example .env
```

```ini
VITE_API_URL= address_of_the_backend_api_server_running_in_your_machine/api
```

*Note: Ensure the frontend is configured to point to your local backend URL (e.g., `VITE_API_BASE_URL=http://localhost:8000/api`).*

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🧪 API Testing

A Postman collection is included in the root directory: `device-simulator.postman_collection_protick_roy.json`. You can import this into Postman to test the `/presets` and `/devices` endpoints.

## ✨ Features

- **Drag-and-Drop Interface:** Drag devices ( Fan, Light) from the sidebar to the canvas.
- **Device Controls:**
    - **Fan:** Toggle Power, Adjust Speed.
    - **Light:** Toggle Power, Adjust Brightness, Change Color Temperature.
- **Preset Management:** Save current configurations as presets and load them later.
- **Persistence:** Data is saved to the database and persists across reloads.
