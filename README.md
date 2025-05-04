# ✉️ Email AI Enhancer

An AI-powered web app that helps you improve your email drafts using OpenAI's GPT API. Just paste your rough email, click a button, and let AI enhance it instantly with better tone, grammar, and clarity.

---

## 🚀 Features

- Clean, modern UI with Material-UI
- Instant AI-enhanced email suggestions
- React frontend + Express backend
- Easy deployment and customization

---

## 🔧 Setup Instructions

### 1. Clone the repository

git clone https://github.com/shant-arslanian/emailAI.git

cd emailAI

### 2. Install dependencies

For both the frontend and backend:

npm install

### 3. Set up your environment variables

#### For the frontend (.env file in the root):

REACT_APP_BASE_URL=http://localhost:5000

#### For the backend (.env file in server/ or root, depending on your setup):

OPENAI_API_KEY=your_openai_api_key_here

#### You must use your own OpenAI API key to access the GPT model. You can get one from https://platform.openai.com.

## 🧪 Running the app locally

#### Start backend:

node server/index.js

#### Start frontend:

npm start
