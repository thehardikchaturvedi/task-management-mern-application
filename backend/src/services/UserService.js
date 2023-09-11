const {error, success} = require("../helpers/responseHandler");

class UserService {
    constructor() {
    }

    getAllUsers = async (query) => {
        return success(200, "OK", {});
    };
}

module.exports = UserService;