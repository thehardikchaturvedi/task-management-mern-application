const SuperDao = require("./SuperDao");
const {User} = require("../models");

class UserDao extends SuperDao {
    constructor() {
        super(User);
    }
}

module.exports = UserDao;