const base = document.getElementById('base');
const arg = document.getElementById('argument');
const answer = document.getElementById('answer');
const since = document.getElementById('since');

const multBase = document.getElementById('multBase');
const multArg = document.getElementById('multArgument');
const multAnswer = document.getElementById('multAnswer');
const baseFactor = document.getElementById('baseFactor')
const multiplyButton = document.getElementById('multiplyButton');
const multReset = document.getElementById('multReset');

multiplyButton.addEventListener('click', multiplyFactor);
multBase.addEventListener('input', updatebaseFactor);


function resetMult() {
    multBase.value = '';
    multArg.value = '';
    baseFactor.value = '';
    multAnswer.value = '';
    multAnswer.style.color = 'black';
    multiplyButton.disabled = false;
}


multReset.addEventListener('click', resetMult);
function updatebaseFactor(){
    const multBaseValue = multBase.value;
    baseFactor.value = multBaseValue;
}

function multiplyFactor() {
    // Get the values from the inputs
    let multBaseValue = multBase.value;   // base value
    let multArgValue = multArg.value;     // argument value
    let baseFactorValue = baseFactor.value; // starting base factor

    // Ensure valid inputs are provided
    if (isNaN(multBaseValue) || isNaN(multArgValue) || isNaN(baseFactorValue)) {
        alert("Please enter valid numeric values.");
        return;
    }

    // Ensure multBase is greater than 1 to avoid infinite loop
    if (multBaseValue <= 1) {
        alert("Base value must be greater than 1.");
        return;
    }


    if (baseFactor.value == multArgValue){
        multAnswer.value = 1;
        multAnswer.style.color = 'Black';
        multiplyButton.disabled = true;
    }
    // Multiply baseFactorValue by multBaseValue until it reaches multArgValue
    
    else if ((baseFactor.value * multBase.value) < multArg.value){
        baseFactor.value = (baseFactor.value * multBase.value);
        multAnswer.value++;
        multAnswer.style.color = 'Gray';
        multiplyButton.disabled = false;
    }

    else{
        baseFactor.value = multArg.value;
        multAnswer.value = (Math.log(multArgValue) / Math.log(multBaseValue)).toFixed(2)
        multAnswer.style.color = 'Black';
        multiplyButton.disabled = true;
    }
}


function updateAnswer(){
    const baseValue = base.value;
    const argValue = arg.value;

    if (baseValue && argValue){
        const result = (Math.log(argValue) / Math.log(baseValue)).toFixed(3); 
        answer.value = result;
        since.innerHTML = `Since ${baseValue}<sup>${result}</sup> = ${argValue}.`;
    }
    else{
        answer.value = '';
    }
}

base.addEventListener('input', updateAnswer);
arg.addEventListener('input', updateAnswer);

const divBase = document.getElementById('divBase');
const divArg = document.getElementById('divArgument');
const divAnswer = document.getElementById('divAnswer');
const argDivisor = document.getElementById('argDivisor');

divArg.addEventListener('input', updateDivisor);

function updateDivisor(){
    argDivisor.value = divArg.value
}

const divideButton = document.getElementById('divideButton');
divideButton.addEventListener('click', divide);

function divide() {
    // Get the values from the inputs and convert to numbers
    let divBaseValue = parseFloat(divBase.value);   // base value
    let divArgValue = parseFloat(divArgument.value); // argument value
    let argDivisorValue = parseFloat(argDivisor.value); // divisor value

    // Ensure valid inputs are provided
    if (isNaN(divBaseValue) || isNaN(divArgValue) || isNaN(argDivisorValue)) {
        alert("Please enter valid numeric values.");
        return;
    }

    // Ensure divBase is greater than 1 to avoid division issues
    if (divBaseValue <= 1) {
        alert("Base value must be greater than 1.");
        return;
    }

    // If argDivisor is 1, set the answer to 1
    if (argDivisorValue === 1) {
        divAnswer.value = 1;
        divAnswer.style.color = 'Black';
        divideButton.disabled = true; // Disable the divide button
    }
    // If the divisor and base are greater than 1, keep dividing the divisor
    else if ((argDivisorValue/divBaseValue) > 1) {
        argDivisorValue = argDivisorValue / divBaseValue;  // Divide divisor by base
        divAnswer.value++;  // Increment the answer for each step
        divAnswer.style.color = 'Gray';  // Change the color of the answer text
        divideButton.disabled = false;  // Enable the divide button
    }
    // Final case, where the divisor reaches 1 or below
    else {
        divAnswer.value = (Math.log(divArgValue) / Math.log(divBaseValue)).toFixed(2); // Calculate using logarithm
        divAnswer.style.color = 'Black';
        argDivisorValue = 1;
        divideButton.disabled = true; // Disable the divide button
    }

    // Update the input fields with the new divisor value
    argDivisor.value = argDivisorValue;
}

const divReset = document.getElementById('divReset');
divReset.addEventListener('click', resetDiv)
function resetDiv() {
    divBase.value = '';
    divArg.value = '';
    argDivisor.value = '';
    divAnswer.value = '';
    divAnswer.style.color = 'black';
    divideButton.disabled = false;
}