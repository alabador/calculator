/*DOM Elements*/
const display = document.querySelector('.screen-text');
const numbers = document.querySelectorAll('.number');
const equals = document.querySelector('.equals');
const plusButton = document.querySelector('.plus');
const subtractButton = document.querySelector('.subtract');
const multiplyButton = document.querySelector('.multiply');
const divideButton = document.querySelector('.divide');

/*Saved Values*/
let displayValue = '';
display.innerText = 0;
let arrayValues = [];
let previousValue = 0;
let solution = 0;
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

/*Event Listeners for each operation*/
plusButton.addEventListener('click', function() {
    operation = "add";
    arrayValues.push(Number(displayValue));
    displayValue = '';
    if(arrayValues.length > 2){
        arrayValues.shift();
    }
    currentValue = arrayValues.reduce((acc, value) => {
        return acc + value;
    }, 0);
    arrayValues.pop();
    arrayValues[0] = currentValue;
    display.innerText = currentValue;
})

subtractButton.addEventListener('click', function() {
    // operation = "subtract";
    // console.log(currentValue+"current");
    // console.log(displayValue+"display");
    // solution = subtract(Number(currentValue), Number(displayValue));
    // console.log(solution);
    // currentValue = solution;
    // displayValue = '';
    // display.innerText = currentValue;
    // console.log(currentValue+"current");
    // console.log(displayValue+"display");
})


equals.addEventListener('click', function() {
    display.innerText = operate(operation, currentValue, Number(displayValue));
    console.log(currentValue+"current")
    console.log(displayValue+"display")
    solution = Number(display.innerText);
    currentValue = 0;
    displayValue = solution;
    console.log(currentValue+"current")
    console.log(displayValue+"display")
    // currentValue = Number(display.innerText);
    // displayValue = Number(display.innerText);
})

/*Refactored Functions*/
function changeDisplay(e) {
    displayValue += e.target.value;
    display.innerText = displayValue;
    // currentValue = Number(display.innerText);
    // return displayValue;
}

function valueReset() {
    displayValue = '';
    display.innerText = displayValue;
}

