const router = require("express").Router();

const usersRouter = require("./users");
routerouter.use("/", usersRouter);

module.exports = router;