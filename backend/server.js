const express = require("express");
const http = require("http");
const cors = require("cors")
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const socketPort = process.env.SOCKETPORT || 3001;
const { Server } = require("socket.io");

connectDB();

// Application
const appMongo = express();
const appSocket = express();

// Middleware
appSocket.use(cors());
appMongo.use(cors())
appMongo.use(express.json())
appMongo.use(express.urlencoded({extended: false}))

// Routes
appMongo.use("/api/test", require("./routers/testRouter"));
appMongo.use("/api/user", require("./routers/userRouter"));

// Socker Server
const server = http.createServer(appSocket)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
}) 
io.on('connection', (socket) => {
    console.log("User Connected", socket.id)
    socket.emit("message", "Hello, you have sucessfully connted to the server.")

    socket.on("join_room", (lobbyId)=> {
        socket.join(lobbyId)
        socket.emit(`User: ${socket.id} has joined lobby ${lobbyId}`)
    })

    // wait for client messages
    socket.on('client_message', (args)=> {
        console.log(args)
    })

    socket.disconnect("disconnect", ()=> {
        console.log("User Disconnected", socket.id)
    })
})

server.listen(socketPort, ()=> console.log("Socket sever is running on port 3001"))
appMongo.listen(port, () => console.log(`Server started on port ${port}`));
