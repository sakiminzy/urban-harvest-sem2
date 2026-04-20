# Urban Harvest Hub

Urban Harvest Hub is a responsive Single Page Application built for Task 1 of the COMP50017 Web Development assignment. The app showcases eco-friendly products, workshops, and events for sustainability-focused communities using React, Vite, React Router, and Tailwind CSS.

## Project Description

This project was created to demonstrate the core requirements of a modern SPA for university assessment. It allows users to browse sustainability content by category, search and filter items, open detailed views, see live weather information for workshops and events, and register through a validated booking form.

## Features

- Responsive SPA built with React and Vite
- Client-side routing for `/`, `/categories`, `/items/:id`, `/booking`, and `404`
- Internal JSON seed data for products, workshops, and events
- Combined search and category filtering
- Master-detail browsing flow on the categories page
- Dynamic item detail page using route parameters
- Live weather integration for events and workshops
- Reusable cards, filters, search bar, and shared layout components
- Booking/register form with validation and clear feedback
- Tailwind CSS custom theme colors, font, and custom utility/component classes
- Accessible structure with labels, alt text, focus states, and keyboard-friendly controls

## Technologies

- React
- Vite
- React Router DOM
- Tailwind CSS
- PostCSS
- Open-Meteo Forecast API
- Plain JavaScript JSX with functional components

## Setup Instructions

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Routes

- `/` : Home page with project introduction and featured content
- `/categories` : Searchable and filterable categories page with master-detail view
- `/items/:id` : Dynamic detail page for an individual item
- `/booking` : Booking and registration form
- `*` : Friendly 404 not found route

## API Used

The project integrates the Open-Meteo Forecast API.

- API website: https://open-meteo.com/en/docs
- Purpose: show current weather conditions for workshop and event locations
- Data shown: current temperature, forecast summary, daily high and low, and wind speed
- Why it was chosen: simple public API with no key required, suitable for assignment demonstration

## Accessibility Features

- Semantic HTML using `header`, `main`, `section`, `article`, `nav`, `aside`, and `footer`
- Skip link for keyboard users
- Visible focus styles on buttons, links, filters, and form elements
- Descriptive labels for all form fields
- Descriptive alt text for all item images
- `aria-live` feedback for booking messages and weather updates
- `aria-pressed` on active category filters
- Keyboard-friendly buttons and links throughout the interface

## Folder Structure Summary

```text
src/
|- components/
|  |- common/
|  |  |- ItemCard.jsx
|  |  |- ItemDetailPanel.jsx
|  |  `- WeatherPanel.jsx
|  |- layout/
|  |  |- Footer.jsx
|  |  `- Navbar.jsx
|  `- ui/
|     |- CategoryFilter.jsx
|     |- SearchBar.jsx
|     `- SectionHeading.jsx
|- data/
|  `- items.json
|- hooks/
|  `- useWeather.js
|- layouts/
|  `- MainLayout.jsx
|- pages/
|  |- BookingPage.jsx
|  |- CategoriesPage.jsx
|  |- HomePage.jsx
|  |- ItemDetailPage.jsx
|  `- NotFoundPage.jsx
|- services/
|  `- weatherService.js
|- utils/
|  `- items.js
|- App.jsx
|- index.css
`- main.jsx
```

## Notes for Presentation

- The categories page is the best place to demonstrate combined search and filtering.
- The item detail page is the best place to explain route parameters and weather API integration.
- The booking page is the best place to explain form validation and user feedback.
- The project uses realistic seed data to satisfy the internal JSON requirement from the assignment brief.
