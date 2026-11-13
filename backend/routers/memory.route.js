
const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")

const {
    createMemory,
    getMemories,
    getMemory,
    updateMemory,
    deleteMemory
} = require("../controller/memory.controller")

router.use(authMiddleware)

router.post("/", createMemory)
router.get("/", getMemories)
router.get("/:id", getMemory)
router.put("/:id", updateMemory)
router.delete("/:id", deleteMemory)

module.exports = router
