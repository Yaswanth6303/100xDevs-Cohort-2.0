# Todo Backend API

A RESTful API for managing todos built with Express.js, MongoDB, and Zod validation.

## 🏗️ Project Structure

```
src/
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   └── todoController.js    # Todo business logic
├── middleware/
│   └── validation.js        # Request validation middleware
├── models/
│   └── Todo.js             # Mongoose Todo model
├── routes/
│   └── todoRoutes.js       # Todo API routes
├── types/
│   └── todoTypes.js        # Zod validation schemas
├── utils/                  # Utility functions (future use)
├── app.js                  # Express app configuration
└── server.js              # Server entry point
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   Bun (recommended for development)
-   MongoDB Atlas account

### Installation

1. Clone the repository
2. Install dependencies:

    ```bash
    bun install
    # or
    npm install
    ```

3. Set up environment variables:

    ```bash
    # Create .env file
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
    NODE_ENV=development
    PORT=3000
    FRONTEND_URL=http://localhost:5173
    ```

    **⚠️ Security Note:** Never commit your actual database credentials to version control. Use environment variables for sensitive information.

### Running the Application

**Development mode:**

```bash
bun run dev
```

**Production mode:**

```bash
bun run start
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint           | Description            | Body                     |
| ------ | ------------------ | ---------------------- | ------------------------ |
| GET    | `/health`          | Health check           | -                        |
| POST   | `/todos`           | Create a new todo      | `{ title, description }` |
| GET    | `/todos`           | Get all todos          | -                        |
| PUT    | `/todos/completed` | Mark todo as completed | `{ _id }`                |

### Example Requests

**Create Todo:**

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express", "description": "Study Express.js framework"}'
```

**Get All Todos:**

```bash
curl http://localhost:3000/api/todos
```

**Mark Todo as Completed:**

```bash
curl -X PUT http://localhost:3000/api/todos/completed \
  -H "Content-Type: application/json" \
  -d '{"_id": "todo_id_here"}'
```

## 🛠️ Technologies Used

-   **Express.js** - Web framework
-   **MongoDB** - Database
-   **Mongoose** - ODM for MongoDB
-   **Zod** - Schema validation
-   **CORS** - Cross-origin resource sharing
-   **Bun** - JavaScript runtime (optional)

## 📝 Features

-   ✅ Create todos with title and description
-   ✅ Fetch all todos
-   ✅ Mark todos as completed
-   ✅ Input validation with Zod
-   ✅ Error handling middleware
-   ✅ CORS support
-   ✅ Health check endpoint
-   ✅ Proper folder structure
-   ✅ Separation of concerns

## 🔧 Development

### Linting

```bash
bun run lint
bun run lint:fix
```

### Project Structure Benefits

-   **Modularity**: Each component has its own responsibility
-   **Scalability**: Easy to add new features and routes
-   **Maintainability**: Clear separation of concerns
-   **Testability**: Controllers and middleware can be easily tested
-   **Reusability**: Middleware and utilities can be reused across routes

## 📄 License

ISC
