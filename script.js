/*DOM Elements*/
const display = document.querySelector('.screen-text');
const numbers = document.querySelectorAll('[data-value]');
const operators = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('.equals');
const clear = document.querySelector('#clear');
const decimal = document.querySelector('.decimal');

/*Saved Values*/
display.innerText = 0;
let displayValue = display.textContent;

let arrayValues = [];
let operation = "";
let previousOperator = '';
let operationChosen = false;
let numberChosen = false;


/*Link buttons to display value*/
numbers.forEach(number => {
    number.addEventListener('click', changeDisplay);
});

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
        displayValue += e.target.dataset.value;
        // if (displayValue.length > 10){

        // }
        display.textContent = displayValue;
        numberChosen = true;
        previousOperator = '='
        return;
    }
    displayValue += e.target.dataset.value;
    display.textContent = displayValue;
    numberChosen = true;
};


operators.forEach(operator => {
    operator.addEventListener('click', setOperator());
    operator.addEventListener('click', chooseOperation());
    operator.addEventListener('click', setPreviousOperator());
});

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


        if(arrayValues[1].toString().split('.')[1].length > 4){
            arrayValues[1] = Number(arrayValues[1].toFixed(4));
        }

        decimal.disabled = false;
        display.textContent = arrayValues[1];
        displayValue = '';
    }
}

equals.addEventListener('click', chooseOperation());
equals.addEventListener('click', evaluate());

function evaluate() {
    return function () {
        if (numberChosen === false){
            display.textContent = 'ERROR';
            resetOperator();
            arrayValues = [];
            errorPresent = false;
        }
        else {
        arrayValues.shift();
        display.textContent = arrayValues[0];
        displayValue = arrayValues[0];
        resetOperator();
        decimal.disabled = false;
        operation = "=";
        }
    };
}

function resetOperator() {
    operation = '';
    previousOperator = '';
    operationChosen = false;
}


clear.addEventListener('click', function() {
    display.innerText = 0;
    displayValue = display.textContent;
    arrayValues = [];
    
    resetOperator();
})

function roundDecimal() {
    let decimalString = arrayValues[1].toString();
    if(decimalString.includes('.')){
        if (countDecimal > 4){
            return decimalString.toFixed(4);
        }
    }
    else {
        return;
    }
}

function countDecimal() {
    return decimalString.split('.')[1].length;
}

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

