## Multi-Tenant SaaS Notes Application
This is a secure and scalable backend API for multi-tanants (companies basically) Software-as-a-Service (SaaS) application. 
The system is designed to serve multiple companies from a single instance.

### Key Features
**Multi-Tenant Architecture:** It utilizes a shared schema with a tenantId on all relevant documents, such as members, admins and so, to ensure complete and secure data segregation between client companies.

**JWT Authentication & Authorization:** Implements a secure login system using JSON Web Tokens.

**Full RESTful API for Notes:** Provides complete CRUD (Create, Read, Update, Delete) functionality for managing notes, with all endpoints protected and tenant-aware.

**Subscription Gating**: Enforces business logic by limiting resource creation based on a tenant's subscription plan (e.g., "Free" plan users are limited to 3 notes).

### 1. Clone the Repository

### 2. Install Dependencies
```bash
npm install
```


### 3. Set Up Environment Variables
Create a `.env` file in the root of the project and add the following variables. Replace the values with your own.

```env
Your MongoDB connection string from Atlas with your password
MONGODB_URI=mongodb+srv://...

A long, random, and secret string for signing JWTs, you can either make your own random key, or just use any random JWT key generator sites; there are plenty of them.
JWT_SECRET=yourSuperSecretStringGoesHere
```

### 4. Seed the Database
This command will populate your database with the initial tenants and test users. **Run this only once.**

```bash
npm run seed
```

### 5. Start the Development Server
This will start the server using `nodemon`, which will automatically restart on file changes.

```bash
npm run dev
```
The server will be running on the port you've configured (e.g., `http://localhost:3000`).

---

## API Endpoints

`POST /notes – Create a note`

`GET /notes – List all notes for the current tenant`

`GET /notes/:id – Retrieve a specific note`

`PUT /notes/:id – Update a note`

`DELETE /notes/:id – Delete a note`

### Authentication

- **`POST /api/auth/login`**
  - Authenticates a user and returns a JWT.
  - **Request Body:**
    ```json
    {
      "email": "user@acme.test",
      "password": "password"
    }
    ```
  - **Success Response (200 OK):**
    ```json
    {
      "token": "inv492nvwoe32cf..."
    }
    ```

### Health Check

- **`GET /health`**
  - A simple endpoint to check if the server is running.
  - **Success Response (200 OK):**
    ```json
    {
      "status": "ok"
    }
    ```

---

## Mandatory Test Accounts

All test accounts use the password: `password`

| Email             | Role   | Tenant |
| ----------------- | ------ | ------ |
| `admin@acme.test` | Admin  | Acme   |
| `user@acme.test`  | Member | Acme   |
| `admin@globex.test`| Admin  | Globex |
| `user@globex.test` | Member | Globex |


