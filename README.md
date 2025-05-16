
Ran tool

Read file: README.md

Read file: package.json

Ran tool

Ran tool

Ran tool

Ran tool

Ran tool

Ran tool

Ran tool

Read file: backend/server.js

Read file: src/pages/Dashboard.tsx
Here is a comprehensive README for your project, based on your requirements, codebase, and features:

---

# ComfyCart

A modern, full-stack e-commerce web application built with React, Vite, TypeScript, Tailwind CSS, and a Node.js/Express/MongoDB backend.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Backend API](#backend-api)
- [Testing](#testing)
- [Business & Technical Requirements](#business--technical-requirements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Authentication:** User signup, login, and session management.
- **User Dashboard:** Personalized dashboard with order, wishlist, cart, and review stats. Profile picture support.
- **Product Catalog:** Browse, search, and filter products by category.
- **Product Details:** View detailed product info, add to cart, wishlist, and leave reviews.
- **Shopping Cart:** Add, update, and remove items. User-specific cart stored in session.
- **Wishlist:** Add/remove products to wishlist, user-specific and session-persistent.
- **Orders:** Checkout flow, order history, and order details per user.
- **Profile Management:** Update profile info and upload a profile picture.
- **Reviews:** Leave and view product reviews, recent reviews on dashboard.
- **Responsive UI:** Modern, mobile-friendly design using Tailwind CSS and shadcn/ui.
- **Unit Testing:** Comprehensive tests for core components and pages.

---

## Tech Stack

**Frontend:**
- React 18 + Vite
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI)
- React Router DOM
- Formik (forms & validation)
- date-fns (date formatting)

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)
- RESTful API

**Testing:**
- Vitest
- @testing-library/react

---

## Project Structure

```
.
├── backend/                # Node.js/Express backend
│   ├── models/             # Mongoose models (User, Product, Cart)
│   ├── routes/             # API route handlers
│   ├── server.js           # Express server entry
│   └── ...                 
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Navbar, ProductCard, etc.)
│   ├── context/            # React context providers (Auth, Cart)
│   ├── pages/              # Main app pages (Dashboard, Orders, Cart, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── data/               # Static/mock data
│   ├── App.tsx             # App entry and routing
│   └── ...                 
├── package.json            # Frontend dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS config
├── vite.config.ts          # Vite config
└── README.md               # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/comfycart.git
cd comfycart
```

### 2. Install dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Configure environment variables

- Create a `.env` file in `backend/` with your MongoDB URI and any secrets.

### 4. Run the backend

```bash
cd backend
npm start
```

### 5. Run the frontend

```bash
cd ..
npm run dev
```

- The frontend will be available at [http://localhost:5173](http://localhost:5173)
- The backend will run on [http://localhost:5000](http://localhost:5000) by default

---

## Available Scripts

- `npm run dev` - Start the frontend in development mode
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build
- `npm run lint` - Lint the codebase

_Backend scripts are in the `backend/` folder._

---

## Backend API

The backend exposes RESTful endpoints under `/api`:

- `POST /api/signup` - Register a new user
- `POST /api/login` - Authenticate user
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/cart` - Add to cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/orders` - Place an order
- `GET /api/orders/:userId` - Get user's orders
- ...and more (see `backend/routes/` for all endpoints)

---

## Testing

- Unit tests are written with [Vitest](https://vitest.dev/) and [@testing-library/react](https://testing-library.com/).
- To run tests:

```bash
npm run test
```

- Tests cover authentication, cart, dashboard, product card, and orders functionality.

---

## Business & Technical Requirements

- User authentication and session management
- User dashboard with dynamic stats (orders, wishlist, cart, reviews)
- Product catalog, details, and search
- Shopping cart and checkout flow
- Wishlist and order history per user
- Profile management with picture upload
- Product reviews and ratings
- Responsive, accessible UI
- State management via React Context
- User/session-specific data stored in localStorage/sessionStorage
- Comprehensive unit tests for core features

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


