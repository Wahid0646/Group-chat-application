function checkLogin() {
    const username = localStorage.getItem("username");
    if (!username) {
        window.location.href = "/login.html";
    }
}

function loginUser() {
    const username = document.getElementById("usernameInput").value;
    if (username) {
        localStorage.setItem("username", username);
        window.location.href = "/";
    }
}

function sendMessage() {
    const username = localStorage.getItem("username");
    const message = document.getElementById("messageInput").value;
    if (username && message) {
        fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, message })
        })
        .then(() => {
            document.getElementById("messageInput").value = "";
            fetchMessages();
        });
    }
}

function fetchMessages() {
    fetch("/messages")
        .then(response => response.json())
        .then(messages => {
            const messagesDiv = document.getElementById("messages");
            messagesDiv.innerHTML = "";
            messages.forEach(message => {
                messagesDiv.innerHTML += `<p><strong>${message.username}:</strong> ${message.message}</p>`;
            });
        });
}

window.onload = function() {
    checkLogin();
    fetchMessages();
};
