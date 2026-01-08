// IMPORTS
// NORMAL
import { applyGlassStylingGrey } from "./boxes.js";
import { applyGlassStylingRed } from "./boxes.js";
import { applyGlassStylingGreen } from "./boxes.js";
import { applyGlassStylingBlue } from "./boxes.js";
import { applyGlassStylingGreyBtn } from "./boxes.js";
// EFFECTS
import { applyGlassStylingGreyFlicker } from "./boxes.js";
import { applyGlassStylingRedFlicker } from "./boxes.js";
import { applyGlassStylingGreenFlicker } from "./boxes.js";
import { applyGlassStylingBlueFlicker } from "./boxes.js";
import { applyGlassStylingGreyBtnFlicker } from "./boxes.js";
// LOCK
import { DialLock } from "./dial-lock.js";
// SCENES
import { sceneOne } from "./sceneOne.js";
import { sceneTwo } from "./sceneTwo.js";
import { sceneThree } from "./sceneThree.js";
import { sceneCottage } from "./sceneCottage.js";
import { sceneChurch } from "./sceneChurch.js";
import { sceneClinic } from "./sceneClinic.js";
import { sceneHall } from "./sceneHall.js";
import { sceneInn } from "./sceneInn.js";
import { scenePool } from "./scenePool.js";
import { sceneStore } from "./sceneStore.js";
import { sceneResidential } from "./sceneResidential.js";
import { sceneHouseFlag } from "./sceneHouseFlag.js";
import { sceneHouseLarge } from "./sceneHouseLarge.js";
import { sceneHouseOvergrown } from "./sceneHouseOvergrown.js";
import { sceneHouseRundown } from "./sceneHouseRundown.js";
import { sceneHouseWhite } from "./sceneHouseWhite.js";
// TYPING
import { isUserInterrupted } from "./index.js";
import { interruptionIndex } from "./index.js";
import { btnRecentlyClicked } from "./index.js";
import { isTyping } from "./index.js";
import { currentSceneTitle } from "./index.js";
// STYLING
import { typeText } from "./index.js";
import { typeTextItalic } from "./index.js";
import { applyTypingCss } from "./index.js";
import { showHeaderButtons } from "./index.js";
import { getCurrentSceneTitle } from "./index.js";
import { setCurrentSceneTitle } from "./index.js";
import { sleep } from "./index.js";
import { pause } from "./index.js";
import { getGameState } from "./index.js";
import { saveGame } from "./index.js";
import { loadGame } from "./index.js";
import { toggleSaveButton } from "./index.js";
// INVENTORY AND JOURNAL
import { INVENTORY } from "./index.js";
import { JOURNAL } from "./index.js";
import { journalVisible } from "./index.js";
import { journalBtn } from "./index.js";

//|SCENE TOWN SQUARE
export async function sceneTownSquare() {
  toggleSaveButton(true);
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/11-town-square.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Town Square");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let clinicBtn = document.createElement("button");
  let poolBtn = document.createElement("button");
  let innBtn = document.createElement("button");
  let hallBtn = document.createElement("button");
  let residentialBtn = document.createElement("button");
  let storeBtn = document.createElement("button");
  let churchBtn = document.createElement("button");
  let townSquareBtn = document.createElement("button");

  // set button text
  clinicBtn.textContent = "Go to Clinic";
  poolBtn.textContent = "Go to Swimming Pool";
  innBtn.textContent = "Go to Norrsund Inn";
  hallBtn.textContent = "Go to Town Hall";
  residentialBtn.textContent = "Go to Residential Area";
  storeBtn.textContent = "Go to Store";
  churchBtn.textContent = "Go to Church";
  townSquareBtn.textContent = "Go to Town Square";

  // add styling for button
  applyGlassStylingGreyBtn(clinicBtn);
  applyGlassStylingGreyBtn(poolBtn);
  applyGlassStylingGreyBtn(innBtn);
  applyGlassStylingGreyBtn(hallBtn);
  applyGlassStylingGreyBtn(residentialBtn);
  applyGlassStylingGreyBtn(storeBtn);
  applyGlassStylingGreyBtn(churchBtn);
  applyGlassStylingGreyBtn(townSquareBtn);

  await typeText(
    textContainer,
    "<p>You are standing in the town square, you can see roads leading to different areas of town. You see a notice board with a town map on it.</p>",
    applyGlassStylingRed
  );

  await sleep(1500); // normal wait time between texts

  // append button to user controls container
  userControlsContainer.appendChild(clinicBtn);
  userControlsContainer.appendChild(poolBtn); // remember to add pool visited conditional
  userControlsContainer.appendChild(innBtn);
  userControlsContainer.appendChild(hallBtn);
  userControlsContainer.appendChild(residentialBtn);
  userControlsContainer.appendChild(storeBtn);
  userControlsContainer.appendChild(churchBtn);

  clinicBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneClinic();
  });

  poolBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    scenePool();
  });

  innBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneInn();
  });

  hallBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneHall();
  });

  residentialBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneResidential();
  });

  storeBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneStore();
  });

  churchBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneChurch();
  });
}
