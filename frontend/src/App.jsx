
import { useState, useEffect, useCallback } from "react"
import api from "./services/api"

import AuthPage from "./components/AuthPage"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import ChatWindow from "./components/ChatWindow"
import MessageInput from "./components/Messageinput"


function App() {
    const [user, setUser] = useState(null)
    const [checkingSession, setCheckingSession] = useState(true)
    const [authError, setAuthError] = useState("")
    const [appError, setAppError] = useState("")

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [conversationId, setConversationId] = useState(null)
    const [conversations, setConversations] = useState([])

    const [loading, setLoading] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)

    // Load conversation history
    const loadConversations = useCallback(async () => {
        try {
            const response = await api.get("/conversations")
            setConversations(response.data)
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
            } else {
                setAppError("Could not load your conversations.")
            }
        }
    }, [])

    // Restore user session
    useEffect(() => {
        let active = true

        const restoreSession = async () => {
            try {
                const response = await api.get("/auth/profile")

                if (!active) return

                setUser(response.data.user)
                await loadConversations()
            } catch (error) {
                if (active && error.response?.status !== 401) {
                    setAuthError(
                        "Could not connect to the server. Please try again."
                    )
                }
            } finally {
                if (active) {
                    setCheckingSession(false)
                }
            }
        }

        restoreSession()

        return () => {
            active = false
        }
    }, [loadConversations])

    // Start a new chat
    const newChat = () => {
        setMessages([])
        setConversationId(null)
        setAppError("")
    }

    // Open an existing conversation
    const openConversation = async (id) => {
        try {
            const response = await api.get(`/conversations/${id}`)

            setConversationId(id)
            setMessages(response.data.messages)
            setAppError("")
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
            } else {
                setAppError("Could not open this conversation.")
            }
        }
    }

    // Delete a conversation
    const deleteConversation = async (id) => {
        try {
            await api.delete(`/conversations/${id}`)

            setConversations(prev =>
                prev.filter(chat => chat._id !== id)
            )

            if (conversationId === id) {
                newChat()
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
            } else {
                setAppError("Could not delete this conversation.")
            }
        }
    }

    // Send a message to AI
    const sendMessage = async (e) => {
        e.preventDefault()

        if (!input.trim() || loading) return

        const userMessage = input.trim()
        setInput("")
        setAppError("")

        setMessages(prev => [
            ...prev,
            { role: "user", content: userMessage }
        ])

        setLoading(true)

        try {
            const response = await api.post("/ai/chat", {
                message: userMessage,
                conversationId
            })

            setConversationId(response.data.conversationId)

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: response.data.reply
                }
            ])

            await loadConversations()
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null)
                return
            }

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, something went wrong. Please try again."
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    // Sign out
    const logout = async () => {
        try {
            await api.post("/auth/logout")
        } catch (error) {
            if (error.response?.status !== 401) {
                setAppError("Could not log out. Please try again.")
                return
            }
        }

        localStorage.removeItem("token")
        setUser(null)
        setConversations([])
        newChat()
    }

    // Loading screen
    if (checkingSession) {
        return <div className="auth-loading">Loading Lumio...</div>
    }

    // Authentication screen
    if (!user) {
        return (
            <AuthPage
                onAuthenticated={authenticatedUser => {
                    setAuthError("")
                    setAppError("")
                    setUser(authenticatedUser)
                    loadConversations()
                }}
                sessionError={authError}
            />
        )
    }

    // Main application
    return (
        <div className="app">
            <Sidebar
                user={user}
                conversations={conversations}
                conversationId={conversationId}
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(prev => !prev)}
                onNewChat={newChat}
                onOpenConversation={openConversation}
                onDeleteConversation={deleteConversation}
                onLogout={logout}
            />

            <main className="main">
                <Header
                    onToggleSidebar={() => setSidebarOpen(prev => !prev)}
                    onLogout={logout}
                    appError={appError}
                />

                <ChatWindow
                    messages={messages}
                    loading={loading}
                />

                <MessageInput
                    input={input}
                    setInput={setInput}
                    onSend={sendMessage}
                    loading={loading}
                />
            </main>
        </div>
    )
}

export default App
