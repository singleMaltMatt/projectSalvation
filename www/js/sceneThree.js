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
import { sceneCottage } from "./sceneCottage.js";
import { sceneTownSquare } from "./sceneTownSquare.js";
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

//|SCENE THREE
export async function sceneThree() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/09-town-in-the-distance.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Forest Path to Town");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let lookBtn = document.createElement("button");
  let townSquareBtn = document.createElement("button");
  let marketBtn = document.createElement("button");
  let leftBtn = document.createElement("button");
  let walkBtn = document.createElement("button");

  // set button text
  lookBtn.textContent = "Look around";
  townSquareBtn.textContent = "Go to town square";
  marketBtn.textContent = "Go to market";
  leftBtn.textContent = "Investigate forest path";
  walkBtn.textContent = "Walk further";

  // add styling for button
  applyGlassStylingGreyBtn(lookBtn);
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(marketBtn);
  applyGlassStylingGreyBtn(leftBtn);
  applyGlassStylingGreyBtn(walkBtn);

  await typeTextItalic(
    textContainer,
    "<p>... The picturesque town sits in eerie silence, it appears most of the townsfolk has locked their doors and went... somewhere... The air is filled with a haunting stillness, broken only by the occasional whispering breeze that rustles the leaves...</p>",
    applyGlassStylingRed
  );

  await pause();

  textContainer.innerHTML = "";
  gameContainer.style.backgroundImage = "url(img/town-entrance.jpg)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  await typeTextItalic(
    textContainer,
    "<p>What happened here?</p>",
    applyGlassStylingGreen
  );

  // append button to user controls container
  userControlsContainer.appendChild(lookBtn);

  lookBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    gameContainer.style.backgroundImage = "url(img/11-town-square.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    lookBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>In front of you is the town square, a few food carts can be seen off to the right, the market appears awfully quiet today.<br><br>To your left is another forest path heading towards the hills.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(townSquareBtn);
    userControlsContainer.appendChild(marketBtn);
    userControlsContainer.appendChild(leftBtn);
  });

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
    marketBtn.remove();
    leftBtn.remove();

    // await sleep(1500);

    sceneTownSquare();
  });

  marketBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    marketBtn.remove();
    townSquareBtn.remove();
    leftBtn.remove();

    // market once off
    TOWN_MARKET = true;

    // write new text
    await typeText(
      textContainer,
      "<p>You browse through the tiny market. You see crusty loaves of bread, now fated for pigeon feed. None of the other carts display any items of value.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(townSquareBtn);
    userControlsContainer.appendChild(leftBtn);
  });

  leftBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    //BG
    gameContainer.style.backgroundImage = "url(img/forest-path-tyre-tracks.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    leftBtn.remove();
    marketBtn.remove();
    townSquareBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>This path is much wider than the one you walked on while coming to town. It appears to be a path used by vehicles. You can see some tracks heading towards the hills.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(walkBtn);
    userControlsContainer.appendChild(townSquareBtn);
    if (TOWN_MARKET == false) {
      userControlsContainer.appendChild(marketBtn);
    }
  });

  walkBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    gameContainer.style.backgroundImage = "url(img/forest-path-tyre-tracks.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    walkBtn.remove();
    townSquareBtn.remove();
    marketBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>Bad idea, I might get lost up there... Perhaps I should try to find out where this leads first.</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(townSquareBtn);
    if (TOWN_MARKET == false) {
      userControlsContainer.appendChild(marketBtn);
    }
  });
}