require("dotenv").config({path: "./.env"});
const {app} = require("./app");
const {PORT} = require("./constants");
const {error} = require("./helpers/responseHandler");
const db = require("./models");

app.use(function (err, req, res, next) {
    res.json(error(res.statusCode, err.message));
});

(async () => {
    await db.sequelize.authenticate();
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
})();