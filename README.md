# Event Management Website

## Overview

This project is a modern, professional event management website designed for an event management company to showcase its services, manage events, and handle registrations. The new system replaces an outdated website, introducing essential features for event discovery, booking, and streamlined administration.

---

## Objectives

- **Visually appealing, responsive website** for event management.
- **Event listing, detail, and registration** functionalities for users.
- **Admin panel** for managing events and registrations.
- **Easy event discovery and booking** for users.
- **Streamlined event management** for administrators.

---

## Features

### User Features

- **User Registration & Login:** Secure registration and authentication.
- **Event Browsing:** View upcoming, ongoing, and past events with filters (date, category, location).
- **Event Details:** Access comprehensive event info, including descriptions, schedules, images, and location maps.
- **Event Booking:** Book/register for events with instant confirmation.
- **Booking History:** View, manage, or cancel previous bookings.
- **Feedback:** Submit ratings or reviews for attended events (optional).

### Admin Features

- **Admin Dashboard:** Centralized control panel for all event operations.
- **Event Management:** Create, update, or delete events; upload images and details.
- **Registration Management:** View and manage user registrations for each event.
- **Analytics:** Visual charts and statistics on bookings, attendance, and user engagement.
- **User Management:** View, search, or remove users as needed.

---

## Technology Stack

- **Frontend:** React.js or Vue.js, Bootstrap/Tailwind CSS for responsive design.
- **Backend:** Node.js (Express) or Django REST Framework.
- **Database:** PostgreSQL or MongoDB.
- **Authentication:** JWT or session-based authentication.
- **Optional Integrations:** Stripe/Razorpay for payments, Chart.js for analytics.

---

## Folder Structure 

event-management-website/
│
├── client/ # Frontend (React or Vue)
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.js
│
├── server/ # Backend (Node.js or Django)
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── app.js / manage.py
│
├── database/ # Database scripts or migrations
│
├── docs/ # Documentation and wireframes
│
├── README.md
└── package.json / requirements.txt


---

## Database Design (Entities)

- **User:** id, name, email, password, role, etc.
- **Event:** id, title, description, date, time, location, image, capacity, etc.
- **Registration:** id, event_id, user_id, status, timestamp, etc.
- **Admin:** id, name, email, password (if separate from User)
- *(Add more entities as needed for feedback, payments, etc.)*

---

## Wireframe Overview

- **Home Page:** Event highlights, search/filter, login/register.
- **Event Listing:** Cards/grid of events with quick view.
- **Event Details:** Images, description, schedule, map, booking button.
- **User Dashboard:** Upcoming/past bookings, profile management.
- **Admin Dashboard:** Event management, registration analytics, user management.

*(Detailed graphical wireframes can be found in the `/docs` folder or designed using Figma/Balsamiq.)*

---

## Installation & Setup

1. **Clone the repository:**

2. **Setup Backend:**
- Navigate to `/server` and install dependencies:
  ```
  npm install   # For Node.js
  # OR
  pip install -r requirements.txt   # For Django
  ```
- Configure database settings in `.env` or `settings.py`.
- Run migrations and start the backend server.

3. **Setup Frontend:**
- Navigate to `/client` and install dependencies:
  ```
  npm install
  ```
- Start the frontend development server:
  ```
  npm start
  ```

4. **Access the app at:**  
`http://localhost:3000` (Frontend)  
`http://localhost:5000` or `http://localhost:8000` (Backend)

---

## Usage

- **Users:** Register, browse events, book/register, view bookings.
- **Admins:** Login to dashboard, manage events and registrations, view analytics.

---

## Future Enhancements

- Email and SMS notifications for bookings and reminders.
- Real-time chat or support for users.
- Advanced filters and search for events.
- Mobile app integration.
- AI-powered event recommendations.

---

## License

This project is for educational and demonstration purposes.


