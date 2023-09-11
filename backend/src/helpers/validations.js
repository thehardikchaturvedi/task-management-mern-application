const {isString} = require("lodash");

const trimmer = (body) => {
    for (const [key, value] of Object.entries(body)){
        if (isString(value)){
            const trimValue = value.trim();
            if (trimValue === ""){
                body[key] = null;
            } else{
                body[key] = trimValue;
            }
        } else if (Array.isArray(value)){
            for(let i = 0; i < value.length; i++)
                trimmer(value[i]);
        }
    }
};

const postTrimmer = (req, res, next) => {
    if (["POST", "PUT"].includes(req.method)){
        trimmer(req.body);
    }
    next();
};

module.exports = {
    postTrimmer
};