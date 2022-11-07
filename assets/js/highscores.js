// Displays high scores on page load

function displayScores() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      var liEl = document.createElement("li");
      liEl.innerHTML = score.initials + " - " + score.finalScore;
  
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liEl);
    });
}
  
displayScores();