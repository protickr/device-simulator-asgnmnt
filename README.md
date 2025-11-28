# Device Simulator Web Application

A full-stack web application that allows users to interact with and control virtual devices (Fan and Light) inside a sandbox environment. Users can place devices into a workspace, control their settings, and save/load preset configurations.

## 🚀 Live Demo

- **Frontend Application:** [https://device-simulator-asgnmnt.vercel.app/](https://device-simulator-asgnmnt.vercel.app/)
- **Backend API:** [https://device-simulator-asgnmnt.onrender.com/api](https://device-simulator-asgnmnt.onrender.com/api)
- **API Docs:** [https://device-simulator-asgnmnt.onrender.com/docs/api#/](https://device-simulator-asgnmnt.onrender.com/docs/api#/)

> **Note:** The backend is deployed on Render's free tier, which spins down after periods of inactivity. Please allow up to a minute for the initial request to process while the service restarts. Subsequent requests will be processed immediately.  
  
_the spinning fan took quite sometime to implement, especially to avoid jitter and acceleration and decelleration_ 

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
    - **Light:** Toggle Power, Adjust Brightness, Change Color Temperature. _not completed_
- **Preset Management:** Save current configurations as presets and load them later.
- **Persistence:** Data is saved to the database and persists across reloads.
