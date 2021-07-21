const setParentStatus = (element, value) => {
	let selector_status = element.parentNode.getElementsByClassName("selector-status")[0];
	if (value) {
		selector_status.status_value = value;
		selector_status.className = "selector-status submitted";
		selector_status.innerText = "✔";
	} else {
		selector_status.status_value = value;
		selector_status.className = "selector-status not-submitted";
		selector_status.innerText = "✖";
	}
}

window.onload = () => {}
