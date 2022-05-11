/*DOM Elements*/
const display = document.querySelector('.screen-text');
const numbers = document.querySelectorAll('.number');

/*Saved Values*/
let displayValue = '';
display.innerText = 0;

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

function operate(operator,a,b) {
    return operator(a,b);
}

/*Link buttons to display value*/
const clickNumber = numbers.forEach(number => {
    number.addEventListener('click', changeDisplay);
});




/*Refactored Functions*/
function changeDisplay(e) {
    displayValue += e.target.value;
    display.innerText = displayValue;
}