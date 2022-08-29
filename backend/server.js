const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const connectDB = require("./config/db")
const colors = require("colors");
const dotenv = require("dotenv").config();

connectDB()

const port = 3001;

// express app
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// Routes
app.use("/api/test", require("./routers/testRouter"));
app.use("/api/user", require("./routers/userRouter"));

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["POST", "GET"]
    }
})

io.on("connection", (socket)=> {
    const userID = socket.id
    socket.emit("welcome", "welcome to the server")
    console.log(userID, ": has connected")

    socket.on("ping", ()=> {
        console.log(`User ${userID} has pinged server`)
    })

    socket.on("disconnect", ()=> {
        console.log(`User ${userID} has disconnected`)
    })
})

server.listen(port, ()=> console.log(`Server has started on ${port}`))