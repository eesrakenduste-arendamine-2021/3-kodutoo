$(document).ready(function(){

    var nr1;
    var nr2;
    var op;
    var calculation;
    var result;
    var numberOfCalc = 1;

    $('.number').on('click', function(){
        if(nr1 == null){
            nr1 = this.id;
            calculation = this.id;
            $('#currentNr').html(this.id);
            $('#calculation').html(calculation);
        } else if(op != null && nr2 == null) {
            nr2 = this.id;
            calculation += this.id;
            addNrToCalc(nr2);
        } else if(nr2 != null) {
            nr2 += this.id;
            calculation += this.id;
            addNrToCalc(nr2);
        } else {
            nr1 += this.id;
            calculation += this.id;
            addNrToCalc(nr1);
        }        
    });

    $('.button').on('click', function(){
        if(this.id == "="){
            if(op == "-"){
                result = Number(nr1) - Number(nr2);
                showResult(result);
            } else if(op == "+") {
                result = Number(nr1) + Number(nr2)
                showResult(result);
            } else if(op == "*") {
                result = Number(nr1) * Number(nr2);
                showResult(result);
            } else if(op == "/") {
                result = Number(nr1) / Number(nr2);
                showResult(result);
            }

            sessionStorage.setItem(numberOfCalc, calculation + "=" + result);
            loadStorage();

            numberOfCalc++;

        } else if(this.id == "clear"){
            nr1 = null;
            nr2 = null;
            op = null;
            calculation = "";
            $('#currentNr').html("0");
            $('#calculation').html("");
        } else if(this.id == "sin" || this.id == "cos" || this.id == "tan") {
            if(this.id == "sin"){
                if(nr2 != null){
                    result = Math.sin(nr2);
                } else {
                    result = Math.sin(nr1);
                }
                sessionStorage.setItem(numberOfCalc, "sin("+calculation + ")=" + result);
                loadStorage();
            } else if(this.id == "cos") {
                if(nr2 != null){
                    result = Math.cos(nr2);
                } else {
                    result = Math.cos(nr1);
                }
                sessionStorage.setItem(numberOfCalc, "cos("+calculation + ")=" + result);
                loadStorage();
            } else if(this.id == "tan") {
                if(nr2 != null){
                    result = Math.tan(nr2);
                } else {
                    result = Math.tan(nr1);
                }
                sessionStorage.setItem(numberOfCalc, "tan("+calculation + ")=" + result);
                loadStorage();
            }
            $('#currentNr').html("V: " + result);
        } else {
            if(op == null){
                calculation += this.id;
                op = this.id;
                $('#currentNr').html("");
                $('#calculation').html(calculation);
            } else {
                alert("Tehtemärk juba sisestatud!");
            }
        }
    })

    function loadStorage(){
        $('#histCalc').prepend(sessionStorage.getItem(numberOfCalc) + "<br>");
        if(Object.keys(sessionStorage).length>=14){
            $('#histCalc').html(function(_,html) { 
                return html.split(/<br\s*\/?>/i).slice(0,-1).join('<br>')
            });
        }
    }
    function addNrToCalc(nr){
        $('#currentNr').html(nr);
        $('#calculation').html(calculation);
    }
    function showResult(result){
        $('#currentNr').html("V: " + result);
    }
    
});
 
let date = new Date;
let hours = date.getHours();

if(hours >= 21 || hours < 8){
    console.log("mau");
    document.getElementById("bg").style.backgroundColor = "rgb(26, 110, 110)";
    document.getElementById("currentNr").style.backgroundColor = "rgb(121, 75, 15)";
    document.getElementById("calculation").style.backgroundColor = "rgb(121, 75, 15)";
}