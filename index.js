//GameController
//Gameboard
function Gameboard() {
    const rows = 5;
    const columns = 4;
    let board = new Array(rows);

    for(let i = 0; i < rows; i++) {
        board[i] = new Array(columns);
        for(let j = 0; j < columns; j++) {
            board[i][j] = "0";
        }
    }

    console.table(board);
}

Gameboard();

//Cell
function Cell() {
    // Cell: Represents a cell that holds a value, '0' by default
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
//Player

let c = Cell();
console.log(c.getValue());
c.setValue("X");
console.log(c.getValue());