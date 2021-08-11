import { Component, range, $, $if, $for, getSection } from "./utils.js";
import { Dropdown } from "./dropdown.js";
import { SmallCabinets, Cabinets, Bundles } from "./cabinets.js";

class SectionComponent extends Component {
	constructor(el) {
		super(el);
		this.submitted = false;
		this.enabled = true
	}

	setProp(props) {
		this.submitted = false;
		if (this.next_section) {
			getSection(this.next_section).setProp({ enabled: false });
		}
		super.setProp(props);
	}

	renderTitle(title) {
		let submitted = this.submitted ? "submitted" : "not-submitted";
		let check = this.submitted ? "✔" : "";
		return $("ul", [
			$("li", { className: "heading" }, title),
			$("li", { className: `heading-status ${submitted}` }, check)
		]);
	}

	renderSubmit() {
		return $("button",
			{
				onclick: () => {
					getSection(this.id).setProp({ submitted: true });
					if (this.next_section) {
						getSection(this.next_section).setProp({ enabled: true });
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
		this.id = "location-section";
		this.next_section = "cabinet-section";
		this.dropdown = new Dropdown(
			"Select a data location: ",
			["Pittsburgh, PA", "New York City, NY"],
			{
				id: "location-dropdown",
				name: "location",
				onchange: () => getSection(this.id).setProp({ submitted: false })
			}
		);
	}

	render() {
		return [
			this.renderTitle("Location"),
			$("div", { className: "indented" }, [
				$("p", "Pick from a variety of locations across the country for your server to be hosted at. Note: the availability of certain options may depend on the location chosen."),
				this.dropdown.render(),
				this.renderSubmit()
			]),
		];
	}
}

class CabinetSection extends SectionComponent {
	constructor(el)  {
		super(el);
		this.id = "cabinet-section";
		this.enabled = false;
		this.active_view = null;
		this.button_text = ["Partial Cabinets", "Full Cabinets", "Bundles"];
		this.small_cabinets = new SmallCabinets(() => {
			getSection(this.id).setProp({ submitted: false });
		});
		this.cabinets = new Cabinets();
		this.bundles = new Bundles();
	}

	setView(view) {
		this.setProp({ active_view: view });
	}

	render() {
		let enabled = this.enabled ? "" : "button-disabled";
		let selected_view;
		if (this.active_view !== null) {
			selected_view = [this.small_cabinets, this.cabinets, this.bundles][this.active_view];
		}
		return [
			this.renderTitle("Cabinets"),
			$("div", { className: "indented" }, [
				$("p", "Customize the amount, size, power plan, and bandwith of your cabinets. Alternatively, pick from our list of pre-configured bundles."),
				$("div", $for(range(3), i => {
					return $("button", { className: `button ${enabled} ${this.active_view === i ? "button-active" : ""}`, disabled: !this.enabled, onclick: () => this.setView(i) }, this.button_text[i])
				})),
				$if(this.active_view !== null && this.enabled, () => selected_view.render()),
				this.renderSubmit()
			])
		];
	}
}

export { LocationSection, CabinetSection };
