const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.use(express.static("public"));
app.get("/public/script.js", (req, res) => {
    res.sendFile(__dirname + "/public/script.js");
});
app.get("/public/style.css", (req, res) => {
    res.sendFile(__dirname + "/public/style.css");
});
app.get("/public/login.js", (req, res) => {
    res.sendFile(__dirname + "/public/login.js");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/login.html", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/messages", (req, res) => {
    try {
        const messagesData = fs.readFileSync("messages.json", "utf8");
        let messages;
        try {
            messages = JSON.parse(messagesData);
        } catch (error) {
            // Handle invalid JSON, initialize messages as empty array
            messages = [];
            fs.writeFileSync("messages.json", "[]", "utf8");
        }
        res.json(messages);
    } catch (error) {
        // Handle errors when reading the JSON file
        console.error("Error reading messages.json:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/messages", (req, res) => {
    const { username, message } = req.body;
    try {
        const messagesData = fs.readFileSync("messages.json", "utf8");
        let messages;
        try {
            messages = JSON.parse(messagesData);
        } catch (error) {
            // Handle invalid JSON, initialize messages as empty array
            messages = [];
            fs.writeFileSync("messages.json", "[]", "utf8");
        }
        messages.push({ username, message });
        fs.writeFileSync("messages.json", JSON.stringify(messages));
        res.send("Message sent successfully!");
    } catch (error) {
        // Handle errors when reading or writing the JSON file
        console.error("Error reading/writing messages.json:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
