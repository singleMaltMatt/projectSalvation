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
import { sceneResidential } from "./sceneResidential.js";
import { sceneHouseFlag } from "./sceneHouseFlag.js";
import { sceneHouseLarge } from "./sceneHouseLarge.js";
import { sceneHouseOvergrown } from "./sceneHouseOvergrown.js";
import { sceneHouseRundown } from "./sceneHouseRundown.js";
import { sceneHouseWhite } from "./sceneHouseWhite.js";
// TYPING
// import { isUserInterrupted } from "./index.js"
// import { interruptionIndex } from "./index.js"
// import { btnRecentlyClicked } from "./index.js"
// import { isTyping } from "./index.js"
// import { currentSceneTitle } from "./index.js";
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
// GLOBALS
import { FOREST_LEG } from "./index.js";
import { FOREST_LOOK } from "./index.js";

let isUserInterrupted = false;
let interruptionIndex = 0;
let btnRecentlyClicked = false;
let isTyping = false;

export async function sceneOne() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/01-starting-scene.jpg)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  // let headerBtn = document.getElementById("header-button");
  // headerBtn.style.display = "block";
  showHeaderButtons();

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Deep in the Forest");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();
  // create button
  let inspectBtn = document.createElement("button");
  let lookBtn = document.createElement("button");
  let helpBtn = document.createElement("button");

  // set button text
  inspectBtn.textContent = "Inspect leg";
  lookBtn.textContent = "Look at your surroundings";
  helpBtn.textContent = "Find help";

  // add styling for button
  applyGlassStylingGreyBtn(inspectBtn);
  applyGlassStylingGreyBtn(lookBtn);
  applyGlassStylingGreyBtn(helpBtn);

  await typeTextItalic(
    textContainer,
    "<p>Cold... drops on my face... dew? Morning. It's morning.</p>",
    applyGlassStylingGreen
  );

  await sleep(1500);

  await typeText(
    textContainer,
    "<p>You open your eyes and stare up at the sky, you find yourself laying on your back in the forest. You push your hands against the damp earth and lift yourself into a sitting position.</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

  textContainer.innerHTML = "";

  gameContainer.style.backgroundImage = "url(img/04-forest-path.png)";
  gameContainer.style.transition = "background-image 3s ease-in-out";

  await typeTextItalic(
    textContainer,
    "<p>How did I get here? Last thing I remember...</p>",
    applyGlassStylingGreen
  );

  await sleep(1500);

  textContainer.innerHTML = "";

  await typeTextItalic(
    textContainer,
    "<p>Bright lights...</p>",
    applyGlassStylingGreen
  );

  await sleep(1500);

  textContainer.innerHTML = "";

  await typeTextItalic(
    textContainer,
    "<p>Someone... speaking to me...</p>",
    applyGlassStylingGreen
  );

  await sleep(1500);

  textContainer.innerHTML = "";

  await typeText(
    textContainer,
    "<p>As you lift yourself to your feet you cry out as a sharp pain in your right leg causes you to fall over.</p>",
    applyGlassStylingRed
  );

  // append button to user controls container
  userControlsContainer.appendChild(inspectBtn);
  userControlsContainer.appendChild(lookBtn);

  inspectBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    inspectBtn.remove();
    lookBtn.remove();

    // leg once off
    FOREST_LEG = true;

    // write new text
    await typeText(
      textContainer,
      "<p>You examine your leg and notice a dark bruise near your ankle, there is no wound but you appear to have fractured a bone.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>How did this happen? Why can't I remember? I need to have this looked at. Maybe I can find some help nearby.</p>",
      applyGlassStylingGreen
    );

    // append new button
    if (FOREST_LEG == true) {
      userControlsContainer.appendChild(helpBtn);
    }
    if (FOREST_LOOK == false) {
      userControlsContainer.appendChild(lookBtn);
    }
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
    inspectBtn.remove();
    lookBtn.remove();
    helpBtn.remove();

    // once off
    FOREST_LOOK = true;

    // write new text
    await typeText(
      textContainer,
      "<p>You are standing in a dark forest, the morning sun just barely breaking through the thick canopy. It is silent except for a few birds in the distance. You can see what appears to be a disused forest path.</p>",
      applyGlassStylingRed
    );

    // append new button
    if (FOREST_LEG == false) {
      userControlsContainer.appendChild(inspectBtn);
    }
    if (FOREST_LEG == true) {
      userControlsContainer.appendChild(helpBtn);
    }
  });

  helpBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    inspectBtn.remove();
    lookBtn.remove();
    helpBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>With some effort, you manage to get on your feet and begin your slow, painful journey along the forest path...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    sceneTwo();
  });
}
