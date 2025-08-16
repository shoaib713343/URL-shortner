
# URL Shortener

A simple and efficient URL shortening service built with Node.js and Express. This application allows you to convert long URLs into short, manageable links that redirect to the original address.

## Table of Contents

  - [Features]
  - [Tech Stack]
  - [Project Structure]
  - [Getting Started]
      - [Prerequisites]
      - [Installation]
  - [Configuration]
  - [API Endpoints]
  - [Contributing]

## Features

  - **Shorten Long URLs**: Create a short, unique alias for any long URL.
  - **URL Redirection**: Shortened links seamlessly redirect to the original URL.
  - **Docker Support**: Comes with a `docker-compose.yml` file for easy setup and deployment using containers.
  - **Scalable Architecture**: Organized into services, routes, and models for maintainability.
  - **Database ORM**: Uses Drizzle ORM for efficient database interactions.

## Tech Stack

  - **Backend**: Node.js, Express.js
  - **Database**: PostgreSQL / MySQL / SQLite (configurable via Drizzle)
  - **ORM**: Drizzle ORM
  - **Containerization**: Docker

## Project Structure

The project follows a standard MVC-like (Model-View-Controller) architecture to keep the codebase organized and maintainable.

```
/
├── db/              # Database migrations and seed files
├── middlewares/     # Custom Express middleware (e.g., for logging, auth)
├── models/          # Data models (e.g., URL schema)
├── routes/          # API route definitions
├── services/        # Business logic and service layer
├── utils/           # Utility functions
├── validations/     # Request data validation schemas/logic
├── .gitignore       # Git ignore file
├── docker-compose.yml # Docker Compose configuration
├── drizzle.config.js # Drizzle ORM configuration
├── index.js         # Main application entry point
└── package.json     # Project dependencies and scripts
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  - [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
  - [npm](https://www.npmjs.com/)
  - [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (Optional, for containerized setup)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/shoaib713343/URL-shortner.git
    cd URL-shortner
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project and add the necessary configuration. See the [Configuration](https://www.google.com/search?q=%23configuration) section below.

4.  **Run Database Migrations:**

    ```bash
    npx drizzle-kit migrate:pg
    ```

    *(Note: The command might change based on your chosen database driver in `drizzle.config.js`)*

5.  **Start the server:**

    ```bash
    npm start
    ```

    The application should now be running on `http://localhost:3000` (or the port you configured).

## Configuration

Create a `.env` file in the root directory and add the following environment variables. Replace the values with your actual configuration.

```env
# Application Configuration
PORT=3000
BASE_URL=http://localhost:3000

# Database Configuration (Example for PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=url_shortener_db
DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/url_shortener_db"
```

## API Endpoints

The following are the main API endpoints provided by the service.

#### `POST /api/shorten`

Creates a new short URL.

  - **Request Body:**

    ```json
    {
      "originalUrl": "https://www.example.com/a-very-long-url-to-be-shortened"
    }
    ```

  - **Success Response (201 Created):**

    ```json
    {
      "originalUrl": "https://www.example.com/a-very-long-url-to-be-shortened",
      "shortUrl": "http://localhost:3000/aBc12D",
      "shortCode": "aBc12D"
    }
    ```

#### `GET /{shortCode}`

Redirects the user to the original URL associated with the `shortCode`.

  - **Example:** Navigating to `http://localhost:3000/aBc12D` will redirect the browser to `https://www.example.com/a-very-long-url-to-be-shortened`.

## Contributing

Contributions are welcome\! If you have suggestions for improving this project, please feel free to open an issue or submit a pull request.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
