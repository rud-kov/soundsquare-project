// import _ from "lodash";

//const { method } = require("lodash"); ---- LODASH HAZI ERROR

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

			const signBttn = document.getElementById("signBttn");

			const prelogin = document.getElementById("prelogin");

			const divider = document.getElementById("divider");

			const login = document.getElementById("login");

			const loginWrapper = document.getElementById("login__wrapper");

			signBttn.addEventListener("click", () => {
				prelogin.classList.replace("flex", "hidden");
				login.classList.replace("hidden", "flex");
				divider.classList.add("hidden");
				loginWrapper.classList.remove("max-h-60");
			})

		},
		forms: function () {
		
			console.log("Forms are running");

			/// LOGIN FORM START

			const email = document.getElementById("email");
			const password = document.getElementById("password");
			const form = document.getElementById("login__form");

			form.addEventListener("submit", (event) => {
				event.preventDefault();
				validateInputs();
			});

			function validateInputs() {
				const emailValue = email.value;
				const passwordValue = password.value;
			}

			/// BROWSE FILES STYLING

			const fileInput = document.getElementById("file__input");

			const uploadAnd = document.getElementById("upload__and");

			const uploadBttn = document.getElementById("upload__button");

			browseBttn.addEventListener("click", () => {
				uploadBttn.classList.replace("hidden", "inline-block");
				uploadBttn.classList.remove("w-fixedBttn");
				uploadAnd.classList.remove("hidden");
			});

			/// BROWSE FILES & TRACK PROGRESS UPLOAD MECHANICS

			const uploadForm = document.getElementById("upload__form");

			const statusMessage = document.getElementById("status__message")

			uploadForm.addEventListener("submit", handleSubmit);

			function handleSubmit(event) {
				event.preventDefault();
				uploadFiles();
			}

			function uploadFiles() {
				const url = "https://httpbin.org/post"; // VYMENIT TESTOVACI URL ZA SKUTECNOU ADRESU
				const method = 'post';

				const xhr = new XMLHttpRequest();

				const data = new FormData(form);

				xhr.open(method, url);
				xhr.send(data);
			};

			


		},
		responsive: function () {
			// Add your responsive functions here
			console.log("Responsive functions are running");

			//window.addEventListener(  ------ DEBOUNCE HAZE ERROR, ZAKOMENTOVANO
			//	"resize",
			//	debounce(() => {
			//		Engine.ui.recalculateGrid();
			//	}, 1000)
			//);
		},
		//recalculateGrid: debounce(function () { ---- DEBOUNCE HAZE ERROR, ZAKOMENTOVANO
		//	// Add your grid functions here
		//	console.log("Grid functions are running");
		//}, 100),
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
