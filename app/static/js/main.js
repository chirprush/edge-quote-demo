window.onload = () => {
	for (let submit_button of document.getElementsByClassName("submit-button")) {
		submit_button.onclick = () => {
			let selector_status = submit_button.parentNode.getElementsByClassName("selector-status")[0];
			selector_status.className = "selector-status submitted";
			selector_status.innerText = "✔";
		}
	}
}
