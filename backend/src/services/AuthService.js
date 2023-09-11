const {error, success} = require("../helpers/responseHandler");
const UserDao = require("../dao/UserDao");
const UserTokenDao = require("../dao/UserTokenDao");
const {matchPasswords, getUser, encryptPassword} = require("../helpers");
const {JWT_SECRET} = require("../constants");
const {sign} = require("jsonwebtoken");

class AuthService {
    constructor() {
        this.userDao = new UserDao();
        this.userTokenDao = new UserTokenDao();
    }

    signUp = async (body) => {
        const {username, password} = body;

        const user = await this.userDao.findOneByWhere({where: {username}});

        if(user){
            return error(400, "Username Already Registered");
        }

        await this.userDao.create({username, password: encryptPassword(password)});

        return success(200, "Registered");
    };

    login = async (body) => {
        const {username, password} = body;

        const attributes = ["id", "username", "password"];

        let user = await this.userDao.findOneByWhere({where: {username}, attributes});

        if (!user)
            return error(400, "Invalid Username and Password");

        if (!matchPasswords(user.password, password))
            return error(400, "Invalid Username and Password");

        user = user.toJSON();
        user.password = undefined;

        const token = await this.userTokenDao.create({userId: user.id, type: "login"});

        const jwt = sign({
            id: token.id,
            userId: token.userId
        }, JWT_SECRET, {expiresIn: "1h"});

        return success(200, "Logged In", {user, token: jwt});
    };

    logout = async (req) => {
        const token = await getUser(req);

        await this.userTokenDao.deleteByWhere({where: {id: token.id, userId: token.user.id, type: "login"}});

        return success(200, "Logged Out");
    };
}

module.exports = AuthService;