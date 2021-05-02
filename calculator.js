let history = '';

function dis(val) {
    document.getElementById("result").value += val;

    addToHistory(val);
}

function solve() {
    let x = document.getElementById("result").value;
    let y = eval(x);
	document.getElementById("result").value = ""; 
    document.getElementById("result").value = y;
	
    addToHistory('=' + y + '\n');
	
} 

function clr() {
    document.getElementById("result").value = ""; 

    addToHistory(' ');
}

function sqrt(){
	var a = document.getElementById("result").value;
	squareroot = Math.sqrt(a);
	document.getElementById("result").value = ""; 
	document.getElementById("result").value = squareroot;
	addToHistory('\n' +'√' +a + '='+ squareroot + '\n');
}

function cos(){
	var b = document.getElementById("result").value;
	cosinus = Math.cos(b);
	document.getElementById("result").value = ""; 
	document.getElementById("result").value = cosinus;
 
	addToHistory('\n' + 'cos(' +b+ ')' + '=' + cosinus + '\n');
}
function sin(){
	var c = document.getElementById("result").value;
	sinus = Math.sin(c);
	document.getElementById("result").value = ""; 
	document.getElementById("result").value = sinus;
 
	addToHistory('\n' + 'sin(' +b+ ')' + '=' + sinus + '\n'); 
}

function pow(){ 
	var d  = document.getElementById("result").value;
	power = Math.pow(d, 2);
	document.getElementById("result").value = ""; 
	document.getElementById("result").value = power;
  
	addToHistory('\n' + c +'²' + '=' + power + '\n');  
}

function fact(){
	var e = document.getElementById("result").value;
	factorial = e;
	if (factorial === 0 || factorial === 1) {
		document.getElementById("result").value = ""; 
		document.getElementById("result").value = 1;
 
		addToHistory('\n' + e+ '!' + '=' +'1' + '\n');
	} else {
		for (let i = factorial - 1; i >= 1; i--) {
		factorial *= i;
    }
    document.getElementById("result").value = ""; 
	document.getElementById("result").value = factorial;
 
	addToHistory('\n' + e+ '!' + '=' + factorial + '\n');
  }
}

function addToHistory(value) {
    history += value;
    document.getElementById('history').innerText = history;
}

document.addEventListener('DOMContentLoaded', () => {

const themeStylesheet = document.getElementById('theme');
const themeToggle = document.getElementById('theme-toggle');
const historyToggle = document.getElementById('history-toggle');
var x = document.getElementById("history");

	themeToggle.addEventListener('click', () => {
		if(themeStylesheet.href.includes('light')){
			themeStylesheet.href = 'dark.css';
			themeToggle.innerText = 'Hele teema';
		} else {
			themeStylesheet.href = 'light.css';
			themeToggle.innerText = 'Tume teema';

		}
    })
	historyToggle.addEventListener('click', () => {
		if(historyToggle.innerText == ('Peida ajalugu ▼')){
			historyToggle.innerText = 'Näita ajalugu ▲';
			 x.style.display = "none";
		} else {
			historyToggle.innerText = 'Peida ajalugu ▼';
			 x.style.display = "block";

		}
    })
})

