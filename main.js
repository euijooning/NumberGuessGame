/*
- 랜덤번호 지정
- 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누른다.
- if 유저가 랜덤번호를 맞추면 "맞췄습니다!" 메시지 출력
- if 랜덤번호 < 유저번호 => Down
- if 랜덤번호 > 유저번호 => Up
- Reset 버튼을 누르면 게임이 초기화된다.
- 유저가 1 ~ 100 범위를 벗어난 숫자를 입력하면 알려주고, 기회를 차감하지 않는다.
- 유저가 이미 입력한 숫자를 한번 더 입력하면 알려주고, 기회를 차감하지 않는다.
*/

let comNumber = 0;
let playButton = document.getElementById("play-button"); // 웹사이트 전체에서 요소를 id로 가져와서 집어넣겠다.
// console.log(playButton);

let userInput = document.getElementById("user-input");
playButton.addEventListener("click", playGame); // 함수도 매개변수처럼 넘길 수 있다. playGame() 하면 함수를 실행해버림

let resultArea = document.getElementById("result-area");

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", clearData);

let opportunity = 5;
let gameOver = false;
let opportunityArea = document.getElementById("opportunity-area");

let userLogs = []; // 유저가 입력한 숫자 기록

userInput.addEventListener("focus", clearUserInputArea);

function clearUserInputArea() {
    userInput.value = "";
}

// 랜덤한 번호 추출하기
function pickRandomNumber() {
    comNumber = Math.floor(Math.random() * 100) + 1; // 1부터 100으로
    console.log("정답", comNumber)
}



function playGame() {
    let userValue = userInput.value;

    // 숫자입력 유효성 검사 추가(범위 안인지)
    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "1 ~ 100 사이의 숫자를 입력하세요."
        return; 
    }

    // 중복 입력 유효성 검사 추가(앞서 입력한 값인지)
    if(userLogs.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 이전과 다른 숫자를 입력하세요.";
        return; 
    }

    opportunity--;
    console.log("opportunity", opportunity);
    opportunityArea.textContent = `남은 기회 : ${opportunity} 번`;

    if(userValue > comNumber) {
        resultArea.textContent = "DOWN!";
    } else if(userValue < comNumber) {
        resultArea.textContent = "UP!";
    } else {
        resultArea.textContent = "정답입니다!";

        gameOver = true;
    }

    // 유저가 입력한 기록
    userLogs.push(userValue); // 이 배열에 유저가 입력한 기록을 다 저장
    console.log(userLogs);


    if(opportunity < 1) {
        gameOver = true;
    }

    if(gameOver == true) {
        playButton.disabled = true;
    }
}


function clearData() {
    // user input 창이 깨끗하게 정리되고
    userInput.value = "";
    // 새 번호가 생성되고
    pickRandomNumber();
    // 멘트도 초기화
    resultArea.textContent = "결과는~!"
}

pickRandomNumber();