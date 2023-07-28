const express = require('express');
const dotenv = require('dotenv').config();
const usersRoute = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 8000;

// Connect to db
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', usersRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
