const router = require("express").Router();
const characterController = require("../controllers/character.controller");

router.get("/", characterController.getCharacters);

module.exports = router;