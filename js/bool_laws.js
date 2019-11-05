const database = {"1var": [{'q': 'a + ~a', 'a': '1'}, {'q': 'a.~a', 'a': '0'}],
"2var": [],
"3var": [],
"4var": []
};

//compare with case insensitivity, also replace all and (.,*,&) symbols to null
const synonyms = {'t': 'true,t,1', 'f': 'false,f,0', '~': '~,!', '+': 'v,or,+,|'};

var options = [], count = 0;

function readParams() {
	let checkBox = document.querySelectorAll("input[name]");
	
	checkBox.forEach(function(b) {
		 if (b.checked)
			options.push(b.name)
	});
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

function createEnterBtn(attempt, ans) {
	let btn = document.createElement("button");
	btn.classList.add("submit");
	btn.classList.add("greenbg");
	btn.onclick = function() {
		/*aim of this function as follows

		generate a panel displaying user correctness
		(if correct make a green panel else change to red panel)
		possibly display truth table as explanantion

		give button to advance to next question*/

		let header = clearPad();
		if (attempt.value == ans) { //at this point to do subs with synonyms
			header.innerHTML = "Your answer is correct";
		} else {
			header.innerHTML = "Your answer is incorrect";
			header.classList.remove("greenbg");
			header.classList.add("redbg");
		}

		//this would be a good place to print truthtable

		//setup a button to go to next question
		next = document.createElement("button");
		next.classList.add("submit");
		next.classList.add("greenbg");
		next.innerHTML = "Next";
		next.onclick = function() {
			header.classList.remove("redbg");
			header.classList.add("greenbg")
			createQuestion();
		}

		//make a container to put next button in
		container = document.createElement("div");
		container.classList.add("result");
		container.appendChild(next);

		//add header (correct or incorrect) and container with next to main container
		document.querySelectorAll("div.center")[0].appendChild(header);
		document.querySelectorAll("div.center")[0].appendChild(container);

	};

	btn.innerHTML = "Enter";
	return btn;
}

function createQuestion() {
	let header = clearPad();
	let center = document.querySelectorAll("div.center")[0];
	header.innerHTML = "Simplify the following boolean expression";
	center.appendChild(header);

	let ansBox = document.createElement("div");
	let ans = document.createElement("input");
	ans.setAttribute('type', 'text');
	ans.setAttribute('value', '');

	let btn = createEnterBtn(ans, database['1var'][count]['a']);

	let question = document.createElement("p");
	question.classList.add("description");
	//again this is hardcoded, will choose based on user interaction later (if to do 1var/2var or combo)
	question.innerHTML = database['1var'][count]['q'];
	count = ++count % database['1var'].length; //prevent overflow

	ansBox.appendChild(ans);
	ansBox.appendChild(document.createElement("p"));
	ansBox.appendChild(btn);

	center.appendChild(question);
	center.appendChild(ansBox);
}
