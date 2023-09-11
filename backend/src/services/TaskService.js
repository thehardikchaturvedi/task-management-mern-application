const {error, success} = require("../helpers/responseHandler");
const TaskDao = require("../dao/TaskDao");
const {getUser} = require("../helpers");
const {Op} = require("sequelize");
const moment = require("moment");

class TaskService {
    constructor() {
        this.taskDao = new TaskDao();
    }

    createTask = async (req) => {
        const {title, description, dueDate, priority} = req.body;

        const {user} = await getUser(req);

        const task = await this.taskDao.create({userId: user.id, title, description, dueDate, priority});

        return success(201, "CREATED", {task});
    };

    getAllTasks = async (req) => {

        const {user} = await getUser(req);
        const reqQuery = req.query;

        let where = {};
        if (reqQuery.status === "completed_tasks") {
            where.isCompleted = true;
        }

        if (reqQuery.status === "overdue_tasks") {
            where.dueDate = {[Op.lt]: moment().format("YYYY-MM-DD")};
            where.isCompleted = false;
        }

        const query = await this.taskDao.findByWhere({where: {userId: user.id, ...where}});

        return success(200, "OK", {total: query.count, tasks: query.rows});
    };

    getTaskById = async (req) => {

        const {user} = await getUser(req);

        const task = await this.taskDao.findOneByWhere({where: {userId: user.id, id: req.params.id}});

        return success(200, "OK", {task});
    };

    updateTask = async (req) => {
        const body = req.body;
        const id = body.id;
        body.id = undefined;

        const {user} = await getUser(req);

        await this.taskDao.updateWhere(body, {id, userId: user.id});

        return success(200, "UPDATED");
    };

    deleteTask = async (req) => {
        const body = req.body;

        const {user} = await getUser(req);

        await this.taskDao.deleteByWhere({where: {userId: user.id, id: body.id}});

        return success(200, "DELETED");
    };
}

module.exports = TaskService;