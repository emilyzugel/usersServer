# User Management API Server

A RESTful API server for user management built with Node.js, Express, and MongoDB.

## Features

- Create new users
- Retrieve all users
- Find user by ID
- Update user information
- Delete users
- CORS enabled for frontend integration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Environment Variables:** dotenv
- **CORS:** Cross-origin resource sharing

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user by ID |
| DELETE | `/users/:id` | Delete user by ID |

## Request/Response Examples

**Create User (POST /users)**
```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "age": 25
}
