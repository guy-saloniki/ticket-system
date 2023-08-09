# Support Ticket System - MERN Stack Project

Full stack web app built using MERN (MongoDB, Express, React, Node). This app includes backend authentication using JWT, front end authentication (Login, Register, Logout), tickets and notes functionallity and more. The UI has created using React & Custom CSS, and state management with Redux & Redux Toolkit.

## Website

https://support-ticket-system-hubc.onrender.com

## Features

- Backent & Frontend authentication
- Adding & Closing tickets
- Changing ticket status
- User profile with user ticket options
- Adding notes to a ticket
- Update & Delete tickets

## Usage

- Create a MongoDB database and obtain your `MongoDB URI`

## Env Variables

Create an `.env` file and add the following:

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = your jwt secret
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
