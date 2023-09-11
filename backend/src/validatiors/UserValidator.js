const {param} = require("express-validator");
const {validate} = require("./index");

class UserValidator {

    get = validate([
        param("id").notEmpty().withMessage("id is required")
    ])
}

module.exports = UserValidator;