const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const colors = require("colors");
const dotenv = require("dotenv").config();
const Message = require("./models/messageModel");

connectDB();

const port = 3001;

// express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/test", require("./routers/testRouter"));
app.use("/api/user", require("./routers/userRouter"));
app.use("/api/lobby", require("./routers/lobbyRouter"));

// Declare as a http server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://main.d3f0197apfsodw.amplifyapp.com/",
    // origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

// Define events
io.on("connection", (socket) => {
  const userID = socket.id;
  socket.emit("welcome", "welcome to the server");
  console.log(userID, ": has connected");

  socket.on("ping", () => {
    console.log(`User ${userID} has pinged server`);
  });

  socket.on("join_lobby", ({ lobbyId, user }) => {
    console.log(`${user} has joined ${lobbyId}\n socketId: ${socket.id}`);
    socket.join(lobbyId);
  });

  socket.on("leave_lobby", ({ user, lobbyId }) => {
    console.log(`${user} has left ${lobbyId}`);
    socket.leave(lobbyId);
  });

  socket.on("send_message", (messageDoc) => {
    console.log("message received from client: ", messageDoc);
    socket.to(messageDoc.lobbyId).emit("receive_message", messageDoc);
  });

  socket.on("disconnect", () => {
    console.log(`User ${userID} has disconnected`);
  });
});

server.listen(port, () => console.log(`Server has started on ${port}`));
