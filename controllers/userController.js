const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

/**
 * @description Login User
 * @route POST /api/user/login
 */
const loginUser = asyncHandler(async (req, res) => {
    //Check user exist
    const {userName, password} = req.body;
    const user = await User.findOne({userName})

    //Compare passwords and generate token for authentication
    if(user, await bcrypt.compare(password, user.password)) {
        console.log('User has logged in: ', user)
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    //On success
    res.status(200).json({message: 'User has logged in sucessfully'})
})

/**
 * @description Register User
 * @route POST /api/user/register
 */
const registerUser = asyncHandler(async (req, res) => {
    // Check if input fields exist 
    const {userName, password} = req.body;
    if(!userName || !password) {
        res.status(400)
        throw new Error('Missing fields')
    }

    // Check if User Name exist 
    const userExists = await User.findOne({userName});
    if(userExists) {
        res.status(400)
        throw new Error('User name exist')
    }

    // Protect Password  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user with current credentials  
    const newUser = await User.create({
        userName: userName,
        password: hashedPassword,
    })

    // Check if newuser has been created sucessfully
    // ...and generate token to fetch user data
    if(newUser) {
        console.log('User Id is: ',newUser._id)
        res.status(201).json({
            _id: newUser._id,
            userName: newUser.userName,
            token: generateToken(newUser._id)
        });
    } else {
        res.status(400).json({
            message: 'Invalid credentials'
        });
    }
})

const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    res.status(200).json(allUser);
})

// Generate JWT as an object, with a field ID inside
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    loginUser,
    registerUser,
    getUser,
}