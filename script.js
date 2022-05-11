/*DOM Elements*/
const display = document.querySelector('.screen-text');
const numbers = document.querySelectorAll('.number');



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
numbers.forEach(number => {
    number.addEventListener('click', function() {
        console.log(number.value);        
    });
});
