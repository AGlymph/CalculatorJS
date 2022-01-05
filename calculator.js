const display = document.querySelector('.display');
const numerals = document.querySelector('.numerals').childNodes;
const operands = document.querySelector('.operands').childNodes;
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const backButton = document.querySelector('#back');

//string displayed to user
let calculationString = " ";
let currentOperand = null;

operands.forEach(op => 
    op.addEventListener('click', 
    e => SetOperand(e.target.id)));

numerals.forEach(num => 
    num.addEventListener('click', 
    e => UpdateCalculationString(e.target.id)));

equalsButton.addEventListener('click',OnEqualsPressed);

function UpdateDisplay(string){
    display.textContent = string;
}

function UpdateCalculationString(value){
    calculationString += `${value}`;
    UpdateDisplay(calculationString);
}

function SetOperand(id){
    if(currentOperand == null){
        currentOperand = id;
        UpdateCalculationString(id);
    }
}

function OnEqualsPressed(){
    if(currentOperand != null){
        let opIndex = calculationString.indexOf(currentOperand);
        let num1 = parseInt(calculationString.slice(0,opIndex));
        let num2 = parseInt(calculationString.slice(opIndex+1));
        if(isNaN(num1)) num1 = 0;
        if(isNaN(num2)) num2 = 0;
        let answer = Operate(num1,num2,currentOperand);
        UpdateDisplay(`${num1} ${currentOperand} ${num2} = ${answer}`);
    }
}

function Operate (a,b,operand){
    switch (operand){
        case '+':
            return Add(a,b);
            break;
        case '-':
            return Subtract(a,b);
            break;
        case '*':
            return Multiply(a,b);
            break;
        case '/':
            return Divide(a,b);
            break;
        default:
            return "OOPS"
    }
}
//add
function Add(a,b){
    return a+b;
}
//subtract
function Subtract(a,b){
    return a-b;
}
//multiply
function Multiply(a,b){
    return a*b;
}
//divide
function Divide(a,b){
    return a/b;
}






//updateDisplay(operate(myOperation));