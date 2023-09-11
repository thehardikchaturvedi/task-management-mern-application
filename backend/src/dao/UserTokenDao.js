const SuperDao = require("./SuperDao");
const {UserToken} = require("../models");

class UserTokenDao extends SuperDao {
    constructor() {
        super(UserToken);
    }
}

module.exports = UserTokenDao;