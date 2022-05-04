const express = require("express");
const bcrypt = require('bcrypt');
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");
const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("phone").isLength({ min: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), status: -1 });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      if (user) {
        return res.status(400).json({ status: -1 });
      }
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        // Store hash in your password DB.     
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          address: req.body.address,
          password: hash,
          phone: req.body.phone,
        })
          .then((user) => res.status(200).json({user,stauts:0}))
          .catch((err) => res.status(400).json({ errors: err, status: -1 }));
      });
    } catch (error) {
      res.status(500).json({ errors: err, status: -2 });
    }
  }
);



router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), status: -1 });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email});
      if (!user) {
        return res.status(400).json({ status: -1 })
      }
      const match = await bcrypt.compare(password, user.password);
      if(match){
        res.status(200).json({user,status:0});
      }else{
        return res.status(400).json({ status: -1 });
      }

    } catch (error) {
      res.status(500).json({ errors: error, status: -2 });
    }
  }
);

module.exports = router;
