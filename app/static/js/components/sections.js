import { Component, range, $, $for, getSection } from "./utils.js";
import { Dropdown } from "./dropdown.js";

class SectionComponent extends Component {
	constructor(el) {
		super(el);
		this.submitted = false;
		this.enabled = true
	}

	setProp(props) {
		this.submitted = false;
		super.setProp(props);
	}

	renderTitle(title) {
		let submitted = this.submitted ? "submitted" : "not-submitted";
		let check = this.submitted ? "✔" : "✖";
		return $("ul", [
			$("li", { className: "heading" }, title),
			$("li", { className: `heading-status ${submitted}` }, check)
		]);
	}

	renderSubmit(section_id, next_id) {
		return $("button",
			{
				onclick: () => {
					getSection(section_id).setProp({ submitted: true });
					if (next_id) {
						getSection(next_id).setProp({ enabled: true });
					}
				},
				className: `button ${this.enabled ? "" : "button-disabled"}`,
				disabled: !this.enabled
			},
			"Submit"
		);
	}
}

class LocationSection extends SectionComponent {
	constructor(el) {
		super(el);
		this.dropdown = new Dropdown(
			"Select a data location: ",
			["Pittsburgh, PA", "New York City, NY"],
			{
				name: "location",
				onchange: () => getSection("location-section").setProp({ submitted: false })
			}
		);
	}

	render() {
		return [
			this.renderTitle("Location"),
			$("div", { className: "indented" }, [
				$("p", "This is sample paragraph made to see how good this specific styling works. In the future, something more concrete and relating to the selection might be placed here."),
				this.dropdown.render(),
				this.renderSubmit("location-section", "cabinet-section")
			]),
		];
	}
}

class CabinetSection extends SectionComponent {
	constructor(el)  {
		super(el);
		this.enabled = false;
		this.active_view = null;
		this.button_text = ["Less than one", "More than one", "Bundles"];
	}

	setView(view) {
		this.setProp({ active_view: view });
	}

	render() {
		let enabled = this.enabled ? "" : "button-disabled";
		return [
			this.renderTitle("Cabinets"),
			$("div", { className: "indented" }, [
				$("p", "This is sample paragraph made to see how good this specific styling works. In the future, something more concrete and relating to the selection might be placed here."),
				$("div", $for(range(3), i => {
					return $("button", { className: `button ${enabled} ${this.active_view === i ? "button-active" : ""}`, disabled: !this.enabled, onclick: () => this.setView(i) }, this.button_text[i])
				})),
				this.renderSubmit("cabinet-section")
			])
		];
	}
}

export { LocationSection, CabinetSection };
