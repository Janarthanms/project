const display = document.getElementById("display");

function appendNumber(value){

    if(display.innerText === "0"){
        display.innerText = value;
    }
    else{
        display.innerText += value;
    }
}

function appendOperator(operator){

    let current = display.innerText;
    let lastChar = current.slice(-1);

    if("+-*/".includes(lastChar)){
        return;
    }

    display.innerText += operator;
}

function calculate(){

    try{

        let expression = display.innerText;

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        display.innerText = result;
    }
    catch(error){
        display.innerText = "Error";
    }
}

function clearDisplay(){
    display.innerText = "0";
}

function deleteLast(){

    let current = display.innerText;

    if(current.length === 1){
        display.innerText = "0";
    }
    else{
        display.innerText = current.slice(0,-1);
    }
}

function percentage(){

    try{
        let value = parseFloat(display.innerText);

        if(!isNaN(value)){
            display.innerText = value / 100;
        }
    }
    catch(error){
        display.innerText = "Error";
    }
}

document.addEventListener("keydown", function(event){

    if(!isNaN(event.key) || event.key === "."){
        appendNumber(event.key);
    }

    if(["+","-","*","/"].includes(event.key)){
        appendOperator(event.key);
    }

    if(event.key === "Enter"){
        calculate();
    }

    if(event.key === "Backspace"){
        deleteLast();
    }

    if(event.key === "Escape"){
        clearDisplay();
    }
});