
const express = require("express")
const router = express.Router()

const { chat } = require("../controller/ai.controller")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/chat", authMiddleware, chat)

module.exports = router
