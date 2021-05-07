let history = document.querySelector("#history");

function display(num) {
	document.getElementById("display").value = num;
}
function button(num) {
	document.getElementById("display").value += num;
}

// 📚📐🤓
function solve() {
	history.innerHTML += '<div class="problem">' + document.getElementById("display").value + "</div>";

	try {
		display(eviluate(document.getElementById("display").value));
	} catch (Exception) {
		return "err";
	}

	history.innerHTML += '<div class="answer">' + "=" + " " + document.getElementById("display").value + "</div>";
}
// ❌
function clearDisplay() {
	document.getElementById("display").value = "";
}

// 🔙
function deleteLast() {
	var val = document.getElementById("display").value;
	var deleted = val.substr(0, val.length - 1);
	document.getElementById("display").value = deleted;
}

function showHistory() {
	var x = document.getElementById("history");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

//-----------------theme-----------------

function changeButtonTheme() {
	var elem = document.getElementById("theme");
	if (elem.value == "dark") elem.value = "light";
	else elem.value = "dark";

	if (elem.value == "light") {
		document.getElementById("btnImg").src = "img/light.png";
	} else if (elem.value == "dark") {
		document.getElementById("btnImg").src = "img/dark.png";
	}
}

function theme() {
	var element = document.body;
	element.classList.toggle("dark-mode");
}

document.querySelector("#theme").addEventListener("click", () => {
	changeButtonTheme();
	this.theme();
});
