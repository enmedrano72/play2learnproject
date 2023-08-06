let goBtn = document.getElementById("goBtn");
let selectElement = document.querySelector("#operation");
let output = document.querySelector(".output");
let answerInput = document.getElementById("answerInput");
let clear = document.querySelector("#clear");
let btnInputs = document.getElementsByClassName("btn-input");
var myModal = document.getElementById("gameModal");
var playAgain = document.getElementById("close");
const myTimeUpModal = document.getElementById("exampleModalToggle2");

let score = 0;
let timeLeft = 30;
let countdownTimer; // interval name

// go button is clicked modal 1 opens
goBtn.onclick = function () {
  myModal.style.display = "block";
  answerInput.focus();
};

// play again button is clicked, close time up modal
playAgain.onclick = function () {
  myTimeUpModal.style.display = "none";
  resetAll();
};
// resets input and timer
function resetAll() {
  answerInput.value = "";
  timeLeft = 30;
  if (countdownTimer) clearInterval(countdownTimer);
}

//resets timer and score
goBtn.addEventListener("click", ProgressCountdown);
function ProgressCountdown() {
  // reset score
  score = 0;
  document.getElementById("scoreValue").innerHTML = 0;
  document.getElementById("finalScoreValue").innerText = 0;

  countdownTimer = setInterval(() => {
    document.getElementById("beginCountdown").textContent = timeLeft;
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      myModal.style.display = "none";
      myTimeUpModal.style.display = "block";
    }
  }, 1000);
  generateEq();
}

// generate equation
function generateEq() {
  let sign = selectElement.value;
  let ran1 = Math.floor(Math.random() * 10) + 1;
  let ran2 = Math.floor(Math.random() * 10) + 1;
  let a, b;
  if (sign == "/") {
    a = ran2 * ran1;
    b = ran1;
  } else {
    a = Math.max(ran1, ran2);
    b = Math.min(ran1, ran2);
  }
  let equation = `${a} ${sign} ${b}`;
  output.innerText = equation;
}

//btn inputs
for (let i = 0; i < btnInputs.length; i++) {
  const btn = btnInputs[i];

  btn.addEventListener("click", function (e) {
    let input = e.target.innerText;
    if (input === "Clear") {
      answerInput.value = "";
    } else {
      answerInput.value += input;
    }
    calculate();
  });
}

// add input event listener to answer input
answerInput.addEventListener("input", calculate);

// meant to calculate the result and add score
function calculate() {
  let answer = eval(output.innerText);
  if (answerInput.value == answer) {
    answerInput.value = "";
    generateEq();
    score++;
    document.getElementById("scoreValue").innerHTML = score;
    document.getElementById("finalScoreValue").innerText = score;
  }
}
