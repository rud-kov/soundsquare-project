// import _ from "lodash";

//const { method } = require("lodash"); ---- LODASH HAZI ERROR

//import { debounce } from "lodash";

/// GLOBAL VARIABLES USED IN MULTIPLE FUNCTIONS

const html = document.querySelector("html");
const body = document.querySelector("body");

const mainRight = document.getElementById("uploadBar");

const uploadScreen = document.getElementById("uploadBar--progress");

const uploadResultScreen = document.getElementById("uploadBar--result");

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

			//////////////// SLIDING PUZZLE GAME

			const puzzleContainer =
				document.getElementById("puzzle__container");

			let puzzle = [];

			let size = 4;

			generatePuzzle();
			randomizePuzzle();
			renderPuzzle();

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

			function renderPuzzle() {
				puzzleContainer.innerHTML = "";
				for (let puzzleItem of puzzle) {
					if (puzzleItem.disabled) continue;
					puzzleContainer.innerHTML += `
						<img class="w-[2.813rem] h-[2.813rem] border-4 border-solid border-transparent absolute" style="left: ${puzzleItem.x / 16}rem; top: ${puzzleItem.y / 16}rem" src="
							../img/puzzlegame/${puzzleItem.value}.png" />
					`;
				}
			}

			function getEmptyPuzzle() {
				return puzzle.find((item) => item.disabled);
			}

			const puzzlePieces = puzzleContainer.querySelectorAll("img");

			puzzlePieces.forEach((piece) => {
				piece.addEventListener("click", handlePieceClick);
			});

			function handlePieceClick(event) {
				const clickedPiece = event.target;

				const emptyPiece = getEmptyPuzzle();

				const computedStyles = window.getComputedStyle(clickedPiece);
				const clickedY = parseFloat(
					computedStyles.getPropertyValue("top"),
				);
				const clickedX = parseFloat(
					computedStyles.getPropertyValue("left"),
				);

				if (areNeighbors(emptyPiece, { x: clickedX, y: clickedY })) {
					clickedPiece.style.top = `${emptyPiece.y / 16}rem`;
					clickedPiece.style.left = `${emptyPiece.x / 16}rem`;
					emptyPiece.x = clickedX;
					emptyPiece.y = clickedY;
				} else {
					return;
				}
			}

			function areNeighbors(emptyPiece, clickedPiece) {
				const xDiff = Math.abs(emptyPiece.x - clickedPiece.x);
				const yDiff = Math.abs(emptyPiece.y - clickedPiece.y);
				return (
					(xDiff === 45 && yDiff === 0) ||
					(xDiff === 0 && yDiff === 45)
				);
			}
		},
		forms: function () {
			console.log("Forms are running");

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
					}
				});

				dropArea.addEventListener("drop", (event) => {
					event.preventDefault();
					dragEventCounter = 0;
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
				const url = "https://httpbin.org/post"; // SWITCH TO REAL URL ADDRESS
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
						`<li class="py-1 overflow-hidden text-ellipsis font-public">${name}</li>`,
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

			/// ERROR HANDLING

			//const statusContainer =
				//document.getElementById("status__container");

			function updateStatusMessage(message) {
				const status = document.createElement("div");

				status.classList.add(
					"absolute",
					"top-[35%]",
					"left-0",
                    "right-0",
					"z-10",
				);

				switch (message) {
					case "somethingWrong":
						status.innerHTML = `<div
								role="tooltip"
								class="bg-black shadow-sm rounded-lg flex text-center justify-center"
							>
								<span class="whitespace-nowrap px-3 py-2 font-public text-sm font-medium text-white">Something went wrong. Please try again.</span>
							</div>`;
						break;
					case "missingFiles":
						status.innerHTML = `<div
								role="tooltip"
								class="bg-black shadow-sm rounded-lg flex text-center justify-center"
							>
								<span class="whitespace-nowrap px-3 py-2 font-public text-[12px] font-medium text-white">No file selected for upload.</span>
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
