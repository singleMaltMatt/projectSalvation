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
import { sceneResidential } from "./sceneResidential.js";
import { sceneHouseFlag } from "./sceneHouseFlag.js";
import { sceneHouseLarge } from "./sceneHouseLarge.js";
import { sceneHouseOvergrown } from "./sceneHouseOvergrown.js";
import { sceneHouseRundown } from "./sceneHouseRundown.js";
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

export async function sceneHouseWhite() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/111white-house.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = "White House"; // Add title
  document.getElementById("header-title").textContent = currentSceneTitle;

  // create button
  let forceBtn = document.createElement("button");
  let windowBtn = document.createElement("button");
  let leaveBtn = document.createElement("button");
  let leaveAfterWindowBtn = document.createElement("button");
  let walkBtn = document.createElement("button");
  let scareBtn = document.createElement("button");
  let runBtn = document.createElement("button");

  // set button text
  forceBtn.textContent = "Try to force the door open";
  windowBtn.textContent = "Look through the windows";
  leaveBtn.textContent = "Leave";
  leaveAfterWindowBtn.textContent = "Leave";
  walkBtn.textContent = "Walk around the snake";
  scareBtn.textContent = "Try and scare the snake away";
  runBtn.textContent = "Run past the snake!";

  // add styling for button
  applyGlassStylingGreyBtn(forceBtn);
  applyGlassStylingGreyBtn(windowBtn);
  applyGlassStylingGreyBtn(leaveBtn);
  applyGlassStylingGreyBtn(leaveAfterWindowBtn);
  applyGlassStylingGreyBtn(walkBtn);
  applyGlassStylingGreyBtn(scareBtn);
  applyGlassStylingGreyBtn(runBtn);

  await typeText(
    textContainer,
    "<p>The owners of this house decided to paint it a very stark white, but that is the only noticeable feature about it. Their garden seems like it was well maintained until recently.</p>",
    applyGlassStylingRed
  );

  await pause();

  textContainer.innerHTML = "";

  await typeText(
    textContainer,
    "<p>You try to open the door but find it securely locked.</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

  // append button to user controls container
  userControlsContainer.appendChild(forceBtn); // append relevant buttons

  forceBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    forceBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You try shoving against the door but it doesn't budge. It is too sturdy to force open.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(windowBtn);
    userControlsContainer.appendChild(leaveBtn);
  });

  windowBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    windowBtn.remove();
    leaveBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You try to look through the windows but they are all securely closed, with curtains drawn on the inside.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(leaveAfterWindowBtn);
  });

  leaveAfterWindowBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    leaveAfterWindowBtn.remove();

    // write new text
    if (HOUSE_WHITE_SNAKE_BITE == true) {
      await typeText(
        textContainer,
        "<p>You don't see any sign of that nasty snake anymore</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      sceneResidential();

      // append new button
      userControlsContainer.appendChild(windowBtn);
      userControlsContainer.appendChild(leaveBtn);
    } else {
      await typeText(
        textContainer,
        "<p>As you turn around on the path to walk back to the main road, your breath catches in your throat...<br><br>A large snake is looking straight at you, its head reared up from the gravel. you can see a twitching rabbit off to the side of the path, you must have interrupted a fresh kill.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(walkBtn);
      userControlsContainer.appendChild(scareBtn);
    }
  });

  walkBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    walkBtn.remove();
    scareBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You try to give the snake a wide berth but it slithers in front of you, hissing, and starts to come closer, venom dripping from it's fangs.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(runBtn);
  });

  scareBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    walkBtn.remove();
    scareBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You raise your arms high into the air and try lunging at the snake, however it only hisses loudly and tries to rear itself higher...<br><br>It looks both angry and defensive of its meal.<br><br>You see shiny droplets of venom dripping from its exposed fangs.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(runBtn);
  });

  runBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    runBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You stand still for a moment, carefully watching the snake...<br>Then you dash and try to run right past the snake, if it gets any closer you will jump over it.<br><br>But the snake is faster than you expected and you have barely given two steps when you feel a sharp pain in your lower leg.<br><br>You look down to see the snake retract, barely a split second after biting you.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You trip from the sudden fright, and as you land on the grass, you see the snake slither back to it's kill and start to wrap around it, confident that it has dispatched the intruder.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You look down at your leg where the snake bit you, and see two small puncture wounds, but there is barely any pain, swelling or blood.  You count yourself lucky, the snake must not have been venomous. Not to humans anyway.</p>",
      applyGlassStylingRed
    );

    await pause();

    HOUSE_WHITE_SNAKE_BITE = true;

    textContainer.innerHTML = "";

    sceneResidential();
  });

  leaveBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    forceBtn.remove();
    windowBtn.remove();
    leaveBtn.remove();
    walkBtn.remove();
    scareBtn.remove();
    runBtn.remove();

    HOUSE_WHITE_EXPLORED = true;

    sceneResidential();
  });
}
