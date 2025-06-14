# Train Company Web Application

This repository contains the lab assignments for the Web Programming course. The project includes various web applications and middleware functionalities implemented using Node.js, Express, and MySQL.


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Henrik-13/TrainCompanyWebApp.git
    cd bhim2208
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Create the database and tables by running the SQL script `setup.sql` in your MySQL server.

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:8080`.

## Project Structure

- `api/`: Contains the API routes and handlers.
- `db/`: Contains the database connection and query functions.
- `middleware/`: Contains the middleware functions for validation, logging, and session management.
- `public/`: Contains the static files (HTML, CSS, JS) for the web applications.
- `routes/`: Contains the route handlers for the web applications.
- `static/`: Contains additional static files.
- `views/`: Contains the EJS templates for rendering HTML pages.
- `index.js`: The main entry point of the application.

## Scripts

- `npm start`: Starts the server.
- `npm run watch`: Starts the server with `nodemon` for automatic restarts on file changes.

## Dependencies

- `bcrypt`: For hashing passwords.
- `body-parser`: For parsing request bodies.
- `ejs`: For rendering HTML templates.
- `express`: For creating the web server.
- `express-session`: For managing user sessions.
- `morgan`: For logging HTTP requests.
- `mysql2`: For connecting to the MySQL database.
