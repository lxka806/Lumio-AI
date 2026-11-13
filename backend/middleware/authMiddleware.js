
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const RevokedToken = require("../models/RevokedToken")

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const bearerToken = authHeader && /^Bearer\s+(.+)$/i.exec(authHeader)
    const token = bearerToken
        ? bearerToken[1].trim()
        : req.cookies && req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Authentication required. Sign in and send the token as a cookie or Bearer token."
        })
    }

    let decoded
    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }

    if (!decoded || typeof decoded.exp !== "number") {
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }

    try {
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex")
        const revokedToken = await RevokedToken.exists({ tokenHash })

        if (revokedToken) {
            return res.status(401).json({
                message: "Invalid or expired token"
            })
        }

        req.user = decoded
        req.authToken = token
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Authentication check failed"
        })
    }
}

module.exports = authMiddleware
