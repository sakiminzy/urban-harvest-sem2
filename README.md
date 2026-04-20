# Urban Harvest Hub

Urban Harvest Hub is a full-stack Progressive Web Application built for Task 2 of the COMP50017 Web Development assignment. It extends the earlier React frontend into a mobile-first PWA with an Express REST API, MongoDB database integration, offline support, installability, and mobile-friendly capabilities.

## Task 2 Overview

The purpose of Task 2 is to transform the Urban Harvest Hub frontend into a complete full-stack application. This version demonstrates:

- React + Vite frontend integration with a custom Express API
- MongoDB data persistence using Mongoose
- Progressive Web App features including manifest, service worker, caching, and install prompt
- Mobile-focused enhancements such as dark mode, offline awareness, geolocation, and notification permission support
- A clean structure that is easy to explain in a university presentation

## Features Implemented

### Frontend
- Responsive React SPA with React Router
- Pages for home, categories, item detail, booking, and 404
- API-powered item listing, item detail loading, and booking submission
- Combined search and category filtering
- Master-detail browsing on the categories page
- Weather API integration for workshops and events
- Accessible forms, cards, and navigation

### Backend
- Express server with modular structure
- REST API routes for items, bookings, and health checks
- Controllers, models, middleware, and routes split into beginner-friendly files
- MongoDB integration with Mongoose
- Input validation for items and bookings
- Centralized error handling
- Basic security headers using Helmet

### PWA
- Web app manifest
- Service worker registration
- Offline fallback page
- App shell caching
- Cached item API responses for offline-friendly browsing
- Install prompt component
- Push notification-ready service worker structure

### Mobile Features
- Dark mode toggle with saved theme preference
- Offline status banner
- Geolocation on item detail pages with distance estimation
- Notification permission prompt for future update alerts

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Plain JavaScript JSX

### Backend
- Node.js
- Express
- Mongoose
- MongoDB
- Morgan
- CORS
- Helmet
- dotenv

### External APIs
- Open-Meteo Forecast API for event/workshop weather information

## Folder Structure

```text
.
|- public/
|  |- manifest.webmanifest
|  |- sw.js
|  |- offline.html
|  |- pwa-192.svg
|  |- pwa-512.svg
|  `- pwa-maskable.svg
|- server/
|  |- config/
|  |  `- db.js
|  |- controllers/
|  |  |- bookingController.js
|  |  |- healthController.js
|  |  `- itemController.js
|  |- middleware/
|  |  |- errorHandler.js
|  |  |- notFound.js
|  |  `- validateRequest.js
|  |- models/
|  |  |- Booking.js
|  |  `- Item.js
|  |- routes/
|  |  |- bookingRoutes.js
|  |  |- healthRoutes.js
|  |  `- itemRoutes.js
|  |- utils/
|  |  |- seedBookings.js
|  |  |- seedDatabase.js
|  |  `- seedItems.js
|  |- app.js
|  `- server.js
|- src/
|  |- components/
|  |- hooks/
|  |- layouts/
|  |- pages/
|  |- services/
|  |- utils/
|  |- App.jsx
|  |- index.css
|  `- main.jsx
|- .env.example
|- package.json
`- README.md
```

## Environment Variables

Create a root `.env` file:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/urban-harvest-hub
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Create a frontend `src/.env` or root `.env.local` entry for Vite if needed:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## Setup Instructions

Install dependencies:

```bash
npm install
```

Make sure MongoDB is running locally.

Seed the database:

```bash
npm run seed
```

Run the backend:

```bash
npm run server:dev
```

Run the frontend:

```bash
npm run dev
```

## MongoDB Connection

The backend uses Mongoose to connect to MongoDB through the `MONGODB_URI` value stored in the `.env` file. The database stores two main collections:

- `items`
- `bookings`

## API Route Summary

### Health
- `GET /api/health`

### Items
- `GET /api/items`
- `GET /api/items/:id`
- `POST /api/items`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`

### Bookings
- `GET /api/bookings`
- `POST /api/bookings`

## PWA Features

- Installable web app manifest
- Theme color and app metadata
- Service worker for caching and offline support
- Offline fallback page
- Cached app shell assets
- Cached API item responses for limited offline browsing
- Install prompt component
- Push notification-ready service worker event handler

### Suggested PWA Testing
1. Run the frontend and backend locally.
2. Open DevTools and confirm the manifest is detected.
3. Confirm the service worker registers successfully.
4. Install the app using the install prompt.
5. Load the categories page once while online.
6. Switch the browser to offline mode and refresh.
7. Confirm cached pages still work and the offline banner appears.

## Mobile Features

- Dark mode toggle with saved user preference
- Geolocation-based distance estimation on item detail pages
- Offline status indicator
- Notification permission prompt for future update alerts

## Accessibility Features

- Semantic HTML across layout and pages
- Skip link for keyboard users
- Visible focus states on links, buttons, filters, and forms
- Descriptive labels and validation messages for form controls
- Alt text for all content images
- Keyboard-friendly interaction patterns
- `aria-live` status feedback for dynamic content

## Security and Deployment Readiness

- Environment variables for secrets and environment-specific values
- Basic security headers using Helmet
- Centralized error handling
- Request validation before database writes
- Separate backend structure suitable for later deployment

## Notes For Presentation

- Use the categories page to demonstrate API loading, search/filter, and master-detail interaction.
- Use the item detail page to explain route params, weather API use, and geolocation.
- Use the booking page to explain frontend-backend form submission and validation.
- Use the install prompt, offline banner, and dark mode toggle to demonstrate the PWA/mobile criteria.
