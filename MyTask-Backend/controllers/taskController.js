const Task = require("../models/taskModel.js");
const User = require("../models/userModel.js");

/*async function createTaskForUser(req, res) {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Access denied. User does not have the required role" });
    }

    const { userId, title, description, due_date, priority } = req.body;

    if (!userId || !title || !description || !due_date || !priority) {
      return res.status(400).json({ message: "All task fields are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const validPriorities = ["high", "medium", "low"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: `Invalid priority. Use: ${validPriorities.join(", ")}` });
    }

    const task = new Task({
      title,
      description,
      due_date,
      priority,
      user: userId,
    });

    await task.save();
    return res.status(201).json({ message: "Task created successfully.", task });
  } catch (error) {
    console.error("Error creating task:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}*/

async function createTaskForUser(req, res) {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Access denied. User does not have the required role" });
    }

    const { userId, title, description, due_date, priority } = req.body;

    if (!userId || !title || !description || !due_date || !priority) {
      return res.status(400).json({ message: "All task fields are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const validPriorities = ["high", "medium", "low"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: `Invalid priority. Valid priorities are: ${validPriorities.join(", ")}` });
    }

    const task = new Task({
      title,
      description,
      due_date,
      priority,
      user: userId,
    });

    await task.save();
    return res.status(201).json({ message: "Task created successfully.", task });
  } catch (error) {
    console.error("Error creating task:", error); // Log the error here
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}



async function getAllTask(req, res) {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Access denied. User does not have the required role" });
    }

    const { page = 1, limit = 9, status, priority, user_id } = req.query;
    const query = { user: user_id };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const totalTasks = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("user", "name email role");

    const totalPages = Math.ceil(totalTasks / limit);

    return res.status(200).json({ tasks, totalPages, currentPage: Number(page) });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Other CRUD operations (update, delete, etc.)
async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("user", "name email role");

    if (!task) return res.status(404).json({ message: "Task not found." });
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found." });

    return res.status(200).json({ message: "Task updated successfully.", task });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found." });

    return res.status(200).json({ message: "Task status updated successfully.", task });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function updateTaskPriority(req, res) {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const validPriorities = ["high", "medium", "low"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority." });
    }

    const task = await Task.findByIdAndUpdate(id, { priority }, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found." });

    return res.status(200).json({ message: "Task priority updated successfully.", task });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ message: "Task not found." });
    return res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createTaskForUser,
  getAllTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
  updateTaskPriority,
  deleteTask,
};
