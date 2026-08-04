const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

//Storing High Scores to local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

//Enabling save btn when something is typed in
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value

})

//Saves and displays high scores - one day I will understand this completely
const saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value

    }
    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score
    })
    //Moves element from array
    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./highscores.html')

}