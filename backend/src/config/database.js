const path = require("path");
require("dotenv").config({path: path.join(__dirname, "../../.env")});
const {DB_HOST, DB_USER, DB_PASS, DB_NAME} = require("../constants");

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "mysql"
    },
    test: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "mysql"
    },
    production: {
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        host: DB_HOST,
        dialect: "mysql"
    }
}
