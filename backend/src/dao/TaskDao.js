const SuperDao = require("./SuperDao");
const {Task} = require("../models");

class TaskDao extends SuperDao {
    constructor() {
        super(Task);
    }
}

module.exports = TaskDao;