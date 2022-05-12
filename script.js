/*DOM Elements*/
const display = document.querySelector('.screen-text');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const plus = document.querySelector('.plus');

/*Saved Values*/
let displayValue = '';
display.innerText = 0;
let currentValue = Number(displayValue);
let secondValue = Number(displayValue);
let operation = "";

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
    if (operator === 'add'){
        return add(a,b);
    }
    else if (operator === 'subtract'){
        return subtract(a,b);
    }
    else if (operator === 'multiply'){
        return multiply(a,b);
    }
    else if (operator === 'divide'){
        return divide(a,b);
    }
}

/*Link buttons to display value*/
numbers.forEach(number => {
    number.addEventListener('click', changeDisplay);
});


plus.addEventListener('click', function() {
    operation = "add";
    currentValue = add(currentValue, Number(displayValue));
    displayValue = '';
    display.innerText = currentValue;
    console.log(currentValue);
})

equals.addEventListener('click', function() {
    display.innerText = operate(operation, currentValue, Number(displayValue));
    console.log('did this work?')
})

/*Refactored Functions*/
function changeDisplay(e) {
    displayValue += e.target.value;
    display.innerText = displayValue;
    return displayValue;
}

function valueReset() {
    displayValue = '';
    display.innerText = displayValue;
}

