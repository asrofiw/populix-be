const router = require("express").Router();

const { authorization, authentication } = require("../middlewares/auth");
const {
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.post("/", authorization, authentication, createUser);
router.get("/:id", authorization, getOneUser);
router.put("/:id", authorization, updateUser);
router.delete("/:id", authorization, authentication, deleteUser);

module.exports = router;
