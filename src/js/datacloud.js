// import _ from "lodash";

//const { method } = require("lodash"); ---- LODASH HAZI ERROR

//import { debounce } from "lodash";

/// GLOBAL VARIABLES USED IN MULTIPLE FUNCTIONS

const uploadBar = document.getElementById("upload__bar");

const uploadScreen = document.getElementById("upload__bar--progress");

const uploadResultScreen = document.getElementById("upload__bar--result");

const metadataContainer = document.getElementById("metadata__container");

const files = document.querySelectorAll("[data-class='file']");

const inputs = document.querySelectorAll("[data-role='filesbox']");

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

			///////////// MY DRIVE MOBILE MENU SWITCH

			const driveSwitch = document.getElementById("drive__switch");

			const driveMenu = document.getElementById("drive__menu");

			driveSwitch.addEventListener("click", () => {
				driveMenu.classList.replace("mdd:hidden", "mdd:absolute");
			});

			document.body.addEventListener("click", (event) => {
				const clickedElement = event.target;
				if (
					driveMenu.contains(clickedElement) ||
					driveSwitch.contains(clickedElement)
				) {
					return;
				} else {
					driveMenu.classList.replace("mdd:absolute", "mdd:hidden");
				}
			});

			///// SENDING FILES OVERLAY

			const sendSubmenu = document.getElementById("send__submenu");

			const sendFilesBttn = document.querySelectorAll(
				"[data-class='send-bttn']",
			);

			const sendContainer = document.getElementById("send__container");

			sendFilesBttn.forEach((bttn) => {
				bttn.addEventListener("click", showSendContainer);
			});

			function showSendContainer() {
				sendContainer.classList.replace("hidden", "flex");
			}

			function hideSendContainer(event) {
				const clickedElement = event.target;

				if (
					sendContainer.contains(clickedElement) ||
					Array.from(sendFilesBttn).some((bttn) =>
						bttn.contains(clickedElement),
					)
				) {
					return;
				} else {
					sendContainer.classList.replace("flex", "hidden");
				}
			}

			document.body.addEventListener("click", hideSendContainer);

			const sendSubmenuBttn = document.getElementById(
				"send__button--overlay",
			);

			sendSubmenuBttn.addEventListener("click", (event) => {
				event.preventDefault();
				sendSubmenu.classList.replace("hidden", "flex");
			});

			/////// DELETING FILES FOR SENDING THROUGH X BUTTON /////

			const eraseBttn = document.querySelectorAll(
				"[data-class='erase-file']",
			);

			eraseBttn.forEach((bttn) => {
				bttn.addEventListener("click", () => {
					const fileToErase = bttn.closest(
						"[data-class='uploaded-file']",
					);
					fileToErase.classList.replace("flex", "hidden");
				});
			});

			/////// SWITCHING TABS INSIDE SEND SUBMENU /////

			const mailSubmenuSwitch =
				document.getElementById("send__mail__switch");

			const linkSubmenuSwitch = document.getElementById(
				"create__link__switch",
			);

			const sendMailContainer = document.getElementById(
				"sendmail__container",
			);

			const createLinkContainer = document.getElementById(
				"createlink__container",
			);

			mailSubmenuSwitch.addEventListener("click", () => {
				mailSubmenuSwitch.classList.add("font-bold");
				linkSubmenuSwitch.classList.remove("font-bold");
				createLinkContainer.classList.replace("flex", "hidden");
				sendMailContainer.classList.replace("hidden", "flex");
			});

			linkSubmenuSwitch.addEventListener("click", () => {
				linkSubmenuSwitch.classList.add("font-bold");
				mailSubmenuSwitch.classList.remove("font-bold");
				createLinkContainer.classList.replace("hidden", "flex");
				sendMailContainer.classList.replace("flex", "hidden");
			});

			/////// CLOSING SEND SUBMENU VIA CANCEL BUTTON

			const cancelButtons = document.querySelectorAll(
				"[data-role='cancelBttn']",
			);

			cancelButtons.forEach((cancelButton) => {
				cancelButton.addEventListener("click", () => {
					sendSubmenu.classList.replace("flex", "hidden");
				});
			});

			//////// CLOSING OVERLAY MENUS THROUGH X ICON

			const closers = document.querySelectorAll("[data-class='closer']");

			closers.forEach((closer) => {
				closer.addEventListener("click", closeOverlay);

				function closeOverlay() {
					const overlayMenu = closer.closest(
						"[data-class='overlay-container']",
					);
					overlayMenu.classList.replace("flex", "hidden");
				}
			});

			////// CHECK ALL FILES

			const checkAll = document.getElementById("check__all");

			checkAll.addEventListener("change", () => {
				inputs.forEach((input) => {
					if (checkAll.checked) {
						input.checked = true;
					} else {
						input.checked = false;
					}
				});
			});

			///// SWITCHING TABLE / TILE DISPLAY OF FILES

			const filesWrapperTiles = document.getElementById(
				"mainfiles__wrapper--tiles",
			);

			const filesWrapperTable = document.getElementById(
				"mainfiles__wrapper--table",
			);

			const tableSwitch = document.getElementById("table__switch");

			const tileSwitch = document.getElementById("tile__switch");

			function displayTiles() {
				filesWrapperTable.classList.replace("block", "hidden");
				filesWrapperTiles.classList.replace("hidden", "block");
				zoomInTilesBttn.classList.replace("hidden", "flex");
				zoomOutTilesBttn.classList.replace("hidden", "flex");
				zoomInTableBttn.classList.replace("flex", "hidden");
				zoomOutTableBttn.classList.replace("flex", "hidden");
			}

			function displayTable() {
				filesWrapperTable.classList.replace("hidden", "block");
				filesWrapperTiles.classList.replace("block", "hidden");
				zoomInTilesBttn.classList.replace("flex", "hidden");
				zoomOutTilesBttn.classList.replace("flex", "hidden");
				zoomInTableBttn.classList.replace("hidden", "flex");
				zoomOutTableBttn.classList.replace("hidden", "flex");
			}

			tableSwitch.addEventListener("click", displayTable);

			tileSwitch.addEventListener("click", displayTiles);

			///// ZOOM IN ZOOM OUT

			const zoomInTilesBttn = document.getElementById("zoomin--tiles");

			const zoomOutTilesBttn = document.getElementById("zoomout--tiles");

			const zoomInTableBttn = document.getElementById("zoomin--table");

			const zoomOutTableBttn = document.getElementById("zoomout--table");

			const fileDescription = document.querySelectorAll(
				"[data-class='file__description']",
			);

			const fileDescriptionTile = document.querySelectorAll(
				"[data-class='file__description--tile']",
			);

			function zoomInTile() {
				files.forEach((file) => {
					let width = file.clientWidth / 16;
					let height = file.clientHeight / 16;

					file.style.width = width + 3.125 + "rem";
					file.style.height = height + 3.125 + "rem";
				});

				fileDescriptionTile.forEach((dscrptn) => {
					const fontSize =
						parseFloat(window.getComputedStyle(dscrptn).fontSize) /
						16;

					const lineHeight =
						parseFloat(
							window.getComputedStyle(dscrptn).lineHeight,
						) / 16;

					dscrptn.style.fontSize = fontSize + 0.125 + "rem";
					dscrptn.style.lineHeight = lineHeight + 0.125 + "rem";
				});

				inputs.forEach((input) => {
					let width = input.clientWidth / 16;
					let height = input.clientHeight / 16;

					input.style.width = width + 0.313 + "rem";
					input.style.height = height + 0.313 + "rem";
				});
			}

			function zoomOutTile() {
				files.forEach((file) => {
					let width = file.clientWidth / 16;
					let height = file.clientHeight / 16;

					file.style.width = width - 3.125 + "rem";
					file.style.height = width - 3.125 + "rem";
				});

				fileDescriptionTile.forEach((dscrptn) => {
					const fontSize =
						parseFloat(window.getComputedStyle(dscrptn).fontSize) /
						16;

					const lineHeight =
						parseFloat(
							window.getComputedStyle(dscrptn).lineHeight,
						) / 16;

					if (fontSize < 0.875) {
						dscrptn.style.fontSize = 0.75 + "rem";
						dscrptn.style.lineHeight = 0.875 + "rem";
					} else {
						dscrptn.style.fontSize = fontSize - 0.125 + "rem";
						dscrptn.style.lineHeight = lineHeight - 0.125 + "rem";
					}
				});

				inputs.forEach((input) => {
					let width = input.clientWidth / 16;
					let height = input.clientHeight / 16;

					if (width < 0.875 && height < 0.875) {
						input.style.width = 0.875 + "rem";
						input.style.height = 0.875 + "rem";
					} else {
						input.style.width = width - 0.313 + "rem";
						input.style.height = height - 0.313 + "rem";
					}
				});
			}

			function zoomIn() {
				fileDescription.forEach((file) => {
					const fontSize =
						parseFloat(window.getComputedStyle(file).fontSize) / 16;

					const lineHeight =
						parseFloat(window.getComputedStyle(file).lineHeight) /
						16;

					file.style.fontSize = fontSize + 0.125 + "rem";
					file.style.lineHeight = lineHeight + 0.125 + "rem";
				});
			}

			function zoomOut() {
				fileDescription.forEach((file) => {
					const fontSize =
						parseFloat(window.getComputedStyle(file).fontSize) / 16;

					const lineHeight =
						parseFloat(window.getComputedStyle(file).lineHeight) /
						16;

					if (fontSize < 1.125) {
						file.style.fontSize = 1 + "rem";
						file.style.lineHeight = 1.175 + "rem";
					} else {
						file.style.fontSize = fontSize - 0.125 + "rem";
						file.style.lineHeight = lineHeight - 0.125 + "rem";
					}
				});
			}

			zoomInTableBttn.addEventListener("click", zoomIn);

			zoomOutTableBttn.addEventListener("click", zoomOut);

			zoomInTilesBttn.addEventListener("click", zoomInTile);

			zoomOutTilesBttn.addEventListener("click", zoomOutTile);

			//////////////// SIDEBAR

			const hamSwitch = document.getElementById("ham__switch");

			const hamWrapper = document.getElementById("ham__wrapper");

			const hamMenu = document.getElementById("ham__menu");

			hamSwitch.addEventListener("click", () => {
				hamMenu.classList.replace("hidden", "flex");
			});

			////////////// CLOSING SIDEBAR

			function menuSwitchOff(event) {
				const clickedElement = event.target;

				if (hamWrapper.contains(clickedElement)) {
					return;
				} else {
					hamMenu.classList.replace("flex", "hidden");
				}
			}

			document.addEventListener("click", menuSwitchOff);

			//////////// SETTINGS MENU OPEN/CLOSE

			const settingsBttn = document.getElementById("settings__bttn");

			const settingsOverlay =
				document.getElementById("settings__overlay");

			settingsBttn.addEventListener("click", () => {
				settingsOverlay.classList.replace("hidden", "flex");
			});

			function toggleSettingsOverlay(event) {
				const clickedElement = event.target;

				if (
					settingsOverlay.contains(clickedElement) ||
					settingsBttn.contains(clickedElement)
				) {
					return;
				} else {
					settingsOverlay.classList.replace("flex", "hidden");
				}
			}

			document.body.addEventListener("click", toggleSettingsOverlay);

			///// SETTINGS MENU SWITCHING SECTIONS

			const passwordSectionToggle =
				document.getElementById("password__change");

			const userSectionToggle = document.getElementById("user__settings");

			const passwordContainer = document.getElementById(
				"passwordchange__container",
			);

			const userContainer = document.getElementById(
				"usersettings__container",
			);

			passwordSectionToggle.addEventListener("click", () => {
				passwordSectionToggle.classList.replace(
					"font-medium",
					"font-bold",
				);
				userSectionToggle.classList.replace("font-bold", "font-medium");
				passwordContainer.classList.replace("hidden", "flex");
				userContainer.classList.replace("flex", "hidden");
			});

			userSectionToggle.addEventListener("click", () => {
				passwordSectionToggle.classList.replace(
					"font-bold",
					"font-medium",
				);
				userSectionToggle.classList.replace("font-medium", "font-bold");
				passwordContainer.classList.replace("flex", "hidden");
				userContainer.classList.replace("hidden", "flex");
			});

			///////////////// PASSWORD COVER

			const passwordCovers = document.querySelectorAll(
				"[data-role='passcover']",
			);

			const passwords = document.querySelectorAll(
				"[data-role='password']",
			);

			passwordCovers.forEach((passwordCover, index) => {
				passwordCover.addEventListener("click", () => {
					const type =
						passwords[index].getAttribute("type") === "password"
							? "text"
							: "password";
					passwords[index].setAttribute("type", type);
				});
			});

			///////////////// PASSWORD MATCHING CHECK

			const newPassword = document.querySelector(
				"[data-class='new-password']",
			);

			const confirmPassword = document.querySelector(
				"[data-class='confirm-password']",
			);

			const corrects = document.querySelectorAll(
				"[data-class='correct']",
			);

			const incorrects = document.querySelectorAll(
				"[data-class='incorrect']",
			);

			function newPasswordMatch() {
				const isMatch = () => {
					return (
						confirmPassword.value === newPassword.value &&
						(confirmPassword.value !== "" ||
							newPassword.value !== "")
					);
				};

				corrects.forEach((correct) => {
					if (isMatch()) {
						correct.classList.replace("hidden", "flex");
					} else {
						correct.classList.replace("flex", "hidden");
					}
				});

				incorrects.forEach((incorrect) => {
					if (!isMatch()) {
						incorrect.classList.replace("hidden", "flex");
					} else {
						incorrect.classList.replace("flex", "hidden");
					}
				});
			}

			confirmPassword.addEventListener("input", newPasswordMatch);

			newPassword.addEventListener("input", newPasswordMatch);

			//////////////// LIGHT & DARK SWITCH

			const lightSwitch = document.getElementById("light__switch");

			const darkSwitch = document.getElementById("dark__switch");

			darkSwitch.addEventListener("click", () => {
				lightSwitch.classList.remove("font-bold");
				darkSwitch.classList.add("font-bold");
				document.body.classList.remove("light");
				document.body.classList.add("dark");
			});

			lightSwitch.addEventListener("click", () => {
				darkSwitch.classList.remove("font-bold");
				lightSwitch.classList.add("font-bold");
				document.body.classList.remove("dark");
				document.body.classList.add("light");
			});

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

			/// DOWNLOAD RESULT SCREEN JUMP BACK TO HOMESCREEN

			const homeScreenLink = document
				.getElementById("homescreen__link")
				.addEventListener("click", () => {
					uploadResultScreen.classList.replace("flex", "hidden");
					uploadBar.classList.replace("hidden", "flex");
					metadataContainer.removeChild(metadataContainer.lastChild);
				});
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
					uploadBar.classList.replace("hidden", "flex");
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
				uploadBar.classList.replace("flex", "hidden");
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
						`<li class="py-1 overflow-hidden text-ellipsis font-public text-white">${name}</li>`,
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
					"max-w-[11.375rem]",
				);

				for (const file of fileList) {
					const name = file.name;
					uploadedFilesData.insertAdjacentHTML(
						"beforeend",
						`<li class="py-1 overflow-hidden text-ellipsis text-white">${name}</li>`,
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
