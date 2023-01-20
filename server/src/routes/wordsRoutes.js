const express = require("express");
const controller = require("../controllers/wordsController");
const router = express.Router();

router
  .get("/", controller.getWords)
  .post("/", controller.addWord)
  .get("/:word", controller.getWord)
  .patch("/:word", controller.updateWord)
  .delete("/:word", controller.removeWord);

module.exports = router;
