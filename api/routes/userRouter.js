const express = require('express');
const { connect, findUser, saveUser, disconnect } = require('../../db/db');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');
const mongoose = require('mongoose');
require('dotenv').config();



router.use(express.json());

router.get("/profile", (req, res, next) => {
    res.status(200).json({
      message: "User Profile - GET",
  });
});  

router.post('/signup', (req, res, next) => {
  // find user email
  findUser(req.body.email)
  // user found run error
  .then((result) => {
    if (result) {
      return res.status(409).json({
        message: 'User Exists',
      });
    } else {
      // encrypt password
      const password = req.body.password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          // create new user object
          const user = new User({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address:req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            email: req.body.email,
            password: hash,
          });
          // save new user
          saveUser(user)
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: 'Signup Successful',
              method: req.method,
              user,
            });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({
              error: {
                message: err.message,
              },
            });
          });
        }
      });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: {
        message: 'Save Unsuccessful',
      },
    });
  });
});
  
router.post('/login', (req, res, next) => {
  // find user email
  findUser(req.body.email)
  .then((user) => {
    // if user not found
    if(!user) {
    // return error message
      res.status(401).json({
        message: 'Unauthorized'
      })
     //compare passwords 
    }  else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
      // test error
        if(err) return res.status(501).json({ message: err.message });
      // test result
        if(user) {
      // message authorization successful
          res.status(200).json({
            message: 'Login Successful',
            method: req.method,
            firstName: user.firstName,
            lastName: user.lastName,
          });
        } else {
          res.status(401).json({
            message: 'Authorization Failed',
            result: result,
          });
        }
      });
    }
  });
  }); 



  module.exports = router;