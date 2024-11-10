const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { updateLastSeen } = require("../middlewares/updateLastSeen");
const router = express.Router();

router.route("/").post(registerUser).get(protect, updateLastSeen, allUsers);
router.post("/login", authUser);

module.exports = router;
