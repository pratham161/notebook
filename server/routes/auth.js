const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchuser");

// creating user with validations (Login not required)
//ROUTE 1:
const JWT_STRING = "PRATHAMESH&$#*@#ISAgOODBOY";

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid name").isEmail(),
    body("password", "password should contain 5 or more characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    //if there are errors return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // checking wether the user with the same email exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt); //hashing the password
      // creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // data which will get held by JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_STRING); // signing the JWT token
      success = true;
      res.json({success, authToken }); // sending JWT token to client
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.error(error.message);
    }
  }
);

// login route where users can login with correct credentials (Login not required)
//ROUTE 2:
router.post(
  "/login",
  [
    body("email", "enter a valid name").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    //if there are errors return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //accepting user credetials for login
    try {
      let user = await User.findOne({ email }); //checking wether the user exists or not
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      // comparing passwords with bcrypt
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({success ,error: "Please try to login with correct credentials" });
      }
      // data which will get held by JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_STRING); // signing the JWT token
       success = true;
      res.json({ success ,authToken }); // sending JWT token to client
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      console.error(error.message);
    }
  }
);

// GET LOGGEDIN USER DETAIL (LOGIN REQUIRED)

router.post('/getuser', fetchUser,  async (req, res) => {

  try {
  let userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
