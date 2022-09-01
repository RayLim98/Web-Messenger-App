const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

function UserServices() {
    /**
     * @param {string} userName 
     * @returns User document
     */
    const findUser = async (userName) => {
        return User.findOne({userName});
    }

    /**
     * @param {string} userName 
     * @param {string} password 
     * @param {number} age 
     * @returns NEW user document
     */
    const createUser = async (userName, password, age) => {
        // Protect Password  
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user with current credentials
        return User.create({
            userName: userName,
            password: hashedPassword,
            age: age,
        })
    } 

    /**
     * 
     * @param {string} inputPassword 
     * @param {string} hashedPassword 
     * @returns 
     */
    const validatePassword = async (inputPassword, hashedPassword) => {
        return bcrypt.compare(inputPassword, hashedPassword);
    }

    return {
        findUser,
        createUser,
        validatePassword
    }
}

module.exports = UserServices