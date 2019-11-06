const database = [
	{q: 'a + ~a', a: '1', t: [['a', 'output'], ['0', '1'], ['1', '1']]},
	{q: 'a * ~a', a: '0', t: [['a', 'output'], ['0', '0'], ['1', '0']]},
	{q: 'a * ~a + a', a: 'a', t: [['a', 'output'], ['0', '0'], ['1', '1']]},
	{q: '~(a * b) * (~a + b) * (~b + b)', a: '~a + ~b * b', t: [['a', 'b', 'output'], ['0', '0', '1'], ['0', '1', '1'], ['1', '0', '0'], ['1', '1', '0']]},
	{q: 'p + ~(p * q)', a: '1', t: [['p', 'q', 'output'], ['0', '0', '1'], ['0', '1', '1'], ['1', '0', '1'], ['1', '1', '1']]},
	{q: 'p + ~(p + q)', a: 'p + ~q', t: [['p', 'q', 'output'], ['0', '0', '1'], ['0', '1', '0'], ['1', '0', '1'], ['1', '1', '1']]},
	{q: '~(p + q) + ~q', a: '~q', t: [['p', 'q', 'output'], ['0', '0', '1'], ['0', '1', '0'], ['1', '0', '1'], ['1', '1', '0']]},
	{q: 'ab~c + abc', a: 'ab', t: [['a', 'b', 'c', 'output'], ['0', '0', '0', '0'], ['0', '0', '1', '0'], ['0', '1', '0', '0'], ['0', '1', '1', '0'], ['1', '0', '0', '0'], ['1', '0', '1', '0'], ['1', '1', '0', '1'], ['1', '1', '1', '1']]},
	{q: 'a~bc + abc', a: 'ac', t: [['a', 'b', 'c', 'output'], ['0', '0', '0', '0'], ['0', '0', '1', '0'], ['0', '1', '0', '0'], ['0', '1', '1', '0'], ['1', '0', '0', '0'], ['1', '0', '1', '1'], ['1', '1', '0', '0'], ['1', '1', '1', '1']]},
	{q: '~a~bc+ ~ab~c + a~b~c + a~bc + abc', a: 'ac + a~b + b~a~c + c~b', t: [['a', 'b', 'c', 'output'], ['0', '0', '0', '0'], ['0', '0', '1', '1'], ['0', '1', '0', '1'], ['0', '1', '1', '0'], ['1', '0', '0', '1'], ['1', '0', '1', '1'], ['1', '1', '0', '0'], ['1', '1', '1', '1']]}];

var complete = []; //keep track of questions asked already
var count = 0;

function init() {
	for(i = 0; i < database.length; i++)
		complete.push(false);
}

function createPad() {
	//if previous pad existed, remove it
	let temp = document.querySelector("div.center");
	if (temp)
		temp.remove();

	let header = document.createElement("span");
	header.classList.add("header");
	header.classList.add("greenbg");
	header.innerHTML = "Simplify the following boolean expression";

	let div = document.createElement("div");
	div.classList.add("center");
	div.appendChild(header);

	document.getElementById("main").appendChild(div);
	return div;
}

function convert(raw) {
	raw = raw.replace(new RegExp("[tT][Rr][Uu][eE]|[Tt]", 'g'), "1");
	raw = raw.replace(new RegExp("[Ff][Aa][Ll][Ss][Ee]|[Ff]", 'g'), "0");
	raw = raw.replace(new RegExp("[!]", 'g'), "~");
	raw = raw.replace(new RegExp("v|or|[|]", 'g'), "[+]");
	raw = raw.replace(new RegExp("[.]|[*][&]", 'g'), "");
	raw = raw.replace(new RegExp("\s+", 'g'), "");
	return raw.toLowerCase();
}

function createTable(values) {
	let table = document.createElement("table");
	for (i = 0; i < values.length; i++) {
		let tempTR = document.createElement("tr");
		for(j = 0; j < values[i].length; j++) {
			let tempCol = document.createElement(i == 0 ? "th": "td");
			tempCol.innerHTML = values[i][j];
			tempTR.appendChild(tempCol);
		}
		table.appendChild(tempTR);
	}
	return table;
}

function createEnterBtn(attempt, ans, table) {
	let btn = document.createElement("button");
	btn.classList.add("submit");
	btn.classList.add("greenbg");
	btn.onclick = function() {
		/*aim of this function as follows

		generate a panel displaying user correctness
		(if correct make a green panel else change to red panel)
		possibly display truth table as explanantion

		give button to advance to next question*/

		if (attempt.value.length == 0) {
			alert("You should probably enter a value as an attempt");
		} else {
			let header = createPad().querySelector("span.header");
			//translate user symbols (if not used the same as ans)
			let cleanAttempt = convert(attempt.value);

			//make a container to put next button, correct ans (if wrong) and truth table in
			container = document.createElement("div");
			container.classList.add("result");
			if (table)
				container.appendChild(createTable(table));

			if (cleanAttempt == ans) {
				header.innerHTML = "Your answer is correct";
			} else {
				header.innerHTML = "Your answer is incorrect";
				header.classList.remove("greenbg");
				header.classList.add("redbg");

				//give correct ans
				span = document.createElement("span");
				span.classList.add("correction");
				span.classList.add("blue");
				span.innerHTML = "The correct answer is "+ans;

				container.appendChild(span);
			}

			//setup a button to go to next question
			next = document.createElement("button");
			next.classList.add("submit");
			next.classList.add("greenbg");
			next.innerHTML = "Next";
			next.onclick = () => createQuestion();
			container.appendChild(next);

			//add header (correct or incorrect) and container with next to main container
			document.querySelectorAll("div.center")[0].appendChild(header);
			document.querySelectorAll("div.center")[0].appendChild(container);
		}
	};

	btn.innerHTML = "Enter";
	return btn;
}

function getRandomIndex() {
	let valid = false, j = 0;

	while(!valid) { //loop till we have a index with a question not previously asked
		j = Math.floor(Math.random() * database.length); // 0 - database length
		valid = !complete[j]; //avoid using a previously question
	}
	return j;
}

function createQuestion() {
	//if u have asked database.length times, this means u are out of questions
	//(because questions are only asked once although random)
	if (count >= database.length) {
		alert("We have no more questions to ask");
		//probably display a total of correct ans screen here
	} else {
		let center = createPad();

		let ansBox = document.createElement("div");
		let ans = document.createElement("input");
		ans.setAttribute('type', 'text');
		ans.setAttribute('value', '');

		let i = getRandomIndex();
		let btn = createEnterBtn(ans, database[i].a, database[i].t);

		let question = document.createElement("p");
		question.classList.add("description");

		question.innerHTML = database[i].q;
		count++;

		ansBox.appendChild(ans);
		ansBox.appendChild(document.createElement("p"));
		ansBox.appendChild(btn);

		center.appendChild(question);
		center.appendChild(ansBox);
	}
}
