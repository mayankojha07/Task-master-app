const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/database");
const http = require("http");
const { initializeSocket } = require("./config/socket");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Creating a http server and integrate with express app
const server = http.createServer(app);

// Initializing socket.io with the http server and cors setting
initializeSocket(server);

// import routes
const authRoutes = require("./routes/Auth");
const taskRoutes = require("./routes/Task");

// middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Mounting URL
app.use("/api/auth", authRoutes);
app.use("/api", taskRoutes);

// Default route
app.get("/", (_, res) => {
  res.send({ success: true, message: "App is running..." });
});

// listening server
server.listen(PORT, () => {
  console.log(`App is running at PORT ${PORT}`);
  connectToDB();
});
