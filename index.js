//Board object
function Board() {
    //Board attributes
    const rows = 3;
    const columns = 3;
    let board = new Array(rows);

    //Populate board w/ Cells
    for(let i = 0; i < rows; i++) {
        board[i] = new Array(columns);
        for(let j = 0; j < columns; j++) {
            board[i][j] = Cell();
        }
    }

    //Render Method
    const render = function() {
        let boardString = "";
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                boardString += board[i][j].getValue()+" ";
            }
            boardString += "\n";
        }
        console.log(boardString);
    }

    //Set cell method
    const setCell = function(row, column, character) {
        // Make sure coordinates are not out of bound
        if(row < 0 || row > (rows-1) ||
         column < 0 || column > (columns-1)) {
            console.log("Invalid coordinates, out of bound");
            return;
         }
         else {
            board[row][column].setValue(character);
         }
    }

    //Return public members
    return {render, setCell};
}

//Cell object
function Cell() {
    let value = '0';

    const setValue = (newValue) => {
        value = newValue;
    };

    const getValue = () => value;

    return {
        setValue,
        getValue
    };
}

//Player object
function Player(name, token) {
    this.name = name;
    this.token = token;
    
    const getName = () => name;
    const getToken = () => token;
    
    return {getName, getToken};
} 

//GameController object 
function GameController() {
    const board = Board();

    return {};
}

let player1 = Player("Antonio", "W");
let board = Board();
board.setCell(2,2,player1.getToken());
board.render();



