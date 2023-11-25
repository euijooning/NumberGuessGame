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
let userInput = document.getElementById("user-input")

playButton.addEventListener("click", playGame); // 함수도 매개변수처럼 넘길 수 있다. playGame() 하면 함수를 실행해버림


// 랜덤한 번호 추출하기
function pickRandomNumber() {
    comNumber = Math.floor(Math.random() * 100) + 1; // 1부터 100으로
    console.log("정답", comNumber)
}
pickRandomNumber();


function playGame() {
    let userValue = userInput.value;
    console.log(userValue);
}