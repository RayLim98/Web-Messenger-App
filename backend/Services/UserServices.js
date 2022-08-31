const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

function UserServices() {
    const findUser = async (userName) => {
        const userDoc = await User.findOne({userName})
        return userDoc;
    }

    const validatePassword = async (intputPassword, hashedPassword) => {
        return await bcrypt.compare(intputPassword, hashedPassword);
    }

    return {
        findUser,
        validatePassword
    }
}

module.exports = UserServices