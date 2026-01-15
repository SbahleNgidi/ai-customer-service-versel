from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from PIL import Image
import os
from dotenv import load_dotenv
import io
import re
from database import init_db, save_complaint

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

# --- CONFIGURATION ---
# Load environment variables from the .env file
load_dotenv()

# Get the key securely
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("No API Key found! Make sure .env file exists.")

genai.configure(api_key=GEMINI_API_KEY)

# --- MEMORY ---
chat_sessions = {}

# --- DUMMY EMAIL SYSTEM ---
def send_dummy_email(user_email, content):
    print(f"\n[SYSTEM EMAIL SENT] To: {user_email} | Body: {content}\n")
    return True

# --- AI CONFIGURATION ---
store_knowledge = """
- KFC Umhlanga: 09:00-22:00
- KFC Durban Central: 08:00-20:00
- KFC Sandton: 10:00-21:00
"""

model = genai.GenerativeModel(
    "gemini-flash-latest",
    system_instruction=f"""
    You are an intelligent KFC Customer Service Manager.
    
    KNOWLEDGE BASE:
    {store_knowledge}
    
    PROTOCOL FOR REFUNDS:
    1. STEP 1: If a user complains about food, apologize and ASK FOR A PHOTO OF THE RECEIPT. Do not offer a refund yet.
    2. STEP 2: If an image is uploaded, look for the words 'KFC' or 'Tax Invoice'. 
       - If valid: Ask for their email address to send the voucher.
       - If invalid: Politely reject it.
    3. STEP 3: If user provides email AND you have verified the receipt previously, issue a refund.
    
    PROTOCOL FOR ESCALATION:
    - If the user is very angry, threatening, or the issue is complex (food poisoning, injury), start your reply with "ESCALATE:".
    - Tell them a Human Manager will call them within 15 minutes.
    
    LANGUAGE SETTINGS:
    - Detect the user's language (Zulu, Xhosa, Afrikaans, English) and reply in the SAME language.
    """
)

@app.post("/api/chat")
async def chat_endpoint(
    message: str = Form(...),
    user_id: str = Form("guest"),
    image: UploadFile = File(None)
):
    try:
        # 1. Get History
        history = chat_sessions.get(user_id, "")
        
        content_to_send = []
        user_input_log = message

        # 2. Handle Image (Receipt or Food)
        if image:
            print(f"Processing image: {image.filename}")
            image_bytes = await image.read()
            img = Image.open(io.BytesIO(image_bytes))
            content_to_send.append(img)
            content_to_send.append(f"User uploaded an image. History: {history}. Message: {message}")
            user_input_log += " [Image Uploaded]"
        else:
            content_to_send.append(f"HISTORY:\n{history}\n\nUSER:\n{message}")

        # 3. Get AI Response
        response = model.generate_content(content_to_send)
        ai_reply = response.text
        
        # 4. Check for Escalation or Refund Triggers
        escalated = False
        refund = False
        
        # If AI decided to escalate
        if "ESCALATE:" in ai_reply:
            escalated = True
            ai_reply = ai_reply.replace("ESCALATE:", "").strip() # Remove the flag from user view
            print(f"⚠️ MANAGER ALERT: Case escalated for User {user_id}")

        # Check if email was provided for refund (Simple Regex)
        email_match = re.search(r'[\w\.-]+@[\w\.-]+', message)
        if email_match and "refund" in history.lower():
            user_email = email_match.group(0)
            send_dummy_email(user_email, "Your KFC Refund Voucher: #KFC-998877. Value: R100.")
            refund = True
            print(f"💰 REFUND PROCESSED for {user_email}")

        # 5. Save & Update Memory
        updated_history = f"{history}\nUser: {message}\nAI: {ai_reply}"
        chat_sessions[user_id] = updated_history[-1000:]
        
        save_complaint(user_id, user_input_log, ai_reply, is_escalated=escalated, refund_issued=refund)
        
        return {"reply": ai_reply}
        
    except Exception as e:
        print("Error:", e)
        return {"reply": "System Error: Please try again."}
