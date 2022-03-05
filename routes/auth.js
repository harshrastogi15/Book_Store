const express = require("express");
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
      return res.status(400).json({ errors: errors.array(), status: 0 });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      if (user) {
        return res.status(400).json({ status: 0 });
      }

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        phone: req.body.phone,
      })
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(400).json({ errors: err, status: 0 }));
    } catch (error) {
        res.status(400).json({ errors: err, status: -1 });
    }
  }
);



router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), status: 0 });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email:email,password:password});
        if(!user){
            return res.status(400).json({status:0})
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({ errors: error, status: -1 });
    }
 }
);

module.exports = router;
