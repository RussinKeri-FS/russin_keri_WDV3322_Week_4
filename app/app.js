const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('../api/routes/userRouter');
require('dotenv').config();
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('../config/swaggerOptions.json');

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


console.log(swaggerDocs);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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
mongoose.connect(process.env.MONGODBURL, (err) => {
  if (err) {
    console.error('Error: ', err.message);
  } else {
    console.log('MongoDB Connection is Successful');
  }
});

module.exports = app;