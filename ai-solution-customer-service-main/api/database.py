import sqlite3
import os

# Identify if we are on Vercel or Local
# On Vercel, we MUST use /tmp/ for SQLite
if os.environ.get("VERCEL"):
    DB_PATH = "/tmp/kfc_complaints.db"
else:
    DB_PATH = "kfc_complaints.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS complaints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            message TEXT,
            ai_response TEXT,
            sentiment TEXT,
            is_escalated BOOLEAN DEFAULT 0,
            refund_issued BOOLEAN DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()

def save_complaint(user_id, message, ai_response, is_escalated=False, refund_issued=False):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    sentiment = "Neutral"
    if any(word in message.lower() for word in ["bad", "cold", "late", "angry", "burnt"]):
        sentiment = "Negative"

    try:
        cursor.execute("""
            INSERT INTO complaints (user_id, message, ai_response, sentiment, is_escalated, refund_issued) 
            VALUES (?, ?, ?, ?, ?, ?)""",
            (user_id, message, ai_response, sentiment, is_escalated, refund_issued)
        )
        conn.commit()
    except Exception as e:
        print(f"Database Error: {e}")
    finally:
        conn.close()
