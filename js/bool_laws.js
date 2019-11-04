const database = {"1var": [], "2var": [], "3var": [], "4var": []};
var options = [];

function readParams() {
	let checkBox = document.querySelectorAll("input[name]");
	
	checkBox.forEach(function(b) {
		 if (b.checked)
			options.push(b.name)
	});
	//alert("No further action coded as yet");
	createQuestion();
}


function clearPad() {
	let temp = document.querySelectorAll("div.center")[0]; //center to remove
	let header = temp.querySelector("span.header").cloneNode();
	let center = temp.cloneNode(); //clone without child nodes
	document.getElementById("main").appendChild(center); //replace with cloned
	temp.remove();
	return header;
}

function createEnterBtn(ans) {
	let btn = document.createElement("button");
	btn.classList.add("submit");
	btn.classList.add("greenbg");
	btn.onclick = function() {
		/*generate a panel displaying user correctness
		(if correct make a green panel else change to red panel)
		possibly display truth table as explanantion

		give button to advance to next question*/
		let header = clearPad();
		if (ans.value == "ab") {
			header.innerHTML = "Your answer is correct";
		} else {
			header.innerHTML = "Your answer is incorrect";
			header.classList.remove("greenbg");
			header.classList.add("redbg");
		}

		document.querySelectorAll("div.center")[0].appendChild(header);
	};

	btn.innerHTML = "Enter";
	return btn;
}

function createQuestion() {
	let header = clearPad();
	let center = document.querySelectorAll("div.center")[0];
	header.innerHTML = "Simplify the following boolean expression";
	center.appendChild(header);

	let question = document.createElement("p");
	question.classList.add("description");
	question.innerHTML = "(abc) + (ab~c)"; //obviously this will be a var later

	let ansBox = document.createElement("div");
	let ans = document.createElement("input");
	ans.setAttribute('type', 'text');
	ans.setAttribute('value', '');
	let btn = createEnterBtn(ans);

	ansBox.appendChild(ans);
	ansBox.appendChild(document.createElement("p"));
	ansBox.appendChild(btn);

	center.appendChild(question);
	center.appendChild(ansBox);
}
