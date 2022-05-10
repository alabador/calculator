/*Variables*/


/*Basic Math Functions*/
function add(a,b) {
    return a + b;
};

function subtract(a,b) {
    return a-b;
};

function multiply(a,b) {
    return a*b;
};

function divide(a,b) {
    return a/b;
};

/*Takes an operator and 2 numbers*/
function operate(operator,a,b) {
    return operator(a,b);
}