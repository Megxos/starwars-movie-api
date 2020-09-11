const router = require("express").Router();
const commentController = require("../controllers/comment.controller");

router.get("/", commentController.getAll);
router.post("/", commentController.addComment);

module.exports = router;