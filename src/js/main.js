// import _ from "lodash";

//const { method } = require("lodash"); ---- LODASH HAZI ERROR

//import { debounce } from "lodash";

const html = document.querySelector("html");
const body = document.querySelector("body");

const mainRight = document.getElementById("main__right");

const uploadScreen = document.getElementById("main__right--upload");

const uploadResultScreen = document.getElementById(
	"main__right--upload--result",
);

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

			/// LOGIN ROLLDOWN

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
			});

			/// COPY TEXT TO CLIPBOARD

			const downloadLink = document.getElementById("download__link");

			const tooltipHover = document.getElementById("copylink__tooltip");

			const tooltipSuccess = document.getElementById(
				"copylink__tooltip--success",
			);

			downloadLink.addEventListener("mouseenter", () => {
				tooltipHover.classList.replace("hidden", "flex");
			});

			downloadLink.addEventListener("mouseleave", () => {
				tooltipHover.classList.replace("flex", "hidden");
			});

			downloadLink.addEventListener("click", () => {
				navigator.clipboard.writeText(`${downloadLink.textContent}`);
				tooltipHover.classList.toggle("hidden");
				tooltipSuccess.classList.toggle("hidden");

				setTimeout(() => {
					tooltipSuccess.classList.toggle("hidden");
				}, 700);
			});

			/// DOWNLOAD RESULT SCREEN JUMP BACK TO HOMESCREEN

			const homeScreenLink = document
				.getElementById("homescreen__link")
				.addEventListener("click", () => {
					mainRight.classList.replace("hidden", "flex");
					uploadScreen.classList.replace("flex", "hidden");
					uploadResultScreen.classList.replace("flex", "hidden");
				});
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

			fileInput.addEventListener("click", () => {
				uploadBttn.classList.replace("hidden", "inline-block");
				uploadBttn.classList.remove("w-fixedBttn");
				uploadAnd.classList.remove("hidden");
			});

			/// BROWSE FILES & TRACK PROGRESS UPLOAD MECHANICS

			const uploadForm = document.getElementById("upload__form");

			const progressBar = document.getElementById("progress__bar");

			const progressInPercents =
				document.getElementById("progress__percents");

			const metadataContainer = document.getElementById(
				"metadata__container",
			);

			uploadForm.addEventListener("submit", handleSubmit);

			function handleSubmit(event) {
				event.preventDefault();

				uploadBttn.disabled = true;

				uploadFiles(fileInput.files);

				uploadBttn.disabled = false;
			}

			function uploadFiles(files) {
				const url = "https://httpbin.org/post"; // VYMENIT TESTOVACI URL ZA SKUTECNOU ADRESU
				const method = "post";

				const xhr = new XMLHttpRequest();

				xhr.upload.addEventListener("progress", (event) => {
					updateProgressBar(event.loaded / event.total);
				});

				xhr.addEventListener("loadend", () => {
					if (fileInput.files.length == 0) {
						updateStatusMessage("missingFiles");
					} else if (!(xhr.status === 200)) {
						updateStatusMessage("somethingWrong");
					} else {
						displayUploadResult();
						renderFilesMetadata(fileInput.files);
						console.log(fileInput.files);
					}
				});

				const data = new FormData();

				for (const file of files) {
					data.append("file", file);
					//console.log(file);
				}

				xhr.open(method, url);
				xhr.send(data);
			}

			function displayUploadResult() {
				mainRight.classList.replace("flex", "hidden");
				uploadScreen.classList.replace("hidden", "flex");

				if (progressBar.value === 100) {
					uploadScreen.classList.replace("flex", "hidden");
					uploadResultScreen.classList.replace("hidden", "flex");
				}
			}

			function renderFilesMetadata(fileList) {
				const uploadedFilesData = document.createElement("div");

				for (const file of fileList) {
					const name = file.name;
				}

				uploadedFilesData.insertAdjacentHTML(
					"beforeend",
					`<ul>
							<li>${name}</li>
						</ul>`,
				);

				metadataContainer.appendChild(uploadedFilesData);
			}

			function updateStatusMessage(message) {
				const status = document.createElement("div");

				switch (message) {
					case "somethingWrong":
						status.innerHTML = `<div
								role="tooltip"
								class="rounded-lg bg-black px-3 py-2 font-public text-sm font-medium text-white shadow-sm mdd:top-11 tablet:top-11"
							>
								<span>Something went wrong. Please try again.</span>
							</div>`;
						break;
					case "missingFiles":
						status.innerHTML = `<div
								role="tooltip"
								class="rounded-lg bg-black px-3 py-2 font-public text-sm font-medium text-white shadow-sm mdd:top-11 tablet:top-11"
							>
								<span>No file selected for upload.</span>
							</div>`;
						break;
				}
				uploadForm.appendChild(status);
				setTimeout(() => {
					uploadForm.removeChild(status);
				}, 2000);
			}

			function updateProgressBar(value) {
				const percent = value * 100;
				progressBar.value = Math.round(percent);
				progressInPercents.textContent = `${Math.round(percent)} %`;
			}
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
