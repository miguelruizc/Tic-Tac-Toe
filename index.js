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

    //Get cell method
    const getCell = function(row, column) {
         // Make sure coordinates are not out of bound
         if(row < 0 || row > (rows-1) ||
         column < 0 || column > (columns-1)) {
            console.log("Invalid coordinates, out of bound");
            return;
         }
         else {
            return board[row][column].getValue();
         }
    }

    //Return public members
    return {render, setCell, getCell};
}

//Cell object
function Cell() {
    let value = '#';

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
    const _name = name;
    const _token = token;
    
    const getName = () => _name;
    const getToken = () => _token;
    
    return {getName, getToken};
} 

//GameController object 
function GameController() {
    const board = Board();
    const players = [Player("Miguel", "X"), Player("Maria", "O")];
    
    let activePlayer = players[0];

    const playRound = () => {
        // Get input for row & column
        let row, column;
        // Row
        do {
            let input = prompt(`${activePlayer.getName()} turn, enter row (0-2): `);
            row = parseInt(input);
            if(isNaN(row) || row < 0 || row > 2) {
                console.log("Invalid input, enter a number between 0-2");
            }
        } while(row < 0 || row > 2);
        //Column
        do {
            let input = prompt(`${activePlayer.getName()} turn, enter column (0-2): `);
            column= parseInt(input);
            if(isNaN(column) || column < 0 || column > 2) {
                console.log("Invalid input, enter a number between 0-2");
            }
        } while(column < 0 || column > 2);

        console.log(board.getCell(row, column));
        board.setCell(row, column, activePlayer.getToken());
        switchActivePlayer();
    }

    const switchActivePlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }

    const render = () => {
        board.render();
    }

    const isWon = () => {

    }

    const getWinner = () => {

    }

    return {
        playRound,
        render,
    };
}

let g = GameController();
for(let i=0; i < 5; i++) {
    g.render();
    g.playRound();
}

//TO-DO 
    //- Complete playRound() to check used cells
    //- Implement check winner to use after each round

