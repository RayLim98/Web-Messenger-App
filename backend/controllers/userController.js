const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const UserServices = require("../services/UserServices")

const { 
    findUser, 
    validatePassword,
    createUser,
} = UserServices()

/**
 * @description POST Login User
 * @route /api/user/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
    //Check user exist
    const {userName, password} = req.body;

    // FIND by USERNAME, and remove the password field
    const user = await findUser(userName);
    if(!user) {
        res.status(400)
        throw new Error('User does not exist')
    }
    
    //Compare passwords and generate token for authentication
    if(await validatePassword(password, user.password)) {
        const payload = {
            _id: user._id,
            userName: user.userName,
            age: user.age,
            token: generateToken(user._id)
        }
        console.log('User has logged in: '.green, payload)
        res.status(201).json(payload)
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    //On success
    res.status(200).json({message: 'User has logged in sucessfully'.green})
})

/**
 * @description POST Register User
 * @route /api/user/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
    // Check if input fields exist 
    const {userName, password, age} = req.body;
    if(!userName || !password || !age) {
        res.status(400)
        throw new Error('Missing fields')
    }

    // Check if User Name exist 
    const userExists = await findUser(userName);
    if(userExists) {
        res.status(400)
        throw new Error('User name exist')
    }

    // Create user with current credentials  
    const newUser = await createUser(userName, password, age)

    // Check if newuser has been created sucessfully
    if(newUser) {
        console.log('New registered User. Id: ',newUser._id)
        res.status(201).json({
            _id: newUser._id,
            userName: newUser.userName,
            age: newUser.age,
        });
    } else {
        res.status(400).json({
            message: 'Failed to create user'
        });
    }
})

/**
 * @description GET personal user data
 * @protected required JWT authentication 
 * @route /api/user
 * @access private
 */
const getUser = asyncHandler(async (req, res) => {
    const user = req.user;
    if(user) {
        res.status(200).json(user);
    } else {
        res.status(400).json({
            message: "could not get user data"
        });
    }
})

/**
 * @description PUT update personal user data
 * @protected required JWT authentication 
 * @route /api/update
 * @access private
 */
const updateUser = asyncHandler(async(req, res) => {
    const { userName } = req.body;
    const user = await findUser(userName) 
})

/**
 * @description Delete delete user account 
 * @protected required JWT authentication 
 * @route /api/delete
 * @access private
 */
const deleteUser = asyncHandler(async(req, res) => {
    // TODO
    throw new Error("has not been implemented")
})
/**
 * @description Generate JWT as an object, with a field ID inside
 * @param id
 */
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '10d'
    })
}

module.exports = {
    loginUser,
    registerUser,
    getUser,
    updateUser,
    deleteUser
}