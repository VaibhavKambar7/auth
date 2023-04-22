const User = require('../models/usermodel')
const express = require("express");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Inavid credentials" });
    }

    const isMatch = await user.comparePasswords(password)

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn:'1000d'})
    console.log(token)
    console.log(process.env.JWT_SECRET)
    console.log('hello')

    return res.status(200).json({ message: "Login successful",token });

  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};
 
module.exports = { login };
