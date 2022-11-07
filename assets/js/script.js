var timerEl = document.querySelector(".timer");
var timeLeft = 60;
var gameStart = document.querySelector(".gameStart");
var questionEl = document.querySelector(".questions");
var answersEl = document.querySelector(".answers");
var resultEl = document.querySelector(".answerResult");
var initialEl = document.querySelector("#inputInitials");
var submitBtn = document.querySelector("#submitBtn");
var paragraph = document.querySelectorAll("p");
var questionIndex = 0;
var countdown;
var score = 0;


// Array created to hold our quiz questions
const questions = [
    {
        question: "What is the main language used for structuring WebApps?",
        options: ["HTML", "CSS", "JavaScript", "C++"],
        answer: "HTML"
    },
    {
        question: "What is the main language used for scripting WebApps?",
        options: ["Java", "Python", "JavaScript", "Scratch"],
        answer: "JavaScript"
    },
    {
        question: "What is the main language used for styling WebApps?",
        options: ["HTML", "C#", "CSS", "Ruby"],
        answer: "CSS"
    },
    {
        question: "What is Bootstrap?",
        options: ["A CSS Framework", "A JavaScript Library", "A Part of a Shoe", "An IDE"],
        answer: "A CSS Framework"
    },
    {
        question: "What does a ul element contain?",
        options: ["ol", "li", "Links", "Images"],
        answer: "li"
    }
];

// Function created to start the quiz/game whenever the start game button is clicked
function startGame() {
    timer();
    gameStart.setAttribute("class", "hide");
    getQuestion();
};

// Function to display the questions from our questions array on the screen, for loop created to add all possible answers grabbed from our questions array
function getQuestion() {
    var activeQuestion = questions[questionIndex];
    questionEl.innerHTML = activeQuestion.question;
    answersEl.innerHTML = ""

    activeQuestion.options.forEach(function(option, i) {
        var answerButton = document.createElement("button");

        answerButton.setAttribute("class", "option");

        answerButton.setAttribute("value", option);

        answerButton.innerHTML = i + 1 + ". " + option;

        answerButton.onclick = optionSelected;

        questionEl.appendChild(answerButton);
    });

}
// Function to check if the answer is correct, and add or remove points based on how the user answered. Also removes times for incorrect answers. User will also see "correct" or "incorrect" depending on how they answer.
// Function ends once user answers the last question or the timer hits 0
function optionSelected() {
    if (this.value !== questions[questionIndex].answer) {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerEl.innerHTML = "Time: " + timeLeft;
        resultEl.innerHTML = "Incorrect";
        resultEl.style.fontSize = "200%";
        score -= 7;
    } else {
        resultEl.innerHTML = "Correct!";
        resultEl.style.fontSize = "200%";
        score += 10;
    }

    resultEl.setAttribute("class", "answerResult");
    setTimeout(function() {
        resultEl.setAttribute("class", "hide");
    }, 1000)

    questionIndex++;

    if (questionIndex === questions.length) {
        gameOver();
    } else {
        getQuestion();
    }
}

// Function that runs once the timer hits 0 or all questions have been answered.
// Removes hide class on gameResult variable so we can see our final screen
// Also adds hide class to questionsEl to hide questions
function gameOver() {
    clearInterval(countdown);

    var gameResult = document.getElementById("score-screen");
    gameResult.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.innerHTML = score;

    questionEl.setAttribute("class", "hide")

};

// Function that runs when user clicks "submit" button on final screen, adds final score and initials into local storage, redirects user to high scores page to see where their high score was entered.
function saveScore() {
    var initials = initialEl.value.trim();
  
    if (initials !== "") {
      var highscores =
        JSON.parse(localStorage.getItem("highscores")) || [];
  
      var newScore = {
        finalScore: score,
        initials: initials
      };
  
      highscores.push(newScore);
      localStorage.setItem("highscores", JSON.stringify(highscores));
      location.href = "./highscores.html";
    }
}

// Function that handles our timer, counts down by 1 every second. Runs gameOver function if timer hits 0.
function timer() {
    countdown = setInterval(function() {
        timeLeft--;
        timerEl.innerHTML = "Time: " + timeLeft;

        if(timeLeft <= 0) {
            clearInterval(countdown);
            gameOver();
        }
    }, 1000);
}


// Event listeners for start game and submit buttons
gameStart.addEventListener("click", startGame);

submitBtn.addEventListener("click", saveScore);
