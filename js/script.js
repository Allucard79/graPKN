'use strict';
var params = {
    playerScore: 0,
    compScore: 0,
    howMany: 0,
    round: document.querySelector('.game > p'),
    playerSpan: document.getElementById('playerOneScore'),
    compSpan: document.getElementById('playerTwoScore'),
    scoreBoard: document.querySelector('.score'),
    messagesBoard: document.querySelector('.messages > p'),
    paperButton: document.getElementById('paper'),
    rockButton: document.getElementById('rock'),
    scissorsButton: document.getElementById('scissors'),
    startButton: document.getElementById('greeter-button'),
    resetButton: document.getElementById('greeter-button2'),
    progress: [],
    roundData: {},
    table: document.getElementById("table"),
}

params.roundData = {
    rundy: 1,
    gracz: 'kamien',
    Kompu: 'papier',
    kto: 'gracz',
    wynik: '0-1',
}

params.progress.push(Object.values(params.roundData));
makeTable(params.progress);

function getComputerChoice() {
    const choices = ['paper', 'rock', 'scissors'];
    const randomNr = Math.floor(Math.random() * 3);
    return choices[randomNr];
}

function translate(word) {
    if (word === 'paper') return 'Papier';
    if (word === 'rock') return 'Kamień';
    return 'Nożyczki';
}


function playerWin(user, computer) {
    params.howMany = parseFloat(params.howMany);
    params.playerScore++;
    params.playerSpan.innerHTML = params.playerScore;
    params.compSpan.innerHTML = params.compScore;
    params.messagesBoard.innerHTML = translate(user) + ' > ' + translate(computer) + '<br>punkt zdobywa Gracz ';
    if (params.howMany === params.playerScore) {
        params.messagesBoard.innerHTML += 'Gratuluje , wygrałeś całą rozgrywkę !';
        disableButton();
        showModal();
    }
}

function compWin(user, computer) {
    params.howMany = parseFloat(params.howMany);
    params.compScore++;
    params.playerSpan.innerHTML = params.playerScore;
    params.compSpan.innerHTML = params.compScore;
    params.messagesBoard.innerHTML = translate(user) + ' < ' + translate(computer) + '<br>Punkt dla Komputera ';
    if (params.howMany === params.compScore) {
        params.messagesBoard.innerHTML += 'Tym razem wygrał Komputer !';
        disableButton();
        showModal();
    }
}

function draw(user, computer) {
    params.playerSpan.innerHTML = params.playerScore;
    params.compSpan.innerHTML = params.compScore;
    params.messagesBoard.innerHTML = translate(user) + ' = ' + translate(computer) + '<br>Mamy remis';
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
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

    const buttons = document.querySelectorAll('.player-move');

    for (let i = 0; i < buttons.length; i++) {
        const buttType = buttons[i].getAttribute('data-move');
        buttons[i].addEventListener('click', function () {
            game(buttType);
        });
    }
}
main();

function newGame() {
    params.playerScore = 0,
    params.compScore = 0,
    params.howMany = 0,
    params.playerSpan.innerHTML = params.playerScore;
    params.compSpan.innerHTML = params.compScore;
    params.round.innerHTML = 'Gotowy ?';
    params.messagesBoard.innerHTML = 'Aby rozpocząć grę kliknij zielony przycisk';

}

function disableButton() {
    document.getElementById('paper').disabled = true;
    document.getElementById('rock').disabled = true;
    document.getElementById('scissors').disabled = true;
};

function enableButton() {
    document.getElementById('paper').disabled = false;
    document.getElementById('rock').disabled = false;
    document.getElementById('scissors').disabled = false;
};

function displayButton() {
    params.resetButton.style.display = 'inline-block';
    params.startButton.style.display = 'none';
}

params.startButton.addEventListener('click', function () {
    params.howMany = window.prompt('Do ilu wygranych gramy ?');
    params.round.innerHTML = 'Gra toczy się do ' + params.howMany + ' pkt';
    params.messagesBoard.innerHTML = 'Wybierz papier, kamień lub nożyczki';
    displayButton();
})

params.resetButton.addEventListener('click', function () {
    newGame();
    enableButton();
    params.resetButton.style.display = 'none';
    params.startButton.style.display = 'inline-block';
})

function showModal() {
    var allModals = document.querySelectorAll('.modal');
    for (var i = 0; i < allModals.length; i++) {
        allModals[i].classList.remove('show');
    }

    if (params.howMany === params.playerScore) {
        document.querySelector('#modal-one').classList.add('show');
    } else document.querySelector('#modal-two').classList.add('show');
    document.querySelector('#modal-overlay').classList.add('show');

}

var hideModal = function (event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}

function makeTable(array) {
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < array[i].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = array[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}



