/*DOM Elements*/
const display = document.querySelector('.screen-text');
const numbers = document.querySelectorAll('[data-value]');
const operators = document.querySelectorAll('[data-operation]');

/*Keys*/
// const numberKeys = document.querySelectorAll('')

const equals = document.querySelector('.equals');
const clear = document.querySelector('#clear');
const decimal = document.querySelector('.decimal');
const back = document.querySelector('#back');
const absolute = document.querySelector('#absolute');

/*Saved Values*/
display.innerText = 0;
let keyValue = 0;
let displayValue = display.textContent;

let arrayValues = [];
let operation = "";
let previousOperator = '';
let operationChosen = false;
let numberChosen = false;
let negativeAdded = false;


//Value is set here
function changeDisplay(e) {
    if(displayValue == 0){
        displayValue = '';
    } 
    
    if(String(displayValue).includes('.')){
        decimal.disabled = true;
    }

    if(operation == '=') {
        displayValue = '';
        display.textContent = '';

        if (displayValue.length < 10){
            if (e.target.hasAttribute('dataset')){
                displayValue += e.target.dataset.value;
            }
            else if (e.hasAttribute('key')){
                displayValue += e.key;
            }
            // displayValue += e.target.dataset.value;
        }

        display.textContent = displayValue;
        numberChosen = true;
        previousOperator = '='
        return;
    }

    if (displayValue.length < 10){
        if (e.target.hasAttribute('dataset')){
            displayValue += e.target.dataset.value;
        }
        else {
            displayValue += e.key;
        }
        // displayValue += e.target.dataset.value;
    }

    display.textContent = displayValue;
    numberChosen = true;
};

function setOperator() {
    return function() {
        return operation = this.dataset.operation;
    }
};

//Saves previous operator for sequential operations
function setPreviousOperator() {
    return function() {
        return previousOperator = this.dataset.operation;
    }
};

function chooseOperation() {
    return function() {
        /*Ensures that array always has two values to be used 
        as arguments in operate()*/
        if(arrayValues.length === 0) {
            arrayValues.push(0);
        }
        else if (arrayValues.length === 1 && previousOperator === '=') {
            arrayValues.unshift(0);
            arrayValues.pop();
        }
        else if(arrayValues.length === 1) {
            arrayValues.unshift(0);
        }
        else if(arrayValues.length <= 2) {
            arrayValues.shift();
        }
        
        if(arrayValues.length < 2){
        arrayValues.push(Number(displayValue));
        }
        
        /*Rough code, but allows for these operations to be used
        at beginning/0 */

        if(operationChosen === false){
            if (operation === '-'){
                arrayValues[0] = arrayValues[1]*2;
            }
            else if (operation === 'x'){
                arrayValues[0] = 1;
            }
            else if (operation === '/') {
                arrayValues[0] = arrayValues[1]*arrayValues[1];
            }
            else if (operation === '=') {
                operation = '+';
            } 
        } 

        operationChosen = true;

        /*Conditional for sequential or initial operations*/
        if (previousOperator === '' && operation === ''){
            return;
        }
        else if(previousOperator === ''){
            arrayValues[1] = operate(operation, arrayValues[0], arrayValues[1]);
        }
        else if(previousOperator !== operation && previousOperator !== '=') {
            arrayValues[1] = operate(previousOperator, arrayValues[0], arrayValues[1]);
        }
        else {
            arrayValues[1] = operate(operation, arrayValues[0], arrayValues[1]);
        }
        
        if (displayValue == ''){
            numberChosen = false;
        }

        if(arrayValues[1].toString().includes('.')){
            if(arrayValues[1].toString().split('.')[1].length > 4){
                arrayValues[1] = Number(arrayValues[1].toFixed(4));
            }
        }
        else if(arrayValues[1].toString().length > 9) {
            arrayValues[1] = Number(arrayValues[1]).toPrecision(8);
        }

        decimal.disabled = false;
        display.textContent = arrayValues[1];
        displayValue = '';
    }
}

function evaluate() {
    return function () {
        if (numberChosen === false){
            display.textContent = 'ERROR';
            resetOperator();
            arrayValues = [];
        }
        else {
        arrayValues.shift();
        if(arrayValues[0].toString().length > 9) {
            arrayValues[0] = Number(arrayValues[0]).toPrecision(8);
        }
        display.textContent = arrayValues[0];
        displayValue = arrayValues[0];
        resetOperator();
        decimal.disabled = false;
        operation = "=";
        }
    };
}

function resetScreen() {
    display.innerText = 0;
    displayValue = display.textContent;
    arrayValues = [];

    resetOperator();
}

function resetOperator() {
    operation = '';
    previousOperator = '';
    operationChosen = false;
}


function countDecimal() {
    return decimalString.split('.')[1].length;
}



/* --- Event Listeners --- */


/*Link buttons to display value*/
numbers.forEach(number => {
    number.addEventListener('click', changeDisplay);
});


document.addEventListener('keydown', e => {
    changeDisplay(e);

    // numbers.forEach(number => {
    //     //make the keyvalue input find the equivalent data value
    // });
    
})



back.addEventListener('click', () => {
    displayValue = displayValue.toString();
    if(displayValue === '') {
        return;
    }
    else if(displayValue === 'ERROR') {
        resetScreen();
    }
    else if (operation === '=') {
        resetScreen();
    }
    else {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
    }
})

clear.addEventListener('click', function() {
    resetScreen();
})


operators.forEach(operator => {
    operator.addEventListener('click', setOperator());
    operator.addEventListener('click', chooseOperation());
    operator.addEventListener('click', setPreviousOperator());
});

absolute.addEventListener('click', () => {
    if (numberChosen === true) {
        if(negativeAdded === false){
            displayValue = '-' + displayValue;
            display.textContent = displayValue;
            negativeAdded = true;
        }
        else {
            displayValue = displayValue.slice(1);
            display.textContent = displayValue;
            negativeAdded = false;
        }
    }
})

equals.addEventListener('click', chooseOperation());
equals.addEventListener('click', evaluate());



/* --- Basic Math Functions --- */

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
    if (b === 0) {
        return 'ERROR';
    }
    else {
        return a/b;
    }
};

function operate(operator,a,b) {
    if (operator === '+'){
        return add(a,b);
    }
    else if (operator === '-'){
        return subtract(a,b);
    }
    else if (operator === 'x'){
        return multiply(a,b);
    }
    else if (operator === '/'){
        return divide(a,b);
    }
};

