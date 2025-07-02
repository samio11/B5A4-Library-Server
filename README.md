# Library Management API

This repository contains the backend API for a library management system. The API supports operations for managing books, borrowers, and borrow transactions. It is designed to handle typical library functions like creating, updating, deleting, and retrieving books and borrow records.

## API Overview

### Base URL:
The API is hosted on [Vercel](https://b5-a4-library-server.vercel.app) for production use. The local development URL is `http://localhost:5000`.

### Endpoints:

#### 1. **Book Management**
- **Create Book**
  - **URL**: `/api/book/create-book`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "title": "The Alchemist",
      "author": "Paulo Coelho",
      "genre": "FICTION",
      "isbn": "9780061122415",
      "description": "A philosophical story about following your dreams.",
      "copies": 15
    }
    ```
  - **Description**: Adds a new book to the library system.

- **Get All Books**
  - **URL**: `/api/book/books`
  - **Method**: `GET`
  - **Description**: Fetches a list of all books in the library.

- **Get A Book**
  - **URL**: `/api/book/book/{bookId}`
  - **Method**: `GET`
  - **Description**: Retrieves detailed information about a specific book.

- **Update Book**
  - **URL**: `/api/book/edit-book/{bookId}`
  - **Method**: `PATCH`
  - **Request Body**:
    ```json
    {
      "copies": 12
    }
    ```
  - **Description**: Updates the book's details, such as the number of available copies.

- **Delete Book**
  - **URL**: `/api/book/delete-book/{bookId}`
  - **Method**: `DELETE`
  - **Request Body**:
    ```json
    {
      "copies": 12
    }
    ```
  - **Description**: Deletes a specific book from the system.

#### 2. **Borrow Management**
- **Create Borrow**
  - **URL**: `/api/borrow/{bookId}`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "quantity": 1,
      "dueDate": "25-08-2025"
    }
    ```
  - **Description**: Creates a borrow record for a book.

- **Borrow Summary**
  - **URL**: `/api/borrow/borrow-summary`
  - **Method**: `GET`
  - **Description**: Retrieves the summary of all borrow records.

- **Get All Borrows**
  - **URL**: `/api/borrow/borrows`
  - **Method**: `GET`
  - **Description**: Fetches a list of all borrow transactions.

- **Get A Borrow**
  - **URL**: `/api/borrow/borrow/{borrowId}`
  - **Method**: `GET`
  - **Description**: Retrieves detailed information about a specific borrow record.

- **Update Borrow**
  - **URL**: `/api/borrow/edit-borrow/{borrowId}`
  - **Method**: `PATCH`
  - **Request Body**:
    ```json
    {
      "dueDate": "27-08-2024"
    }
    ```
  - **Description**: Updates the due date for a borrow record.

- **Delete Borrow**
  - **URL**: `/api/borrow/delete-borrow/{borrowId}`
  - **Method**: `DELETE`
  - **Description**: Deletes a specific borrow record.

## Authentication

Currently, the API does not include authentication or authorization mechanisms. Ensure that only authorized users can access sensitive endpoints in a production environment.

## Running Locally

To run the server locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
