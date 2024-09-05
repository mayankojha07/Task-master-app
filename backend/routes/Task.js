const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middlewares/auth");
const {
  getTaskDetails,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  getSingleTask,
} = require("../controllers/Task");

// Task Crud Opeations routes
router.get("/tasks", auth, getTaskDetails);
router.get("/task/:id", auth, getSingleTask);
router.post("/tasks", auth, isAdmin, createTask);
router.put("/tasks/:id", auth, isAdmin, updateTask);
router.put("/task/complete/:id", auth, completeTask);
router.delete("/tasks/:id", auth, isAdmin, deleteTask);

module.exports = router;
