var playerScore = 0;
var compScore = 0;
const playerSpan = document.getElementById('playerOneScore');
const compSpan = document.getElementById('playerTwoScore');
const scoreBoard = document.querySelector('.score');
const messagesBoard = document.querySelector('.messages > p');
const paperButton = document.getElementById('paper');
const rockButton = document.getElementById('rock');
const scissorsButton = document.getElementById('scissors');

function getComputerChoice() {
    const choices = ['paper','rock','scissors'];
    const randomNr = Math.floor(Math.random() * 3);
    return choices[randomNr];
}

function translate(word) {
    if(word === 'paper') return 'Papier';
    if(word === 'rock') return 'Kamień';
    return 'Nożyczki';
}

function playerWin(user, computer) {
    playerScore++;
    playerSpan.innerHTML = playerScore;
    compSpan.innerHTML = compScore;
    messagesBoard.innerHTML = translate(user) + ' > ' + translate(computer) + '<br>Wygrywa Gracz 1 !!!';
}

function compWin(user, computer) {
    compScore++;
    playerSpan.innerHTML = playerScore;
    compSpan.innerHTML = compScore;
    messagesBoard.innerHTML = translate(user) + ' < ' + translate(computer) + '<br>Wygrywa Gracz 2 !!!';
}

function draw(user, computer) {
    playerSpan.innerHTML = playerScore;
    compSpan.innerHTML = compScore;
    messagesBoard.innerHTML = translate(user) + ' = ' + translate(computer) + '<br>Mamy remis !!!';
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
        playerWin(userChoice, computerChoice);
        break;
        case 'paperscissors':
        case 'rockpaper':
        case 'scissorsrock':
        compWin(userChoice, computerChoice);
        break;
        case 'paperpaper':
        case 'rockrock':
        case 'scissorsscissors':
        draw(userChoice, computerChoice);
        break;
    }
}

function main() {
    paperButton.addEventListener('click', function() {
        game('paper');
    })

    rockButton.addEventListener('click', function() {
        game('rock');
    })

    scissorsButton.addEventListener('click', function() {
        game('scissors');
    })
}

main();