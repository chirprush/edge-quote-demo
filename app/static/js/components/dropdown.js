import { $ } from "./utils.js"

class Dropdown {
	constructor(label, choices, opts) {
		this.label = label;
		this.choices = choices;
		this.opts = opts;
		this.selected = 0;
	}

	render() {
		let change_callback = () => {
			let dropdown = document.getElementById(this.opts.id);
			this.selected = dropdown.selectedIndex;
			if (this.opts.onchange) {
				this.opts.onchange();
			}
		};
		return $("div", { className: "dropdown" }, [
			$("label", this.label, [
				$("select", { id: this.opts.id, name: this.opts.name, onchange: change_callback, selectedIndex: this.selected }, this.choices.map(
					(opt, i) => $("option", { value: i.toString() }, opt)
				))
			])
		]);
	}
}

export { Dropdown };
