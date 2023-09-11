const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const os = require("os");
const {postTrimmer} = require("./helpers/validations");
const routes = require("./routes");
const app = express();
module.exports = {app};

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
    preserveExtension: true,
    parseNested: true
}));

app.use((req, res, next) => {
    req.body = {
        ...req.body,
        ...req.files
    };

    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(postTrimmer);
app.use(cors({
    origin: "*"
}));

app.get("/", async (req, res) => {
    res.status(200).send("API is working!");
});

app.use("/api", routes);
app.use("/*", (req, res) => res.send("NOT FOUND"));