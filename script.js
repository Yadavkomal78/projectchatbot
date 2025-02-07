document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("theme-button");
  const chatContainer = document.getElementById("chat-container");
  const chatWindow = document.getElementById("chat-window");
  const messageInput = document.getElementById("message");
  const sendButton = document.getElementById("send");
  const moreOptionsButton = document.getElementById("more-options");
  const chatOptions = document.getElementById("chat-options");
  const troubleshootButton = document.getElementById("troubleshoot");
  const clearChatButton = document.getElementById("clear-chat");
  const voiceBtn = document.getElementById("voice-btn");

  // Toggle Theme
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // Show/hide options on click (More Options)
  moreOptionsButton.addEventListener("click", () => {
    chatOptions.style.display = chatOptions.style.display === "flex" ? "none" : "flex";
  });

  // Troubleshoot button
  troubleshootButton.addEventListener("click", () => {
    alert("Troubleshooting is not yet implemented.");
    chatOptions.style.display = "none";
  });

  // Clear chat button
  clearChatButton.addEventListener("click", () => {
    chatWindow.innerHTML = ""; // Clear all chat messages
    chatOptions.style.display = "none";
  });

  // Add message to chat
  function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;

    if (sender === "user") {
      messageDiv.className = "user-message";
    } else {
      messageDiv.className = "bot-message";
    }

    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the bottom
  }

  // Send message and get response
  async function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (userMessage === "") return;

    addMessage(userMessage, "user");
    messageInput.value = "";

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      addMessage(data.reply, "bot");
    } catch (error) {
      addMessage("Error: Unable to fetch response.", "bot");
    }
  }

  // Voice Recognition
  voiceBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      messageInput.value = transcript; // Set the transcribed text in the input field
      sendMessage(); // Automatically send the transcribed message
    };

    recognition.onerror = (event) => {
      addMessage("Error: Unable to process voice input.", "bot");
    };
  });

  // Event listeners
  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // Create the animated background element
  const animatedBackground = document.createElement("div");
  animatedBackground.id = "animated-background";
  document.body.appendChild(animatedBackground);

  // Toggle button for enabling/disabling the animated background
  const toggleButton = document.createElement("button");
  toggleButton.id = "background-toggle";
  toggleButton.textContent = "Toggle Background";
  toggleButton.style.position = "fixed";
  toggleButton.style.top = "10px";
  toggleButton.style.right = "10px";
  toggleButton.style.padding = "10px 15px";
  toggleButton.style.backgroundColor = "#6D678E";
  toggleButton.style.color = "white";
  toggleButton.style.border = "none";
  toggleButton.style.borderRadius = "5px";
  toggleButton.style.cursor = "pointer";
  document.body.appendChild(toggleButton);

  // Toggle visibility background ke liye
  toggleButton.addEventListener("click", () => {
    if (animatedBackground.style.display === "none") {
      animatedBackground.style.display = "block";
      toggleButton.textContent = "Disable Background";
    } else {
      animatedBackground.style.display = "none";
      toggleButton.textContent = "Enable Background";
    }
  });
});
