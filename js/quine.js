const database = [{q: 'F(A,B,C,D,E)= &#931;m (0,1,2,3,6,8,9,10,11,17,20,21,23,25,28,30,31)', a: "A'C' + A'B'DE' + C'D'E + AB'CD' + ACDE + ABCE'"},
{q: 'F(A,B,C,D,E)= &#931;m (0,1,2,9,11,12,13,27,28,29)', a: "BCD' + A'B'C'E' + A'C'D'E' + BC'DE'}"},
{q: 'F(A,B,C,D,E)= &#931;m (0,2,6,7,8,10,12,14,15,41)', a: "A'B'D'F' + A'B'CF + A'B'DE + A'BCD'E'F"},
{q: "F = ABCD + A'B'CD + ABC'D' + AB'CD' + A'B'C'D + A'BCD + ABCD' + AB'CD'", a: "ABD' + AC + CD + DA'B'"},
{q: "F = A'B'CD' + ABCD + A'BCD + A'BC'D + ABCD' + A'BCD' + ABC'D' + AB'C'D", a:"(ABD' + ADB'C' + BC + BDA' + CA'D')"},
{q: "A'B'C'D' + A'BC'D + ABCD + A'B'CD + ABC'D +A'B'CD + A'B'C'D + AB'CD", a: "(ABD + BCD' + DC' + A'B'C')"}];

var complete = []; //keep track of questions asked already
var count = 0, correct = 0;

function init() {
	for(i = 0; i < database.length; i++)
		complete.push(false);
}

function getRandomIndex() {
	let valid = false, j = 0;

	while(!valid) { //loop till we have a index with a question not previously asked
		j = Math.floor(Math.random() * database.length); // 0 - database length
		valid = !complete[j]; //avoid using a previously question
	}
	complete[j] = true;
	return j;
}

function createScore() {
	let pad = createPad("Your final results");

	let score = document.createElement("p");
	score.innerHTML = correct + " / " + database.length;
	score.classList.add(correct / database.length * 100 < 50 ? "red" : "green");

	pad.appendChild(score);
}

function createPad(title) {
	//if previous pad existed, remove it
	let temp = document.querySelector("div.push_center2");
	if (temp)
		temp.remove();

	let header = document.createElement("span");
	header.classList.add("header");
	header.classList.add("greenbg");
	header.innerHTML = title;

	let div = document.createElement("div");
	div.classList.add("push_center2");
	div.appendChild(header);

	document.getElementById("qmain").appendChild(div);
	return div;
}

function createEnterBtn(attempt, ans) {
	let btn = document.createElement("button");
	btn.classList.add("submit");
	btn.classList.add("greenbg");
	btn.onclick = function() {
		/*aim of this function as follows

		generate a panel displaying user correctness
		(if correct make a green panel else change to red panel)

		give button to advance to next question*/
        let pure = attempt.value.toLowerCase().trim()
		if (pure == 0) {
			alert("You should probably enter a value as an attempt");
		} else {
			let header = createPad("").querySelector("span.header");

			//make a container to put next button, correct ans (if wrong)
			container = document.createElement("div");
			container.classList.add("result");

			if (pure == ans.toLowerCase()) {
                header.innerHTML = "Your answer is correct";
                correct++;
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
			document.querySelectorAll("div.push_center2")[0].appendChild(header);
			document.querySelectorAll("div.push_center2")[0].appendChild(container);
		}
	};

	btn.innerHTML = "Enter";
	return btn;
}

function createQuestion() {
	//if u have asked database.length times, this means u are out of questions
	//(because questions are only asked once although random)
	if (count >= database.length)
		createScore();
	else {
		let center = createPad("Simplify the following boolean expression (preferably using Quine McCluskey Technique)");

		let ansBox = document.createElement("div");
		let ans = document.createElement("input");
		ans.setAttribute('type', 'text');
		ans.setAttribute('value', '');

		let i = getRandomIndex();
		let btn = createEnterBtn(ans, database[i].a);

		let question = document.createElement("p");
        question.innerHTML = database[i].q;
        
		count++;

		ansBox.appendChild(ans);
		ansBox.appendChild(document.createElement("p"));
		ansBox.appendChild(btn);

		center.appendChild(question);
		center.appendChild(ansBox);
	}
}