
const Auth = require("../models/Auth")
const RevokedToken = require("../models/RevokedToken")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/"
}

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            })
        }

        const normalizedEmail = email.trim().toLowerCase()

        const existingUser = await Auth.findOne({ email: normalizedEmail })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await Auth.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        })

        res.status(201).json({
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            })
        }

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        })
    }
}

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            })
        }

        const user = await Auth.findOne({ email })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                jti: crypto.randomBytes(16).toString("hex")
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            ...authCookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        })
    }
}

// GET PROFILE
const getProfile = async (req, res) => {
    try {
        const user = await Auth.findById(req.user.id).select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({ user })

    } catch (error) {
        res.status(500).json({
            message: "Could not get profile",
            error: error.message
        })
    }
}

// LOGOUT
const logout = async (req, res) => {
    try {
        const tokenHash = crypto.createHash("sha256")
            .update(req.authToken)
            .digest("hex")

        await RevokedToken.create({
            tokenHash,
            expiresAt: new Date(req.user.exp * 1000)
        })

        res.clearCookie("token", authCookieOptions)

        res.status(200).json({
            message: "Logout successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Logout failed",
            error: error.message
        })
    }
}

module.exports = {
    register,
    login,
    getProfile,
    logout
}
