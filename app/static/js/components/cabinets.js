import { $ } from "./utils.js";
import { Dropdown } from "./dropdown.js";

const HEIGHT_QUARTER = 0;
const HEIGHT_HALF = 1;
const HEIGHT_FULL = 2;

const DEPTH_1000 = 0;
const DEPTH_1200 = 1;

const POWER_RED = 0;
const POWER_1_PHASE = 1;
const POWER_3_PHASE = 2;
const POWER_AC = 3;
const POWER_DC = 4;

const CONN_100M = 0;
const CONN_LESS_GB = 1;
const CONN_GB = 2;
const CONN_MORE_GB = 3;

class CabinetBox {
	constructor(onchange) {
		this.onchange = onchange;
		this.height_index = HEIGHT_QUARTER;
		this.depth_index = DEPTH_1000;
		this.power_index = POWER_RED;
		this.conn_index = CONN_100M;
		this.height_dropdown = new Dropdown(
			"Height:",
			["Quad", "Half", "Full"],
			{
				id: "height-dropdown",
				name: "height",
				onchange: () => {
					let dropdown = document.getElementById("height-dropdown");
					this.height_index = dropdown.selectedIndex;
					if (this.onchange) {
						this.onchange();
					}
				}
			}
		);
		this.depth_dropdown = new Dropdown(
			"Depth:",
			["1000 mm (42 in)", "1200 mm (48 in)"],
			{
				id: "depth-dropdown",
				name: "depth",
				onchange: () => {
					let dropdown = document.getElementById("depth-dropdown");
					this.depth_index = dropdown.selectedIndex;
					if (this.onchange) {
						this.onchange();
					}
				}
			}
		);
		this.power_dropdown = new Dropdown(
			"Power:",
			["Power Redundancy", "Single Phase", "Three Phase", "AC Power", "DC Power"],
			{
				id: "power-dropdown",
				name: "power",
				onchange: () => {
					let dropdown = document.getElementById("power-dropdown");
					this.power_index = dropdown.selectedIndex;
					if (this.onchange) {
						this.onchange();
					}
				}
			}
		);
		this.conn_dropdown = new Dropdown(
			"Bandwith:",
			["100 Mb/s", "<1 Gb/s", "1 Gb/s", ">1 Gb/s"],
			{
				id: "conn-dropdown",
				name: "conn",
				onchange: () => {
					let dropdown = document.getElementById("conn-dropdown");
					this.conn_index = dropdown.selectedIndex;
					if (this.onchange) {
						this.onchange();
					}
				}
			}
		);
	}

	render() {
		return $("div", { className: "bundle-box"}, [
			$("span", "Cabinet"),
			this.height_dropdown.render(),
			this.depth_dropdown.render(),
			this.power_dropdown.render(),
			this.conn_dropdown.render(),
		])
	}
}

class SmallCabinets {
	constructor(onchange) {
		this.box = new CabinetBox(onchange);
	}

	render() {
		return this.box.render();
	}
}

class Cabinets {
	constructor() {
	}

	render() {
	}
}

class Bundles {
	constructor() {
	}

	render() {
	}
}


export { SmallCabinets, Cabinets, Bundles };
