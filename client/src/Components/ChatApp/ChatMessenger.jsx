/*import React, { useState, useEffect, useRef } from "react";
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
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../NavBar/Navbar";
import "./ChatMessenger.css";
import wassupImage from "./wassup.png";
import { io } from "socket.io-client";

const ChatMessenger = () => {
    const [name, setName] = useState("");
    const [recipient, setRecipient] = useState("");
    const [messages, setMessages] = useState([]);
    const textareaRef = useRef(null);
    const messageAreaRef = useRef(null);
    const socketRef = useRef(null);

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

        // Listen for file messages
        socket.on("file-message", (fileData) => {
            appendMessage(fileData, "incoming");
        });

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
        appendMessage({ user: name, message: message.trim() }, "outgoing");
        socketRef.current.emit("private-message", msg);
        textareaRef.current.value = "";
    };

    const sendFile = (file) => {
        if (!file || !recipient.trim()) {
            alert("File and recipient are required.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const fileData = {
                sender: name,
                recipient,
                fileName: file.name,
                fileContent: reader.result, // Base64 string
            };
            appendMessage(
                {
                    user: name,
                    message: `File: ${file.name}`,
                    fileName: file.name,
                    fileContent: reader.result,
                },
                "outgoing"
            );
            socketRef.current.emit("file-upload", fileData);
        };
        reader.readAsDataURL(file);
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
                        {msg.fileContent ? (
                            <a href={msg.fileContent} download={msg.fileName}>
                                {msg.fileName}
                            </a>
                        ) : (
                            <p>{msg.message}</p>
                        )}
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
            <div>
                <input
                    type="file"
                    onChange={(e) => sendFile(e.target.files[0])}
                    style={{ marginTop: "10px" }}
                />
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
    const [name, setName] = useState("");
    const [recipient, setRecipient] = useState("");
    const [messages, setMessages] = useState([]);
    const textareaRef = useRef(null);
    const messageAreaRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        let userName;
        do {
            userName = prompt("Enter your name:");
        } while (!userName);
        setName(userName);

        const socket = io("http://localhost:5000");
        socketRef.current = socket;

        socket.emit("register", userName);

        socket.on("message", (msg) => {
            appendMessage(msg, "incoming");
        });

        socket.on("file-message", (fileData) => {
            appendMessage(fileData, "incoming");
        });

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
        appendMessage({ user: name, message: message.trim() }, "outgoing");
        socketRef.current.emit("private-message", msg);
        textareaRef.current.value = "";
    };

    const sendFile = (file) => {
        if (!file || !recipient.trim()) {
            alert("File and recipient are required.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const isImage = file.type.startsWith("image/");
            const fileData = {
                sender: name,
                recipient,
                fileName: file.name,
                fileContent: reader.result,
                isImage, // New property to indicate if the file is an image
            };

            appendMessage(
                {
                    user: name,
                    message: `File: ${file.name}`,
                    fileName: file.name,
                    fileContent: reader.result,
                    isImage,
                },
                "outgoing"
            );
            socketRef.current.emit("file-upload", fileData);
        };
        reader.readAsDataURL(file);
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
                        {msg.isImage ? (
                            <img src={msg.fileContent} alt={msg.fileName} className="chat-image" />
                        ) : (
                            <p>{msg.message}</p>
                        )}
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
            <div>
                <input
                    type="file"
                    onChange={(e) => sendFile(e.target.files[0])}
                    style={{ marginTop: "10px" }}
                />
            </div>
        </>
    );
};

export default ChatMessenger;

