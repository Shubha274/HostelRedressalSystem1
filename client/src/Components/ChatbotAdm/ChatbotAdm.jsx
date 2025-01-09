import React, { useState } from "react";
import "./ChatbotAdm.css";

const ChatbotAdm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { from: "user", text: userInput }];
    setMessages(newMessages);

    const userMessage = userInput.toLowerCase();
    setUserInput("");

    // Simulate bot response
    setTimeout(() => {
      if (userMessage.includes("works")) {
        const features = (
          <div>
            <strong>Here are the awesome features of this website:</strong>
            <ul>
              <li>💬 <strong>Chat & Video Chat:</strong> Seamlessly communicate with the warden.</li>
              <li>📝 <strong>Grievance Form:</strong> Submit and explain your concerns easily.</li>
              <li>📊 <strong>Dashboard:</strong> Track the status and progress of your grievances in real-time.</li>
              <li>🔒 <strong>Secure Platform:</strong> Your data is safe and confidential.</li>
            </ul>
          </div>
        );
        setMessages((prev) => [...prev, { from: "bot", text: features }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Sorry, I didn't quite get that. Can you rephrase or ask something else?" },
        ]);
      }
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <div className={`chat-icon ${isOpen ? "open" : ""}`} onClick={handleIconClick}>
        <img src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png" alt="Chat Icon" />
      </div>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">ChatBot</div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
            />
            <button className="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotAdm;
