const success = (statusCode, message, data = null) => {
    return {
        statusCode,
        status: "success",
        message,
        data
    };
};

const error = (statusCode, message, errors = [], data = null) => {
    return {
        statusCode,
        status: "error",
        message,
        errors,
        data
    };
};

const wrapRequestHandler = (fn) => async (req, res, next) => {
    try {
        const result = await fn(req, res, next);
        if (result !== undefined)
            res.json(result);
    } catch (e) {
        next(e);
    }
};

module.exports = {
    error,
    success,
    wrapRequestHandler
};
