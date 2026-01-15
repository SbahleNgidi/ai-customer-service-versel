import google.generativeai as genai

# PASTE YOUR REAL KEY HERE
GEMINI_API_KEY = "Add your own api key" 

try:
    print("1. Configuring API...")
    genai.configure(api_key=GEMINI_API_KEY)

    print("2. Connecting to model: gemini-2.0-flash ...")
    # We are using the exact name from your list
    # Use the generic "latest" alias which usually has the free tier enabled
    model = genai.GenerativeModel("gemini-flash-latest")

    print("3. Sending a test message...")
    response = model.generate_content("Hello, are you working?")

    print("\n--- SUCCESS! ---")
    print("AI Replied:", response.text)

except Exception as e:
    print("\n--- FAILURE ---")
    print("The error is:", e)
