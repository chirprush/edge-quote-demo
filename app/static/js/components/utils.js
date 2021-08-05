class Component {
	constructor(element) {
		this.__el = element;
	}

	render() {
		throw "Unimplemented function: render()";
	}

	setProp(props) {
		for (let [name, value] of Object.entries(props)) {
			this[name] = value;
		}
		this.__el.textContent = "";
		let rendered = this.render();
		if (Array.isArray(rendered)) {
			for (let element of rendered) {
				this.__el.appendChild(element);
			}
		} else {
			this.__el.appendChild(rendered);
		}
	}
}

const $ = (tagname, ...attributes) => {
	let text = "";
	let children = [];
	let opts = {};
	for (let attr of attributes) {
		if (typeof attr === "string") {
			text = attr;
		} else if (Array.isArray(attr)) {
			children = attr;
		} else if (typeof attr === "object") {
			opts = attr;
		} else {
			throw `Error: type of argument passed to "$" is invalid`;
		}
	}
	let el = document.createElement(tagname);
	el.innerText = text;
	for (let child of children) {
		el.appendChild(child);
	}
	for (let [k, v] of Object.entries(opts)) {
		el[k] = v;
	}
	return el;
}

window.$ = $;

const getSection = (id) => {
	let el = document.getElementById(id);
	if (el.__obj === undefined) {
		throw `Error: element with id: "${id}" is not a section`;
	}
	return el.__obj;
}

export { Component, $, getSection };
