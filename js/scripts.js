// source https://www.youtube.com/watch?v=j59qQ7YWLxw

window.onload = function () {
    // Calculator buttons
    const numButton = document.querySelectorAll('[data-number]');
    const opButton = document.querySelectorAll('[data-operation]');
    const complexButton = document.querySelectorAll('[data-complex]');
    const equalsButton = document.querySelector('[data-equals]');
    const deleteButton = document.querySelector('[data-delete]');
    const clearButton = document.querySelector('[data-clear]');
    const previous = document.querySelector('[data-previous]');
    const current = document.querySelector('[data-current]');

    let darklight = document.querySelector("#darklightBtn");
    darklight.addEventListener('click', toggle);

    function toggle() {
        let dark = document.getElementById("dark"),
            light = document.getElementById("light");
        if (dark.disabled == true) {
            darklight.innerHTML = '<i class="fas fa-moon"></i>';
            dark.disabled = false;
            light.disabled = true;
        } else {
            darklight.innerHTML = '<i class="fas fa-sun"></i>';
            dark.disabled = true;
            light.disabled = false;
        }
    }


    // Get the modal
    let modal = document.getElementById("historyModal");

    let modalBody = document.querySelector(".modal-body");

    // Get the button that opens the modal
    let modalBtn = document.getElementById("modalBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    modalBtn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }




    class Calculator {
        constructor(previous, current) {
            this.previous = previous;
            this.current = current;
            this.clear();
        }

        clear() {
            this.current = "";
            this.previous = "";
            this.operation = undefined;
        }

        delete() {
            this.current = this.current.toString().slice(0, -1);
        }

        append(num) {
            if (num === '.' && this.current.includes('.')) return;
            this.current = this.current.toString() + num.toString();
        }

        chooseOperation(op) {
            if (this.current === "") return;
            if (this.previous !== "") {
                this.compute(op);
            }
            this.operation = op;
            this.previous = this.current
            this.current = "";
        }

        compute(op) {
            let compute;
            const prev = parseFloat(this.previous);
            const cur = parseFloat(this.current);
            if (isNaN(prev) || isNaN(cur)) return;
            switch (this.operation) {
                case "+":
                    compute = prev + cur;
                    break;
                case "-":
                    compute = prev - cur;
                    break;
                case "÷":
                    compute = prev / cur;
                    break;
                case "*":
                    compute = prev * cur;
                    break;
                default:
                    return;
            }
            this.save(prev, cur, this.operation, compute);
            this.current = compute;
            this.operation = undefined;
            this.previous = "";
        }

        updateDisplay() {
            current.innerText = this.formatNumber(this.current);
            if (this.operation != null) {
                previous.innerText = `${this.formatNumber(this.previous)} ${this.operation}`;
            } else {
                previous.innerText = '';
            }
        }

        computeComplex(complex) {
            this.operation = complex;
            let compute;
            const cur = parseFloat(this.current);
            if (isNaN(cur)) return;
            switch (complex) {
                case "sin":
                    compute = Math.sin(cur);
                    break;
                case "cos":
                    compute = Math.cos(cur);
                    break;
                case "tan":
                    compute = Math.tan(cur);
                    break;
                case "sqrt":
                    compute = Math.sqrt(cur);
                    break;
                default:
                    return;
            }
            this.saveComplex(cur, complex, compute);
            this.operation = complex;
            this.current = compute;
            this.previous = cur;
            current.innerText = compute;
            previous.innerText = cur;
        }

        formatNumber(number) {
            const stringNumber = number.toString()
            const integerDigits = parseFloat(stringNumber.split('.')[0])
            const decimalDigits = stringNumber.split('.')[1]
            let integerDisplay
            if (isNaN(integerDigits)) {
                integerDisplay = ''
            } else {
                integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
        }

        save(first, second, operant, result) {
            if (document.querySelector(".placeholder")) {
                document.querySelector(".placeholder").remove();
            }
            let saved = document.createElement("p");
            saved.innerHTML = `${this.formatNumber(first)} ${operant} ${this.formatNumber(second)} = ${this.formatNumber(result)}`;
            modalBody.prepend(saved);
        }

        saveComplex(number, operant, result) {
            if (document.querySelector(".placeholder")) {
                document.querySelector(".placeholder").remove();
            }
            let saved = document.createElement("p");
            saved.innerHTML = `${operant} of ${this.formatNumber(number)} = ${this.formatNumber(result)}`;
            modalBody.prepend(saved);
        }

    }

    const calc = new Calculator(previous, current);

    complexButton.forEach(btn => {
        btn.addEventListener('click', () => {
            calc.computeComplex(btn.innerText);
            calc.updateDisplay();
        })
    });

    numButton.forEach(btn => {
        btn.addEventListener('click', () => {
            calc.append(btn.innerText);
            calc.updateDisplay();
        })
    });

    opButton.forEach(btn => {
        btn.addEventListener('click', () => {
            calc.chooseOperation(btn.innerText);
            calc.updateDisplay();
        })
    });

    equalsButton.addEventListener('click', () => {
        calc.compute();
        calc.updateDisplay();
    });

    clearButton.addEventListener('click', () => {
        calc.clear();
        calc.updateDisplay();
    });

    deleteButton.addEventListener('click', () => {
        calc.delete();
        calc.updateDisplay();
    });

    if (current.innerText == "") {
        setInterval(() => {
            if (current.innerText == "") {
                current.innerText = ">";
                setTimeout(() => {
                    if (current.innerText == ">") {
                        current.innerText = "";
                    }
                }, 500);
            } else {
                return;
            }
        }, 1000);
    }





}