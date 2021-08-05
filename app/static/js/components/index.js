import * as location_section from "./location_section.js";

let classes = {...location_section};

for (let [name, value] of Object.entries(classes)) {
	let elements = document.getElementsByTagName(name);
	for (let el of elements) {
		let o = new (value)(el);
		el.__obj = o;
		if (o.onclick !== undefined) {
			el.onclick = () => o.onclick();
		}
		let rendered = o.render();
		if (Array.isArray(rendered)) {
			for (let element of rendered) {
				el.appendChild(element);
			}
		} else {
			el.appendChild(rendered);
		}
	}
}
