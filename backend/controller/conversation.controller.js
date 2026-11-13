
const mongoose = require("mongoose")
const Conversation = require("../models/Conversation")

// Get all conversations
const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            userId: req.user.id
        })
        .select("title createdAt updatedAt")
        .sort({ updatedAt: -1 })

        res.status(200).json(conversations)

    } catch (error) {
        res.status(500).json({ message: "Failed to get conversations" })
    }
}

// Get one conversation
const getConversation = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid conversation ID" })
        }

        const conversation = await Conversation.findOne({
            _id: id,
            userId: req.user.id
        })

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" })
        }

        res.status(200).json(conversation)

    } catch (error) {
        res.status(500).json({ message: "Failed to get conversation" })
    }
}

// Delete a conversation
const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid conversation ID" })
        }

        const conversation = await Conversation.findOneAndDelete({
            _id: id,
            userId: req.user.id
        })

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" })
        }

        res.status(200).json({
            message: "Conversation deleted successfully"
        })

    } catch (error) {
        res.status(500).json({ message: "Failed to delete conversation" })
    }
}

module.exports = {
    getConversations,
    getConversation,
    deleteConversation
}
