# 🍗 KFC AI Customer Service Assistant

A full-stack AI-powered customer service chatbot designed for KFC. This application allows customers to voice their complaints, ask menu questions, and process refunds using advanced AI vision and logic.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-React_|_FastAPI_|_Gemini_|_SQLite-blue)

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [System Architecture](#-system-architecture)
- [Future Enhancements](#-future-enhancements)

---

## 🧐 Project Overview
This Capstone project demonstrates a "Domain-Specific AI Agent." Unlike generic chatbots, this assistant acts as a KFC Manager. It is programmed with specific franchise knowledge (store hours, menu prices) and strict logic protocols for handling refunds (requiring receipt verification).

## ✨ Key Features
* **🗣️ Voice-to-Text:** Users can speak their complaints using the Web Speech API.
* **📷 Vision Analysis:** Users can upload photos of burnt food or receipts. The AI analyzes the image to verify claims.
* **🧠 Logic Protocols:** The AI enforces rules (e.g., "Do not refund without a receipt").
* **🌍 Multilingual Support:** Automatically detects and replies in Zulu, Xhosa, Afrikaans, or English.
* **📧 Email Simulation:** Simulates sending refund vouchers to user email addresses.
* **🚨 Manager Escalation:** Automatically flags "Urgent" cases in the database.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Responsive UI with Chat Interface & Voice Inputs. |
| **Backend** | Python (FastAPI) | Orchestrates Logic, Database, and AI connections. |
| **AI Brain** | Google Gemini Flash | Handles NLU (Text) and Computer Vision. |
| **Database** | SQLite | Stores chat history, complaints, and escalation flags. |
| **Styling** | CSS3 | Custom "KFC Brand" styling (Red/White theme). |

---

## 🚀 Installation & Setup

### Prerequisites
* Node.js & npm (for Frontend)
* Python 3.8+ (for Backend)
* Google Gemini API Key

### 1. Clone the Repository
```bash
git clone [https://github.com/SbahleNgidi/ai-solution-customer-service.git](https://github.com/YourUsername/ai-solution-customer-service.git)
cd ai-solution-customer-service

2. Backend Setup

cd backend
python -m venv venv

# Activate venv (Windows):
.\venv\Scripts\activate
# Activate venv (Mac/Linux):
source venv/bin/activate

pip install -r ../requirements.txt

# Create your environment file in the ROOT folder:
cd ..
touch .env  # or manually create .env

### 🔑 Environment Variables
In the root directory, create a `.env` file and add your Google Gemini API key:
`GEMINI_API_KEY=your_api_key_here`


3. Frontend Setup
Bash

cd ../frontend
npm install
🎮 Usage Guide
Start the Backend:

Bash

# In backend terminal
uvicorn main:app --reload
Start the Frontend:

Bash

# In frontend terminal
npm run dev
Open Browser: Go to http://localhost:5173.

Interact:

Click the Microphone to speak.

Click the Camera to upload a "Burnt Burger" image.

Ask: "What time does Umhlanga close?"