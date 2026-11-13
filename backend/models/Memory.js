
const mongoose = require("mongoose")

const MemorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
            required: true
        },
        category: {
            type: String,
            enum: [
                "personal",
                "skills",
                "interests",
                "goals",
                "projects",
                "preferences",
                "other"
            ],
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Memory", MemorySchema)
