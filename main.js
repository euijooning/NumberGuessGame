let comNumber = 0;
let startButton = document.getElementById("start-button"); // 웹사이트 전체에서 요소를 id로 가져와서 집어넣겠다.

let inputField = document.getElementById("user-input-field");
startButton.addEventListener("click", playGame); // 함수도 매개변수처럼 넘길 수 있다. playGame() 하면 함수를 실행해버림

let gameResultDisplay = document.getElementById("result-area");

let resetGameButton = document.getElementById("game-reset-button");
resetGameButton.addEventListener("click", clearData);

let opportunity = 10;
let isGameOver = false;
let opportunityArea = document.getElementById("opportunity-display");

let userGuessHistory = []; // 유저가 입력한 숫자 기록

inputField.addEventListener("focus", clearUserInputField);

function clearUserInputField() {
    inputField.value = "";
}

// 랜덤한 번호 추출하기
function generateRandomNumber() {
    comNumber = Math.floor(Math.random() * 100) + 1; // 1부터 100으로
    console.log("정답", comNumber)
}



function playGame() {
    let userGuess = parseInt(inputField.value, 10);

    // 숫자입력 유효성 검사 추가(범위 안인지)
    if(userGuess < 1 || userGuess > 100) {
        gameResultDisplay.textContent = "1 ~ 100 사이의 숫자를 입력하세요."
        return; 
    }

    // 중복 입력 유효성 검사 추가(앞서 입력한 값인지)
    if(userGuessHistory.includes(userGuess)) {
        gameResultDisplay.textContent = "이미 입력한 숫자입니다. 이전과 다른 숫자를 입력하세요.";
        return; 
    }

    opportunity--;
    opportunityArea.textContent = `남은 기회 : ${opportunity} 번`;

    if(userGuess > comNumber) {
        gameResultDisplay.textContent = "DOWN!";
    } else if(userGuess < comNumber) {
        gameResultDisplay.textContent = "UP!";
    } else {
        gameResultDisplay.textContent = "정답입니다!";

        isGameOver = true;
    }

    // 유저가 입력한 기록
    userGuessHistory.push(userGuess); // 이 배열에 유저가 입력한 기록을 다 저장
    console.log(userGuessHistory);


    if(opportunity < 1) {
        isGameOver = true;

        // 남은 기회가 0일 때 alert로 정답 알려주기
        alert(`정답은 ${comNumber}입니다! 다시 도전하세요.`);
        clearData(); // 게임 자동으로 초기화
    }

    if(isGameOver == true) {
        startButton.disabled = true;
    }
}


function clearData() {
    // user input 창이 깨끗하게 정리되고
    inputField.value = "";
    // 새 번호가 생성되고
    generateRandomNumber();
    // 멘트도 초기화
    gameResultDisplay.textContent = "결과는~!"

    // 남은 기회 초기화
    opportunity = 10;
    opportunityArea.textContent = `남은 기회 : ${opportunity} 번`;
        
    // 유저가 입력한 기록 초기화
    userGuessHistory = [];

    // Start 버튼 다시 활성화
    startButton.disabled = false;
}

generateRandomNumber();


/*
- 랜덤번호 지정
- 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누른다.
- if 유저가 랜덤번호를 맞추면 "정답" 메시지 출력
- if 랜덤번호 < 유저번호 => Down
- if 랜덤번호 > 유저번호 => Up
- Reset 버튼을 누르면 게임이 초기화된다.
- 유저가 1 ~ 100 범위를 벗어난 숫자를 입력하면 알려주고, 기회를 차감하지 않는다.
- 유저가 이미 입력한 숫자를 한번 더 입력하면 알려주고, 기회를 차감하지 않는다.

// 추가(및 수정)된 사항
- 맞출 수 있는 기회 10번으로 변경
- reset 버튼이 눌리면 최종적으로 게임이 완전히 초기화되도록 만들기
- 정답 숫자 맞출 시 Reset 기능 보완해서 이 때도 완전 초기화되도록 만들기
- 잔여 기회 없을 때 유저에게 정답 숫자 출력해주는 알림창
*/