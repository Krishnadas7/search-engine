# Book Search Engine API - NestJS Backend

## Repository
[GitHub Repository](https://github.com/Krishnadas7/search-engine)

## Environment Variables
Create a `.env` file in the root directory and add the following:
```
PORT=3000
DB_URL=your_mongodb_connection_string
```

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Krishnadas7/search-engine.git
   cd search-engine
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   npm run debug for nodemon || npm run start
   ```

## API Documentation
Swagger UI is available at:
[http://localhost:3000/api](http://localhost:3000/api)

## Base URL
```
http://localhost:3000/api/v1/book
```

## Endpoints

### 1. Create a Book
**Endpoint:** `POST /`

**Description:** Creates a new book entry.

**Request Body:**
```json
{
  "title": "string",
  "author": "string",
  "publishedYear": "number",
  "genre": "string"
}
```

**Responses:**
- **201 CREATED**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Book created successfully"
  }
  ```
- **409 CONFLICT (If the book already exists)**
  ```json
  {
    "success": false,
    "statusCode": 409,
    "message": "Book already exists"
  }
  ```
- **500 INTERNAL SERVER ERROR**
  ```json
  {
    "success": false,
    "statusCode": 500,
    "message": "Book creation failed",
    "error": "Error message"
  }
  ```

### 2. Get All Books
**Endpoint:** `GET /`

**Description:** Retrieves all books from the database.

**Responses:**
- **200 OK**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Books retrieved successfully",
    "data": [
      {
        "_id": "string",
        "title": "string",
        "author": "string",
        "publishedYear": "number",
        "genre": "string"
      }
    ]
  }
  ```
- **500 INTERNAL SERVER ERROR**
  ```json
  {
    "success": false,
    "statusCode": 500,
    "message": "Failed to retrieve books",
    "error": "Error message"
  }
  ```

### 3. Search Book by Title
**Endpoint:** `GET /bookSearch?title={title}`

**Description:** Searches for books based on title.

**Parameters:**
- `title` (string, required): The title of the book to search for.

**Responses:**
- **200 OK**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Books retrieved successfully",
    "data": [
      {
        "_id": "string",
        "title": "string",
        "author": "string",
        "publishedYear": "number",
        "genre": "string"
      }
    ]
  }
  ```
- **500 INTERNAL SERVER ERROR**
  ```json
  {
    "success": false,
    "statusCode": 500,
    "message": "Search failed",
    "error": "Error message"
  }
  ```

