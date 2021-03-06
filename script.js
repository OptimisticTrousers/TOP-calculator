const display = document.querySelector('.display');

const buttons = document.querySelectorAll('button');

const lastInputs = document.querySelector('.last-inputs');

const dotButton = document.querySelector('.dot');

let operator = "";

let number1 = "";

let number2 = "";

let result = 0;

dotButton.addEventListener('click', () => {

    if(display.textContent.includes('.')){

        return;
    } 
    else{

        display.textContent += ".";
    }
})

buttons.forEach(button => {

        if(button.textContent === "."){

            return;
        }

    button.addEventListener('click', () => {

            if(display.textContent === "Infinity" || lastInputs.textContent === "Infinity"){

                handleInfinity(button.textContent);
            }
            else{

                buttonCallBack(button.textContent);
            }
        });
})

document.addEventListener('keydown', (event) => {

    let keyValue = event.key;

    handleInfinity(keyValue);

    if(keyValue === "C"){

        keyValue = "CLEAR"
    }
    else if(keyValue === "Backspace"){

        keyValue = "DELETE"
    }
    else if(keyValue === "Enter"){

        keyValue = "=";
    }
    else if(keyValue >= 0 || keyValue <= 9){

        keyValue = keyValue.toString(); 
    }
    else if(keyValue === "/"){

        keyValue = "÷";
    }
    else if(keyValue === "*"){

        keyValue = "x";
    }
    else if(keyValue === "+"
    || keyValue === "-"
    || keyValue === "."){

        keyValue = keyValue;
    }
    else{

        return;
    }


    if(display.textContent === "Infinity" || lastInputs.textContent === "Infinity"){

        handleInfinity(keyValue);
    }
    else{

        buttonCallBack(keyValue);
    }
})

function clear(){

    display.textContent = "0";

    lastInputs.textContent = "";

    number1 = "";

    number2 = "";

    operator = "";
}

function backspaceDelete(){

    if(display.textContent === "NaN"){

        clear();
    }
    else if(display.textContent !== "" && lastInputs.textContent !== ""){

        display.textContent = display.textContent.slice(0, -1);
        number2 = number2.slice(0, -1);
    }
    else if(display.textContent.length === 1){
        
        display.textContent = "0";
    }
    else if(lastInputs.textContent.length === 1){ 

        lastInputs.textContent = "";
        display.textContent = "0";
    }
    else if(operatorCheck(lastInputs.textContent) === false && number1.length === 1 && lastInputs.textContent.length === 2){

        lastInputs.textContent = "";
        display.textContent = "0";
        number1 = ""; 
    }
    else if(display.textContent === ""){

        if(operatorCheck(lastInputs.textContent)){

            operator = "";
        }

        lastInputs.textContent = lastInputs.textContent.slice(0, -1);
    }
    else{

        display.textContent = display.textContent.slice(0, -1);
        number2 += number2.slice(0, -1);
    }

}

function add(a, b){

    return (a + b).toFixed(2)
}

function subtract(a, b){

    return (a - b).toFixed(2)
}

function multiply(a, b){

    return (a * b).toFixed(2);
}

function divide(a, b){

    if(b === 0){
        alert("You cannot divide by 0!");
        clear();
        return "0";
    }

    return (a / b).toFixed(2);
}

function operate(operator, a, b){

    switch(operator){

        case '+':

            return add(a, b);
        case '-':

            return subtract(a, b);
        case 'x':

            return multiply(a, b);
        case '÷':

            return divide(a, b);
    }
}

function operatorCheck(textContent){

    if(textContent === "+"
    || textContent === "-"
    || textContent === "x"
    || textContent === "÷"){

        return true;
    }
    return false;

}

function calculate(){

    number1 = lastInputs.textContent.slice(0, lastInputs.textContent.indexOf(`${operator}`));

    number2 = display.textContent;

    lastInputs.textContent += number2;

    lastInputs.textContent = "";

    result = display.textContent = operate(operator, parseFloat(number1), parseFloat(number2));

    number1 = result;

    number2="";
    
    operator = "";

}

function buttonCallBack(input){

        if(input === "DELETE"){

            backspaceDelete();
            if(input.includes('e')){

                clear();
            }
        }
        else if(display.textContent.length >= 11){

            if(display.textContent === "Infinity" || display.textContent === "NaN"){

                return;
            }
            else{

                display.textContent = Number(display.textContent).toExponential(2);
            }

        }
        else if(lastInputs.textContent.length >= 11){

            if(lastInputs.textContent === "Infinity"){

                return;
            }
            else{

                lastInputs.textContent = Number(lastInputs.textContent).toExponential(2);
            }

        }
        else if(operatorCheck(input)){

            if(operator == ""){

                operator = input;
            }

            if(number1 !== "" && number2 !== "" && operator !== ""){

                number1 = lastInputs.textContent.slice(0, lastInputs.textContent.indexOf(`${operator}`));

                number2 = display.textContent.slice(display.textContent.indexOf(`${operator}`)+1, display.textContent.length);

                result = operate(operator, parseFloat(number1), parseFloat(number2));

                operator = input;

                lastInputs.textContent = result;

                lastInputs.textContent += " " + operator;

                display.textContent = "";

                number1 = result;

                number2="";
            }
            else{

                if(operatorCheck(input) === true && lastInputs.textContent.includes(`${input}`)){

                    return;
                }
                else{

                    display.textContent += " " + input;
                    lastInputs.textContent += display.textContent;
                    display.textContent = "";
                }

            }



        }
        else if(input === "="){

            if(operator === ""){

                return;
            }
            if(lastInputs.textContent.endsWith(`${operator}`) && display.textContent === ""){

                alert(`Sorry, please enter a valid number after the operator ${operator}`);
            }
            else{
                
                calculate();
            }

        }
        else if(input === "CLEAR"){

            clear();
        }
        else{

            if(operatorCheck(input)){

                return;
            }
            else if(lastInputs.textContent.includes(`${input}`)){

                number2 += input;
            }
            else if(display.textContent === "0"){

                display.textContent = "";
            }
                number1 += input;
                
                display.textContent += input;
        }
}

function handleInfinity(userInput){
    
        if(display.textContent === "Infinity"){

            if(userInput === "DELETE" || userInput === "CLEAR" || userInput === "Backspace" || userInput === "C"){

                clear();
            }
            else{

                display.textContent = Number(display.textContent).toExponential(2);
            }
        }
        if(lastInputs.textContent === "Infinity"){

            if(userInput === "DELETE" || userInput === "CLEAR" || userInput === "Backspace" || userInput === "C"){

                clear();
            }
            else{

                lastInputs.textContent = Number(lastInputs.textContent).toExponential(2);
            }
        }
}
