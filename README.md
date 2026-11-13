
# LUMIO AI

### Your Personal Intelligence.

LUMIO is a personal AI assistant designed to understand your context, remember important information, and provide personalized responses through conversations.

Unlike a traditional chatbot, LUMIO combines AI conversations, persistent memory, and conversation history to create a more personalized experience.

---

## Features

- **AI Conversations** – Chat with an AI assistant powered by Groq.
- **Personal Memory** – Store personal information, interests, preferences, skills, and goals.
- **Conversation History** – Automatically save and revisit previous conversations.
- **User Authentication** – Secure registration and login using JWT.
- **Multi-User Support** – Every user has their own private conversations and memories.
- **Memory Management** – Create, view, update, and delete saved memories.
- **Responsive Interface** – Modern dark interface designed for a clean user experience.

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs

### Artificial Intelligence
- Groq API
- Llama 3.3 70B Versatile

---

## Project Structure

```text
LUMIO/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    ├── .env
    ├── server.js
    └── package.json
```

---

## Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd LUMIO
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:3000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get user profile |

### AI

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/chat` | Send a message to AI |

### Conversations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/conversations` | Get conversation history |
| GET | `/api/conversations/:id` | Get a conversation |
| DELETE | `/api/conversations/:id` | Delete a conversation |

### Memory

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/memory` | Create a memory |
| GET | `/api/memory` | Get all memories |
| GET | `/api/memory/:id` | Get a specific memory |
| PUT | `/api/memory/:id` | Update a memory |
| DELETE | `/api/memory/:id` | Delete a memory |

---

## Environment Variables

Never commit your `.env` files or expose private API keys.

Add the following to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
```

---

## Deployment

The application can be deployed using:

- Frontend: Netlify or Vercel
- Backend: Render
- Database: MongoDB Atlas
- AI: Groq API

Configure your production environment variables before deployment.

---

## Project Goal

The goal of LUMIO is to build an AI assistant that becomes more useful through context and memory.

**Not another chatbot. Your personal intelligence.**

---

<p align="center">
  Built with React, Node.js, MongoDB and Groq.
  <br />
  <strong>LUMIO AI</strong>
</p>
