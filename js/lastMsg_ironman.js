function loadMsg() {
  const loadedMsg = localStorage.getItem("msg_ironman");
  if (loadedMsg !== null) {
    // 로드 해올때는 다시 object 객체로 가져와야 하기 때문에
    // JSON.parse를 사용해서 string으로 저장되어있는 값을 다시 obj로 변환
    const parsedMsg = JSON.parse(loadedMsg);

    // foreach는 list 객체 하나하나한테 지정한 함수를 실행 시켜주는 역할을 한다.
    // parsedMsg로 불러온 obj 값들 하나하나에 paintMsg 함수로 id말고 text,
    // 내용을 출력해준다.

    const lastMsg = parsedMsg[parsedMsg.length - 1];
    paintLastMsg(lastMsg.text, lastMsg.time);
  }
}

function paintLastMsg(text, time) {
  const li = document.querySelector(".ironman");
  const newText = li.querySelector(".content");
  const newTime = li.querySelector(".time");
  newText.innerText = text;
  newTime.innerText = time;
}

function init() {
  loadMsg();
}

init();
