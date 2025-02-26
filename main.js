const container = document.querySelector('#containerr');
const squareArray = [];
let nextMove = "X"

function gameOver(message){
    document.getElementById("Win").innerHTML = message;
    container.style.display = "none";
    document.getElementById("gameover").style.display = "block";
}

function wongame(){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for(let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (
            squareArray[a].state !== "" &&
            squareArray[a].state === squareArray[b].state &&
            squareArray[a].state === squareArray[c].state
        ){
            return true;
        }
    }
    return false;
}


function isdraw(){
    let shouldReturn = true;
    squareArray.forEach(({ state })=> {
        if(state === "") shouldReturn = false;
    });
    return shouldReturn;
}


class classsquare {
    constructor(element, index){
        this.element = element;
        this.state = "";
        this.index = index;

    }
    clicked(){
        this.state = nextMove;
        this.element.classList.remove("notclicked");
        this.element.onclick = function(){
            return false;
        };
        console.log(this.state);
        this.element.querySelector("p").innerHTML = this.state;
        if(wongame())return gameOver("the winner is palyer " + this.state);
        if (isdraw())return gameOver("it is a draw");

        nextMove == "X" ? nextMove = "O" : nextMove = "X";
    }
}


for (let index = 0; index < 9; index++){
    const div = document.createElement('div');
    div.classList.add("square", "notclicked");
    const square = new classsquare(div, index);
                            
    div.onclick = function () {
        square.clicked();
    };
    div.appendChild(document.createElement('p'));
    container.appendChild(div);
    squareArray.push(square);

}
console.log(squareArray);
