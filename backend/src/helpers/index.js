const {compareSync, hashSync} = require("bcrypt");

function encryptPassword(string) {
    return hashSync(string, 8);
}

function matchPasswords(encrypted, password) {
    return compareSync(password, encrypted);
}

const getUser = async (req) => {
    let {login_token} = req;

    return login_token;
};

module.exports = {
    encryptPassword,
    matchPasswords,
    getUser
};
