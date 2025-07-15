/*
async function-name
  declare gameContainer with query selector
  style gameContainer with background image
  style gameContainer transition
  declare userControlsContainer with query selector

  declare textContainer with query selector
    apply CSS styling to textContainer
  
  set header title

  create buttons to be used in this scene

  set button text

  style buttons

  await typeText / typeTextItalic(
  textContainer,
  "<p></p>",
  applyRelevantCssStyling
  )

  await sleep function between texts
  (also clear screen after 2+ text paragraphs)

  append buttons
    userControlsContainer.appendChild(buttonName);
  
  add event listener to buttons
  buttonName.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // Clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    buttonName.remove();
    // write new text
    await typeText / typeTextItalic(
    textContainer,
    "<p></p>",
    applyRelevantCssStyling
    );
    // append new button
    userControlsContainer.appendChild(buttonName);
  });

*/

import { applyGlassStylingRed } from "./boxes";

async function sceneName() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/)"; // Add BG image
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = ""; // Add title
  document.getElementById("header-title").textContent = currentSceneTitle;

  // create button
  let buttonNameBtn = document.createElement("button"); // create buttons for scene

  // set button text
  buttonNameBtn.textContent = "BUTTON NAMES HERE";

  // add styling for button
  applyGlassStylingGreyBtn(buttonNameBtn);

  // local conditionals
  let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>NEW TEXT HERE. REMEMBER RELEVANT STYLING (NORMAL OR ITALIC) AND REMEMBER CSS</p>",
    applyGlassStylingRed
  );

  await sleep(1500); // normal wait time between texts

  // append button to user controls container
  userControlsContainer.appendChild(buttonNameBtn); // append relevant buttons

  buttonNameBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    buttonNameBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>NEW TEXT HERE. REMEMBER RELEVANT STYLING (NORMAL OR ITALIC) AND REMEMBER CSS</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(buttonNameBtn); // append relevant buttons
  });
}


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