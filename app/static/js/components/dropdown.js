import { $ } from "./utils.js"

class Dropdown {
	constructor(label, name, opts) {
		this.label = label;
		this.name = name;
		this.opts = opts;
	}

	render() {
		return $("div", { className: "dropdown" }, [
			$("label", this.label, [
				$("select", { name: this.name }, this.opts.map(
					(opt, i) => $("option", { value: i.toString() }, opt)
				))
			])
		]);
	}
}

export { Dropdown };
