# TinyLink: A Modern URL Shortener Service

## 🔗 Project Overview

TinyLink is a full-stack, scalable URL shortening service built to mimic
popular platforms like Bit.ly.\
It allows users to condense long URLs into short, memorable links and
provides real-time analytics on link performance.

This project was built as a demonstration of robust full-stack
development, focusing on clean separation of concerns, API specification
adherence, and efficient database querying for high-speed redirects.

------------------------------------------------------------------------

## 🚀 Features

### **Core Functionality**

-   **Create Short Links:** Shorten any long URL.\
-   **Custom Codes:** Users can optionally provide a custom alphanumeric
    code (6--8 characters) for vanity URLs.\
    Handles conflict detection (`409`) if the code is already taken.\
-   **High-Speed Redirection:** Fast `302` redirect from the short code
    to the original destination.\
-   **Click Analytics:** Tracks and updates click counts and the last
    clicked timestamp on every successful redirect.\
-   **Dashboard:** View, copy, and delete all created links and monitor
    their statistics.

### **Tech Stack**

-   **Frontend:** React (Vite) + Tailwind CSS\
-   **Backend:** Node.js + Express\
-   **Database:** PostgreSQL (using `pg` for pooled connections)\
-   **Libraries:** `nanoid` (short codes), `validator` (URL validation),
    `date-fns` (timestamp formatting)

------------------------------------------------------------------------

## 🛠️ API Specification (Backend)

The backend follows a RESTful design and implements the required API
endpoints.

  ----------------------------------------------------------------------------------
  Method     Path                 Description                             Status
                                                                          Codes
  ---------- -------------------- --------------------------------------- ----------
  `GET`      `/healthz`           Health check                            `200 OK`

  `POST`     `/api/links`         Create a new short link (`url`,         `201`,
                                  `shortCode`)                            `400`,
                                                                          `409`

  `GET`      `/api/links`         List all links                          `200 OK`

  `GET`      `/api/links/:code`   Retrieve stats for a specific short     `200`,
                                  link                                    `404`

  `DELETE`   `/api/links/:code`   Delete a link by short code             `204`,
                                                                          `404`

  `GET`      `/:code`             Redirect feature + increment click      `302`,
                                  count                                   `404`
  ----------------------------------------------------------------------------------

------------------------------------------------------------------------

## ⚙️ Setup and Deployment

### **1. Database**

The project uses a PostgreSQL database (Neon/Render recommended).

**Schema:**

``` sql
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    short_code VARCHAR(8) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    clicks INT DEFAULT 0,
    last_clicked_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

------------------------------------------------------------------------

### **2. Backend Setup**

1.  Go to the `backend/` directory.\

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Create a `.env` file using `.env.example` as reference.\

4.  Run in development (requires `nodemon`):

    ``` bash
    npm run dev
    ```

------------------------------------------------------------------------

### **3. Frontend Setup**

1.  Go to the `frontend/` directory.\

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Update the `BACKEND_URL` inside `frontend/src/App.jsx`.\

4.  Run in development:

    ``` bash
    npm run dev
    ```

------------------------------------------------------------------------

### **4. Deployment**

-   **Backend:** Vercel (Web Service)\
-   **Frontend:** Vercel\
-   Ensure the backend has the correct `DATABASE_URL` environment
    variable.

------------------------------------------------------------------------
You can check out the full demonstration video here: [Tiny Link project demonstration, 2025](https://www.youtube.com/watch?v=0iOXZDEl86M)