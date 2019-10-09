'use strict';
var params = {
    playerScore: 0,
    compScore: 0,
    howMany: 0,
    roundNr: 0,
    progress: [],
    table: document.getElementById("table"),
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
}
// funkcja zapisuje parametry gry po każdej rundzie
function saveRound(playerChoice, computerChoice, winner) {
    params.roundNr++;
    params.progress.push({
        rounds: 'Round: ' + params.roundNr,
        player: 'Player: ' + playerChoice,
        computer: 'Comp: ' + computerChoice,
        winner: 'Win: ' + winner,
        Score: 'Score: ' + params.playerScore + ' - ' + params.compScore,
    });
}
// funkcja losuje wybór komputera
function getComputerChoice() {
    const choices = ['paper', 'rock', 'scissors'];
    const randomNr = Math.floor(Math.random() * 3);
    return choices[randomNr];
}
// funkcja zamienia wyrazy z ang na pol
function translate(word) {
    if (word === 'paper') return 'Papier';
    if (word === 'rock') return 'Kamień';
    return 'Nożyczki';
}
// funkcja obsługująca zdarzenia kiedy wygrywa gracz
function playerWin(user, computer) {
    params.howMany = parseFloat(params.howMany);
    params.playerScore++;
    params.playerSpan.innerHTML = params.playerScore;
    params.compSpan.innerHTML = params.compScore;
    params.messagesBoard.innerHTML = translate(user) + ' > ' + translate(computer) + '<br>punkt zdobywa Gracz<br> ';
    saveRound(user, computer, 'player');
    if (params.howMany === params.playerScore) {
        params.messagesBoard.innerHTML += 'Gratuluje , wygrałeś całą rozgrywkę !';
        disableButton();
        showModal();
    }
}
// funkcja obsługująca zdarzenia kiedy wygrywa komputer
function compWin(user, computer) {
    params.howMany = parseFloat(params.howMany);
    params.compScore++;
    params.playerSpan.innerHTML = params.playerScore;
    params.compSpan.innerHTML = params.compScore;
    params.messagesBoard.innerHTML = translate(user) + ' < ' + translate(computer) + '<br>Punkt dla Komputera<br> ';
    saveRound(user, computer, 'computer');
    if (params.howMany === params.compScore) {
        params.messagesBoard.innerHTML += 'Tym razem wygrał Komputer !';
        disableButton();
        showModal();
    }
}
// funkcja obsługująca zdarzenia kiedy mamy remis
function draw(user, computer) {
    params.playerSpan.innerHTML = params.playerScore;
    params.compSpan.innerHTML = params.compScore;
    params.messagesBoard.innerHTML = translate(user) + ' = ' + translate(computer) + '<br>Mamy remis';
    saveRound(user, computer, 'draw');
}
// funkcja obslugująca grę - wybór gracza porównuje z wyborem komputera
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
        default:
            draw(userChoice, computerChoice);
            break;
    }
}
// funkcja resetuje wszystkie ustawienia do początkowego stanu gry
function resetGame() {
    location.reload();
}
// funkcja wył. przyciski
function disableButton() {
    document.getElementById('paper').disabled = true;
    document.getElementById('rock').disabled = true;
    document.getElementById('scissors').disabled = true;
}
// funkcja wł. przyciski
function enalbeButton() {
    document.getElementById('paper').disabled = false;
    document.getElementById('rock').disabled = false;
    document.getElementById('scissors').disabled = false;
}
// funkcja wyswietlajaca/ukrywająca przycisk
function displayButton() {
    params.resetButton.style.display = 'inline-block';
    params.startButton.style.display = 'none';
}
// nasluchuje klikniecia w przycisk start i pyta o ilosc rund
params.startButton.addEventListener('click', function () {
    params.howMany = window.prompt('Do ilu wygranych gramy ?');
    if (params.howMany <= 0 || isNaN(params.howMany)) {
        params.round.innerHTML = 'Podałeś nieprawidłową wartość !';
        disableButton();
    }
    else {
        params.round.innerHTML = 'Gra toczy się do ' + params.howMany + ' pkt';
        params.messagesBoard.innerHTML = 'Wybierz papier, kamień lub nożyczki';
        displayButton();
        enalbeButton();
    }
})
// nasluchuje klikniecia w przycisk restart i przeladowuje strone
params.resetButton.addEventListener('click', function () {
    resetGame();
})
// funkcja pokazuje modal
function showModal() {
    var modal = document.getElementById('modal');
    modal.parentNode.classList.add('show');
    makeTable();
}
// funkcja ukrywa modal
var hideModal = function (event) {
    event.preventDefault();
    var modal = document.getElementById('modal');
    modal.parentNode.classList.remove('show');
};
// zamykamy albo X albo klikajac w dowolne miejsce poza okienkiem modala
var closeButtons = document.querySelectorAll('.modal .close');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}
document.querySelector('#modal-overlay').addEventListener('click', hideModal);
// funkcja tworzy tabele z elementow pobranych z tablicy progress
function makeTable() {
    var container = document.getElementById('table-container');

    const table = document.createElement('table');

    for (var i = 0; i < params.progress.length; i++) {
        var row = document.createElement('tr');

        var cell1 = document.createElement('td');
        cell1.textContent = params.progress[i].rounds;
        row.appendChild(cell1);

        var cell2 = document.createElement('td');
        cell2.textContent = params.progress[i].player;
        row.appendChild(cell2);

        var cell3 = document.createElement('td');
        cell3.textContent = params.progress[i].computer;
        row.appendChild(cell3);

        var cell4 = document.createElement('td');
        cell4.textContent = params.progress[i].winner;
        row.appendChild(cell4);

        var cell5 = document.createElement('td');
        cell5.textContent = params.progress[i].Score;
        row.appendChild(cell5);

        table.appendChild(row);
    }
    container.appendChild(table);
}
// glowna funkcja realizuje w petli zdarzenie - ruch gracza
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
disableButton();
