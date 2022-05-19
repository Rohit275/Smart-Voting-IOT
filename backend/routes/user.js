const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")

const Users = require("../models/user");

const router = express.Router();

let transporter = nodemailer.createTransport({
  // host: 
})

router.post('/register', (req, res) => {
  let user = req.body;
  let {name, email,username,phone,password} = req.body.user

  console.log('User in backend', email);

  Users.find({email})
    .then((result) => { 
      if(result.length) {
        res.json({
          message: "User already exists!"
        })
      } else {
        const saltRounds = 10;
        bcrypt
          .hash(password, saltRounds)
          .then((hashedPassword) => {
            const newUser = Users({
              Name: name,
              Username: username,
              Password: hashedPassword,
              Email: email,
              Phone: phone,
              Verified: false

            });

            newUser
              .save()
              .then((result) => {
                sendOtpVerification(result, res);
              })
              .catch((err) => {
                console.log(err);
                res.json({message: "An error occured while saving"});
              });
          })
          .catch((err) => {
            res.json({ message: "An error occured while hashing!" })
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({message: "An error occured while checking for existing user!"});
    })

})

const sendOtpVerification = async () => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`
  } catch (error) {
    
  }
}

module.exports = router;
