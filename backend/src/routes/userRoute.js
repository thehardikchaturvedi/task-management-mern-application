const {Router} = require("express");
const UserController = require("../controllers/UserController");
const UserValidator = require("../validatiors/UserValidator");
const {authMiddleware} = require("../middlewares/authMiddleware");

const router = Router();
const userController = new UserController();

router.get("/", authMiddleware(), userController.getAllUsers);

module.exports = router;