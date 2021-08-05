import { Component, $ } from "./utils.js";

class SectionComponent extends Component {
	constructor(el) {
		super(el);
		this.submitted = false;
	}

	renderTitle(title) {
		let submitted = this.submitted ? "submitted" : "not-submitted";
		let check = this.submitted ? "✔" : "✖";
		return $("ul", [
			$("li", { className: "heading" }, title),
			$("li", { className: `heading-status ${submitted}` }, check)
		]);
	}
}

export { SectionComponent };
