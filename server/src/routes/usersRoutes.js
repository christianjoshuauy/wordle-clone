const express = require("express");
const controller = require("../controllers/usersController");
const router = express.Router();

router
  .get("/", controller.getWords)
  .post("/", controller.addWord)
  .get("/:id", controller.getUser)
  .patch("/:id", controller.updateWord)
  .delete("/:id", controller.removeWord);

module.exports = router;
