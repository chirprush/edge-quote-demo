import { $, getSection } from "./utils.js";
import { SectionComponent } from "./section.js";
import { Dropdown } from "./dropdown.js";
import { Button } from "./button.js"

class LocationSection extends SectionComponent {
	constructor(el) {
		super(el);
		this.dropdown = new Dropdown("Select a data location: ", "location", ["Pittsburgh, PA", "New York City, NY"]);
		this.submit_button = new Button("Submit", () => {
			getSection("location-section").setProp({ submitted: true });
		});
	}

	render() {
		return [
			this.renderTitle("Location"),
			$("div", { className: "indented" }, [
				$("p", "This is sample paragraph made to see how good this specific styling works. In the future, something more concrete and relating to the selection might be placed here."),
				this.dropdown.render(),
				this.submit_button.render()
			]),
		];
	}
}

export { LocationSection }
