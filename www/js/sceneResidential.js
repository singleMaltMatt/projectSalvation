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
import { sceneTownSquare } from "./sceneTownSquare.js";
import { sceneChurch } from "./sceneChurch.js";
import { sceneClinic } from "./sceneClinic.js";
import { sceneHall } from "./sceneHall.js";
import { sceneInn } from "./sceneInn.js";
import { scenePool } from "./scenePool.js";
import { sceneStore } from "./sceneStore.js";
import { sceneHouseFlag } from "./sceneHouseFlag.js";
import { sceneHouseLarge } from "./sceneHouseLarge.js";
import { sceneHouseOvergrown } from "./sceneHouseOvergrown.js";
import { sceneHouseRundown } from "./sceneHouseRundown.js";
import { sceneHouseWhite } from "./sceneHouseWhite.js";
// TYPING
import { isUserInterrupted } from "./index.js"
import { interruptionIndex } from "./index.js"
import { btnRecentlyClicked } from "./index.js"
import { isTyping } from "./index.js"
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
import  { INVENTORY } from "./index.js"
import  { JOURNAL } from "./index.js"
import  { journalVisible } from "./index.js"
import  { journalBtn } from "./index.js"

//| SCENE RESIDENTAIL AREA
export async function sceneResidential() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/000residential-area.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Residential Area");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button");
  let lookBtn = document.createElement("button");
  let rundownHouseBtn = document.createElement("button");
  let flagHouseBtn = document.createElement("button");
  let largeHouseBtn = document.createElement("button");
  let overgrownHouseBtn = document.createElement("button");
  let whiteHouseBtn = document.createElement("button");

  // set button text
  townSquareBtn.textContent = "Go to town square";
  lookBtn.textContent = "Look at houses";
  rundownHouseBtn.textContent = "Enter the rundown house";
  flagHouseBtn.textContent = "Enter the house with the flag";
  largeHouseBtn.textContent = "Enter the large house";
  overgrownHouseBtn.textContent = "Enter the overgrown house";
  whiteHouseBtn.textContent = "Enter the white house";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(lookBtn);
  applyGlassStylingGreyBtn(rundownHouseBtn);
  applyGlassStylingGreyBtn(flagHouseBtn);
  applyGlassStylingGreyBtn(largeHouseBtn);
  applyGlassStylingGreyBtn(overgrownHouseBtn);
  applyGlassStylingGreyBtn(whiteHouseBtn);

  // local conditionals
  //   let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>You enter the residential area, a grassy park with a very large Wych Elm tree is growing at the center.<br>A few wooden benches have been placed underneath the tree.<br>As you look around you can see various houses, each radiating with its own personality.</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

  // append button to user controls container
  userControlsContainer.appendChild(lookBtn);
  userControlsContainer.appendChild(townSquareBtn);

  townSquareBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    townSquareBtn.remove();
    lookBtn.remove();

    sceneTownSquare();
  });

  lookBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    lookBtn.remove();
    townSquareBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You see a rundown and dilapitated house.<br><br>You see a neat house with a large flag outside.<br><br>You see a large house with a manicured garden.<br><br>You see a house overgrown with plants.<br><br>You see a bright white house.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(rundownHouseBtn);
    userControlsContainer.appendChild(flagHouseBtn);
    userControlsContainer.appendChild(largeHouseBtn);
    userControlsContainer.appendChild(overgrownHouseBtn);
    userControlsContainer.appendChild(whiteHouseBtn);
    userControlsContainer.appendChild(townSquareBtn);
  });
//**************************************************************************************** */
  rundownHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseRundown();
  });

  flagHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseFlag();
  });

  largeHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseLarge();
  });

  overgrownHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseOvergrown();
  });

  whiteHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseWhite();
  });
}