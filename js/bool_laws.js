const database = {"1var": [], "2var": [], "3var": [], "4var": []};

function readParams() {
	let checkBox = document.querySelectorAll("input[name]");
	let options = [];
	for(i = 0; i < checkBox.length; i++)
		if (checkBox[i].checked)
			options.push(checkBox[i].name);
	alert("No further action coded as yet");
}
