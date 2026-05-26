# NepMart Project Overview (Beginner Friendly)

This project is a **simple full‑stack web application** for an e-commerce store featuring Nepali handcrafted products. It includes:

- A **backend** (server) built with **Node.js** and **Express**
- A **frontend** (website UI) built with **React** using **Vite**
- **Payment Integration** with eSewa, Khalti, and Cash on Delivery
- **Product Search** functionality across the site
- **Admin Dashboard** for managing products, users, and images

You can work with this project even if you are **new to React and Node.js**. This guide explains:

- What each main folder does
- How data flows between frontend and backend
- How to run the project on your computer

---

## 1. What Is In This Project?

### Root folder

You are currently in the main folder:

- `backend/` – the server (handles data, database, APIs)
- `frontend-react/` – the website UI that users see in the browser

You usually run **both**: the backend (API server) and the frontend (React app).

---

## 2. Backend (Node.js + Express)

Folder: `backend/`

The backend is a small web server that:

- Receives requests from the frontend (for example: "get all products", "log in user", "upload image").
- Talks to a **MySQL** database using the `mysql2` library.
- Sends responses back as JSON data.

### Important backend files and folders

- `server.js`
  - Main entry point for the backend.
  - Starts the Express server (for example on port 5000 or similar).
  - Connects routes like products, users, images.

- `migrate.js`
  - Typically used to create or update database tables (migrations).
  - You might run this once when setting up the database.

- `config/db.js`
  - Sets up the connection to the **MySQL** database.
  - Reads database settings (like host, user, password, database name), usually from environment variables.

- `config/multer.js`
  - Configures **Multer**, a library for handling file uploads (such as product images).

- `model/`
  - Defines how data is structured in code. Examples:
    - `Product.js` – describes a product (fields like id, name, price, etc.).
    - `User.js` – describes a user (fields like id, name, email, password, etc.).
    - `Image.js` – describes an image record.

- `controller/`
  - Contains functions that handle the main logic when a request comes in.
  - Examples:
    - `productController.js` – handles listing products, creating products, updating, deleting.
    - `userController.js` – handles registering users, logging in, listing users.
    - `imageController.js` – handles uploading and retrieving images.
    - `paymentController.js` – handles payment processing for eSewa, Khalti, and Cash on Delivery.

- `routes/`
  - Defines the **URL paths** the frontend can call.
  - Examples:
    - `productRoutes.js` – URLs like `/api/products`.
    - `userRoutes.js` – URLs like `/api/users`, `/api/login`.
    - `imageRoutes.js` – URLs for image upload or retrieval.
    - `paymentRoutes.js` – URLs for payment initialization and verification.

- `uploads/`
  - Folder where uploaded image files are stored on the server.

- `package.json`
  - Lists backend dependencies and scripts.
  - Main scripts you care about:
    - `npm start` – runs the backend with `nodemon server.js` (auto‑reload when files change).

### Backend technologies

- **Node.js** – JavaScript runtime that lets you run JS on the server.
- **Express** – framework for building web servers and APIs.
- **MySQL + mysql2** – relational database and its Node.js driver.
- **Multer** – handles file uploads (images).
- **dotenv** – loads configuration values from a `.env` file.
- **body-parser** – parses incoming request bodies.

---

## 3. Frontend (React + Vite)

Folder: `frontend-react/`

The frontend is a **single‑page application** built with React. Users visit this in their browser.

### What the frontend does

- Shows pages like **Home, Shop, Cart, Login, Register, Admin Dashboard**.
- **Product Search** – Users can search products from the header or shop page. Search matches product names, descriptions, and categories.
- **Payment Integration** – Supports multiple payment methods:
  - **eSewa** – Nepal's popular digital wallet
  - **Khalti** – Mobile payment platform
  - **Cash on Delivery (COD)** – Pay when order arrives
- Calls the backend APIs (for example with **Axios**) to:
  - fetch products
  - log in / register users
  - manage the cart and checkout
  - process payments
- Uses **React Router** for navigation between pages (no full page reload).

### Important frontend files and folders

- `src/main.jsx`
  - Entry point of the React app.
  - Mounts the app into `index.html`.

- `src/App.jsx`
  - Main component of the frontend.
  - Defines routes/navigation and which page to show.

- `src/pages/`
  - Public‑facing pages for users. For example:
    - `Home.jsx` – landing page.
    - `Shop.jsx` – shows list of products with search and filtering.
    - `Products.jsx` – product listing/browsing with search support.
    - `Cart.jsx` – shows items in the shopping cart.
    - `Checkout.jsx` – checkout form with payment method selection (eSewa, Khalti, COD).
    - `PaymentCallback.jsx` – handles payment verification after redirect from payment gateways.
    - `Login.jsx` / `Register.jsx` – user authentication.
    - `About.jsx`, `Artisans.jsx`, `Contact.jsx` – info pages.

- `src/admin/`
  - Admin area of the app.
  - `pages/` – admin pages:
    - `Dashboard.jsx` – overview for the admin.
    - `Products.jsx` – manage products (add/edit/delete).
    - `Users.jsx` – manage users.
    - `Images.jsx` – manage uploaded images.
  - `components/` – reusable UI pieces for the admin area.
  - `css/` – styling for admin layout, tables, forms, etc.

- `src/components/`
  - General site‑wide components like `Header.jsx` and `Footer.jsx`.

