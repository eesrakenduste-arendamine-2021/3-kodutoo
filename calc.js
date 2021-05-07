let no0 = document.querySelector("#no0");
let no1 = document.querySelector("#no1");
let no2 = document.querySelector("#no2");
let no3 = document.querySelector("#no3");
let no4 = document.querySelector("#no4");
let no5 = document.querySelector("#no5");
let no6 = document.querySelector("#no6");
let no7 = document.querySelector("#no7");
let no8 = document.querySelector("#no8");
let no9 = document.querySelector("#no9");
let cButton = document.querySelector("#c");
let delButton = document.querySelector("#del");
let commaButton = document.querySelector("#comma");
let multiplyButton = document.querySelector("#multiply");
let divideButton = document.querySelector("#divide");
let subtractButton = document.querySelector("#subtract");
let sumButton = document.querySelector("#sum");
let equalsButton = document.querySelector("#equals");
let numbers = document.querySelector("#numbers");
let history = document.querySelector("#history");
let selectedOperator = document.querySelector("#selectedOperator");
let message = document.querySelector("#message");
let nightTheme = document.querySelector("#nightTheme");
let dayTheme = document.querySelector("#dayTheme");
let pageBody = document.querySelector("body");
let buttonElement = document.getElementsByTagName("button");
let historyBox = document.querySelector("#historyBox");
let calc = document.querySelector("#calc");
let display = document.querySelector("#display");
let style = document.querySelector("style");
let temp;
let temp2;
let override;
let firstHalf;
let secondHalf;
let commaIndex;

cButton.addEventListener("click", function() {
    cButtonClick();
});

delButton.addEventListener("click", function() {
    delButtonClick();
});

commaButton.addEventListener("click", function() {
    decimalClick();
});

multiplyButton.addEventListener("click", function() {
    operatorButtonClick("×");
});

divideButton.addEventListener("click", function() {
    operatorButtonClick("÷");
});

subtractButton.addEventListener("click", function() {
    operatorButtonClick("-");
});

sumButton.addEventListener("click", function() {
    operatorButtonClick("+");
});

equalsButton.addEventListener("click", function() {
    equalsButtonClick();
});

no0.addEventListener("click", function() {
    nullClick();
});

no1.addEventListener("click", function() {
    numberClick(1);
});

no2.addEventListener("click", function() {
    numberClick(2);
});

no3.addEventListener("click", function() {
    numberClick(3);
});

no4.addEventListener("click", function() {
    numberClick(4);
});

no5.addEventListener("click", function() {
    numberClick(5);
});

no6.addEventListener("click", function() {
    numberClick(6);
});

no7.addEventListener("click", function() {
    numberClick(7);
});

no8.addEventListener("click", function() {
    numberClick(8);
});

no9.addEventListener("click", function() {
    numberClick(9);
});

dayTheme.addEventListener("click", function() {
    pageBody.style.backgroundColor = "#e9e6df";
    for(let i = 0; i < buttonElement.length; i++) {
        buttonElement[i].style.color = "#000000";
        buttonElement[i].style.backgroundColor = "#efece5";
    }
    pageBody.style.color = "#000000";
    historyBox.style.backgroundColor = "#dfd8ca";
    calc.style.backgroundColor = "#dfd8ca";
    display.style.backgroundColor = "#efece5";
    nightTheme.style.backgroundColor = "rgba(0, 0, 0, 0)";
    dayTheme.style.backgroundColor = "#bab2a2";
    style.innerHTML = "#nightTheme:hover {background-color: rgba(0, 0, 0, 0.1) !important;}";
    style.innerHTML += "#dayTheme:hover {background-color: rgba(0, 0, 0, 0.3) !important;}";
    style.innerHTML += "button:focus {background-color: rgba(0, 0, 0, 0.1) !important;}";
    style.innerHTML += "button:hover {background-color: rgba(0, 0, 0, 0.1) !important;}";
});

nightTheme.addEventListener("click", function() {
    pageBody.style.backgroundColor = "";
    for(let i = 0; i < buttonElement.length; i++) {
        buttonElement[i].style.color = "";
        buttonElement[i].style.backgroundColor = "";
    }
    pageBody.style.color = "";
    historyBox.style.backgroundColor = "";
    calc.style.backgroundColor = "";
    display.style.backgroundColor = "";
    nightTheme.style.backgroundColor = "";
    dayTheme.style.backgroundColor = "";
});

function addNumber(number) {
    temp = numbers.innerHTML;
    newVal = temp + number;
    if(newVal.length > 12) {
        message.style.display = "block";
        $("#message").fadeOut(2000);
        numbers.innerHTML = newVal.slice(0, 12);
    } else {
        numbers.innerHTML = newVal;
    }
}

function Override(number) {
    firstHalf = parseFloat(numbers.innerHTML);
    numbers.innerHTML = number;
    override = false;
}

function numberClick(number) {
    if(override) {
        Override(number);
    } else if(numbers.innerHTML == "0") {
        numbers.innerHTML = number;
    } else {
        addNumber(number);
    }
}

function decimalClick() {
    if(numbers.innerHTML.indexOf(".") == -1) {
        temp = numbers.innerHTML;
        numbers.innerHTML = temp + ".";
    }
}

