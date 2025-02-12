# E-Commerce API

Solution for the [E-Commerce API](https://roadmap.sh/projects/ecommerce-api) challenge from [roadmap.sh](https://roadmap.sh/).

This is a **RESTful API** for an e-commerce platform built with **Node.js**, **Express.js**, and **MongoDB**. It provides a robust backend for managing products, users, and orders, with features like **JWT authentication**, and **shopping cart functionality**. The API is designed to be scalable, secure, and easy to use, with well-documented endpoints.

## Features

- **Product Management**:
  - Create, read, update, and delete products.
  - Search and filter products by category, price, and availability.

- **User Management**:
  - User registration and authentication (JWT-based).
  - User profile management.

- **Order Management**:
  - Create and manage orders.
  - Track order status (e.g., pending, shipped, delivered).

- **Cart Management**:
  - Add, update, and remove items from the cart.
  - Checkout functionality.

- **Admin Panel**:
  - Admin-specific endpoints for managing users, products, and orders.
    
## Upcoming Features
- Frontend integration for functionality
- User checkout and payment processing with Stripe


## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud-based)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Barkaaat/E-Commerce-API.git
   cd E-Commerce-API

2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Create a .env File and Configure Environment Variables**
   ```bash
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/ecommerce
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret 
   ```
4. **To Run**
   #### Start the Server
   ```bash
   npm run start
   ```     
   #### Development Mode (with hot-reloading)
   ```bash
   npm run dev
   ```
## Usage
  - Access the API
    - The API will be running at http://localhost:3000.
    - Use tools like Postman or Swagger UI to test the endpoints.

  - Swagger Documentation
    - Access the Swagger UI at http://localhost:3000/api-docs for detailed API documentation and testing.
## API Endpoints
### Base URL
`/api/v1`
### Auth Routes
**Base Route:** `/auth`

| Method | Endpoint          | Description            | Middleware    |
|--------|-------------------|------------------------|---------------|
| POST   | `/register`       | Create user account    | `-`           |
| GET    | `/login`          | User login             | `-`           |

### Admin Routes
**Base Route:** `/admin`

| Method | Endpoint          | Description            | Middleware    |
|--------|-------------------|------------------------|---------------|
| GET    | `/`               | Get all users          | `adminAuth`   |
| PUT    | `/:id`            | Add new admin          | `adminAuth`   |
| DELETE | `/:id`            | Delete user or admin   | `adminAuth`   |

### Product Routes
**Base Route:** `/products`

| Method | Endpoint          | Description            | Middleware    |
|--------|-------------------|------------------------|---------------|
| GET    | `/`               | Get all products       | `-`           |
| POST   | `/`               | Add new porduct        | `adminAuth`   |
| DELETE | `/:produtId`      | Delete product         | `adminAuth`   |

### Cart Routes
**Base Route:** `/cart`

| Method | Endpoint          | Description            | Middleware    |
|--------|-------------------|------------------------|---------------|
| GET    | `/`               | Show cart items        | `checkUser`   |
| POST   | `/`               | Add items to cart      | `checkUser`   |
| DELETE | `/`               | Delete items from cart | `checkUser`   |


### Order Routes
**Base Route:** `/order`

| Method | Endpoint          | Description             | Middleware   |
|--------|-------------------|-------------------------|--------------|
| GET    | `/`               | Get user orders         | `checkUser`  |
| POST   | `/`               | Create new order        | `checkUser`  |
| DELETE | `/`               | Delete order            | `checkUser`  |
