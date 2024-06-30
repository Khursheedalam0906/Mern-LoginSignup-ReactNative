const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

//nodemailer
async function mailer(receveremail, code) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: "khursheedalam0906@gmail.com",
      pass: "xodjkkpvgabszizz",
    },
  });

  const info = await transporter.sendMail({
    from: "khursheed Alam",
    to: `${receveremail}`,
    subject: "Signup verification",
    text: `Your verification code is ${code}`,
    html: `<b>Your verification code is ${code}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
}
//

router.post("/signup", async (req, res) => {
  const { name, email, password, dob, address } = req.body;
  const user = new User({
    name,
    email,
    password,
    dob,
    address,
  });
  try {
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.send({ message: "User Registered Successfully", token });
  } catch (error) {
    console.log("db err", error);
    return res.status(422).send({ error: error.message });
  }
});

router.post("/verify", (req, res) => {
  console.log("sent by client - ", req.body);
  const { name, email, password, dob, address } = req.body;
  if (!email || !password || !name || !dob || !address) {
    return res.status(422).json({ error: "All fields are required" });
  }
  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "Email already register Please login" });
    }
    //
    try {
      let verificationCode = Math.floor(100000 + Math.random() * 900000);
      let user = [
        {
          name,
          email,
          password,
          dob,
          address,
          verificationCode,
        },
      ];
      await mailer(email, verificationCode);
      res.send({
        message: "Veryfication code sent to your Email",
        udata: user,
      });
    } catch (error) {
      console.log(error);
    }
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add Email or password" });
  }
  const savedUser = await User.findOne({ email: email });
  if (!savedUser) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }
  try {
    bcrypt.compare(password, savedUser.password, (error, result) => {
      if (result) {
        console.log("Password Matched");
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.send({ token });
      } else {
        console.log("Password doesn't match");
        return res.status(422).json({ error: "Invalid Credentials" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
