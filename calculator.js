const display = document.querySelector('.display');
const numerals = document.querySelector('.numerals').childNodes;
const operands = document.querySelector('.operands').childNodes;
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const backButton = document.querySelector('#back');


let calculation = {
    calculationString : "",
    currentOperand : null,
    operandIndex : 0,
    canModify : true
}

operands.forEach(op => 
    op.addEventListener('click', 
    e => SetOperand(e.target.id)));

numerals.forEach(num => 
    num.addEventListener('click', 
    e => UpdateCalculationString(e.target.id)));

equalsButton.addEventListener('click',OnEqualsPressed);
clearButton.addEventListener('click', Clear);
backButton.addEventListener('click', BackSpace);

function UpdateDisplay(string){
    display.textContent = string;
}

function UpdateCalculationString(value){
    if(calculation.canModify)
    {
        calculation.calculationString += `${value}`;
        UpdateDisplay(calculation.calculationString);
    }     
}

function SetOperand(id){
    if(calculation.currentOperand == null){
        calculation.currentOperand = id;
        calculation.operandIndex = calculation.calculationString.length;
        UpdateCalculationString(id);
    }
}

function OnEqualsPressed(){
    if(calculation.currentOperand != null){
        let num1 = parseInt(calculation.calculationString.slice(0,calculation.operandIndex));
        let num2 = parseInt(calculation.calculationString.slice(calculation.operandIndex+1));
        if(isNaN(num1)) num1 = 0;
        if(isNaN(num2)) num2 = 0;
        let answer = Operate(num1,num2,calculation.currentOperand);
        UpdateDisplay(`${num1} ${calculation.currentOperand} ${num2} = ${answer}`);
        calculation.canModify = false;
    }
}

function Clear(){
        calculation.calculationString = "";
        resetOperand();
        UpdateDisplay(calculation.calculationString);
        calculation.canModify = true;
}

function BackSpace(){
    if(!calculation.canModify)
        return;
    //check if removing the operand
    if(calculation.calculationString.length-1 == calculation.operandIndex)
        resetOperand();
    calculation.calculationString = calculation.calculationString.slice(0,-1);
    UpdateDisplay(calculation.calculationString);
}

function resetOperand(){
    calculation.currentOperand = null;
    calculation.operandIndex = 0;
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