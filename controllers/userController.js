const asyncHandler = require('express-async-handler');//used to handle errors in async functions
const User = require('../models/userModel');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');//for token generation and authentication
const dotenv = require('dotenv');
dotenv.config();

const registerUser = asyncHandler(async  (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const existinguser = await User.findOne({email});
    if (existinguser) {
res.status(400).json({ message: "Email already exists" });
}
    
    const hashedPassword = await bycrypt.hash(password, 15);
    const newuser = await User.create({
        username,
        email,
        password: hashedPassword 
    });
    console.log(`user created :${username}`);
    if(newuser){
        res.status(201).json({_id:newuser._id, username:newuser.username, email:newuser.email});
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
   
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if(user && (await bycrypt.compare(password, user.password))){
        const accesstoken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            }},//this get stored in the token and again assigned in the validateTokenHandler
            process.env.SECRET_KEY,
            {expiresIn: '1d'}
        )
    res.status(200).json({accesstoken});
    
    }
    if (!user){
        return res.status(401).json({ message: "Invalid credentials" });
    }

});

const userProfile = asyncHandler(async (req, res) => {
    res.json(req.user.id);
    console.log(req.user);
});


module.exports = { registerUser, loginUser, userProfile };