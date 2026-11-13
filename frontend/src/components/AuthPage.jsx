import { useState } from "react"
import {
    Bot,
    AlertCircle,
    CheckCircle2,
    Sparkles,
    Brain,
    MessageSquare,
    Shield,
    Zap,
} from "lucide-react"
import api from "../services/api"

function AuthPage({ onAuthenticated, sessionError }) {
    const [mode, setMode] = useState("login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [notice, setNotice] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const isRegistering = mode === "register"

    const submit = async (event) => {
        event.preventDefault()
        setError("")
        setNotice("")
        setSubmitting(true)

        try {
            if (isRegistering) {
                await api.post("/auth/register", { name, email, password })
                setMode("login")
                setPassword("")
                setNotice("Account created. Sign in to continue.")
            } else {
                const response = await api.post("/auth/login", { email, password })

                if (!response.data.token || !response.data.user) {
                    throw new Error("The server returned an invalid login response.")
                }

                localStorage.setItem("token", response.data.token)

                onAuthenticated(response.data.user)
            }
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                requestError.message ||
                "Unable to connect. Please try again."
            )
        } finally {
            setSubmitting(false)
        }
    }

    const changeMode = (nextMode) => {
        setMode(nextMode)
        setError("")
        setNotice("")
    }

    const inputClass =
        "w-full rounded-xl bg-surface border border-border px-3.5 py-2.5 " +
        "text-[14px] text-primary placeholder:text-muted outline-none " +
        "focus:border-lime/50 focus:shadow-lime-focus " +
        "transition-all"

    return (
        <main className="min-h-screen w-full bg-bg font-sans">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* ───────────── LEFT: AUTH FORM ───────────── */}
                <div className="flex items-center justify-center px-6 py-10 lg:px-12">
                    <div className="w-full max-w-sm animate-fade-up">

                        {/* Brand */}
                        <div className="text-center mb-8">
                            <div className="mx-auto mb-5 h-14 w-14 rounded-2xl bg-lime/10 border border-lime/25 grid place-items-center">
                                <Bot size={26} className="text-lime" />
                            </div>
                            <div className="text-[15px] font-semibold tracking-tight text-primary">
                                LUMIO
                            </div>
                        </div>

                        {/* Headings */}
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted text-center mb-2">
                            Your personal AI assistant
                        </p>
                        <h1
                            id="auth-title"
                            className="text-2xl font-semibold tracking-tight text-primary text-center"
                        >
                            {isRegistering ? "Create your account" : "Welcome back"}
                        </h1>
                        <p className="mt-2 text-[13.5px] text-secondary text-center">
                            {isRegistering
                                ? "Set up your account to start chatting."
                                : "Sign in to pick up where you left off."}
                        </p>

                        {/* Messages */}
                        {(sessionError || error) && (
                            <div
                                role="alert"
                                className="mt-6 flex items-start gap-2 rounded-xl border border-[#5A2D2D] bg-[#241717] px-3.5 py-2.5 text-[12.5px] text-[#F0A0A0]"
                            >
                                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                                <span>{error || sessionError}</span>
                            </div>
                        )}
                        {notice && (
                            <div
                                role="status"
                                className="mt-6 flex items-start gap-2 rounded-xl border border-lime/30 bg-lime/10 px-3.5 py-2.5 text-[12.5px] text-lime"
                            >
                                <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                                <span>{notice}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form className="mt-6 space-y-3.5" onSubmit={submit}>
                            {isRegistering && (
                                <label className="block">
                                    <span className="block text-[12.5px] font-medium text-secondary mb-1.5">
                                        Name
                                    </span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                        autoComplete="name"
                                        required
                                        placeholder="Your name"
                                        className={inputClass}
                                    />
                                </label>
                            )}
                            <label className="block">
                                <span className="block text-[12.5px] font-medium text-secondary mb-1.5">
                                    Email
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                    autoComplete="email"
                                    required
                                    placeholder="you@example.com"
                                    className={inputClass}
                                />
                            </label>
                            <label className="block">
                                <span className="block text-[12.5px] font-medium text-secondary mb-1.5">
                                    Password
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    autoComplete={isRegistering ? "new-password" : "current-password"}
                                    minLength={isRegistering ? 8 : undefined}
                                    required
                                    placeholder="••••••••"
                                    className={inputClass}
                                />
                            </label>

                           <button
                            type="submit"
                            disabled={submitting}
                            className="w-full mt-1 rounded-xl text-[#06110A] font-medium text-[14px] py-2.5
                                    hover:brightness-110 active:brightness-95
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                    transition-all"
                            style={{
                                backgroundImage: "linear-gradient(135deg, #7CF29C 0%, #B6F36B 100%)",
                                boxShadow: "0 0 24px rgba(124, 242, 156, 0.15)",
                            }}
                        >
                            {submitting
                                ? "Please wait..."
                                : isRegistering ? "Create account" : "Sign in"}
                        </button>
                        </form>

                        {/* Switch mode */}
                        <p className="mt-6 text-center text-[13px] text-secondary">
                            {isRegistering ? "Already have an account?" : "New to Lumio?"}{" "}
                            <button
                                type="button"
                                onClick={() => changeMode(isRegistering ? "login" : "register")}
                                className="text-lime font-medium hover:underline underline-offset-4 transition-colors"
                            >
                                {isRegistering ? "Sign in" : "Create account"}
                            </button>
                        </p>

                        <p className="mt-8 text-center text-[11px] text-muted">
                            Protected by Lumio · All data stays private to you.
                        </p>
                    </div>
                </div>

                {/* ───────────── RIGHT: STORY PANEL ───────────── */}
                <aside className="relative hidden lg:flex flex-col justify-center overflow-hidden border-l border-border bg-sidebar px-12 xl:px-16">
                    {/* Ambient gradient glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(124,242,156,0.12), transparent 60%), " +
                                "radial-gradient(ellipse 60% 45% at 80% 85%, rgba(182,243,107,0.08), transparent 60%)",
                        }}
                    />

                    <div className="relative max-w-md animate-fade-up">
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-lime">
                            <Sparkles size={12} />
                            The AI of you
                        </div>

                        {/* Headline */}
                        <h2 className="mt-6 text-3xl xl:text-4xl font-semibold tracking-tight text-primary leading-[1.15]">
                            An intelligence that thinks the way{" "}
                            <span className="gradient-lime-text">you</span> do.
                        </h2>

                        {/* Description */}
                        <p className="mt-4 text-[14.5px] leading-relaxed text-secondary">
                            Lumio isn't a generic chatbot. It's a personal AI that
                            learns your tone, remembers your context, and grows
                            sharper with every conversation — so the answers feel
                            less like a search and more like a thought you
                            already had.
                        </p>

                        {/* Feature list */}
                        <ul className="mt-8 space-y-4">
                            <Feature
                                icon={Brain}
                                title="Remembers you"
                                text="Keeps the thread of your ideas across chats — no repeated context."
                            />
                            <Feature
                                icon={MessageSquare}
                                title="Speaks your language"
                                text="Adapts to your writing style, preferences and pace."
                            />
                            <Feature
                                icon={Zap}
                                title="Built for flow"
                                text="Fast, focused responses that move you forward — not walls of text."
                            />
                            <Feature
                                icon={Shield}
                                title="Private by design"
                                text="Your conversations belong to you. Always encrypted, never sold."
                            />
                        </ul>

                        {/* Footer quote */}
                        <p className="mt-10 text-[12.5px] text-muted italic">
                            "Not another assistant. An extension of your mind."
                        </p>
                    </div>
                </aside>

            </div>
        </main>
    )
}

function Feature({ icon: Icon, title, text }) {
    return (
        <li className="flex items-start gap-3.5">
            <div className="shrink-0 h-9 w-9 rounded-xl bg-surface border border-border grid place-items-center">
                <Icon size={16} className="text-lime" />
            </div>
            <div>
                <div className="text-[13.5px] font-medium text-primary">{title}</div>
                <div className="text-[12.5px] text-secondary mt-0.5 leading-relaxed">
                    {text}
                </div>
            </div>
        </li>
    )
}

export default AuthPage