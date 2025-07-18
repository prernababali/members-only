const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Home Page - List messages
router.get("/", messageController.getHomePage);

// Create new message
router.get("/message/new", messageController.getNewMessage);
router.post("/message/new", messageController.postNewMessage);

// ✅ DELETE message
router.delete("/message/:id", messageController.deleteMessage);

module.exports = router;

