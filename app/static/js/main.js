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

const bundleRemoveChild = (container) => {
	container.removeChild(container.children[container.children.length - 1]);
}

const bundleAddChild = (container) => {
	let node = new DOMParser().parseFromString(`
		<div class="bundle-box">
			<span>Bundle Plan</span>
			<span>Width✕Height: </span>
			<select id="bundle-single-depth" class="selector-dropdown">
				<optgroup>
					<option value="0">1000mm</option>
					<option value="1">1200mm</option>
				</optgroup>
			</select>
			<select id="bundle-single-height" class="selector-dropdown">
				<optgroup>
					<option value="0">Quarter</option>
					<option value="1">Third</option>
					<option value="2">Half</option>
				</optgroup>
			</select>
		</div>
	`, "text/html").body.children[0];
	container.appendChild(node);
}

const changeBundleAmount = (n) => {
	let amount = document.getElementById("selector-bundle-amount");
	let length = (parseInt(amount.value) || 1) + n;
	let value = Math.max(length, 1);
	amount.value = value.toString();
	let container = document.getElementById("selector-more-bundle-container");
	let to_add = length - container.children.length;
	if (to_add < 0) {
		if (length == 0) { return; }
		for (let i = 0; i < Math.abs(to_add); ++i) {
			bundleRemoveChild(container);
		}
	} else if (to_add > 0) {
		for (let i = 0; i < to_add; ++i) {
			bundleAddChild(container);
		}
	}
}

window.onload = () => {}
