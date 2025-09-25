const gameGrid = document.getElementById("game-grid");
const message = document.getElementById("message");
const playAgainContainer = document.getElementById("play-again");

const dict = [
    "sarma", "macka", "patka", "pasta", "karta", "lampa", "vreme", "snaga",
    "pravo", "torta", "mesto", "cesta", "basta", "borac", "stena", "kosa ",
    "slika", "druga", "nasip", "tanka", "osmeh", "pitan", "plava", "sokol",
    "pismo", "klupa", "stari", "novac", "ulica", "kupac", "grupa", "mraka",
    "bolja", "mlada", "polja", "hvala", "panda", "duvan", "pruga", "trava",
    "tesla", "bravo", "zebra", "sreca", "nesto", "hrana", "mozak", "trska",
    "krava", "mrava", "sanja", "dusan", "banja", "igara", "tanja", "ljuta"
];

let secretWord = "";

const ROWS = 6;
const COLS = 5;

let currentRow = 0;
let currentWord = "";

window.addEventListener('load', initGame);

function initGame() {

    for (let i = 0; i < ROWS; i++) {
        let row = document.createElement("div");
        row.classList.add("game-row");
        gameGrid.appendChild(row);
    }

    const ran = Math.floor(Math.random() * dict.length);
    secretWord = dict.at(ran);
    console.log(secretWord);
    console.log(dict);
}

document.addEventListener('keydown', keyInputHandle);

const keyboard = document.querySelector(".keyboard");
keyboard.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

     e.target.blur();


    const key = e.target.textContent;


    if (key === "Enter") {
        validate();
    } else if (key === "⌫") {
        backspace();
    } else if (key.match(/^[A-Z]$/i)) {
        keyInput({ key: key.toLowerCase() });
    }
});

function keyInputHandle(event) {
    
    if (event.key.match(/^[a-z]$/i)) {
        keyInput(event);
    }
    if (event.key === "Backspace") {
        backspace();
    }
    if (event.key == "Enter") {
        validate();
    }
}

function validate() {
    const rowDiv = gameGrid.children[currentRow];
    if (rowDiv.children.length !== COLS) {
        return;
    }

    if (!dict.includes(currentWord)) {
        message.textContent = "Reč nije u rečniku!";
        return;
    }

    paint(rowDiv);

    if (currentWord === secretWord) {
        gameWin();
        return;
    }

    currentRow++;
    if (currentRow === ROWS) {
        gameLost();
    } else {
        currentWord = "";
    }
}

function paint(rowDiv) {
    const guess = currentWord.split("");
    const secret = secretWord.split("");

    const letterCount = {};
    for (const ch of secret) {
        letterCount[ch] = (letterCount[ch] || 0) + 1;
    }

    for (let i = 0; i < COLS; i++) {
        const letter = rowDiv.children[i];
        if (guess[i] === secret[i]) {
            letter.classList.add("green");
            colorKeyboardKey(guess[i], "green");
            letterCount[guess[i]]--;
        }
    }

    for (let i = 0; i < COLS; i++) {
        const letter = rowDiv.children[i];
        if (letter.classList.contains("green")) continue;

        if (letterCount[guess[i]] > 0) {
            letter.classList.add("yellow");
            colorKeyboardKey(guess[i], "yellow");
            letterCount[guess[i]]--;
        } else {
            letter.classList.add("gray");
            colorKeyboardKey(guess[i], "gray");
        }
    }
}


function colorKeyboardKey(letter, color) {
    const keys = document.querySelectorAll(".keyboard button");
    keys.forEach((btn) => {
        if (btn.textContent.toLowerCase() === letter.toLowerCase()) {
            if (color === "green" || 
               (color === "yellow" && !btn.classList.contains("green")) || 
               (!btn.classList.contains("green") && !btn.classList.contains("yellow"))) {
                btn.classList.remove("green", "yellow", "gray");
                btn.classList.add(color);
            }
        }
    });
}



function keyInput(event) {
    const rowDiv = gameGrid.children[currentRow];
    if (rowDiv.children.length < COLS) {
        message.textContent = "";
        const slovo = document.createElement("div");
        slovo.className = "slovo";
        slovo.textContent = event.key;
        rowDiv.appendChild(slovo);
        currentWord += event.key;
    }
}

function backspace() {
    const rowDiv = gameGrid.children[currentRow];
    if (rowDiv.children.length > 0) {
        const lastSlovo = rowDiv.lastChild;
        if (!lastSlovo.classList.contains("validated")) {
            rowDiv.removeChild(lastSlovo);
            message.textContent = "";
            currentWord = currentWord.slice(0, -1);
        }
    }
}

function gameLost() {
    message.textContent = "Izgubio si! Reč je bila: " + secretWord.toUpperCase();
    saveResult(0);
    gameEnded();
}

function gameWin() {
    message.textContent = "Čestitam! Pogodio si reč: " + secretWord.toUpperCase();
    saveResult(currentRow + 1);
    gameEnded();
}

function gameEnded() {
    document.removeEventListener('keydown', keyInputHandle);
    addPlayAgainButton();
}

function saveResult(result) {
    let results = JSON.parse(localStorage.getItem('results')) || [];
    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));
}

function addPlayAgainButton() {
    const playAgainButton = document.createElement("button");
    playAgainButton.className = "game-button";
    playAgainButton.textContent = "Hoću opet";
    playAgainButton.addEventListener("click", () => {
        location.reload();
    });
    playAgainContainer.appendChild(playAgainButton);
}
