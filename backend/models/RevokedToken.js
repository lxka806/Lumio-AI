const mongoose = require("mongoose")

const RevokedTokenSchema = new mongoose.Schema({
    tokenHash: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }
    }
})

module.exports = mongoose.model("RevokedToken", RevokedTokenSchema)
