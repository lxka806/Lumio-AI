
const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ConversationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true
    },
    title: {
        type: String,
        default: "New conversation"
    },
    messages: [MessageSchema]
}, { timestamps: true })

module.exports = mongoose.model("Conversation", ConversationSchema)
