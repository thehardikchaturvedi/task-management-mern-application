const UserService = require('../services/UserService');
const {error} = require("../helpers/responseHandler");

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    getAllUsers = async (req, res) => {
        try {
            const response = await this.userService.getAllUsers(req.query);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }
}

module.exports = UserController;