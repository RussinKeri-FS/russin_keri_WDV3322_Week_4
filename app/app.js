const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('../api/routes/userRouter');

// add middleware
app.use(cors());

// add middleware for json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  res.status(200).json({
    message: 'Server is running!',
    metadata: {
      method: req.method,
      hostname: req.hostname,
    },
  });
});

// routes
app.use('/users', userRouter);

// add middleware to store bad URL and errors
app.use((req, res, next) => {
  const error = new Error('Not Found!');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

// Mongoose connection to MongoDB

module.exports = app;