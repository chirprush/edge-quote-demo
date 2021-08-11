class Component {
	constructor(element) {
		this.__el = element;
	}

	render() {
		throw "Unimplemented function: render()";
	}

	setProp(props) {
		for (let [name, value] of Object.entries(props)) {
			if (value !== null && value !== undefined) {
				this[name] = value;
			}
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

const range = (...args) => {
	if (args.length === 1) {
		let [n] = args;
		return [...Array(n).keys()];
	} else if (args.length === 2) {
		let [low, high] = args;
		return [...Array(high).keys].slice(low);
	} else {
		throw `Error: too many arguments passed to function "render()"`;
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
		if (child) {
			el.appendChild(child);
		}
	}
	for (let [k, v] of Object.entries(opts)) {
		el[k] = v;
	}
	return el;
}

const $if = (cond, f) => {
	return cond ? f() : null;
}

const $for = (array, f) => {
	return array.map(f);
}

const getSection = (id) => {
	let el = document.getElementById(id);
	if (el.__obj === undefined) {
		throw `Error: element with id: "${id}" is not a section`;
	}
	return el.__obj;
}

export { Component, range, $, $if, $for, getSection };
