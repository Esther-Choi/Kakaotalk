const messageForm = document.querySelector("form"),
  messageInput = messageForm.querySelector("input"),
  message = document.querySelector(".messageList");
messageContainer = document.querySelector(".messages");

function paintMsg(text) {
  const li = document.createElement("li");
  const divTime = document.createElement("div");
  const spanTime = document.createElement("span");
  const divMsg = document.createElement("div");
  const spanMsg = document.createElement("span");
  const spanRead = document.createElement("span");
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  li.className = "my_message";
  divTime.className = "time";
  spanTime.className = "time";
  divMsg.className = "my_messageBox";
  spanRead.className = "read";
  if (hours < 12) {
    if (minutes < 10) {
      spanTime.innerText = `${hours}:0${minutes} AM`;
    } else {
      spanTime.innerText = `${hours}:${minutes} AM`;
    }
  } else {
    if (minutes < 10) {
      spanTime.innerText = `${hours}:0${minutes} PM`;
    } else {
      spanTime.innerText = `${hours}:${minutes} PM`;
    }
  }
  spanMsg.innerText = text;
  spanRead.innerText = "1";
  li.appendChild(divTime);
  li.appendChild(divMsg);
  divTime.appendChild(spanRead);
  divTime.appendChild(spanTime);
  divMsg.appendChild(spanMsg);
  message.appendChild(li);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = messageInput.value;
  if (currentValue != "") {
    paintMsg(currentValue);
  }
  messageInput.value = "";
}

function init() {
  messageForm.addEventListener("submit", handleSubmit);
}

init();
