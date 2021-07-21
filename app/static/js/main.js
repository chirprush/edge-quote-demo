const setSectionStatus = (section, enabled) => {
	let buttons = section.getElementsByClassName("selector-button");
	for (let button of buttons) {
		button.disabled = !enabled;
		if (enabled) {
			button.className = "selector-button";
		} else {
			button.className = "selector-button button-disabled";
		}
	}
}

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

const setLocationStatus = (element, value) => {
	setParentStatus(element, value);
	setSectionStatus(document.getElementById("cabinets-section"), value);
}

const LESS_THAN_ONE = 0;
const MORE_THAN_ONE = 1;
const SPECIAL_BUNDLE = 2;

const selectCabinetAmount = (index) => {
	let cabinet_buttons = document.getElementById("selector-cabinet-buttons");
	setParentStatus(cabinet_buttons.parentNode, false);
	for (let i = 0; i < cabinet_buttons.children.length; ++i) {
		if (i == index) {
			cabinet_buttons.children[i].className = "selector-button button-active";
		} else {
			cabinet_buttons.children[i].className = "selector-button";
		}
	}
}

window.onload = () => {}
