# Urban Harvest Hub

Urban Harvest Hub is a responsive Single Page Application built for Task 1 of the COMP50017 Web Development assignment. The project presents eco-friendly products, workshops, and events for sustainability-focused communities using React, Vite, React Router, and Tailwind CSS.

## Project Purpose

The purpose of this application is to help users explore sustainable products and community learning opportunities through a modern, accessible, and responsive web interface. The app demonstrates core SPA concepts such as client-side routing, reusable React components, JSON-driven content, search/filter interactions, a master-detail layout, and external API integration.

## Features Implemented

- Responsive SPA built with React and Vite
- Client-side routing with routes for `/`, `/categories`, `/items/:id`, `/booking`, and `404`
- Internal JSON seed data for products, workshops, and events
- Category filtering for Food, Lifestyle, and Education
- Search functionality across title, category, type, location, and description
- Reusable item cards and shared UI components
- Master-detail flow on the categories page
- Dynamic item detail page using route parameters
- Booking and registration form with validation
- External weather API integration for workshops and events
- Tailwind CSS custom colors, custom font, and custom component/utility classes
- Accessibility improvements such as semantic structure, labels, alt text, visible focus states, and skip navigation

## Technologies Used

- React
- Vite
- React Router DOM
- Tailwind CSS
- PostCSS
- Open-Meteo Weather API
- Plain JSX and functional components

## Installation

Install dependencies with:

```bash
npm install
```

## Run the Project

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Route Overview

- `/` : Home page introducing Urban Harvest Hub and featured content
- `/categories` : Searchable and filterable master-detail page
- `/items/:id` : Dynamic detail page for an individual product, workshop, or event
- `/booking` : Booking and registration form
- `*` : Friendly 404 page for unknown routes

## External API Used

The app integrates the Open-Meteo Forecast API to show weather information for workshop and event detail pages.

- API: https://open-meteo.com/en/docs
- Purpose: display live weather conditions, wind speed, and daily temperature range for event or workshop locations
- Reason for use: no API key is required, making it practical for a university assignment demo

## Accessibility Features

- Semantic HTML structure using `header`, `main`, `section`, `article`, `nav`, and `footer`
- Skip link for keyboard users
- Visible focus styles on links, buttons, and form controls
- Descriptive alt text for all item images
- Proper form labels and clear validation messages
- ARIA used only where helpful, including `aria-live` for dynamic status updates and `aria-pressed` for active filter states

## Folder Structure Summary

```text
src/
├─ components/
│  ├─ common/
│  │  ├─ ItemCard.jsx
│  │  ├─ ItemDetailPanel.jsx
│  │  └─ WeatherPanel.jsx
│  ├─ layout/
│  │  ├─ Footer.jsx
│  │  └─ Navbar.jsx
│  └─ ui/
│     ├─ CategoryFilter.jsx
│     ├─ SearchBar.jsx
│     └─ SectionHeading.jsx
├─ data/
│  └─ items.json
├─ hooks/
│  └─ useWeather.js
├─ layouts/
│  └─ MainLayout.jsx
├─ pages/
│  ├─ BookingPage.jsx
│  ├─ CategoriesPage.jsx
│  ├─ HomePage.jsx
│  ├─ ItemDetailPage.jsx
│  └─ NotFoundPage.jsx
├─ services/
│  └─ weatherService.js
├─ utils/
│  └─ items.js
├─ App.jsx
├─ index.css
└─ main.jsx
```

## Notes for Demonstration

- The app content is loaded from local JSON seed data to satisfy the assignment requirement for internal data usage.
- The categories page demonstrates both filtering and master-detail interaction.
- The item detail page demonstrates dynamic routing and external API integration.
- The booking page demonstrates controlled form state and basic validation logic.
