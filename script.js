const main = document.getElementById("main");
const title = document.getElementById("title");
const output = document.getElementById("output");
const regime = document.getElementById("regime");
const name1 = document.getElementById("name");
const history1 = document.getElementById("history");
const history_title = document.getElementById("history_title");
const nb1 = document.getElementById("nb1");
const nb2 = document.getElementById("nb2");
let history = '';

function buttonClick(val){
    document.getElementById("output").value+=val;
    addToHistory(val);
}

function solve(){
    let x = document.getElementById("output").value
    let y;
    console.log(Math.sin(60));
    if (x.includes("sin")) {
        x = x.split("sin");
        y = Math.sin(parseInt(x[1]));
    } else if (x.includes("cos")) {
        x = x.split("cos");
        y = Math.cos(parseInt(x[1]));
    } else if (x.includes("tan")) {
        x = x.split("tan");
        y = Math.tan(parseInt(x[1]));
    } else {
        y = eval(x);
    }
    document.getElementById("output").value = y;
    addToHistory(' = ' + y + "  | ");
}

function clr(){
    document.getElementById("output").value = ""
    addToHistory(' ');
}

function addToHistory(value) {
    history += value;
    document.getElementById('history').innerText = history;
  }

function dayNightRegime(){
    var currentColor = main.style.backgroundColor;
    if (currentColor == 'rgb(26, 26, 26)'){
        main.style.backgroundColor = 'antiquewhite';
        title.style.color = 'rgb(26, 26, 26)';
        output.style.backgroundColor = 'antiquewhite';
        output.style.color = 'black';
        regime.innerText = 'Öörežiim';
        name1.style.color = "black";
        history1.style.color = "black";
        history_title.style.color = "black";
        nb1.style.color = "black";
        nb2.style.color = "black";
    } 
    else {
        main.style.backgroundColor = 'rgb(26, 26, 26)';
        title.style.color = 'antiquewhite';
        output.style.backgroundColor = 'rgb(26, 26, 26)';
        output.style.color = 'white';
        regime.innerText = 'Päevarežiim';
        name1.style.color = "white";
        history1.style.color = "white";
        history_title.style.color = "white";
        nb1.style.color = "white";
        nb2.style.color = "white";
    }
}
