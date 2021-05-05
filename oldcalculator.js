class Calculator{
    constructor(){
        this.numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.operators = ["%", "/", "*", "-", "+", "."];
        this.input = "";
        this.history = "";
        this.previousNumber = "";
        this.checkNumbers = [];
        this.operatorCheck = 0;
        this.lastOperator = "";
        this.result = 0;
        this.init()
    }

    init(){
        $(".row button").on("click", (event)=>this.readInput(event.currentTarget.innerHTML))
    }

    readInput(input){
        //console.log(input);
        if(this.numbers.includes(input)){
            this.input += input;
            this.operatorCheck = 0;
            this.drawInput();
        } else if(this.operators.includes(input)){
            if(this.operatorCheck == 1){
                this.input = input;
                this.replaceOperator();
            } else {
                this.operatorCheck = 1;
                this.input += input;
                this.drawHistory();
            }
            

        }
        
    }

    drawInput(){
        $("#result").html(this.input);
    }

    drawHistory(){
        this.previousNumber = this.input.slice(0, -1);
        this.checkNumbers.push(this.previousNumber);
        this.lastOperator = this.input.slice(-1);
        if(this.checkNumbers.length == 2){
            this.calculate();
        } else {
            this.history += this.input;
            this.input = "";
            $("#history").html(this.history);
        }
        
    }

    replaceOperator(){
        this.lastOperator = this.history.slice(-1);
        this.history = this.history.slice(0, -1);
        this.history += this.input;
        $("#history").html(this.history);
        this.input = "";
    }

    calculate(){
        console.log(this.lastOperator);
        if(this.lastOperator == "+"){
            this.result = parseInt(this.checkNumbers[0]) + parseInt(this.checkNumbers[1]);
            this.calculateDraw();
            this.input = "";
        } else if(this.lastOperator == "-"){
            this.result = parseInt(this.checkNumbers[0]) - parseInt(this.checkNumbers[1]);
            this.calculateDraw();
            this.input = "";
        }
    }

    calculateDraw(){
        this.history += this.checkNumbers[1] + this.lastOperator;
        this.checkNumbers = [this.result.toString()];
        $("#history").html(this.history);
        $("#result").html(this.result);
    }
}

let calculator = new Calculator();