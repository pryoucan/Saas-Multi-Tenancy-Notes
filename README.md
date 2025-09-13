## Multi-Tenant SaaS Notes Application

This project is a multi-tenant Software-as-a-Service (SaaS) application designed to allow different companies (tenants) to manage their notes securely. It features role-based access control, tenant isolation, and subscription plan limits for the members.

### Features Implemented So Far
- **Database Setup:** This is the mongoose schemas for Tenants, Users, and Notes.
- **Database Seeding:** To populate the database with initial tenants (Acme, Globex) and the four required test users.
- **User Authentication:** Secure user login via a `POST /api/auth/login` endpoint using JWT for session management.
- **Password Hashing:** Passwords are automatically and securely hashed using `bcryptjs` before being saved to the database using `mongoose pre-save middleware`.

### 1. Clone the Repository

### 2. Install Dependencies
```bash
npm install
```


### 3. Set Up Environment Variables
Create a `.env` file in the root of the project and add the following variables. Replace the values with your own.

```env
# Your MongoDB connection string from Atlas with your password
MONGODB_URI=mongodb+srv://...

# A long, random, and secret string for signing JWTs, you can either make your own random key, or just use any random JWT key generator sites; there are plenty of them.
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

## API Endpoints (Currently Available)

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
