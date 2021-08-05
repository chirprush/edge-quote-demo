import { $ } from "./utils.js";

class Button {
	constructor(text, onclick) {
		this.text = text;
		this.onclick = onclick;
	}

	render() {
		return $("button", { onclick: this.onclick, className: "button" }, this.text);
	}
}

export { Button };
