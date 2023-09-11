const {Router} = require("express");
const TaskController = require("../controllers/TaskController");
const TaskValidator = require("../validatiors/TaskValidator");
const {authMiddleware} = require("../middlewares/authMiddleware");

const router = Router();
const taskController = new TaskController();
const taskValidator = new TaskValidator();

router.get("/", authMiddleware(), taskController.getAllTasks);
router.get("/:id", authMiddleware(), taskController.getTaskById);
router.post("/", authMiddleware(), taskValidator.createTask, taskController.createTask);
router.put("/", authMiddleware(), taskValidator.updateTask, taskController.updateTask);
router.delete("/", authMiddleware(), taskValidator.deleteTask, taskController.deleteTask);

module.exports = router;