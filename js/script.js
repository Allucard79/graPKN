'use strict';

var playerScore = 0;
var compScore = 0;
var howMany;
var clicks=0;
const round = document.querySelector('.game > p');
const playerSpan = document.getElementById('playerOneScore');
const compSpan = document.getElementById('playerTwoScore');
const scoreBoard = document.querySelector('.score');
const messagesBoard = document.querySelector('.messages > p');
const paperButton = document.getElementById('paper');
const rockButton = document.getElementById('rock');
const scissorsButton = document.getElementById('scissors');
const button2 = document.getElementById('greeter-button');


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
    howMany=parseFloat(howMany);
    playerScore++;
    playerSpan.innerHTML = playerScore;
    compSpan.innerHTML = compScore;
    messagesBoard.innerHTML = translate(user) + ' > ' + translate(computer) + '<br>Wygrywa Gracz 1 !!!';
    if(howMany===playerScore) {
        messagesBoard.innerHTML = 'Gratuluje , wygrałeś całą rozgrywkę !';
        disableButton();
}
}
function compWin(user, computer) {
    howMany=parseFloat(howMany);
    compScore++;
    playerSpan.innerHTML = playerScore;
    compSpan.innerHTML = compScore;
    messagesBoard.innerHTML = translate(user) + ' < ' + translate(computer) + '<br>Wygrywa Gracz 2 !!!';
    if(howMany===compScore) {
        messagesBoard.innerHTML = 'Tym razem wygrał Gracz 2 !';
        disableButton();
}
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
function NewGame(){
    location.reload();
    }

    function disableButton() {
    document.getElementById('paper').disabled = true;
    document.getElementById('rock').disabled = true;
    document.getElementById('scissors').disabled = true;
    };

    button2.addEventListener('click', function () {
    clicks+=1;
    if(clicks==1) {
        howMany = window.prompt('Do ilu wygranych gramy ?');
        round.innerHTML = 'Gra toczy się do ' + howMany + ' pkt';
        button2.innerHTML = 'Reset';
    }
    else if(clicks==2) {
        NewGame();
    }
}) 
