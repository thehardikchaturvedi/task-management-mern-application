const {body} = require("express-validator");
const {validate} = require("./index");

class AuthValidator {
    signUp = validate([
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required")
    ])

    login = validate([
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required")
    ])
}

module.exports = AuthValidator;