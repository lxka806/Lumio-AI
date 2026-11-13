
const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const {
    getConversations,
    getConversation,
    deleteConversation
} = require("../controller/conversation.controller")

router.use(authMiddleware)

router.get("/", getConversations)
router.get("/:id", getConversation)
router.delete("/:id", deleteConversation)

module.exports = router
