import google.generativeai as genai

# PASTE YOUR REAL KEY HERE
GEMINI_API_KEY = "AIzaSyB7D_wcicDZDjbwyzh3e_oXggPN4o-R_EA" 
genai.configure(api_key=GEMINI_API_KEY)

print("Searching for available models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- Found model: {m.name}")
except Exception as e:
    print("Error listing models:", e)