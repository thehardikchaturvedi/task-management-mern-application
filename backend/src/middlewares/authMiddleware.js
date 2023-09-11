const {UserToken, User} = require("../models");
const {wrapRequestHandler} = require("../helpers/responseHandler");
const {JWT_SECRET, LOGIN_TOKEN} = require("../constants");
const {verify} = require("jsonwebtoken");

const authMiddleware = () => wrapRequestHandler(async (req, res, next) => {
    const auth = (req.headers.authorization || "").replace("Bearer ", "");
    const errorMessage = "Unauthorized";
    let token_id;

    try {
        ({id: token_id} = verify(auth, JWT_SECRET));
    } catch (e) {
        res.status(401);
        throw new Error(errorMessage);
    }

    if (!token_id) {
        res.status(401);
        throw new Error(errorMessage);
    }

    let token = await UserToken.findOne({
        where: {
            id: token_id,
            type: LOGIN_TOKEN
        },
        include: [{
            model: User,
            as: "user"
        }]
    });

    token = token?.toJSON();

    if (!token || !token.user) {
        res.status(401);
        throw new Error(errorMessage);
    }

    req.login_token = token;
    next();
});

module.exports = {
    authMiddleware
};