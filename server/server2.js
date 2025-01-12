/*const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors'); // Import CORS middleware

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from this origin
        methods: ["GET", "POST"] // Allow these HTTP methods
    }
});

// Enable CORS for the Express server
app.use(cors());

// Serve static files
app.use(express.static(__dirname + '/public'));

// Track connected users
const users = {}; // Key: username, Value: socket ID

// Serve the ChatMessenger.jsx file
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/src/Components/ChatApp/ChatMessenger.jsx'));
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Register user with username
    socket.on('register', (username) => {
        users[username] = socket.id; // Map username to socket ID
        console.log(`User registered: ${username}`);
    });

    // Handle private messages
    socket.on('private-message', ({ sender, recipient, message }) => {
        const recipientSocketId = users[recipient];
        if (recipientSocketId) {
            // Send message to recipient
            io.to(recipientSocketId).emit('message', { user: sender, message });
        } else {
            // Notify sender that the recipient is not available
            socket.emit('error', `User ${recipient} is not online.`);
        }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);

        // Remove the user from the users object
        for (const [username, id] of Object.entries(users)) {
            if (id === socket.id) {
                delete users[username];
                break;
            }
        }
    });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.static(__dirname + "/public"));

const users = {};

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/src/Components/ChatApp/ChatMessenger.jsx"));
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("register", (username) => {
        users[username] = socket.id;
        console.log(`User registered: ${username}`);
    });

    socket.on("private-message", ({ sender, recipient, message }) => {
        const recipientSocketId = users[recipient];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("message", { user: sender, message });
        } else {
            socket.emit("error", `User ${recipient} is not online.`);
        }
    });

    socket.on("file-upload", ({ sender, recipient, fileName, fileContent }) => {
        const recipientSocketId = users[recipient];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("file-message", {
                user: sender,
                fileName,
                fileContent,
            });
        } else {
            socket.emit("error", `User ${recipient} is not online.`);
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        for (const [username, id] of Object.entries(users)) {
            if (id === socket.id) {
                delete users[username];
                break;
            }
        }
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));*/
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors'); // Import CORS middleware

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from this origin
        methods: ["GET", "POST"], // Allow these HTTP methods
    },
});

// Enable CORS for the Express server
app.use(cors());

// Serve static files
app.use(express.static(__dirname + '/public'));

// Track connected users
const users = {}; // Key: username, Value: socket ID

// Serve the ChatMessenger.jsx file
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/src/Components/ChatApp/ChatMessenger.jsx'));
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Register user with username
    socket.on('register', (username) => {
        users[username] = socket.id; // Map username to socket ID
        console.log(`User registered: ${username}`);
    });

    // Handle private messages
    socket.on('private-message', ({ sender, recipient, message }) => {
        const recipientSocketId = users[recipient];
        if (recipientSocketId) {
            // Send message to recipient
            io.to(recipientSocketId).emit('message', { user: sender, message });
        } else {
            // Notify sender that the recipient is not available
            socket.emit('error', `User ${recipient} is not online.`);
        }
    });

    // Handle file uploads
    socket.on('file-upload', ({ sender, recipient, fileName, fileContent, isImage }) => {
        const recipientSocketId = users[recipient];
        if (recipientSocketId) {
            // Send the file (image or other types) to the recipient
            io.to(recipientSocketId).emit('file-message', {
                user: sender,
                fileName,
                fileContent,
                isImage, // Tell the frontend if it's an image
            });
        } else {
            // Notify sender that the recipient is not available
            socket.emit('error', `User ${recipient} is not online.`);
        }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);

        // Remove the user from the users object
        for (const [username, id] of Object.entries(users)) {
            if (id === socket.id) {
                delete users[username];
                break;
            }
        }
    });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

