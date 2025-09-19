
const ws = new WebSocket('ws://localhost:8080');

const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");

function scrollToBottom() {
   if (messages) {
      messages.scrollTop = messages.scrollHeight;
   }
}

ws.onopen = function () {
   console.log("Connected to server.");
};

ws.onmessage = function (event) {
   const li = document.createElement("li");
   li.textContent = event.data.toString();
   messages?.appendChild(li);
   scrollToBottom();
};

sendBtn?.addEventListener('click', function () {
   const msg = input.value;
   if (msg) {
      const li = document.createElement("li");
      li.textContent = msg;
      li.classList.add("me");
      messages?.appendChild(li);

      ws.send(msg);

      input.value = "";
      scrollToBottom();
   }
});

ws.onerror = function (error) {
   console.error("WebSocket Error:", error);
};

ws.onclose = function () {
   console.log('Connection closed.');
};