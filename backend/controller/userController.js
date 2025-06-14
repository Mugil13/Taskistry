const Task = require("../model/userModel.js");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    res.status(200).json({ message: "All tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting all tasks", error });
  }
};

// Delete completed tasks
exports.deleteCompletedTasks = async (req, res) => {
  try {
    await Task.deleteMany({ completed: true });
    res.status(200).json({ message: "Completed tasks deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting completed tasks", error });
  }
};


// Add a new task
exports.addTask = async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = new Task({ text, completed: false });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
};

exports.toggleComplete = async (req, res) => {
  try {
    const { id } = req.query;  // Get ID from query params
    if (!id) return res.status(400).json({ message: "Task ID is required" });

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { id } = req.query; // Get ID from query params
    const { text } = req.body;
    if (!id) return res.status(400).json({ message: "Task ID is required" });

    const updatedTask = await Task.findByIdAndUpdate(id, { text }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error editing task", error });
  }
};


// Toggle task completion
/*exports.toggleComplete = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await Task.findById(id);
    if (task) {
      task.completed = !task.completed;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Edit task text
exports.editTask = async (req, res) => {
  try {
    const { id, text } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { text }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error editing task", error });
  }
};*/

// Delete a single task
/*exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};*/

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.query;  // Extract ID from query params
    if (!id) return res.status(400).json({ message: "Task ID is required" });

    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
