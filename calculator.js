const display = document.querySelector('.display');
const numerals = document.querySelectorAll('.numerals');
const operators = document.querySelectorAll('.operators');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const backButton = document.querySelector('#back');
const negativeButton = document.querySelector('#negative');
const decimalButton = document.querySelector('#decimal');

//connect buttons to events
operators.forEach(op => op.addEventListener('click', e => SetOperator(e.target.id)));
numerals.forEach(num => num.addEventListener('click', e => SetNumber(e.target.id)));
equalsButton.addEventListener('click',OnEqualsPressed);
clearButton.addEventListener('click', Clear);
backButton.addEventListener('click', BackSpace);
negativeButton.addEventListener('click',NegateNumber);
decimalButton.addEventListener('click', SetDecimalPoint);

//the calculation is held in an array. 
//New digits are pushed into the current index as needed
//num1, operation, num2
let calculationArray = ["", "", ""];
let currentCalculationIndex = 0;

//show current calcution to display
function UpdateDisplay(){
    display.textContent = calculationArray.join("");
}

//send string to the display
function SetDisplay(string){
    display.textContent = string;
}

//add digitto the calculation array
function SetNumber(value){
    calculationArray[currentCalculationIndex] += `${value}`;
    UpdateDisplay();
}

//check for a decimal point before adding to the array
function SetDecimalPoint(){
    if(calculationArray[currentCalculationIndex].indexOf('.') ==-1)
        SetNumber('.');
}

//toggle between positive and negative numbers
function NegateNumber(){
    let num = parseFloat(calculationArray[currentCalculationIndex]) 
    num *= -1;
    calculationArray[currentCalculationIndex] = `${num}`;
    UpdateDisplay();
}
//set the operation for the calculation
function SetOperator(id){
    if(currentCalculationIndex == 0 || currentCalculationIndex == 1){
        currentCalculationIndex = 2;
        calculationArray[1] +=`${id}`;
        UpdateDisplay();
    } 
}

//when equals is pressed perform calculation,present result, and get ready for next calculation
function OnEqualsPressed(){
    //check there is at least partial calculation
    if(currentCalculationIndex == 2){
        let num1 = parseFloat(calculationArray[0]);
        let num2 = parseFloat(calculationArray[2]);
        let answer = Operate(num1,num2,calculationArray[1]);
      
        calculationArray[0] = `${answer}`;
        calculationArray[1] = "";
        calculationArray[2] = "";
        currentCalculationIndex = 0;
        UpdateDisplay();
    }
}
//reset calculator
function Clear(){
    calculationArray[0] = "";
    calculationArray[1] = "";
    calculationArray[2] = "";
    currentCalculationIndex = 0;
    SetDisplay("0");
}

//remove the current digit in the calculation
function BackSpace(){
    if(calculationArray[currentCalculationIndex].length > 0)
    {
        calculationArray[currentCalculationIndex] = calculationArray[currentCalculationIndex].slice(0,-1);
    }
    else if(currentCalculationIndex > 0)
    {
        currentCalculationIndex -= 1;
        calculationArray[currentCalculationIndex] = calculationArray[currentCalculationIndex].slice(0,-1);
    }
    
    UpdateDisplay();
}

//round to 3 decimal places
function round(num){
    return Math.round(num*1000)/1000;
}

//perform operation
function Operate (a,b,operator){
    if(isNaN(a)) a = 0;
    if(isNaN(b)) b = 0;
    switch (operator){
        case '+':
            return round(a+b);
            break;
        case '-':
            return round(a-b);
            break;
        case '*':
            return round(a*b);
            break;
        case '/':
            return round(a/b);
            break;
        default:
            return "OOPS"
    }
}