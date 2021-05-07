class calculator {
    constructor() {
        this.init();
        this.pressedkey;
        this.lastkey = "";
        this.buffkey;
        this.currentEq;
        this.bufferEq = "";
        this.sum;
        this.ans;
        this.memory = [];
        this.powd;
        this.keymem = 0;
        this.addtomemory;
        this.sqcount;
    }



    init() {
        $('input').keypress(function(event) {
            event.preventDefault();
        });

        $('#history').on('click', () => { this.showHistory(); });
        this.main();
    }

    main() {
        $('.buttons').click((event) => {
            this.pressedkey = $(event.target)[0].id;
            if (this.lastkey == "equals") {
                this.clearAll();
            }

            if (isNaN(this.pressedkey) && this.pressedkey != "." && this.keymem == 1 &&
                this.pressedkey != "equals" && this.pressedkey != "showhistory" && this.pressedkey != "git") {
                this.keymem = 0;
                this.squarer();

                if (this.pressedkey == "DEL") {
                    this.keymem = 0;
                    this.delChar();
                } else if (this.pressedkey == "AC") {
                    this.keymem = 0;
                    this.clearAll();
                } else if (this.pressedkey == "ANS") {
                    this.lanswer();
                } else if (this.pressedkey == "lmod") {
                    document.body.classList.toggle("light_mode");
                } else {
                    this.addToCalc();
                }
            } else {
                if (this.pressedkey == "^") {
                    this.keymem = 1;
                    this.currentEq = $('#displayfield').val() + this.pressedkey; +
                    $('#displayfield').val(this.currentEq);
                    this.buffkey = this.lastkey;
                } else if (this.pressedkey == "equals") {
                    if (this.keymem == 1) {
                        this.keymem = 0;
                        this.squarer();
                    }
                    this.summ();

                } else if (this.pressedkey == "git") {
                    window.open('https://github.com/margonaroskin/3-kodutoo', '_blank');
                } else if (this.pressedkey == "DEL") {
                    this.keymem = 0;
                    this.delChar();
                } else if (this.pressedkey == "AC") {
                    this.keymem = 0;
                    this.clearAll();
                } else if (this.pressedkey == "ANS") {
                    this.lanswer();
                } else if (this.pressedkey == "lmod") {
                    document.body.classList.toggle("light_mode");
                } else if (this.pressedkey == "showhistory") {
                    this.showHistory();
                } else {
                    this.addToCalc();
                }
            }

            if (this.pressedkey) {
                this.lkey();

            }

        });

    }


    lkey() {
        if ($.isNumeric(this.pressedkey) || this.pressedkey == "." || this.pressedkey == "(" ||
            this.pressedkey == ")") {
            if ($.isNumeric(this.lastkey) || this.lastkey == "." || this.lastkey == "(" ||
                this.lastkey == ")") {
                this.lastkey += this.pressedkey;
            } else {
                this.lastkey = this.pressedkey;
            }
        } else {
            this.lastkey = this.pressedkey;
        }
    }

    addToCalc() {
        this.currentEq = $('#displayfield').val() + this.pressedkey; +
        $('#displayfield').val(this.currentEq);

        this.bufferEq += this.pressedkey;

    }

    summ() {
        this.sum = eval(this.bufferEq);
        $('#displayfield').val(this.sum);
        this.memory.push(this.currentEq + "=" + this.sum);
        this.ans = this.sum;
    }

    lanswer() {
        this.currentEq = $('#displayfield').val() + this.ans;
        $('#displayfield').val(this.currentEq);
        this.bufferEq = this.currentEq;
    }

    delChar() {
        this.currentEq = this.currentEq.slice(0, -1);
        this.bufferEq = this.currentEq.slice(0, -1);
        $('#displayfield').val(this.currentEq);
    }

    clearAll() {
        this.currentEq = "";
        this.bufferEq = "";
        $('#displayfield').val(this.currentEq);
    }



    squarer() {
        this.sqcount = this.buffkey.length + this.lastkey.length;
        this.powd = Math.pow(this.buffkey, this.lastkey);
        this.bufferEq = this.bufferEq.slice(0, -this.sqcount);
        this.bufferEq = this.bufferEq + this.powd;
        this.currentEq = $('#displayfield').val();
        $('#displayfield').val(this.currentEq);
    }

    showHistory() {
        $('#history').fadeToggle();
        $('#history').html("");
        for (let i = 0; i < this.memory.length; i++) {
            $('#history').append(this.memory[i] + "<br>");
        }
    }



}

let calc = new calculator;