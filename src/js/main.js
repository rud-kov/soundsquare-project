const html = document.querySelector("html");
const body = document.querySelector("body");

const Engine = {
	ui: {
		init: function () {
			// list of all functions to run on init
			Engine.ui.events();
			Engine.ui.forms();
		},
		events: function () {
			// Add your events here
			console.log("Events are running");
		},
		forms: function () {
			// Add your form functions here
			console.log("Forms are running");
		},
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
