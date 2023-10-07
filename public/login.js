function loginUser() {
    const username = document.getElementById("usernameInput").value;
    if (username) {
        localStorage.setItem("username", username);
        window.location.href = "/";
    } else {
        alert("Please enter a valid username!");
    }
}

function checkLogin() {
    const username = localStorage.getItem("username");
    if (username) {
        window.location.href = "/";
    }
}

document.getElementById("loginButton").addEventListener("click", loginUser);

window.onload = function() {
    checkLogin();
};
