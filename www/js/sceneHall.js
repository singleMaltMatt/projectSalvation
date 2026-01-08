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

//| SCENE TOWN HALL
export async function sceneHall() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/000town-hall.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Town Hall");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button"); // create buttons for scene
  let oldKeyBtn = document.createElement("button");
  let enterHallBtn = document.createElement("button");
  let upstairsBtn = document.createElement("button");
  let openDoorBtn = document.createElement("button");
  let tryMayorKeyBtn = document.createElement("button");
  let returnToTownBtn = document.createElement("button");
  let investigateCratesBtn = document.createElement("button"); //[1]
  let investigateMayorDeskBtn = document.createElement("button"); //[2]
  let attemptBtn = document.createElement("button");
  let leaveBtn = document.createElement("button");

  // set button text
  townSquareBtn.textContent = "Go to town square";
  oldKeyBtn.textContent = "Use old fashioned key on the lock";
  enterHallBtn.textContent = "Enter the Town Hall";
  upstairsBtn.textContent = "Go up the stairs";
  openDoorBtn.textContent = "Open the door";
  tryMayorKeyBtn.textContent = "Try the key found in the Mayor's safe";
  returnToTownBtn.textContent = "Return to the Town Square";
  investigateCratesBtn.textContent = "Investigate the crates";
  investigateMayorDeskBtn.textContent = "Investigate the Mayor's desk";
  attemptBtn.textContent = "Attempt to open one of the crates";
  leaveBtn.textContent = "Leave before someone discovers you";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(oldKeyBtn);
  applyGlassStylingGreyBtn(enterHallBtn);
  applyGlassStylingGreyBtn(upstairsBtn);
  applyGlassStylingGreyBtn(openDoorBtn);
  applyGlassStylingGreyBtn(tryMayorKeyBtn);
  applyGlassStylingGreyBtn(returnToTownBtn);
  applyGlassStylingGreyBtn(investigateCratesBtn);
  applyGlassStylingGreyBtn(investigateMayorDeskBtn);
  applyGlassStylingGreyBtn(attemptBtn);
  applyGlassStylingGreyBtn(leaveBtn);

  // local conditionals
  //   let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>The doors to the town hall are chained shut. There is a notice nailed to the door <br><br>'Closed until further notice' <br><br>There is a big old fashioned lock keeping the chains together.</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

  // append button to user controls container
  if (HALL_KEY == true) {
    userControlsContainer.appendChild(oldKeyBtn);
  }
  if (HALL_KEY == false) {
    userControlsContainer.appendChild(townSquareBtn);
  }

  oldKeyBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    oldKeyBtn.remove(); // remove relevant buttons
    townSquareBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You insert the big key into the old lock and turn it.<br>With a satisfying click, the lock pops open, and you remove the chains from the golden door handles.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(enterHallBtn); // append relevant buttons
  });

  enterHallBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    enterHallBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>Stepping into the Town Hall you see a huge open space that is mostly dark. Beams of light coming through the high windows illuminate the rich red color of the wooden furniture in the lobby. There are potted plants here and there that are in need of some water.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You are standing in front of an ornate wooden reception desk. You can see a staircase behind the desk leading up to the first floor of the building, as well as waiting benches in neat rows around the room.<br><br>There are old fashioned wooden doors lining the sides of the ground and first floor, probably the administrative offices of the different government employees.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You notice a plaque on a door to your right which reads 'Police Station'. This strikes you as odd, but then you don't recall seeing a police building in the town. The town hall must deal with most of the issues in town , including police matters, but then where are the police officers?</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>The big double doors on the first floor landing catch your eye, though you cant make out the plaque on the wall next to the door, you are certain that must be the Mayor's Office.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(upstairsBtn); // append relevant buttons
  });

  upstairsBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    upstairsBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>Just as you thought, the brass plaque next to the door reads 'Mayor Dennis Nilsen'. Perhaps you can find some answers about what is happening in this town inside.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(openDoorBtn); // append relevant buttons
  });

  openDoorBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    openDoorBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>The door is locked tight.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    if (LARGE_HOUSE_MAYOR_KEY == true) {
      userControlsContainer.appendChild(tryMayorKeyBtn); // append relevant buttons
    }
    if (LARGE_HOUSE_MAYOR_KEY == false) {
      userControlsContainer.appendChild(returnToTownBtn);
    }
  });

  tryMayorKeyBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    tryMayorKeyBtn.remove(); // remove relevant buttons
    returnToTownBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You slide the key into the lock and the door unlocks easily. You pass through into the mayors office.<br><br>The room is pitch dark, so you feel for a light switch next to the door and flick it on. You hear the fluorescent tube light sputter to life above you, and you are startled by the sight in the office, simultaneously realizing why the office was so dark...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>In the middle of the office is the Mayor's large and shiny solid wood desk, but lining the walls, and stacked on top of each other, covering the windows, are large metal crates, at least 50 of them you guess, varying in length and size.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(investigateCratesBtn); // append relevant buttons
    userControlsContainer.appendChild(investigateMayorDeskBtn);
  });

  investigateMayorDeskBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateMayorDeskBtn.remove(); // remove relevant buttons
    investigateCratesBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>The mayor's desk basically empty, just a calendar and some stationary on the surface. The drawers contain more stationary and some official envelopes and stamps. Nothing else of interest catches your eye.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(investigateCratesBtn); // append relevant buttons
  });

  investigateCratesBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCratesBtn.remove(); // remove relevant buttons
    investigateMayorDeskBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>The crates seem to be made of dark grey, thin but strong metal plate. Each crate seems to have a small display screen and number pad on top, it appears they are electronically locked.<br><br>You notice there are words painted in white on the sides of the crates: 'Caution - Agricultural Fertilizer - Hazardous to humans and animals'.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Why does the mayor have all this fertilizer locked away in his office?</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(attemptBtn); // append relevant buttons
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
    leaveBtn.remove(); // remove relevant buttons
    attemptBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>You decide to leave the Town Hall</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    sceneTownSquare();
  });

  attemptBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    leaveBtn.remove(); // remove relevant buttons
    attemptBtn.remove(); // |This is where the circuit mini game must come. somehow...

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

  returnToTownBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    townSquareBtn.remove(); // remove relevant buttons
    oldKeyBtn.remove();
    enterHallBtn.remove();
    upstairsBtn.remove();
    openDoorBtn.remove();
    tryMayorKeyBtn.remove();
    returnToTown.remove();
    investigateCratesBtn.remove();
    investigateMayorDeskBtn.remove();
    attemptBtn.remove();
    leaveBtn.remove();

    sceneTownSquare();
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
    townSquareBtn.remove(); // remove relevant buttons
    oldKeyBtn.remove();
    enterHallBtn.remove();
    upstairsBtn.remove();
    openDoorBtn.remove();
    tryMayorKeyBtn.remove();
    returnToTown.remove();
    investigateCratesBtn.remove();
    investigateMayorDeskBtn.remove();
    attemptBtn.remove();
    leaveBtn.remove();

    sceneTownSquare();
  });
}
