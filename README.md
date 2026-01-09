## TypingTest

A full‑stack typing speed test app built with React + Vite on the frontend and Node/Express + MongoDB on the backend. Users can register/login, take a timed typing test, view their WPM/accuracy, and (optionally) save results to a leaderboard.

---

## Features

- Timed typing test with live countdown and per‑character highlighting
- WPM, mistakes, and accuracy calculation
- User registration and login (JWT‑based auth on the backend)
- Saving test results for each user
- Leaderboard that shows top users by best WPM

---

## Tech Stack

- Frontend: React 18, Vite, React Router
- Backend: Node.js, Express, Mongoose, JSON Web Tokens
- Database: MongoDB (local instance at `mongodb://localhost:27017/typingtest`)

---

## Prerequisites

- Node.js (recommended 18+)
- npm (comes with Node)
- A running MongoDB instance on your machine listening on `mongodb://localhost:27017`

On macOS with Homebrew, you can install and start MongoDB Community Edition roughly as:

- `brew tap mongodb/brew`
- `brew install mongodb-community`
- `brew services start mongodb-community`  (runs MongoDB in the background)

If you prefer to run it manually instead of as a service, you can do:

- `mongod --config /opt/homebrew/etc/mongod.conf`  (Apple Silicon default)
	- or on Intel Macs: `mongod --config /usr/local/etc/mongod.conf`

To verify MongoDB is running and the `typingtest` database is reachable:

- `mongosh`
- In the shell:
	- `show dbs`
	- `use typingtest`
	- `db.stats()`

---

## Setup

From your terminal:

1. Clone the repository (if you haven’t already) and enter it:
	- `git clone https://github.com/Amfer7/TypingTest.git`
	- `cd TypingTest`

2. Install frontend/root dependencies (Vite + React, etc.):
	- `npm install`

3. Install backend dependencies:
	- `cd backend`
	- `npm install`
	- `cd ..` (go back to the project root)

---

## Running the App (Development)

You’ll run the backend and frontend in separate terminals.

### 1. Start MongoDB

Make sure your MongoDB server is running and accessible at:

- `mongodb://localhost:27017/typingtest`

### 2. Start the Backend API

From the project root:

1. `cd backend`
2. (Optional but recommended) set a JWT secret for login tokens:
	- On macOS/zsh: `export JWT_SECRET="your_strong_secret_here"`
3. Start the Express server:
	- `npm start`

The backend will listen on:

- `http://localhost:5002`

### 3. Start the Frontend (Vite Dev Server)

In a new terminal window, from the project root (`TypingTest`):

1. Ensure you are in the root folder (not `backend`).
2. Run the dev server:
	- `npm run dev`

By default Vite will start on something like:

- `http://localhost:5173`

Open the URL printed by Vite in your browser to use the app.

> Note: Some frontend API calls (for example the leaderboard) currently assume the API is reachable under the same origin as the frontend. In development, your backend runs on port `5002`, so you may want to either:
>
> - Use full URLs like `http://localhost:5002/api/leaderboard` in your Axios calls, or
> - Configure a Vite dev proxy in `vite.config.js` so `/api/*` requests are forwarded to `http://localhost:5002`.

---

## Available npm Scripts

From the project root:

- `npm run dev` – Run the Vite development server
- `npm run build` – Create a production build of the frontend
- `npm run preview` – Preview the built frontend locally

From the `backend` folder:

- `npm start` – Start the Express API server on port 5002

---

## API Overview (Backend)

The Express server (port 5002) exposes the following endpoints:

- `POST /register` – Register a new user
  - Body: `{ "username": string, "password": string }`

- `POST /login` – Log in an existing user
  - Body: `{ "username": string, "password": string }`
  - Returns: `{ token: string }` (JWT)

- `POST /results` – Save a typing test result for a user
  - Body: `{ "userId": ObjectId, "wpm": number, "mistakes": number, "accuracy": number }`

- `GET /results/:userId` – Get all saved results for a user

- `GET /api/leaderboard` – Get top users with their best WPM scores

---

## How to Use

1. Start MongoDB, the backend, and the frontend as described above.
2. In the browser, register a new account and log in.
3. Start a typing test: type the highlighted text until the timer runs out.
4. When time is up, check your WPM, mistakes, and accuracy on the results screen.
5. Choose to save results and view the leaderboard (once wired up, this uses the `/api/leaderboard` endpoint).

---

## Building for Production

To build the frontend bundle:

- `npm run build`

To locally preview the built frontend:

- `npm run preview`

You can then serve the `dist` folder contents with any static file server and point it at your running backend API.

---

## Notes

- The backend currently defaults to `JWT_SECRET = "your_jwt_secret"` if you don’t set the environment variable. For real deployments, always set a strong secret.
- All MongoDB connection details are currently hardcoded in `backend/server.js` (`mongodb://localhost:27017/typingtest`). Adjust this for hosted databases or different environments.
