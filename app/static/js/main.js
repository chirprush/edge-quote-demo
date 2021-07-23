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

const setParentStatus = (id, value) => {
	let selector_status = document.getElementById(id).getElementsByClassName("selector-status")[0];
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

const setLocationStatus = (value) => {
	setParentStatus("location-section", value);
	selectCabinetAmount(-1);
	setSectionStatus(document.getElementById("cabinets-section"), value);
}

const LESS_THAN_ONE = 0;
const MORE_THAN_ONE = 1;
const SPECIAL_BUNDLE = 2;

const selectCabinetAmount = (index) => {
	let cabinet_buttons = document.getElementById("selector-cabinet-buttons");
	let cabinet_attributes = document.getElementById("selector-cabinet-attributes");
	setParentStatus("cabinets-section", false);
	for (let i = 0; i < cabinet_buttons.children.length; ++i) {
		if (i == index) {
			cabinet_buttons.children[i].className = "selector-button button-active";
			cabinet_attributes.children[i].hidden = false;
		} else {
			cabinet_buttons.children[i].className = "selector-button";
			cabinet_attributes.children[i].hidden = true;
		}
	}
}

window.onload = () => {}
