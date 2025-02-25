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
        // if(squareArray[a] && squareArray[a] === squareArray[b] && squareArray[b] === squareArray[c]){
        //     gameOver(`Player ${squareArray[a]} wins!`);
        //     return;
        // }
    }
    return false;
}


function isdraw(){
    let shouldReturn = true;
    squareArray.forEach(({ state })=> {
        if(state === "") shouldReturn = false;
    });
    return shouldReturn;
    // for(let i = 0; i < squareArray.length; i++){
    //     if(squareArray[i].state === ""){
    //         shouldReturn = false;
    //         break;
    //     }
    // }
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
        // if(wongame()){
            //     gameOver(`Player ${nextMove} wins!`);
            // if(isdraw())return gameOver("draw");
    }
    // constructor(index){
    //     this.index = index;
    //     this.state = "";
    //     this.div = document.createElement('div');
    //     this.div.className = "square";
    //     this.div.addEventListener('click', () => this.handleClick());
    //     container.appendChild(this.div);
    // }
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

    // const square = new classsquare(document.createElement('div'), index);
    // square.element.className = "square notclicked";
    // square.element.onclick = () => square.clicked();
    // squareArray.push(square);
    // container.appendChild(square.element);
}
console.log(squareArray);