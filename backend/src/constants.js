const {
    NODE_ENV,
    PORT = 8000,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    JWT_SECRET
} = process.env;

module.exports = {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    JWT_SECRET,
    LOGIN_TOKEN: "login"
};