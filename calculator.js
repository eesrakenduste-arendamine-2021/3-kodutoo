class Calculator{
    constructor(){
        this.numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
        this.operators = ["^", "/", "*", "-", "+", "="];
        this.input = "";
        this.history = "";
        this.previousNumber = "";
        this.numbersInCalc = [];
        this.operatorsInCalc = [];
        this.operatorCheck = 0;
        this.lastOperator = "";
        this.result = 0;
        this.firstPress = true;
        this.checkEquation = false;
        this.init()
    }

    init(){
        $(".row button").on("click", (event)=>this.readInput(event.currentTarget.innerHTML))
        $(".change-mode input").on("click", (event)=>this.changeMode(event.currentTarget.id))
    }

    changeMode(mode){
        if(mode == "day"){
            document.body.style.backgroundPosition = "left";
            document.getElementById("container").style.transition = "2s";
            document.getElementById("container").style.backgroundColor = "#CCCCCC";
        } else if(mode == "night"){
            document.body.style.backgroundPosition = "right";
            document.getElementById("container").style.transition = "2s";
            document.getElementById("container").style.backgroundColor = "#111111";
        }
    }

    readInput(input){
        if(this.operatorsInCalc.includes("=")){
            this.history = this.result.toString();
            this.operatorsInCalc.length = 0;
            this.checkEquation = true;
            if(this.numbers.includes(input)){
                this.resetInput();
            }
        }
        this.checkFirstPress(input); 
        if(this.numbers.includes(input)){
            this.operatorCheck = 0;
            this.drawInput();
        } else if(this.operators.includes(input)){
            if(this.operatorCheck == 1){
                this.replaceOperator(input);
                this.drawInput();
            } else {
                this.previousNumber = this.input.slice(0, -1);
                this.operatorCheck = 1;
                this.pushToArray(this.previousNumber, "numbers");
                this.pushToArray(input, "operators");
                this.drawInput();
            }
        } else if(input == "DEL"){
            this.deleteInput();
            this.drawInput();
        } else if(input == "C"){
            this.resetInput();
            this.drawInput();
        }
    }

    checkFirstPress(input){
        if(this.firstPress == true){
            this.firstPress = false;
            this.input = input;
        } else {
            this.input += input;
        }
    }

    deleteInput(){
        this.input = this.input.slice(0, -4);
        if(this.input == "" && this.operatorCheck == 1){
            this.firstPress = true;
            this.input = "DEL";
        } else if(this.input == ""){
            this.input = "0";
            this.firstPress = true;
        }
    }

    resetInput(){
        this.firstPress = true;
        this.input = "0";
        this.history = " ‎";
        this.previousNumber = "";
        this.numbersInCalc = [];
        this.operatorsInCalc = [];
        this.operatorCheck = 0;
        this.lastOperator = "";
        this.result = 0;
        $("#history").html(this.history);
        $("#result").html(this.input);
    }

    drawInput(){
        if(this.numbersInCalc.length == 2 || this.input == "="){
            this.calculation();
        } 
            
        if(this.operatorCheck == 0){
            $("#result").html(this.input);
        } else {
            if(this.input == "DEL"){
                $("#history").html(this.history);
                this.input = "";
            } else {
                this.history += this.input;
                this.input = "";
                $("#history").html(this.history);
            }
            
        }
    }

    replaceOperator(input){
        this.lastOperator = input;
        this.pushToArray(this.lastOperator, "operators");
        if(this.checkEquation == true){
            this.checkEquation = false;
            return;
        } else {
            this.history = this.history.slice(0, -1);
        }
        
    }

    pushToArray(input, array){
        if(array == "numbers"){
            this.numbersInCalc.push(input);
        } else if (array == "operators"){
            this.operatorsInCalc.push(input);
        }
    }

    clearArray(array){
        if(array == "numbers"){
            this.numbersInCalc = [];
        } else if (array == "operators"){
            this.operatorsInCalc = [];
        } else if (array == "both"){
            this.numbersInCalc = [];
            this.operatorsInCalc = [];
        }
    }

    calculation(){
        if(this.operatorsInCalc[this.operatorsInCalc.length - 2] == "+"){
            this.result = parseFloat(this.numbersInCalc[0]) + parseFloat(this.numbersInCalc[1]);
        } else if(this.operatorsInCalc[this.operatorsInCalc.length - 2] == "-"){
            this.result = parseFloat(this.numbersInCalc[0]) - parseFloat(this.numbersInCalc[1]);
        } else if(this.operatorsInCalc[this.operatorsInCalc.length - 2] == "*"){
            this.result = parseFloat(this.numbersInCalc[0]) * parseFloat(this.numbersInCalc[1]);
        } else if(this.operatorsInCalc[this.operatorsInCalc.length - 2] == "/"){
            this.result = parseFloat(this.numbersInCalc[0]) / parseFloat(this.numbersInCalc[1]);
        } else if(this.operatorsInCalc[this.operatorsInCalc.length - 2] == "^"){
            this.result = Math.pow(parseFloat(this.numbersInCalc[0]), parseFloat(this.numbersInCalc[1]));
        }
        var lastOperator = this.operatorsInCalc[this.operatorsInCalc.length - 1];
        this.clearArray("both");
        this.pushToArray(this.result.toString(), "numbers");
        this.pushToArray(lastOperator, "operators");
        $("#result").html(this.result);
    }

}

let calculator = new Calculator();