// import _ from "lodash";

//const { method } = require("lodash"); ---- LODASH HAZI ERROR

//import { debounce } from "lodash";

/// GLOBAL VARIABLES USED IN MULTIPLE FUNCTIONS

const html = document.querySelector("html");
const body = document.querySelector("body");

const mainRight = document.getElementById("main__right");

const uploadScreen = document.getElementById("main__right--upload");

const uploadResultScreen = document.getElementById(
	"main__right--upload--result",
);

const metadataContainer = document.getElementById("metadata__container");

const login = document.getElementById("login");

const prelogin = document.getElementById("prelogin");

const Engine = {
	ui: {
		init: function () {
			// list of all functions to run on init
			Engine.ui.events();
			Engine.ui.forms();
			Engine.ui.responsive();
		},
		events: function () {
			console.log("Events are running");

			/// LOGIN ROLLDOWN

			const signBttn = document.getElementById("signBttn");

			const prelogin = document.getElementById("prelogin");

			const divider = document.getElementById("divider");

			const loginWrapper = document.getElementById("login__wrapper");

			signBttn.addEventListener("click", () => {
				prelogin.classList.replace("flex", "hidden");
				login.classList.replace("hidden", "flex");
				divider.classList.add("hidden");
				loginWrapper.classList.remove("max-h-60");
			});

			/// SLIDING PUZZLE GAME

			const puzzleContainer =
				document.getElementById("puzzle__container");

			let puzzle = [];

			let size = 4;

			generatePuzzle();
			randomizePuzzle();
			renderPuzzle();
			handleInput();

			function getRow(pos) {
				return Math.ceil(pos / size);
			}
			function getCol(pos) {
				const col = pos % size;
				if (col === 0) {
					return size;
				}
				return col;
			}

			function generatePuzzle() {
				for (let i = 1; i <= size * size; i++) {
					puzzle.push({
						value: i,
						position: i,
						x: (getCol(i) - 1) * 45,
						y: (getRow(i) - 1) * 45,
						disabled: false,
					});
				}
			}

			function renderPuzzle() {
				puzzleContainer.innerHTML = "";
				for (let puzzleItem of puzzle) {
					if (puzzleItem.disabled) continue;
					puzzleContainer.innerHTML += `
						<div class="flex justify-center align-center w-[2.813rem] h-[2.813rem] border-4 border-solid bg-blue  border-transparent absolute" style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px">
								<div class="w-10 h-10 bg-[url('../img/puzzlegame/${puzzleItem.value}.png')]"></div>
									
						</div>
					`;
				}
			} //<img class="h-full w-full" src="./img/dolby.png" />;

			function randomizePuzzle() {
				const randomValues = getRandomValues();
				let i = 0;

				for (let puzzleItem of puzzle) {
					puzzleItem.value = randomValues[i];
					i++;
				}

				const blankPuzzle = puzzle.find(
					(item) => item.value === size * size,
				);
				blankPuzzle.disabled = true;
			}

			function getRandomValues() {
				const values = [];
				for (let i = 1; i <= size * size; i++) {
					values.push(i);
				}

				const randomValues = values.sort(() => Math.random() - 0.5);
				return randomValues;
			}

			function handleInput() {
				document.addEventListener("keydown", handleKeyDown);
			}

			function handleKeyDown(e) {
				switch (e.key) {
					case "ArrowLeft":
						moveLeft();
						break;
					case "ArrowRight":
						moveRight();
						break;
					case "ArrowDown":
						moveDown();
						break;
					case "ArrowUp":
						moveUp();
						break;
				}
				renderPuzzle();
			}

			function moveLeft() {
				const emptyPuzzle = getEmptyPuzzle();
				const rightPuzzle = getRightPuzzle();

				if (rightPuzzle) {
					swapPositions(emptyPuzzle, rightPuzzle, true);
				}
			}

			function moveRight() {
				const emptyPuzzle = getEmptyPuzzle();
				const leftPuzzle = getLeftPuzzle();

				if (leftPuzzle) {
					swapPositions(emptyPuzzle, leftPuzzle, true);
				}
			}

			function moveUp() {
				const emptyPuzzle = getEmptyPuzzle();
				const belowPuzzle = getBelowPuzzle();

				if (belowPuzzle) {
					swapPositions(emptyPuzzle, belowPuzzle, false);
				}
			}

			function moveDown() {
				const emptyPuzzle = getEmptyPuzzle();
				const abovePuzzle = getAbovePuzzle();

				if (abovePuzzle) {
					swapPositions(emptyPuzzle, abovePuzzle, false);
				}
			}

			function swapPositions(firstPuzzle, secondPuzzle, isX = false) {
				let temp = firstPuzzle.position;
				firstPuzzle.position = secondPuzzle.position;
				secondPuzzle.position = temp;

				if (isX) {
					temp = firstPuzzle.x;
					firstPuzzle.x = secondPuzzle.x;
					secondPuzzle.x = temp;
				} else {
					temp = firstPuzzle.y;
					firstPuzzle.y = secondPuzzle.y;
					secondPuzzle.y = temp;
				}
			}

			function getRightPuzzle() {
				const emptyPuzzle = getEmptyPuzzle();

				const isRightEdge = getCol(emptyPuzzle.position) === size;

				if (isRightEdge) {
					return null;
				}

				const puzzle = getPuzzleByPos(emptyPuzzle.position + 1);
				return puzzle;
			}


			function getLeftPuzzle() {
				const emptyPuzzle = getEmptyPuzzle();

				const isLeftEdge = getCol(emptyPuzzle.position) === 1;

				if (isLeftEdge) {
					return null;
				}

				const puzzle = getPuzzleByPos(emptyPuzzle.position - 1);
				return puzzle;
			}


			function getAbovePuzzle() {
				const emptyPuzzle = getEmptyPuzzle();

				const isTopEdge = getRow(emptyPuzzle.position) === 1;

				if (isTopEdge) {
					return null;
				}

				const puzzle = getPuzzleByPos(emptyPuzzle.position - size);
				return puzzle;
			}

			function getBelowPuzzle() {
				const emptyPuzzle = getEmptyPuzzle();

				const isBottomEdge = getRow(emptyPuzzle.position) === size;

				if (isBottomEdge) {
					return null;
				}

				const puzzle = getPuzzleByPos(emptyPuzzle.position + size);
				return puzzle;
			}

			function getEmptyPuzzle() {
				return puzzle.find((item) => item.disabled);
			}

			function getPuzzleByPos(pos) {
				return puzzle.find((item) => item.position === pos);
			}

			/// COPY UPLOADED LINK TEXT TO CLIPBOARD

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
					uploadResultScreen.classList.replace("flex", "hidden");
					mainRight.classList.replace("hidden", "flex");
					metadataContainer.removeChild(metadataContainer.lastChild);
				});
		},
		forms: function () {
			console.log("Forms are running");

			/// LOGIN FORM

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

			/////////////// BROWSE AND UPLOAD FILES /////////////////////////////

			const fileInput = document.getElementById("file__input");

			const uploadForm = document.getElementById("upload__form");

			const uploadAnd = document.getElementById("upload__and");

			const uploadBttn = document.getElementById("upload__button");

			const filesContainer = document.getElementById("files__container");

			const progressBar = document.getElementById("progress__bar");

			const progressInPercents =
				document.getElementById("progress__percents");

			const dropArea = document.getElementById("dragdrop__area");

			/// ADDING UPLOAD BUTTON ON CLICKING BROWSE FILES

			uploadForm.addEventListener("submit", handleSubmit);

			fileInput.addEventListener("click", () => {
				uploadBttn.classList.replace("hidden", "inline-block");
				uploadBttn.classList.remove("w-fixedBttn");
				uploadAnd.classList.remove("hidden");
				filesContainer.classList.replace("hidden", "flex");
			});

			/// UPLOADING FILES THROUGH DRAG AND DROP

			const dragDropZoneOverlay = document.getElementById(
				"dragdrop__dropzone__overlay",
			);

			dropArea.addEventListener("drop", handleDrop);

			initDropArea();

			function handleDrop(event) {
				const fileList = event.dataTransfer.files;

				uploadFiles(fileList);

				displayUploadResult();

				renderFilesMetadata(fileList);

				fileInput.value = "";
			}

			function initDropArea() {
				let dragEventCounter = 0;

				dropArea.addEventListener("dragenter", (event) => {
					event.preventDefault();

					if (dragEventCounter === 0) {
						dragDropZoneOverlay.classList.replace("hidden", "flex");
						login.classList.replace("flex", "hidden");
						prelogin.classList.replace("hidden", "flex");
					}

					dragEventCounter += 1;
				});

				dropArea.addEventListener("dragover", (event) => {
					event.preventDefault();

					if (dragEventCounter === 0) {
						dragEventCounter = 1;
					}
				});

				dropArea.addEventListener("dragleave", (event) => {
					event.preventDefault();

					dragEventCounter -= 1;

					if (dragEventCounter <= 0) {
						dragEventCounter = 0;
						dragDropZoneOverlay.classList.replace("flex", "hidden");
						mainRight.classList.replace("hidden", "flex");
					}
				});

				dropArea.addEventListener("drop", (event) => {
					event.preventDefault();
					dragEventCounter = 0;
					dragDropZoneOverlay.classList.replace("flex", "hidden");
				});
			}

			/// UPLOADING FILES THROUGH BUTTON

			function handleSubmit(event) {
				event.preventDefault();

				if (fileInput.files.length == 0) {
					updateStatusMessage("missingFiles");
					return;
				}

				uploadBttn.disabled = true;

				uploadFiles(fileInput.files);

				displayUploadResult();

				renderFilesMetadata(fileInput.files);

				uploadBttn.disabled = false;

				fileInput.value = "";

				filesContainer.replaceChildren();
			}

			/// MAIN UPLOADING FUNCTION (XLMHTTP REQUEST)

			function uploadFiles(files) {
				const url = "https://httpbin.org/post"; // TESTING ONLY, SWITCH TO REAL URL ADDRESS
				const method = "post";

				const xhr = new XMLHttpRequest();

				xhr.upload.addEventListener("progress", (event) => {
					updateProgressBar(event.loaded / event.total);
				});

				xhr.upload.addEventListener("load", () => {
					uploadScreen.classList.replace("flex", "hidden");
					uploadResultScreen.classList.replace("hidden", "flex");
					updateProgressBar(0);
				});

				xhr.upload.addEventListener("error", () => {
					uploadScreen.classList.replace("flex", "hidden");
					mainRight.classList.replace("hidden", "flex");
					updateStatusMessage("somethingWrong");
				});

				const data = new FormData();

				for (const file of files) {
					data.append("file", file);
				}

				xhr.open(method, url);
				xhr.send(data);
			}

			/// DISPLAYING PROGRESS AND RESULTS SCREEN

			function displayUploadResult() {
				mainRight.classList.replace("flex", "hidden");
				uploadScreen.classList.replace("hidden", "flex");
			}

			///// DISPLAYING FILES SELECTED FOR UPLOAD

			fileInput.addEventListener("change", renderFilesForUpload);

			function renderFilesForUpload() {
				const files = fileInput.files;

				filesContainer.replaceChildren();

				for (const file of files) {
					const name = file.name;

					filesContainer.insertAdjacentHTML(
						"beforeend",
						`<li class="py-1 overflow-hidden text-ellipsis">${name}</li>`,
					);
				}
			}

			/// RENDERING UPLOADED FILES METADATA

			function renderFilesMetadata(fileList) {
				const uploadedFilesData = document.createElement("ul");

				uploadedFilesData.classList.add(
					"flex-col",
					"overflow-x-hidden",
					"whitespace-nowrap",
					"max-w-[20.813rem]",
					"mdd:max-w-[14.46rem]",
				);

				for (const file of fileList) {
					const name = file.name;
					uploadedFilesData.insertAdjacentHTML(
						"beforeend",
						`<li class="py-1 overflow-hidden text-ellipsis">${name}</li>`,
					);
				}
				metadataContainer.appendChild(uploadedFilesData);
			}

			/// ERROR HANDLING

			function updateStatusMessage(message) {
				const status = document.createElement("div");

				status.classList.add(
					"absolute",
					"bottom-0",
					"left-0",
					"right-0",
				);

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

			/// UPLOAD PROGRESS BAR

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
