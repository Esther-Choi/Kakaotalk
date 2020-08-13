const messageForm = document.querySelector("form"),
  messageInput = messageForm.querySelector("input"),
  message = document.querySelector(".messageList");
(messageContainer = document.querySelector(".messages")),
  (hashtagIcon = document.querySelector(".fa-hashtag")),
  (sendIcon = document.querySelector(".fa-paper-plane")),
  (sendBtn = document.querySelector(".send"));

let msg = [];

function saveMsg() {
  localStorage.setItem("msg_captain", JSON.stringify(msg));
  // local storage는 모든 값을 string으로만 저장한다. 따라서 obj 타입인 msg를
  // 넣으면 object라고 출력이 된다. JSON.stringify 기능을 사용하면
  // 자바스크립트의 모든 object를 string으로 바꿔준다.
}

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
  const newId = msg.length + 1; // 아래 obj에서 사용될 id 변수 생성
  li.className = "my_message";
  li.id = newId;
  divTime.className = "time";
  spanTime.className = "time";
  divMsg.className = "my_messageBox";
  spanMsg.className = "content";
  spanRead.className = "read";
  if (hours < 12) {
    if (minutes < 10) {
      spanTime.innerText = `${hours}:0${minutes} AM`;
    } else {
      spanTime.innerText = `${hours}:${minutes} AM`;
    }
  } else {
    if (minutes < 10) {
      spanTime.innerText = `${hours - 10}:0${minutes} PM`;
    } else {
      spanTime.innerText = `${hours - 10}:${minutes} PM`;
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

  // 입력받은 msg 저장을 위해 리스트에 넣을 object 생성
  const msgObj = {
    text: text,
    id: newId,
    time: spanTime.innerText,
  };
  msg.push(msgObj); // 위에 만들어 놓은 빈 리스트 msg에 object 삽입
  saveMsg(); // local storaage에 저장
}

function paintOldMsg(text, time) {
  const li = document.createElement("li");
  const divTime = document.createElement("div");
  const spanTime = document.createElement("span");
  const divMsg = document.createElement("div");
  const spanMsg = document.createElement("span");
  const spanRead = document.createElement("span");
  const newId = msg.length + 1; // 아래 obj에서 사용될 id 변수 생성
  li.className = "my_message";
  li.id = newId;
  divTime.className = "time";
  spanTime.className = "time";
  divMsg.className = "my_messageBox";
  spanMsg.className = "content";
  spanRead.className = "read";
  spanTime.innerText = time;
  spanMsg.innerText = text;
  spanRead.innerText = "1";
  li.appendChild(divTime);
  li.appendChild(divMsg);
  divTime.appendChild(spanRead);
  divTime.appendChild(spanTime);
  divMsg.appendChild(spanMsg);
  message.appendChild(li);
  messageContainer.scrollTop = messageContainer.scrollHeight;

  const msgObj = {
    text: text,
    id: newId,
    time: spanTime.innerText,
  };
  msg.push(msgObj); // 위에 만들어 놓은 빈 리스트 msg에 object 삽입
  saveMsg();
}

function changeBtn(event) {
  const currentValue = messageInput.value;
  if (currentValue == "") {
    hashtagIcon.style.display = "block";
    sendIcon.style.display = "none";
  } else {
    hashtagIcon.style.display = "none";
    sendIcon.style.display = "block";
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = messageInput.value;
  if (currentValue != "") {
    paintMsg(currentValue);
  }
  messageInput.value = "";
  changeBtn();
}

function loadMsg() {
  const loadedMsg = localStorage.getItem("msg_captain");
  if (loadedMsg !== null) {
    // 로드 해올때는 다시 object 객체로 가져와야 하기 때문에
    // JSON.parse를 사용해서 string으로 저장되어있는 값을 다시 obj로 변환
    const parsedMsg = JSON.parse(loadedMsg);

    // foreach는 list 객체 하나하나한테 지정한 함수를 실행 시켜주는 역할을 한다.
    // parsedMsg로 불러온 obj 값들 하나하나에 paintMsg 함수로 id말고 text,
    // 내용을 출력해준다.
    parsedMsg.forEach(function (msg) {
      paintOldMsg(msg.text, msg.time);
    });
  }
}

function init() {
  loadMsg();
  sendIcon.style.display = "none";
  messageForm.addEventListener("input", changeBtn);
  messageForm.addEventListener("submit", handleSubmit);
  sendBtn.addEventListener("click", handleSubmit);
}

init();
