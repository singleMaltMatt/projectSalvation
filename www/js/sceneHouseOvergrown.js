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

export async function sceneHouseOvergrown() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/111overgrown-house.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = "Overgrown House";
  document.getElementById("header-title").textContent = currentSceneTitle;

  // create button
  let enterBtn = document.createElement("button");
  let forceBtn = document.createElement("button");
  let leaveBtn = document.createElement("button");
  let lookBtn = document.createElement("button");
  let takeToyBtn = document.createElement("button");
  let leaveToyBtn = document.createElement("button");

  // set button text
  enterBtn.textContent = "Enter the overgrown house";
  forceBtn.textContent = "Try to force the door open";
  leaveBtn.textContent = "Leave house";
  lookBtn.textContent = "Look at your surroundings";
  takeToyBtn.textContent = "Take the Cat Toy";
  leaveToyBtn.textContent = "Leave the Cat Toy";

  // add styling for button
  applyGlassStylingGreyBtn(enterBtn);
  applyGlassStylingGreyBtn(forceBtn);
  applyGlassStylingGreyBtn(leaveBtn);
  applyGlassStylingGreyBtn(lookBtn);
  applyGlassStylingGreyBtn(takeToyBtn);
  applyGlassStylingGreyBtn(leaveToyBtn);

  if (HOUSE_OVERGROWN_EXPLORED == true) {
    await typeText(
      textContainer,
      "<p>There is nothing of interest in this house.</p>",
      applyGlassStylingRed
    );

    userControlsContainer.appendChild(leaveBtn);
  } else {
    await typeText(
      textContainer,
      "<p>You walk up to a house completely overgrown with creeping vines.<br><br>The garden is unkept and tall grass obscures almost everything except for the dusty gravel path leading up to the front door of the house.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You notice the paint peeling from the wooden boards covering the walls and front door.<br><br>No one has lived in this house for a long time.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You try to open the front door but realize that it is locked. It doesn't feel very sturdy though...</p>",
      applyGlassStylingRed
    );

    // append button to user controls container
    userControlsContainer.appendChild(forceBtn);
    userControlsContainer.appendChild(leaveBtn);
  }

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
    leaveBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You try pushing at the door but it won't budge. You take a look around to see that no one is looking at you... and bash the door with your shoulder.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    if (HOUSE_OVERGROWN_STERIODS_USED == true) {
      await typeText(
        textContainer,
        "<p>The door holds firm... but you decide to give it another go.<br><br>After checking over your shoulder again that no one is watching you, you take a few steps back and give the door a running bash...</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>You hear a loud crack and nearly trip as you stumble into the dark interior of the house, the door has broken free.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(lookBtn);
    } else {
      await typeText(
        textContainer,
        "<p>You feel a sudden dull ache in your shoulder...<br>Maybe that was a bad idea.<br><br>You must be in worse shape than you thought.<br>The door still doesn't budge.</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>I need to get my strength back...</p>",
        applyGlassStylingGreen
      );

      userControlsContainer.appendChild(leaveBtn);
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
    lookBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>The house is dark and there are sheets or rags covering the windows, with only a few dim rays of sunlight shining through here and there.<br><br>You see  no furniture. It looks like this house was locked up and abandoned.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    if (HOUSE_OVERGROWN_CAT_TOY == true) {
      await typeText(
        textContainer,
        "<p>You see that that the living room floor is covered with brown dried leaves, and you notice that one window is slightly open, but covered with cobwebs.</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>The Rest of the house is empty, with nothing else of interest.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(leaveBtn);
    } else {
      await typeText(
        textContainer,
        "<p>Between the leaves something shiny catches your attention.<br><br>You step closer and see that it is a small fish-shaped doll with a tiny bell attached to it; a cat's toy.</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>This is an odd thing to find in a place like this... I wonder how it got here?<p/>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      userControlsContainer.appendChild(takeToyBtn);
      userControlsContainer.appendChild(leaveToyBtn);
    }
  });

  takeToyBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    HOUSE_OVERGROWN_CAT_TOY = true;

    INVENTORY.push({
      name: "Cat Toy",
      description: "A fish-shaped cat toy you found at the overgrown house.",
    });

    // remove button from user controls container
    takeToyBtn.remove();
    leaveToyBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>You pick up the toy.<br><br>The rest of this house is empty, with nothing else of interest.</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(leaveBtn);
  });

  leaveToyBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    takeToyBtn.remove();
    leaveToyBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>A stray cat could make better use of it...</p>",
      applyGlassStylingGreen
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You decide to leave the cat toy alone.<br><br>The rest of the house is empty, with nothing else of interest</p>",
      applyGlassStylingRed
    );

    // append new button
    userControlsContainer.appendChild(leaveBtn);
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
    enterBtn.remove();
    forceBtn.remove();
    leaveBtn.remove();
    lookBtn.remove();
    takeToyBtn.remove();
    leaveToyBtn.remove();

    HOUSE_OVERGROWN_EXPLORED = true;

    sceneResidential();
  });
}
