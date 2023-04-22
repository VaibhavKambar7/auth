const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Please provide all the required fields" });
    }

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = await User.create({
      firstName,
      lastName,
      email,
      password
    })
   
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1000d' });

    res.status(201).json({ token,user});
  } catch (error) {
    res.status(400).json({ error: error.message }) 
    console.log(error) 
  }
}

module.exports = { signup };
