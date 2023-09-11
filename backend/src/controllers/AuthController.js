const AuthService = require('../services/AuthService');
const {error} = require("../helpers/responseHandler");

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    signUp = async (req, res) => {
        try {
            const response = await this.authService.signUp(req.body);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }

    login = async (req, res) => {
        try {
            const response = await this.authService.login(req.body);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }

    logout = async (req, res) => {
        try {
            const response = await this.authService.logout(req);
            res.status(response.statusCode).json(response);
        } catch (e) {
            res.status(500).json(error(res.statusCode, e.message));
        }
    }
}

module.exports = AuthController;