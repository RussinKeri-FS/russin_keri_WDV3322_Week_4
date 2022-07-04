const express = require('express');

const router = express.Router();

router.use(express.json());

router.get("/profile", (req, res) => {
    res.status(200).json({
      message: "User Profile - GET",
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  });
  
  router.post("/signup", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    res.status(200).json({
      message: "User Signup - POST",
      metadata: {
        hostname: req.hostname,
        method: req.method,
        firstName: firstName,
        lastName: lastName,
      },
    });
  });
  
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    res.status(200).json({
      message: "User Login - POST",
      metadata: {
        hostname: req.hostname,
        method: req.method,
        email: email,
        password: password,
      },
    });
  });
  
  module.exports = router;