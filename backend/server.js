const express = require('express');
const dotenv = require('dotenv').config();
const usersRoute = require('./routes/userRoutes');
const ticketRoute = require('./routes/ticketRoutes');
const notesRoute = require('./routes/noteRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const path = require('path');

const PORT = process.env.PORT || 8000;

// Connect to db
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', usersRoute);
app.use('/api/tickets', ticketRoute);
app.use('/api/notes', notesRoute);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
}

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
