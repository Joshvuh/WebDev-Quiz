var timerEl = document.querySelector(".timer");
var timeLeft = 120;
var gameStart = document.querySelector(".gameStart")

function startGame() {
    var countdown = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(countdown);
            loseGame();
        }
    }, 1000);
};

function loseGame() {
    timerEl.textContent = "Game Over"
}

gameStart.addEventListener("click", startGame);







