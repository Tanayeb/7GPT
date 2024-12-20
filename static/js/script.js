const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const typingIndicator = document.getElementById("typingIndicator");

async function sendMessage(message) {
    try {
        typingIndicator.style.display = "block";

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        typingIndicator.style.display = "none";

        if (data.error) {
            addMessage("Error: " + data.error, "error");
        } else {
            addMessage(data.response, "assistant");
        }
    } catch (error) {
        typingIndicator.style.display = "none";
        addMessage("Failed to connect to the server.", "error");
    }
}

function addMessage(text, role) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role);
    messageDiv.innerText = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, "user");
            sendMessage(message);
            messageInput.value = "";
        }
    }
}
