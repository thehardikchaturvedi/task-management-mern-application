const {Router} = require("express");
const AuthController = require("../controllers/AuthController");
const AuthValidator = require("../validatiors/AuthValidator");
const {authMiddleware} = require("../middlewares/authMiddleware");

const router = Router();
const authController = new AuthController();
const authValidator = new AuthValidator();

router.post("/signup", authValidator.signUp, authController.signUp);
router.post("/login", authValidator.login, authController.login);
router.post("/logout", authMiddleware(), authController.logout);

module.exports = router;