import sqlite3

def init_db():
    conn = sqlite3.connect("kfc_complaints.db")
    cursor = conn.cursor()
    # Create table with NEW columns for escalation and refunds
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

# Updated function to accept new arguments
def save_complaint(user_id, message, ai_response, is_escalated=False, refund_issued=False):
    conn = sqlite3.connect("kfc_complaints.db")
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
        # Fallback: If table is old, just try inserting basic info
        try:
             cursor.execute("INSERT INTO complaints (user_id, message, ai_response, sentiment) VALUES (?, ?, ?, ?)",
                   (user_id, message, ai_response, sentiment))
             conn.commit()
        except:
            pass

    conn.close()