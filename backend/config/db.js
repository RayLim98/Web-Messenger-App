const mongoose = require('mongoose')

const mongoUri = "mongodb+srv://raylim98:monmon@cluster0.afa3s.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoUri)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB