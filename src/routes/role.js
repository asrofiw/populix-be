const router = require("express").Router();

const { authorization, authentication } = require("../middlewares/auth");
const { listRole } = require("../controllers/role");

router.get("/", authorization, authentication, listRole);

module.exports = router;
