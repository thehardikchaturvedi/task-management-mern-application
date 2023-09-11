const {body} = require("express-validator");
const {validate} = require("./index");

class TaskValidator {

    createTask = validate([
        body("title").notEmpty().withMessage("Username is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("dueDate").notEmpty().withMessage("Due Date is required"),
        body("priority").notEmpty().withMessage("Priority is required")
    ])

    updateTask = validate([
        body("id").notEmpty().withMessage("Id is required")
    ])

    deleteTask = validate([
        body("id").notEmpty().withMessage("Id is required")
    ])
}

module.exports = TaskValidator;