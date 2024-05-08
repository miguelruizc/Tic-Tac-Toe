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

    const getNumberOfRows = () => {
        return rows;
    }

    const getNumberOfColumns = () => {
        return columns;
    }

    //Return public members
    return {
        render, 
        setCell,
        getCell,
        getNumberOfRows,
        getNumberOfColumns,
    };
}

//Cell object
function Cell() {
    let value = '\u00A0';

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
    const players = [Player("Player 1", "X"), Player("Player 2", "O")];
    
    let activePlayer = players[0];
    let _winner = undefined;
    let _winnerCells = {row1:0,col1:0,row2:0,col2:0,row3:0,col3:0};
    let _gameCompleted = false;
    let _gameTied = false;
    let _gameWon = false;

    const playRound = (x, y) => {
        // Get input for row & column
        let row = x;
        let column = y;

        //Check if cell is not empty
        if(board.getCell(row, column) === players[0].getToken() || board.getCell(row, column) === players[1].getToken()) {
            console.log("Invalid cell, choose an empty position");
            return;
        }
        
        // Play move 
        board.setCell(row, column, activePlayer.getToken());
        // Check winner or tie
        if(checkWinner() === true) {
            const gameFinishedEvent = new CustomEvent("gameFinished");
            document.dispatchEvent(gameFinishedEvent);
        }
        else if (checkTie() === true) {
            const gameFinishedEvent = new CustomEvent("gameFinished");
            document.dispatchEvent(gameFinishedEvent);
        }
        // Switch player
        else {
            switchActivePlayer();
        }
    }

    const switchActivePlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }

    const checkWinner = () => {
        //Board 3x3 & win condition is 3 back to back of the same token (e.g. "XXX")
        let player0WinString = ""+ players[0].getToken() + players[0].getToken() + players[0].getToken(); 
        let player1WinString = ""+ players[1].getToken() + players[1].getToken() + players[1].getToken(); 

        //Check rows
        for(let i = 0; i < 3; i++){
            let rowString = "";

            for(let j = 0; j < 3; j++){
                rowString += board.getCell(i,j);    
            }

            if(rowString === player0WinString){
                _winner = players[0];
                _gameWon = true;
                _gameCompleted = true;
                return true;
            }
            else if(rowString === player1WinString){
                _winner = players[1];
                _gameWon = true;
                _gameCompleted = true;
                return true;
            }
        }

        //Check columns
        for(let i = 0; i < 3; i++){
            let columnString = ""

            for(let j = 0; j < 3; j++){
                columnString += board.getCell(j, i);
            }

            if(columnString === player0WinString){
                _winner = players[0];
                _gameWon = true;
                _gameCompleted = true;
                return true;
            }
            else if(columnString === player1WinString){
                _winner = players[1];
                _gameWon = true;
                _gameCompleted = true;
                return true;
            }
        }
        
        //Check diagonals (manually set for a 3x3 board)
        let diagonal1String = "" + board.getCell(0,0) + board.getCell(1,1) + board.getCell(2,2);
        let diagonal2String = "" + board.getCell(2,0) + board.getCell(1,1) + board.getCell(0,2);
            //Diagonal 1
            if(diagonal1String === player0WinString){
                _winner = players[0];
                _gameWon = true;
                _gameCompleted = true;
                return true;
            }
            else if(diagonal1String === player1WinString){
                _winner = players[1];
                _gameWon = true;
                _gameCompleted = true;
                return true;
            }
            //Diagonal 2
            if(diagonal2String === player0WinString){
                _winner = players[0];
                _gameWon = true;
                _gameCompleted = true;
                return true;
            }
            else if(diagonal2String === player1WinString){
                _winner = players[1];
                _gameWon = true;
                _gameCompleted = true;
                return true;
            }
            
        // No winner found
        return false;
    }

    const checkTie = () => {
        if(!_gameCompleted){
            // Assume tie = true, until an empty cell is found
            let flag = true;
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(board.getCell(i, j) === '\u00A0') 
                        flag = false;
                }
            }

            // If flag remained true, game is tied
            if(flag) {
                _gameCompleted = true;
                _gameTied = true;
                return true;
            }
            else return false;
        }
    }

    const getWinner = () => {
        if(_gameWon)
            return _winner.getName();
        else
            return "Winner not found";
    }

    const isWon = () => {
        return _gameWon;
    }

    const isCompleted = () => {
        return _gameCompleted;
    }

    const isTied = () => {
        return _gameTied;
    }

    const getBoard = () => {
        return board;
    }

    const getActivePlayer = () => {
        return activePlayer;
    }
    
    const getWinnerCells = () => {
        if(_gameWon) {  
            let array = new Array();

            // check rows
            for(let i = 0; i < 3; i++){

                let counter = 0;
                
                for(let j = 0; j < 3; j++){
                    if(board.getCell(i, j) === _winner.getToken()){
                        counter++;
                        array.push({row: i, col: j});
                    }
                    else {
                        array = [];
                        break;
                    }
                }

                if(counter === 3){
                    return array;
                } 
            }
            // check columns
            for(let i = 0; i < 3; i++){

                let counter = 0;
                
                for(let j = 0; j < 3; j++){
                    if(board.getCell(j, i) === _winner.getToken()){
                        counter++;
                        array.push({row: j, col: i});
                    }
                    else {
                        array = [];
                        break;
                    }
                }

                if(counter === 3){
                    return array;
                } 
            }
            
            //Check diagonals (manually set for a 3x3 board)
            //Diagonal 1
            if(_winner.getToken() === board.getCell(0,0) && _winner.getToken() === board.getCell(1,1)
                && _winner.getToken() === board.getCell(2,2)) {
                    return [{row: 0, col: 0},{row: 1, col: 1},{row: 2, col: 2}]
                }
            //Diagonal 2
            if(_winner.getToken() === board.getCell(2,0) && _winner.getToken() === board.getCell(1,1)
                && _winner.getToken() === board.getCell(0,2)) {
                    return [{row: 2, col: 0},{row: 1, col: 1},{row: 0, col: 2}]
                }
        }
    }

    return {
        playRound,
        isWon,
        isCompleted, 
        isTied,
        getWinner,
        getBoard,
        getActivePlayer,
        getWinnerCells,
    };
}

