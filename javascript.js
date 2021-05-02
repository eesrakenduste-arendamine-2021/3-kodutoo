let history = '';
let memoryvariable = '';

//function that display value 
function dis(val) {
  document.getElementById("result").value += val;

  addToHistory(val);
}

//function that evaluates the digit and return result 
function solve() {
  let x = document.getElementById("result").value;
  let y = eval(x);
  if(y != null){
    document.getElementById("result").value = y;
    y+='<br>';
  
    addToHistory('=' + y);
    document.getElementById("result").value = "";
  }
}

//function that clear the display 
function clr() {
  document.getElementById("result").value = "";

  addToHistory(' ' + '<br>');
  //document.getElementById('history').innerHTML +='<br>';
}

function addToHistory(value) {
  history += value;
  document.getElementById('history').innerHTML = history;
}

function doMath(){
  var inputNum1=document.getElementById("result").value;
  var result = Math.sqrt(inputNum1);
  document.getElementById("result").value = result;
  addToHistory('√');
}
function doMathSquare(){
  var inputNum1=document.getElementById("result").value;
  var result = (inputNum1 * inputNum1);
  document.getElementById("result").value = result;
  addToHistory('^2');
}
function doMathMemorySave(){
  memoryvariable=document.getElementById("result").value;
}
function doMathMemoryBringBack(){
  document.getElementById("result").value += memoryvariable;
  addToHistory(memoryvariable);
}

function showhidefunction() {
    var x = document.getElementById("HistoryContainer");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }