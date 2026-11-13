const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const authRoutes = require("./routers/auth.route")
const memoryRoutes = require("./routers/memory.route")
const aiRoutes = require("./routers/ai.route")
const conversationRoutes = require("./routers/conversation.route")

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/memory", memoryRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/conversations", conversationRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})