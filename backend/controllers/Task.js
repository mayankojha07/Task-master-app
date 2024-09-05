const User = require("../models/User");
const Task = require("../models/Task");
const { getIoInstance, getConnectedUsers } = require("../config/socket");

// Create Task Controller
exports.createTask = async (req, res) => {
  try {
    // fetch the data from req body
    const userId = req.user.id;
    const { title, description, dueDate, priority, assignedToEmail } = req.body;

    // validate data
    if (!title || !description || !dueDate || !priority || !assignedToEmail) {
      return res.status(402).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // validate assigned user exists
    const assignedUser = await User.findOne({ email: assignedToEmail }).select(
      "-password"
    );
    // console.log("assigned user -> ", assignedUser);

    if (!assignedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Assigned user not found" });
    }

    // create task
    const task = await Task.create({
      title: title,
      description: description,
      dueDate: new Date(dueDate),
      priority: priority,
      assignedTo: assignedUser._id,
      assignedBy: userId,
    });

    if (!task) {
      return res
        .status(502)
        .json({ success: false, message: "Could not able to create task" });
    }

    const updatedTask = await Task.findById(task._id)
      .populate({
        path: "assignedBy",
        select: "firstName lastName email",
      })
      .populate({
        path: "assignedTo",
        select: "firstName lastName email",
      })
      .exec();

    // Get connected users and io instance
    const io = getIoInstance();
    const connectedUsers = getConnectedUsers();

    // Find the socket id of user
    const assignedSocketId = connectedUsers.get(assignedUser._id.toString());
    if (assignedSocketId) {
      io.to(assignedSocketId).emit("taskCreated", {
        message: `You have been assigned a new task`,
        title: title,
        taskId: updatedTask._id,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task created successfully!",
      task: updatedTask,
    });
  } catch (error) {
    console.log("Error in createTask controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// Get Task Details Controller
exports.getTaskDetails = async (req, res) => {
  try {
    // fetch data from req body
    const userId = req.user.id;
    const role = req.user.role;
    let query;

    // check the role of user
    if (role === "admin") {
      query = { assignedBy: userId };
    } else if (role === "emp") {
      query = { assignedTo: userId };
    } else {
      return res.status(403).json({
        success: false,
        message: "Could not able to recognize the role of user",
      });
    }

    // get the user with tasks
    const tasks = await Task.find(query)
      .populate({
        path: "assignedBy",
        select: "firstName lastName email",
      })
      .populate({
        path: "assignedTo",
        select: "firstName lastName email",
      })
      .sort({ createdAt: -1 })
      .exec();

    // Format all tasks
    const formattedTasks = tasks.map((task) => ({
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
      assignedBy: {
        name: `${task.assignedBy.firstName} ${task.assignedBy.lastName}`,
        email: task.assignedBy.email,
      },
      assignedTo: {
        name: task.assignedTo
          ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
          : "N/A",
        email: task.assignedTo ? task.assignedTo.email : "N/A",
      },
    }));

    // return response
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully!",
      tasks: formattedTasks,
    });
  } catch (error) {
    console.log("Error in getTaskDetails controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// Update Task Controller
exports.updateTask = async (req, res) => {
  try {
    // fetch the data from req
    const taskId = req.params.id;
    const {
      title,
      description,
      dueDate,
      priority,
      assignedToEmail,
      isCompleted = false,
    } = req.body;

    // get the task object
    const task = await Task.findById(taskId);

    if (!task) {
      return req
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // check the assigned user exists
    const assignedUser = await User.findOne({ email: assignedToEmail }).select(
      "-password"
    );

    if (!assignedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Assigned email doesnot exist" });
    }

    // update the task
    task.title = title;
    task.description = description;
    task.dueDate = new Date(dueDate);
    task.priority = priority;
    task.assignedTo = assignedUser._id;
    task.isCompleted = isCompleted;

    await task.save();

    // Get connected users and io instance
    const io = getIoInstance();
    const connectedUsers = getConnectedUsers();

    // Find the socket id of user
    const assignedSocketId = connectedUsers.get(assignedUser._id.toString());
    if (assignedSocketId) {
      io.to(assignedSocketId).emit("taskUpdated", {
        message: `Your task has been updated`,
        title: task.title,
        taskId: task._id,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully!",
      task,
    });
  } catch (error) {
    console.log("Error in updateTask controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// Delete Task Controller
exports.deleteTask = async (req, res) => {
  try {
    // fetch data from req
    const taskId = req.params.id;
    // console.log("ID -> ", taskId);

    // get the task and validate
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // delete the task
    await Task.findByIdAndDelete(taskId);

    // Get connected users and io instance
    const io = getIoInstance();
    const connectedUsers = getConnectedUsers();

    // Find the socket id of user
    const assignedSocketId = connectedUsers.get(task.assignedTo.toString());
    if (assignedSocketId) {
      io.to(assignedSocketId).emit("taskDeleted", {
        message: `Your task has been deleted`,
        title: task.title,
        taskId: task._id,
      });
    }

    // return response
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log("Error in deleteTask controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// Complete Task Handler
exports.completeTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const role = req.user.role;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { isCompleted: true },
      { new: true }
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    // Get connected users and io instance
    const io = getIoInstance();
    const connectedUsers = getConnectedUsers();

    // Find the socket id of user
    const assignedSocketId = connectedUsers.get(
      role === "admin" ? task.assignedTo.toString() : task.assignedBy.toString()
    );
    if (assignedSocketId) {
      io.to(assignedSocketId).emit("taskCompleted", {
        message: `Your task has been completed`,
        title: task.title,
        taskId: task._id,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Task Status Updated", task });
  } catch (error) {
    console.log("Error in deleteTask controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// Get Single Task Controller
exports.getSingleTask = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id)
      .populate({
        path: "assignedBy",
        select: "firstName lastName email",
      })
      .populate({
        path: "assignedTo",
        select: "firstName lastName email",
      })
      .exec();

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Task fetched successfully", task });
  } catch (error) {
    console.log("Error in GetSingleTask controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};