//DOMController object
function DOMController(gameController) {
    
    //DOM elements
    let gameInfoDiv = document.getElementById("game-info");
    let boardDiv = document.getElementById("board");
    let playAgainButton = document.getElementById("playAgain");


    const updateDOM = function() {
        //Clear DOM, by setting .board text content to an empty string
        gameInfoDiv.textContent = "";
        boardDiv.textContent = "";
        if(playAgainButton !== null) playAgainButton.remove();

        //Get up-to-date board
        let board = gameController.getBoard();

        //Get up-to-date active player
        let activePlayer = gameController.getActivePlayer();

        //Render game info (active player or game status)
        if(!gameController.isCompleted()) {
            gameInfoDiv.textContent = `Turn: ${activePlayer.getName()}(${activePlayer.getToken()})`;
        }
        else if(gameController.isWon()) {
            gameInfoDiv.textContent = `Winner: ${gameController.getWinner()}!`;
        }
        else if(gameController.isTied()) {
            gameInfoDiv.textContent = "Tie!";
        }
  
        
        //Render board with buttons
        let rows = board.getNumberOfRows();
        let columns = board.getNumberOfColumns();

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                //Create button w/cell info
                let button = document.createElement("button");
                button.setAttribute("id", `${i}-${j}`);
                button.setAttribute("class", "cell");
                button.innerText = board.getCell(i, j);
                //Add click listener to each button
                button.addEventListener("click", clickHandler);
                //Append
                boardDiv.appendChild(button);
            }
            boardDiv.appendChild(document.createElement("br"));
        }

        markWinnerCells();
    }

    const clickHandler = function(event) { 
        let buttonIndex = event.target.id.split("-"); //e.g. id="1-1" -> [1,1]
        let rowIndex = buttonIndex[0];
        let columnIndex = buttonIndex[1];

        if(!gameController.isCompleted()) {
            gameController.playRound(rowIndex, columnIndex);
        }

        updateDOM();
    }

    const createPlayAgainButton = () => {
        // Create element
        let button = document.createElement("button");
        button.setAttribute("id", "playAgain");
        button.innerText = "Play again";
        // Add event listener
        button.addEventListener("click", function(event){
            playGame();
        });
        //Append
        const container = document.getElementById("container");
        container.appendChild(button);
    }

    const markWinnerCells = () => {
        // if the game is won, 
        if(gameController.isWon()){
            // find the coordinates of the cells form the winner pattern
            // Expected array format: [{row: 0, col: 0},{row: 0, col: 0},{row: 0, col: 0}]
            let winnerCells = gameController.getWinnerCells(); 
            // give .winner class
            let cell1 = document.getElementById(`${winnerCells[0].row}-${winnerCells[0].col}`);
            cell1.setAttribute("class", "cell winner");
            let cell2 = document.getElementById(`${winnerCells[1].row}-${winnerCells[1].col}`);
            cell2.setAttribute("class", "cell winner");
            let cell3 = document.getElementById(`${winnerCells[2].row}-${winnerCells[2].col}`);
            cell3.setAttribute("class", "cell winner");

        }
    }

    return {
        updateDOM,
        createPlayAgainButton,
        markWinnerCells,
    };
}

// Program start here:
// Set up game 
let g = GameController();
let d = DOMController(g);

document.addEventListener("gameFinished", function() {
    d.createPlayAgainButton();
});

function playGame() {
    g = GameController();
    d = DOMController(g);
    
    d.updateDOM();
};

playGame();
 


