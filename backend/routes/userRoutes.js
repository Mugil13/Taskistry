const express = require("express");
const router = express.Router();
const taskController = require("../controller/userController.js");

router.get("/tasks", taskController.getTasks);
router.post("/tasks", taskController.addTask);
router.delete("/tasks", taskController.deleteTask);
router.delete("/tasks/deleteAll", taskController.deleteAllTasks);
router.delete("/tasks/deleteCompleted", taskController.deleteCompletedTasks);
router.put("/tasks", taskController.toggleComplete);
router.put("/tasks/edit", taskController.editTask);

module.exports = router;
