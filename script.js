/*DOM Elements*/
const display = document.querySelector('.screen-text');
const numbers = document.querySelectorAll('[data-value]');
const operators = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('.equals');

/*Saved Values*/
display.innerText = 0;
let displayValue = display.textContent;

let arrayValues = [];
let operation = "";
let previousOperator = '';
let operationChosen = false;

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
}

/*Link buttons to display value*/
numbers.forEach(number => {
    number.addEventListener('click', changeDisplay);
});

function changeDisplay(e) {
    if(displayValue == 0){
        displayValue = '';
    }
    displayValue += e.target.dataset.value;
    display.textContent = displayValue;
};


operators.forEach(operator => {
    operator.addEventListener('click', setOperator());
    operator.addEventListener('click', chooseOperation());
    operator.addEventListener('click', setPreviousOperator());
})

function setOperator() {
    return function() {
        if (operation === '') {
            return operation = this.dataset.operation;
        }
        else {
            return operation = this.dataset.operation;
        }
    }
}

function setPreviousOperator() {
    return function() {
        return previousOperator = this.dataset.operation;
    }
}

function chooseOperation() {
    return function() {
        if(arrayValues.length === 0) {
            arrayValues.push(0);
        }
        else if(arrayValues.length <= 2) {
            arrayValues.shift();
        }
        arrayValues.push(Number(displayValue));
        
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
        } 
        
        console.log(operation);
        console.log(arrayValues);
        operationChosen = true;

        if(previousOperator === ''){
            arrayValues[1] = operate(operation, arrayValues[0], arrayValues[1]);
        }
        else if(previousOperator !== operation) {
            arrayValues[1] = operate(previousOperator, arrayValues[0], arrayValues[1]);
        }
        else {
            arrayValues[1] = operate(operation, arrayValues[0], arrayValues[1]);
        }
        console.log(arrayValues);
        display.textContent = arrayValues[1];
        displayValue = '';

    }
}


// equals.addEventListener('click', function() {
//     display.innerText = operate(operation, currentValue, Number(displayValue));
// })


/*Refactored Functions*/

function valueReset() {
    displayValue = '';
    display.innerText = displayValue;
}

