
const Memory = require("../models/Memory")

// CREATE MEMORY
const createMemory = async (req, res) => {
    try {
        const { category, title, content } = req.body

        if (!category || !title || !content) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const memory = await Memory.create({
            userId: req.user.id,
            category,
            title,
            content
        })

        res.status(201).json({
            message: "Memory created successfully",
            memory
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to create memory",
            error: error.message
        })
    }
}

// GET ALL MEMORIES
const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find({
            userId: req.user.id
        }).sort({ createdAt: -1 })

        res.status(200).json({
            count: memories.length,
            memories
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to get memories",
            error: error.message
        })
    }
}

// GET SINGLE MEMORY
const getMemory = async (req, res) => {
    try {
        const memory = await Memory.findOne({
            _id: req.params.id,
            userId: req.user.id
        })

        if (!memory) {
            return res.status(404).json({
                message: "Memory not found"
            })
        }

        res.status(200).json({ memory })

    } catch (error) {
        res.status(500).json({
            message: "Failed to get memory",
            error: error.message
        })
    }
}

// UPDATE MEMORY
const updateMemory = async (req, res) => {
    try {
        const { category, title, content } = req.body

        const memory = await Memory.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            {
                category,
                title,
                content
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!memory) {
            return res.status(404).json({
                message: "Memory not found"
            })
        }

        res.status(200).json({
            message: "Memory updated successfully",
            memory
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to update memory",
            error: error.message
        })
    }
}

// DELETE MEMORY
const deleteMemory = async (req, res) => {
    try {
        const memory = await Memory.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })

        if (!memory) {
            return res.status(404).json({
                message: "Memory not found"
            })
        }

        res.status(200).json({
            message: "Memory deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete memory",
            error: error.message
        })
    }
}

module.exports = {
    createMemory,
    getMemories,
    getMemory,
    updateMemory,
    deleteMemory
}
