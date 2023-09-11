const {Router} = require("express");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const taskRoute = require("./taskRoute");

const router = Router();

const defaultRoutes = [
    {
        path: "",
        route: authRoute,
    },
    {
        path: "/users",
        route: userRoute,
    },
    {
        path: "/tasks",
        route: taskRoute,
    }
];

defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;