function nullClick() {
    if(override) {
        Override(0);
    } else if(numbers.innerHTML != "0") {
        addNumber(0);
    }
}

function cButtonClick() {
    numbers.innerHTML = "0";
    selectedOperator.innerHTML = "";
    firstHalf = "";
    secondHalf = "";
}

function equalsButtonClick() {
    if(firstHalf == undefined) {
        firstHalf = "0";
    }
    secondHalf = numbers.innerHTML;
    if(selectedOperator.innerHTML == "") {
        override = true;
        saveToHistory("");
    } else if(selectedOperator.innerHTML == "×") {
        current = firstHalf * parseFloat(numbers.innerHTML);
        if(current.toString().length > 12) {
            numbers.innerHTML = current.toString().slice(0, 12) + "...";
        } else {
            numbers.innerHTML = current;
        }
        saveToHistory("×");
    } else if(selectedOperator.innerHTML == "÷") {
        current = firstHalf / parseFloat(numbers.innerHTML);
        if(current.toString().length > 12) {
            numbers.innerHTML = current.toString().slice(0, 12) + "...";
        } else {
            numbers.innerHTML = current;
        }
        saveToHistory("÷");
    } else if(selectedOperator.innerHTML == "+") {
        current = firstHalf + parseFloat(numbers.innerHTML);
        if(firstHalf == "69" && numbers.innerHTML == "420") {
            numbers.innerHTML = "allah akbar";
        } else if(current == "00") {
            current = "0";
        } else if(current.toString().length > 12) {
            numbers.innerHTML = current.toString().slice(0, 12) + "...";
        } else {
            numbers.innerHTML = current;
        }
        saveToHistory("+");
    } else if(selectedOperator.innerHTML == "-") {
        current = firstHalf - parseFloat(numbers.innerHTML);
        if(current.toString().length > 12) {
            numbers.innerHTML = current.toString().slice(0, 12) + "...";
        } else {
            numbers.innerHTML = current;
        }
        saveToHistory("-");
    }
}

function operatorButtonClick(symbol) {
    if(selectedOperator.innerHTML == "") {
        override = true;
    }
    selectedOperator.innerHTML = symbol;
}

function delButtonClick() {
    if(numbers.innerHTML.length == 1) {
        numbers.innerHTML = "0";
        selectedOperator.innerHTML = "";
        firstHalf = "";
        secondHalf = "";
        } else if(numbers.innerHTML != "0") {
        temp = numbers.innerHTML;
        numbers.innerHTML = temp.slice(0, (temp.length - 1));
    }
}

function saveToHistory(symbol) {
    if(history.innerHTML == "Ajalugu puudub") {
        if(symbol == "") {
            history.innerHTML = '<div class="equation">' + numbers.innerHTML + ' =</div><div class="result">' + numbers.innerHTML + "</div>";
        } else {
            history.innerHTML = '<div class="equation">' + firstHalf + " " + symbol + " " + secondHalf + ' =</div><div class="result">' + numbers.innerHTML + "</div>";
        }
    } else {
        if(symbol == "") {
            history.innerHTML += '<div class="equation">' + numbers.innerHTML + ' =</div><div class="result">' + numbers.innerHTML + "</div>";
        } else {
            history.innerHTML += '<div class="equation">' + firstHalf + " " + symbol + " " + secondHalf + ' =</div><div class="result">' + numbers.innerHTML + "</div>";
        }
    }
    selectedOperator.innerHTML = "";
}

document.addEventListener("keypress", function(e) {
    if(e.code == "Numpad0" || e.code == "Digit0") {
        nullClick();
    }
    if(e.code == "Numpad1" || e.code == "Digit1") {
        numberClick(1);
    }
    if(e.code == "Numpad2" || e.code == "Digit2") {
        numberClick(2);
    }
    if(e.code == "Numpad3" || e.code == "Digit3") {
        numberClick(3);
    }
    if(e.code == "Numpad4" || e.code == "Digit4") {
        numberClick(4);
    }
    if(e.code == "Numpad5" || e.code == "Digit5") {
        numberClick(5);
    }
    if(e.code == "Numpad6" || e.code == "Digit6") {
        numberClick(6);
    }
    if(e.code == "Numpad7" || e.code == "Digit7") {
        numberClick(7);
    }
    if(e.code == "Numpad8" || e.code == "Digit8") {
        numberClick(8);
    }
    if(e.code == "Numpad9" || e.code == "Digit9") {
        numberClick(9);
    }
    if(e.code == "Comma" || e.code == "Period" || e.code == "NumpadDecimal") {
        decimalClick();
    }
    if(e.code == "KeyC") {
        cButtonClick();
    }
    if(e.code == "Enter" || e.code == "NumpadEnter" || e.code == "Equal") {
        equalsButtonClick();
    }
    if(e.code == "Slash" || e.code == "NumpadSubtract") {
        operatorButtonClick("-");
    }
    if(e.code == "NumpadAdd" || e.code == "Minus") {
        operatorButtonClick("+");
    }
    if(e.code == "NumpadDivide") {
        operatorButtonClick("÷");
    }
    if(e.code == "NumpadMultiply" || e.code == "Backslash") {
        operatorButtonClick("×");
    }
    if(e.code == "KeyD") {
        delButtonClick();
    }
});