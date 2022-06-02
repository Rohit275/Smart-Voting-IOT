require('dotenv').config();

const express = require("express");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")

const Users = require("../models/user");
const UserOTPVerification = require("../models/userOtpVerfication");

const router = express.Router();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'otptestingiot@gmail.com',
    pass: 'otp12345',
  }
});



transporter.verify((error, success) => {
  if(error) {
    console.log(error);
  } else {
    console.log("Ready for messsage");
    console.log(success);
  }
})

router.post("/login", (req, res, next) => {
 console.log("In login func",req.body)
  Users.findOne({
    Username: req.body.username,
    Password: req.body.password,
  }).then((user) => {
    if (user) {
      console.log("USer found")
      return res.status(200).json({ message: "Login Success", user: user });
    } else {
      console.log("USer Not found")
      return res.status(404).json({ message: "User not found" });
    }
  });
});

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

const sendOtpVerification = async ({ _id, Email }, res) => {
  // try {
  //   const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  //   const mailOption = {
  //     from: 'otptestingiot@gmail.com',
  //     to: Email,
  //     subject: "Verify Your Email",
  //     html: `<p>Enter <b>${otp}</b> in the app to verify your account</p><br><p>This code expires in <b>1 hour</b></p>`
  //   };

  //   const newOTPVerification = await new UserOTPVerification({
  //     userId: _id,
  //     otp: otp,
  //     createdAt: Date.now(),
  //     expiresAt: Date.now() + 3600000,
  //   })

  //   await transporter.sendMail(mailOption);
  //   await newOTPVerification.save().then((result)=> {
  //     res.json({user: result, message: "Verification mail sent"});
  //   });

  //   // res.json({message: "Verification mail sent"})

  // } catch (error) {
  //   res.json({message: error.message})
  // }
}

router.post("/verifyOTP", async (req, res) => {
  try {
    let { userId, otp } = req.body.user;

    if(!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const userOtpVerficationRecords = await UserOTPVerification.find({userId});
      if(userOtpVerficationRecords.length <= 0) {
        throw new Error('Account do not exists');
      } else {
        const { expiresAt, otp } = userOtpVerficationRecords[0];

        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({userId});
          throw new Error("Code expired");
        } else {
          // if()
        }

      }
    }
  } catch (error) {

  }
})

module.exports = router;
