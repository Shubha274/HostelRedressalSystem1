import React, { useState } from "react";
import "./ChatbotHeadWar.css";

const ChatbotHeadWar = () => {
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
              <li>💬 <strong>Chat & Video Chat:</strong> Seamlessly communicate with the Wardens.</li>
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
          {
            from: "bot",
            text: "Sorry, I didn't quite get that. Can you rephrase or ask something else?",
          },
        ]);
      }
    }, 1000);
  };

  return (
    <div className="chatbot-head-container">
      <div className={`chat-head-icon ${isOpen ? "open" : ""}`} onClick={handleIconClick}>
        <img src="https://cdn-icons-png.flaticon.com/512/2190/2190552.png" alt="Chat Icon" />
      </div>
      {isOpen && (
        <div className="chat-head-window">
          <div className="chat-head-header">ChatBot Head</div>
          <div className="chat-head-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-head-message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {typeof msg.text === "string" ? msg.text : <div>{msg.text}</div>}
              </div>
            ))}
          </div>
          <div className="chat-head-input-container">
            <input
              type="text"
              className="chat-head-input"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
            />
            <button className="send-head-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotHeadWar;
