const mongoose = require('mongoose')

const uri = "mongodb+srv://raylim98:monmon@cluster0.afa3s.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB