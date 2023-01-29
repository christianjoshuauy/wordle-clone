const express = require("express");
const controller = require("../controllers/usersController");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

router
  .post("/signup", controller.signUp)
  .post("/login", controller.signIn)
  .get("/", authenticateToken, controller.getUser)
  .get("/refresh", controller.refreshUser)
  .get("/leaderboard", controller.getLeaderboard)
  .patch("/", authenticateToken, controller.updateUser)
  .delete("/:id", controller.removeUser)
  .get("/signout", controller.signOut);

module.exports = router;