- `src/context/CartContext.jsx`
  - Uses React **Context** to store cart data globally.
  - Allows any component to access and update the cart (add/remove items) without passing props through many levels.

- `src/api/client.js`
  - Wraps **Axios** configuration for making HTTP requests to the backend.
  - You usually set the backend base URL here (e.g. `http://localhost:5000`).

- `src/css/` and `src/admin/css/`
  - Regular CSS files that control how the site looks.

- `public/`
  - Static assets (images, icons, etc.) that can be served directly.

- `vite.config.js`
  - Configuration for the Vite build tool.

- `package.json`
  - Lists frontend dependencies and scripts.
  - Main scripts you care about:
    - `npm run dev` – starts the development server with hot reload.
    - `npm run build` – builds the production version.

### Frontend technologies

- **React** – JavaScript library for building UI.
- **Vite** – fast development server and build tool.
- **React Router** – navigation/routing between pages.
- **Axios** – HTTP client used to talk to the backend.

---

## 4. How Frontend and Backend Work Together

1. **User opens the frontend** in a browser (for example: `http://localhost:5173/`).
2. The frontend React app shows pages and components.
3. When data is needed (e.g. products list), the frontend calls the backend API using Axios, such as `GET /api/products`.
4. The backend receives the request, reads/writes the MySQL database, and sends back JSON.
5. The frontend updates the UI with the received data.

For admin actions:

- Admin logs in via a login form.
- The frontend sends a request to the backend to validate the credentials.
- If successful, the admin sees admin pages where they can create/edit/delete products, manage users, and manage images.

---

## 5. How To Run This Project (Beginner Friendly)

Below are basic steps assuming you are on **Windows** (but similar on other systems).

### 5.1. Install required software

You need:

1. **Node.js** (LTS version)
   - Download from https://nodejs.org
   - Install it (close and reopen your terminal after install).

2. **MySQL Server**
   - Install MySQL Server and MySQL Workbench (or any MySQL client).
   - Create a database (for example `nepmart`).

### 5.2. Configure the backend

1. Open a terminal in the `backend/` folder.
2. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in `backend/` (if not already present) with your database settings. Example:

   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=nepmart
   PORT=5000

   # Payment Configuration (optional - test credentials are used by default)
   # eSewa
   ESEWA_MERCHANT_CODE=EPAYTEST
   ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q

   # Khalti
   KHALTI_SECRET_KEY=test_secret_key_dc74e0fd57cb46cd93832aee0a507256
   KHALTI_PUBLIC_KEY=test_public_key_dc74e0fd57cb46cd93832aee0a390234

   # Frontend URL (for payment callbacks)
   FRONTEND_URL=http://localhost:5173

   # Environment (development or production)
   NODE_ENV=development
   ```

4. (Optional) Run migrations if `migrate.js` is used to create tables:

   ```bash
   node migrate.js
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

   The server should now be running (for example on `http://localhost:5000`).

### 5.3. Configure and run the frontend

1. Open another terminal in the `frontend-react/` folder.
2. Install dependencies:

   ```bash
   cd frontend-react
   npm install
   ```

3. Make sure the API base URL in `src/api/client.js` points to your backend (e.g. `http://localhost:5000`).

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. The terminal will show a local URL, for example:

   ```
   http://localhost:5173/
   ```

   Open this URL in your browser to see the app.

---

## 6. Where To Look When You Get Lost

- **To see how pages are built** – start in `frontend-react/src/App.jsx` and `frontend-react/src/pages/`.
- **To see admin features** – check `frontend-react/src/admin/pages/`.
- **To see how data is fetched from the backend** – look at `frontend-react/src/api/client.js` and any component that uses Axios.
- **To see how the server handles requests** – check `backend/routes/` and `backend/controller/`.
- **To understand the database connection** – look at `backend/config/db.js`.

If you are new to React and Node, focus first on understanding:

1. **Routes and pages** in the frontend (how URLs map to components).
2. **API routes** in the backend (how URLs map to controllers).
3. How the frontend calls the backend and displays the results.

Once you are comfortable with that, you can start modifying pages, adding fields, or changing styles.

---

## 7. Key Features

### Product Search

- **Header Search**: Type in the search bar and press Enter to find products
- **Shop Page Search**: Real-time filtering on the shop page
- **Smart Matching**: Searches through product names, descriptions, and categories

### Payment Integration

The checkout supports three payment methods:

1. **eSewa** (Digital Wallet)
   - User is redirected to eSewa payment page
   - After payment, redirected back to `/payment/esewa/success` or `/payment/esewa/failure`
   - Payment is verified on the backend

2. **Khalti** (Mobile Wallet)
   - User is redirected to Khalti payment page
   - After payment, redirected back to `/payment/khalti/verify`
   - Payment is verified using Khalti's lookup API

3. **Cash on Delivery (COD)**
   - Order is placed immediately
   - Payment status is set to "pending"
   - Payment collected when order is delivered

### Payment Flow

1. User fills checkout form and selects payment method
2. For digital payments: redirected to payment gateway
3. After successful payment: order is created and cart is cleared
4. User sees confirmation page with transaction details

---

## 8. Common Next Steps

- Change the site texts, images, or styles in `frontend-react/src`.
- Add or remove products via the admin dashboard (once backend and database are running).
- Add new API endpoints in the backend (`routes` + `controller` + `model`).
- Secure the app further (authentication, authorization, validation).

This README is meant as a starting point. You can expand it as you learn more about how the project works.
