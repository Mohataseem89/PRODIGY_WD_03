
const container = document.querySelector("#containerr");
const squareArray = [];
let nextMove = "X";

const gameOver = (message) => {
    document.getElementById("Win").innerHTML = message;
    container.style.display = "none";
    document.getElementById("gameover").style.display = "block";
};

const checkWin = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    return winPatterns.some(([a, b, c]) => 
        squareArray[a].state &&
        squareArray[a].state === squareArray[b].state &&
        squareArray[a].state === squareArray[c].state
    );
};

const isDraw = () => squareArray.every(({ state }) => state !== "");

class Square {
    constructor(element, index) {
        this.element = element;
        this.state = "";
        this.index = index;
        this.element.onclick = this.clicked.bind(this);
    }

    clicked() {
        if (this.state) return;
        
        this.state = nextMove;
        this.element.classList.remove("notclicked");
        this.element.onclick = null;
        this.element.querySelector("p").textContent = this.state;

        if (checkWin()) return gameOver(`The winner is Player ${this.state}`);
        if (isDraw()) return gameOver("It's a draw");

        nextMove = nextMove === "X" ? "O" : "X";
    }
}

for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("square", "notclicked");
    div.appendChild(document.createElement("p"));

    const square = new Square(div, i);
    container.appendChild(div);
    squareArray.push(square);
}

console.log(squareArray);

