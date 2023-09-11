const TaskService = require('../services/TaskService');
const {error} = require("../helpers/responseHandler");

class TaskController {
    constructor() {
        this.taskService = new TaskService();
    }

    getAllTasks = async (req, res) => {
        try {
            const response = await this.taskService.getAllTasks(req);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }

    getTaskById = async (req, res) => {
        try {
            const response = await this.taskService.getTaskById(req);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }

    createTask = async (req, res) => {
        try {
            const response = await this.taskService.createTask(req);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }

    updateTask = async (req, res) => {
        try {
            const response = await this.taskService.updateTask(req);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }

    deleteTask = async (req, res) => {
        try {
            const response = await this.taskService.deleteTask(req);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }
}

module.exports = TaskController;