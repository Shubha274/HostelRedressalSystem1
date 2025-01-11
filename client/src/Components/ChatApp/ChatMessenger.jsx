/*import React from "react";
import Navbar from "../NavBar/Navbar";
import "./ChatMessenger.css";
import wassupImage from "./wassup.png"
import { io } from "socket.io-client";
const Chat = () => {
    const [name, setName] = useState("");
    const [messages, setMessages] = useState([]);
    const textareaRef = useRef(null);
    const messageAreaRef = useRef(null);

    // Initialize socket connection
    const socket = io("http://localhost:8080"); }
const ChatMessenger = () => {
  let name;
  let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
  do{
    name = prompt("Please enter your name ");
    
  }while(!name)
    textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
} 
  return (
    <>
      <Navbar />
      
        <div class="brand">
         <img height="40" src={wassupImage} alt="Wassup" />
            <h1>HOSTEL REDRESSAL SYSTEM</h1>
        </div>
        < div class="message__area"></div>
          <div>
            <textarea id="textarea" cols="30" rows="1" placeholder="Write a message..."></textarea>
        </div>
    
    </>
  );
};

export default ChatMessenger;*/
/*import React, { useState, useEffect, useRef } from "react";
import Navbar from "../NavBar/Navbar";
import "./ChatMessenger.css";
import wassupImage from "./wassup.png";
import { io } from "socket.io-client";

const ChatMessenger = () => {
    const [name, setName] = useState(""); // State for username
    const [messages, setMessages] = useState([]); // State for messages
    const textareaRef = useRef(null); // Reference for textarea
    const messageAreaRef = useRef(null); // Reference for message area
    const socketRef = useRef(null); // Reference for socket connection

    // Initialize socket connection once when the component mounts
    useEffect(() => {
        // Prompt for username
        let userName;
        do {
            userName = prompt("Please enter your name:");
        } while (!userName);
        setName(userName);

        // Connect to the socket server
        const socket = io("http://localhost:3000");
        socketRef.current = socket;

        // Listen for incoming messages
        socket.on("message", (msg) => {
            appendMessage(msg, "incoming");
        });

        // Clean up on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (message) => {
        if (!message.trim()) return;

        const msg = { user: name, message: message.trim() };

        // Append the message locally
        appendMessage(msg, "outgoing");

        // Send the message to the server
        socketRef.current.emit("message", msg);

        // Clear the textarea
        textareaRef.current.value = "";
    };

    const appendMessage = (msg, type) => {
        setMessages((prevMessages) => [...prevMessages, { ...msg, type }]);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            sendMessage(e.target.value);
        }
    };

    useEffect(() => {
        // Scroll to the bottom whenever messages are updated
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <Navbar />
            <div className="brand">
                <img height="40" src={wassupImage} alt="Wassup" />
                <h1>HOSTEL REDRESSAL SYSTEM</h1>
            </div>
            <div ref={messageAreaRef} className="message__area">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.type === "outgoing" ? "outgoing" : "incoming"}`}
                    >
                        <h4>{msg.user}</h4>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div>
                <textarea
                    id="textarea"
                    ref={textareaRef}
                    cols="30"
                    rows="1"
                    placeholder="Write a message..."
                    onKeyUp={handleKeyUp}
                ></textarea>
            </div>
        </>
    );
};

export default ChatMessenger;*/
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../NavBar/Navbar";
import "./ChatMessenger.css";
import wassupImage from "./wassup.png";
import { io } from "socket.io-client";

const ChatMessenger = () => {
    const [name, setName] = useState(""); // Username
    const [recipient, setRecipient] = useState(""); // Recipient's username
    const [messages, setMessages] = useState([]); // Messages
    const textareaRef = useRef(null); // Reference for textarea
    const messageAreaRef = useRef(null); // Reference for message area
    const socketRef = useRef(null); // Socket connection

    useEffect(() => {
        // Prompt for username
        let userName;
        do {
            userName = prompt("Enter your name:");
        } while (!userName);
        setName(userName);

        // Connect to the server
        const socket = io("http://localhost:5000");
        socketRef.current = socket;

        // Register username with the server
        socket.emit("register", userName);

        // Listen for messages
        socket.on("message", (msg) => {
            appendMessage(msg, "incoming");
        });

        // Listen for errors
        socket.on("error", (errorMsg) => {
            alert(errorMsg);
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (message) => {
        if (!message.trim() || !recipient.trim()) {
            alert("Message and recipient are required.");
            return;
        }

        const msg = { sender: name, recipient, message: message.trim() };

        // Append the message locally
        appendMessage({ user: name, message: message.trim() }, "outgoing");

        // Send the message to the server
        socketRef.current.emit("private-message", msg);

        // Clear the textarea
        textareaRef.current.value = "";
    };

    const appendMessage = (msg, type) => {
        setMessages((prevMessages) => [...prevMessages, { ...msg, type }]);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            sendMessage(e.target.value);
        }
    };

    useEffect(() => {
        // Scroll to the bottom when messages update
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <Navbar />
            <div className="brand">
                <img height="40" src={wassupImage} alt="Wassup" />
                <h1>HOSTEL REDRESSAL SYSTEM</h1>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Recipient's username"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
            </div>
            <div ref={messageAreaRef} className="message__area">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.type === "outgoing" ? "outgoing" : "incoming"}`}
                    >
                        <h4>{msg.user}</h4>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div>
                <textarea
                    id="textarea"
                    ref={textareaRef}
                    cols="30"
                    rows="1"
                    placeholder="Write a message..."
                    onKeyUp={handleKeyUp}
                ></textarea>
            </div>
        </>
    );
};

export default ChatMessenger;

