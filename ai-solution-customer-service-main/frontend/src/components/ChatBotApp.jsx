

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../App.css'

import myImage from '../assets/full_logo.png';
function App() {
  
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  
  // Ref to hidden file input
  const fileInputRef = useRef(null);

  // --- Voice Setup ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const startListening = () => {
    if (recognition) {
      recognition.start();
      recognition.onresult = (e) => setMessage(e.results[0][0].transcript);
    }
  };

  // --- Send Logic ---
  const sendMessage = async () => {
    if (!message.trim() && !selectedImage) return;

    // 1. Prepare visual history
    const newHistory = [...chatHistory, { 
      sender: 'user', 
      text: message, 
      image: selectedImage ? URL.createObjectURL(selectedImage) : null 
    }]
    setChatHistory(newHistory)
    setIsLoading(true)

    try {
      // 2. Prepare FormData (Required for Files)
      const formData = new FormData();
      formData.append("message", message || "Analyze this image");
      formData.append("user_id", "customer_1");
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // 3. Send to Backend
      const response = await axios.post('http://127.0.0.1:8000/api/chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setChatHistory([...newHistory, { sender: 'bot', text: response.data.reply }])
      setMessage('')
      setSelectedImage(null)

    } catch (error) {
      console.error("Error:", error)
      setChatHistory([...newHistory, { sender: 'bot', text: "⚠️ Error connecting to AI." }])
    }
    setIsLoading(false)
  }

  return (
    
    <div className="chat-container">
      <div className="logo-container"> <img src={myImage}  className="logo-image"  ClassName="object-scale-down w-10 mb-4 drop-shadow-lg" style={{width:'140px', height:'auto'}} alt="KFC Logo" /></div>
      
      <div className="chat-box ">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.image && <img src={msg.image} alt="upload" className="chat-image" />}
            <p><strong>{msg.sender === 'user' ? 'You' : 'KFC Bot'}:</strong> {msg.text}</p>
          </div>
        ))}
        {isLoading && <p className="loading-text"><em>Analyzing...</em></p>}
      </div>

      <div className="preview-area">
        {selectedImage && (
          <div className="image-preview">
            <span className="preview-text">📷 {selectedImage.name}</span>
            <button  className="remove-image-btn" onClick={() => setSelectedImage(null)}>❌</button>
          </div>
        )}
      </div>

      <div className="input-area">
        <button onClick={startListening} className="icon-btn voice-btn">🎤</button>
        
        {/* Hidden File Input + Camera Button */}
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{display: 'none'}} 
          onChange={(e) => setSelectedImage(e.target.files[0])}
          accept="image/*"
        />
        <button onClick={() => fileInputRef.current.click()} className="icon-btn camera-btn">📷</button>

        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()} className="message-input"
        />
        <button className="send-btn" onClick={sendMessage} disabled={isLoading}>Send</button>
      </div>
    </div>
    
  )
}

export default App


