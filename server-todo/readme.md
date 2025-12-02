## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
4. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
   - [Step 1: Set Up the Main Application Entry Point](#step-1-set-up-the-main-application-entry-point)
   - [Step 2: Create the Database Model](#step-2-create-the-database-model)
   - [Step 3: Implement the Controller Functions](#step-3-implement-the-controller-functions)
   - [Step 4: Set Up the API Routes](#step-4-set-up-the-api-routes)
5. [Testing Your Implementation](#testing-your-implementation)
6. [Troubleshooting](#troubleshooting)

## Project Overview

This is a Vocabulary Builder backend API that provides RESTful endpoints for managing English-German word pairs. The API allows clients to:
- View all vocabulary words
- View a single vocabulary word by ID
- Create new vocabulary words
- Update existing vocabulary words
- Delete vocabulary words

The backend uses:
- **Node.js** with **Express.js** framework
- **MongoDB** database with **Mongoose** ODM
- **CORS** middleware for cross-origin requests

## Prerequisites

Before starting, make sure you have:
- Node.js (version 14 or higher) installed
- npm (comes with Node.js) installed
- MongoDB installed and running locally
- A basic understanding of JavaScript (ES6+)
- A basic understanding of Express.js and REST APIs
- A basic understanding of MongoDB and Mongoose

## Project Setup

1. **Navigate to the server-todo directory:**
   ```bash
   cd server-todo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This will install:
   - `express` - Web framework for Node.js
   - `mongoose` - MongoDB object modeling tool
   - `cors` - Cross-Origin Resource Sharing middleware

3. **Make sure MongoDB is running:**
   - Start your MongoDB service
   - The default connection string is: `mongodb://localhost:27017/vocab-builder`
   - If your MongoDB is configured differently, update the connection string in `app.js`

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```
   
   The server will be running on `http://localhost:3000`

## Step-by-Step Implementation Guide

### Step 1: Set Up the Main Application Entry Point

**File:** `app.js`

**Objective:** Initialize the Express server, configure middleware, connect to MongoDB, and set up routes.

**Tasks:**
1. Import Express and create an app instance
2. Configure CORS middleware
3. Configure body parsing middleware
4. Connect to MongoDB using Mongoose
5. Import and register routes
6. Start the server

**Implementation:**
```javascript
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/vocab-builder"
mongoose.connect(db)
   .then(console.log('Connect DB succeed !'))
   .catch(err => console.log('Connect db failed ! ' + err))

const router = require("./api/routes/vocabRoute")
router(app)

const port = 3000

app.listen(port, () => {
   console.log("Server is running at http://localhost:" + port)
})
```

**Explanation:**
- `express()` creates an Express application instance
- `app.use(cors())` enables CORS for all routes
- `express.json()` and `express.urlencoded()` parse request bodies
- `mongoose.connect()` establishes connection to MongoDB
- Routes are registered by calling the router function with the app
- `app.listen()` starts the server on the specified port

---

### Step 2: Create the Database Model

**File:** `api/models/vocabModel.js`

**Objective:** Define the MongoDB schema and model for vocabulary words.

**Tasks:**
1. Import mongoose
2. Define the schema with required fields
3. Create and export the model

**Implementation:**
```javascript
const mongoose = require('mongoose')
const VocabSchema = mongoose.Schema(
   {
      english: {
         type: String,
         required: true,
         errorMessage: "English word is required"
      },
      german: {
         type: String,
         required: true,
         errorMessage: "German word is required"
      },
   },
   {
      versionKey: false,
      timestamps: true
   }
)
const Vocab = mongoose.model("vocabs", VocabSchema)
module.exports = Vocab
```

**Explanation:**
- `mongoose.Schema()` defines the structure of documents
- `required: true` makes fields mandatory
- `versionKey: false` disables the `__v` version key
- `timestamps: true` automatically adds `createdAt` and `updatedAt` fields
- `mongoose.model()` creates a model from the schema
- The model name "vocabs" becomes the collection name in MongoDB

---

### Step 3: Implement the Controller Functions

**File:** `api/controllers/vocabController.js`

**Objective:** Implement CRUD operations for vocabulary words.

**Tasks:** Implement 5 controller functions:
1. `viewAllVocabs` - Get all vocabulary words
2. `createVocab` - Create a new vocabulary word
3. `viewVocabById` - Get a single vocabulary word by ID
4. `updateVocab` - Update an existing vocabulary word
5. `deleteVocab` - Delete a vocabulary word

**Implementation Pattern:**
Each function follows this pattern:
```javascript
const functionName = async (req, res) => {
   try {
      // Operation logic here
      res.status(statusCode).json(data)
   } catch (err) {
      res.status(errorCode).send(err)
   }
}
```

**Complete Implementation:**
```javascript
const Vocab = require('../models/vocabModel')

const viewAllVocabs = async (req, res) => {
   try {
      const vocabs = await Vocab.find().sort({ _id: -1 })
      res.json(vocabs)
   } catch (err) {
      res.status(500).send(err)
   }
}

const createVocab = async (req, res) => {
   try {
      const vocab = new Vocab(req.body)
      await vocab.save()
      res.status(201).json(vocab)
   } catch (err) {
      res.status(400).send(err)
   }
}

const viewVocabById = async (req, res) => {
   try {
      const vocab = await Vocab.findById(req.params.id)
      if (!vocab) {
         return res.status(404).send('Vocab not found')
      }
      res.json(vocab)
   } catch (err) {
      res.status(500).send(err)
   }
}

const updateVocab = async (req, res) => {
   try {
      const vocab = await Vocab.findByIdAndUpdate(req.params.id, req.body)
      if (!vocab) {
         return res.status(404).send('Vocab not found')
      }
      res.json(vocab)
   } catch (err) {
      res.status(400).send(err)
   }
}

const deleteVocab = async (req, res) => {
   try {
      const vocab = await Vocab.findByIdAndDelete(req.params.id)
      if (!vocab) {
         return res.status(404).send('Vocab not found')
      }
      res.json(vocab)
   } catch (err) {
      res.status(500).send(err)
   }
}

module.exports = {
   viewAllVocabs,
   viewVocabById,
   createVocab,
   updateVocab,
   deleteVocab
}
```

**Explanation:**
- All functions are `async` because database operations are asynchronous
- `try/catch` blocks handle errors gracefully
- `Vocab.find()` retrieves all documents
- `Vocab.findById()` retrieves a document by ID
- `new Vocab()` creates a new document instance
- `vocab.save()` saves the document to the database
- `Vocab.findByIdAndUpdate()` updates a document
- `Vocab.findByIdAndDelete()` deletes a document
- Status codes: 200 (OK), 201 (Created), 404 (Not Found), 400 (Bad Request), 500 (Server Error)

---

### Step 4: Set Up the API Routes

**File:** `api/routes/vocabRoute.js`

**Objective:** Define RESTful API endpoints and map them to controller functions.

**Tasks:**
1. Import the controller
2. Create a route function that takes the app as parameter
3. Define routes using `app.route()`
4. Export the route function

**Implementation:**
```javascript
const VocabController = require("../controllers/vocabController")

const VocabRoute = (app) => {
   app.route('/vocabs')
      .get(VocabController.viewAllVocabs)
      .post(VocabController.createVocab)

   app.route('/vocabs/:id')
      .get(VocabController.viewVocabById)
      .put(VocabController.updateVocab)
      .delete(VocabController.deleteVocab)
}

module.exports = VocabRoute
```

**Explanation:**
- `app.route()` allows chaining HTTP method handlers
- `/vocabs` handles collection-level operations (GET all, POST new)
- `/vocabs/:id` handles item-level operations (GET, PUT, DELETE by ID)
- `:id` is a route parameter accessible via `req.params.id`
- HTTP methods map to CRUD operations:
  - GET = Read
  - POST = Create
  - PUT = Update
  - DELETE = Delete

---

## Testing Your Implementation

After completing all steps:

1. **Start MongoDB** (if not already running):
   ```bash
   # On Windows (if installed as service, it should start automatically)
   # On Mac/Linux: mongod
   ```

2. **Start the server:**
   ```bash
   cd server-todo
   npm run dev
   ```

3. **Test the API endpoints** using a tool like Postman, curl, or your frontend:

   **Get all vocabs:**
   ```bash
   GET http://localhost:3000/vocabs
   ```

   **Create a new vocab:**
   ```bash
   POST http://localhost:3000/vocabs
   Content-Type: application/json
   
   {
     "english": "Hello",
     "german": "Hallo"
   }
   ```

   **Get a vocab by ID:**
   ```bash
   GET http://localhost:3000/vocabs/{id}
   ```

   **Update a vocab:**
   ```bash
   PUT http://localhost:3000/vocabs/{id}
   Content-Type: application/json
   
   {
     "english": "Goodbye",
     "german": "Auf Wiedersehen"
   }
   ```

   **Delete a vocab:**
   ```bash
   DELETE http://localhost:3000/vocabs/{id}
   ```

4. **Check the server console** for connection messages and any errors

5. **Verify database** - Check MongoDB to see if data is being stored correctly

## Troubleshooting

### Common Issues:

1. **"Cannot find module" errors:**
   - Make sure you've run `npm install`
   - Check that all file paths in `require()` statements are correct
   - Verify file names match (case-sensitive on some systems)

2. **MongoDB connection errors:**
   - Ensure MongoDB is installed and running
   - Check the connection string in `app.js`
   - Verify MongoDB is listening on the default port (27017)
   - Try connecting with MongoDB Compass or `mongo` shell

3. **Port already in use:**
   - Change the port number in `app.js`
   - Or stop the process using port 3000

4. **CORS errors (when testing from browser):**
   - Verify `cors` middleware is configured in `app.js`
   - Check that `app.use(cors())` is called before routes

5. **404 errors on API calls:**
   - Verify routes are properly registered in `app.js`
   - Check that route paths match the client's API calls
   - Ensure the server is running

6. **Validation errors:**
   - Check that request body includes required fields (`english`, `german`)
   - Verify Content-Type header is `application/json`

7. **Async/await errors:**
   - Make sure all controller functions are marked as `async`
   - Use `await` for all database operations
   - Wrap database operations in try/catch blocks

### Getting Help:

- Check the server console for error messages
- Use Postman or similar tools to test API endpoints directly
- Compare your code with the working version in the `server` directory
- Review Express.js and Mongoose documentation
- Check MongoDB logs for database-related issues

## API Endpoints Summary

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/vocabs` | Get all vocabulary words | - | Array of vocab objects |
| POST | `/vocabs` | Create a new vocabulary word | `{english, german}` | Created vocab object |
| GET | `/vocabs/:id` | Get a vocabulary word by ID | - | Vocab object |
| PUT | `/vocabs/:id` | Update a vocabulary word | `{english, german}` | Updated vocab object |
| DELETE | `/vocabs/:id` | Delete a vocabulary word | - | Deleted vocab object |

## Next Steps

After completing this tutorial, you can:
- Add input validation and sanitization
- Add authentication and authorization
- Add pagination for the list endpoint
- Add search/filter functionality
- Add error handling middleware
- Add request logging
- Add API documentation (Swagger/OpenAPI)
- Deploy to a cloud platform

Good luck with your learning journey! 🚀

