let history = '';

//function that displays values 
function dis(val) {
    document.getElementById("result").value += val;

    addToHistory(val);
}

//function that evaluates the digit and return result 
function solve() {
    let x = document.getElementById("result").value;
    let y = eval(x);
    document.getElementById("result").value = y;
	
    addToHistory('=' + y + '\n');
	
}

//function that clears the display 
function clr() {
    document.getElementById("result").value = "";

    addToHistory(' ');
}

//function that adds values to history
function addToHistory(value) {
    history += value;
    document.getElementById('history').innerText = history;
}

document.addEventListener('DOMContentLoaded', () => {

    const themeStylesheet = document.getElementById('theme');
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        // if it's light -> go dark
        if(themeStylesheet.href.includes('light')){
            themeStylesheet.href = 'dark.css';
            themeToggle.innerText = 'Hele teema';
        } else {
            // if it's dark -> go light
            themeStylesheet.href = 'light.css';
            themeToggle.innerText = 'Tume teema';

        }
    })
})