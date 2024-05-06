//GameController
//Gameboard

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