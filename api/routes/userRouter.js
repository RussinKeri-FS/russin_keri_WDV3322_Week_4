const express = require("express");
const { connect, findUser, saveUser, disconnect } = require("../../db/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/user");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const checkAuth = require("../../auth/checkAuth");

/**
 * @swagger
 * tags:
 *  name: User Post
 *  description: This is for the user posts
 * /users/signup:
 *  post:
 *      tags: [User Post]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              default: Why me
 *                          post:
 *                              type: string
 *                              default: Because you are you
 *      responses:
 *          default:
 *              description: Success
 */

router.use(express.json());

router.get("/profile", checkAuth, (req, res, next) => {
  res.status(200).json({
    message: `Welcome, ${req.userData.name}`,
    result: req.userData,
  });
});

router.post("/signup", (req, res, next) => {
  // find user email
  findUser(req.body.email)
    // user found run error
    .then((result) => {
      if (result) {
        return res.status(409).json({
          message: "User Exists",
        });
      } else {
        // encrypt password
        const password = req.body.password;
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
              address: req.body.address,
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
                  message: "Signup Successful",
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
          message: "Save Unsuccessful",
        },
      });
    });
});

router.post("/login", (req, res, next) => {
  // find user
  findUser(req.body.email)
    .then((user) => {
      //if no user is found
      if (!user) {
        // return error message
        req.status(401).json({
          message: "Unauthorized",
        });
      }
      // compare passwords
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        // test error
        if (err) return res.status(501).json({ message: err.message });
        // test result
        if (result) {
          const name = user.firstName;
          const email = req.body.email;
          const password = result.password;
          // create token
          const token = jwt.sign(
            {
              name: name,
              email: email,
              password: password,
            },
            process.env.jwt_key
          );
          // message authorization successful
          // send back payload token (token: token)
          res.status(200).json({
            message: "Authorization Successful",
            name: name,
            token: token,
          });
        } else {
          res.status(409).json({
            message: "User Exists",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: {
          message: "Login Unsuccessful",
        },
      });
    });
});

module.exports = router;
