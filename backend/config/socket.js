const socketIo = require("socket.io");
require("dotenv").config();

// Creating a centralized instance of socket.io
let io;

// Creating a Map to store the connected users
const connectedUsers = new Map();

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
    pingInterval: 25000, // Send a ping every 25 seconds
    pingTimeout: 60000,
  });

  // Socket.io connection handler
  io.on("connection", (socket) => {
    // console.log("New User Connected - Socket -> ", socket.id);

    // Handle the user registration with their socket id
    socket.on("register", (userId) => {
      connectedUsers.set(userId, socket.id);
      // console.log(
      //   `User with this userId ${userId} registered and connected with socket id ${socket.id}`
      // );

      // Handle user disconnection
      socket.on("disconnect", () => {
        connectedUsers.forEach((value, key) => {
          if (value === socket.id) {
            connectedUsers.delete(key);
            // console.log(`Client with Socket ID ${socket.id} disconnected`);
          }
        });
      });
    });
  });
};

const getIoInstance = () => io;
const getConnectedUsers = () => connectedUsers;

module.exports = { initializeSocket, getIoInstance, getConnectedUsers };
