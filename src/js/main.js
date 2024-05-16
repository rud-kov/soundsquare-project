// import _ from "lodash";

//import { debounce } from "lodash";

const html = document.querySelector("html");
const body = document.querySelector("body");

const Engine = {
	ui: {
		init: function () {
			// list of all functions to run on init
			Engine.ui.events();
			Engine.ui.forms();
			Engine.ui.responsive();
		},
		events: function () {
			// Add your events here
			console.log("Events are running");

			const el = document.querySelector(".b-test h1");
			const offsetTop = Engine.helpers.offset(el);

			console.log(offsetTop.top);
		},
		forms: function () {
			// Add your form functions here
			console.log("Forms are running");
		},
		responsive: function () {
			// Add your responsive functions here
			console.log("Responsive functions are running");

			window.addEventListener(
				"resize",
				debounce(() => {
					Engine.ui.recalculateGrid();
				}, 1000)
			);
		},
		recalculateGrid: debounce(function () {
			// Add your grid functions here
			console.log("Grid functions are running");
		}, 100),
	},
	helpers: {
		offset: function (el) {
			var rect = el.getBoundingClientRect();
			var docEl = document.documentElement;
			return {
				left: rect.left + (window.pageXOffset || docEl.scrollLeft || 0),
				top: rect.top + (window.pageYOffset || docEl.scrollTop || 0),
			};
		},
	},
};

// FIRE ON DOM READY

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", Engine.ui.init);
} else {
	Engine.ui.init();
}
