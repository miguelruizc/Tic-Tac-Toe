//GameController

//Board object
function Board() {
    //Board attributes
    const rows = 3;
    const columns = 3;
    let board = new Array(rows);

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

    //Populate board w/ Cells
    for(let i = 0; i < rows; i++) {
        board[i] = new Array(columns);
        for(let j = 0; j < columns; j++) {
            board[i][j] = Cell();
        }
    }

    //Render Method
    const render = function() {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                console.log(board[i][j].getValue()+" ");
            }
            console.log("\n");
        }
    }

    //Return public members
    return {render};
}

let board = Board();
board.render();


//Player
