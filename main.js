const MAX_NUMBER = 100;
const MIN_NUMBER = 1;
const MAX_ATTEMPTS = 10;

let comNumber = 0;
let startButton = document.getElementById("start-button"); // 웹사이트 전체에서 요소를 id로 가져와서 집어넣겠다.
let inputField = document.getElementById("user-input-field");
let gameResultDisplay = document.getElementById("result-area");
let resetGameButton = document.getElementById("game-reset-button");
let opportunityArea = document.getElementById("opportunity-display");

let opportunity = MAX_ATTEMPTS;
let isGameOver = false;
let userGuessHistory = []; // 유저가 입력한 숫자 저장해둘 배열

inputField.addEventListener("focus", clearUserInputField);
startButton.addEventListener("click", playGame); 
resetGameButton.addEventListener("click", resetGame);


function clearUserInputField() {
    inputField.value = "";
}


// 랜덤한 번호 추출하기
function generateRandomNumber() {
    comNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER; // 1부터 100으로
    console.log("정답", comNumber)
}



function playGame() {
    let userGuess = parseInt(inputField.value, 10);

    // 숫자입력 유효성 검사 추가(범위 안인지)
    if(isNaN(userGuess) || userGuess < MIN_NUMBER || userGuess > MAX_NUMBER) {
        gameResultDisplay.textContent = `${MIN_NUMBER} ~ ${MAX_NUMBER} 사이의 숫자를 입력하세요.`;
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

        // 남은 기회가 0일 때 정답 알려주기
        displayGameOverMessage()
        resetGame(); // 게임 자동으로 초기화
    }

    if(isGameOver == true) {
        startButton.disabled = true;
    }
}


function displayGameOverMessage() {
    alert(`정답은 ${comNumber}입니다. 다시 도전하세요!`)
}



function resetGame() {
    // user input 창이 깨끗하게 정리되고
    inputField.value = "";
    // 새 번호가 생성되고
    generateRandomNumber();
    // 멘트도 초기화
    gameResultDisplay.textContent = "결과는~!"

    // 남은 기회 초기화
    opportunity = MAX_ATTEMPTS;
    opportunityArea.textContent = `남은 기회 : ${opportunity} 번`;
        
    // 유저가 입력한 기록 초기화
    userGuessHistory = [];

    // Start 버튼 다시 활성화
    startButton.disabled = false;
}

generateRandomNumber();

