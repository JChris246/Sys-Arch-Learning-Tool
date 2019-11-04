const database = {"1var": [], "2var": [], "3var": [], "4var": []};

function readParams() {
	let checkBox = document.querySelectorAll("input[name]");
	let options = [];
	
	checkBox.forEach(function(b) {
		 if (b.checked)
			options.push(b.name)
	});
	alert("No further action coded as yet");
}
