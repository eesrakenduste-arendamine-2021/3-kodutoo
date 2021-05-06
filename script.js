let calculation = "";
let history = [];
let clear = false;
let dark = false;

window.onload = function() {
    start();
}

function start() {
    let btn = document.querySelectorAll('.calculator-btn');

    btn.forEach(element => {
        element.addEventListener('click', btnClick);
    });
    document.getElementById('show-history').addEventListener('click', toggleHistory);
    document.getElementById('clear-history').addEventListener('click', clearHistory);
    document.getElementById('mode').addEventListener('click', toggleDark);
}

function btnClick(e) {
    let result = "";
    if (clear) {
        result = document.getElementById('result').innerHTML;
        document.getElementById('result').innerHTML = "";
    }
    clear = false;
    if (e.target.getAttribute('data-value') == "=" && calculation != "") {
        history.push(new Calc(calculation));
        try{
            document.getElementById('result').innerHTML = eval(calculation.replace(',', '.')).toFixed(2);
        }
        catch {
            document.getElementById('result').innerHTML = "ERROR";
        }
        calculation = "";
        clear = true;
        showHistory();
    } else if (e.target.getAttribute('data-value') == "C") {
        calculation = "";
        document.getElementById('result').innerHTML = "0";
    } else if (e.target.getAttribute('data-value') == "D") {
        if (calculation.length == 0) {
            document.getElementById('result').innerHTML = "0";
        } else {
            calculation = calculation.slice(0, calculation.length - 1);
        }        

    } else  {
        if (calculation == "" && !Number(e.target.getAttribute('data-value'))) {
            calculation = result;
        }
        calculation += cleanUp(e.target.getAttribute('data-value'));
    }
    document.getElementById('calc').innerHTML = calculation;
}

function cleanUp(string) {
    return string.replace(/[^-()\d/%*+.]/g, '');
}

function toggleHistory() {
    let btn = document.getElementById('show-history');
    let hist = document.getElementById('history-calc');    
    let clear = document.getElementById('clear-history');
    if (btn.innerHTML == "Show history") {
        btn.innerHTML = "Hide history";
        hist.style.display = "block";
        clear.style.display = "block";
        showHistory();
    } else {
        btn.innerHTML = "Show history";
        hist.style.display = "none";
        clear.style.display = "none";
    }
}

function showHistory() {
    let hist = document.getElementById('history-calc');
    hist.innerHTML = "";
    if (history.length > 0) {
        history.forEach(elem => {
            try{
                hist.innerHTML += "<p>" + elem.equation + " = " + eval(cleanUp(elem.equation.replace(',', '.'))).toFiced(2) + "</p>";
            }
            catch {
                hist.innerHTML += "<p>" + elem.equation + " = ERROR</p>";
            }
            
        });
        if (document.getElementById('show-history').innerHTML == "Hide history") {
            document.getElementById('clear-history').style.display = "block";
        }
    } else {
        document.getElementById('clear-history').style.display = "none";
        hist.innerHTML = "<p>No previous calculations to show</p>";
    }
}

function clearHistory() {
    history = [];
    showHistory();
    calculation = "";
    document.getElementById('result').innerHTML = "0";
}

function toggleDark() {
    if (!dark) {
        dark = true;
        document.querySelector("#mode").innerHTML = "Light Mode";
        document.querySelector("main").classList.add("dark");
        document.querySelectorAll(".calculator-btn").forEach(e => {
            e.classList.add("darktext");
        })
        document.querySelector("#result").classList.add("darktext");
        document.querySelectorAll(".num").forEach(e => {
            e.classList.add("num-dark");
        })
        document.querySelectorAll(".operand").forEach(e => {
            e.classList.add("operand-dark");
        })
        document.querySelector("#delete").classList.add("back-dark");
        document.querySelector("#reset").classList.add("clear-dark");
        document.querySelector("#history-calc").classList.add("darktext");

    } else {
        dark = false;
        document.querySelector("#mode").innerHTML = "Dark Mode";
        document.querySelector("main").classList.remove("dark");
        document.querySelectorAll(".calculator-btn").forEach(e => {
            e.classList.remove("darktext");
        })
        document.querySelector("#result").classList.remove("darktext");
        document.querySelectorAll(".num").forEach(e => {
            e.classList.remove("num-dark");
        })
        document.querySelectorAll(".operand").forEach(e => {
            e.classList.remove("operand-dark");
        })

        document.querySelector("#delete").classList.remove("back-dark");
        document.querySelector("#reset").classList.remove("clear-dark");
        document.querySelector("#history-calc").classList.remove("darktext");
    }
}

class Calc {
    constructor (equation) {
        this.equation = equation;
    }
}