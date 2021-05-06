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
            //console.log(nr1);
        } else if(op != null && nr2 == null) {
            nr2 = this.id;
            calculation += this.id;
            $('#currentNr').html(nr2);
            $('#calculation').html(calculation);
            //console.log(nr2);
        } else if(nr2 != null) {
            nr2 += this.id;
            calculation += this.id;
            $('#currentNr').html(nr2);
            $('#calculation').html(calculation);
            //console.log(nr2);
        } else {
            nr1 += this.id;
            calculation += this.id;
            $('#currentNr').html(nr1);
            $('#calculation').html(calculation);
            //console.log(nr1);
        }        
    });
    $('.button').on('click', function(){
        if(this.id == "="){
            //console.log("equal");
            //console.log(op);
            if(op == "-"){
                //console.log("lahut");
                result = Number(nr1) - Number(nr2);
                $('#currentNr').html("V: " + result);
            } else if(op == "+") {
                //console.log("liit");
                result = Number(nr1) + Number(nr2)
                $('#currentNr').html("V: " + result);
            } else if(op == "*") {
                //console.log("korda");
                result = Number(nr1) * Number(nr2);
                $('#currentNr').html("V: " + result);
            } else if(op == "/") {
                //console.log("jaga");
                result = Number(nr1) / Number(nr2)
                $('#currentNr').html("V: " + result);
            }

            sessionStorage.setItem(numberOfCalc, calculation + "=" + result);
            
            for(let i=Object.keys(sessionStorage); i>0; i--){
                console.log(sessionStorage.getItem(i));
                $('#histCalc').html(sessionStorage.getItem(i) + "<br>");
            }
            numberOfCalc++;

        } else if(this.id == "clear"){
            nr1 = null;
            //console.log(nr1);
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
            } else if(this.id == "cos") {
                if(nr2 != null){
                    result = Math.cos(nr2);
                } else {
                    result = Math.cos(nr1);
                }
            } else if(this.id == "tan") {
                if(nr2 != null){
                    result = Math.tan(nr2);
                } else {
                    result = Math.tan(nr1);
                }
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
    console.log(sessionStorage.getItem(1));
    
});