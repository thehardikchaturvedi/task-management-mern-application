const {validationResult} = require("express-validator");
const {error} = require("../helpers/responseHandler");

const validate = validations => {
    return async (req, res, next) => {
        await validations.reduce(async (promise, validation) => {
            await promise;
            return validation.run(req);
        }, Promise.resolve());

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        const errorsArray = errors.array().map(v => {
            return {path: v.path, msg: v.msg}
        });
        res.status(400).json(error(400, errorsArray[0].msg, errorsArray));
    };
};

module.exports = {validate};