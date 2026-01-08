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

export async function scenePool() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/000pool.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Swimming Pool");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button");
  let talkBtn = document.createElement("button");
  let whatBtn = document.createElement("button");
  let whereBtn = document.createElement("button");

  // set button text
  townSquareBtn.textContent = "Go to Town Square";
  talkBtn.textContent = "Talk to the girl";
  whatBtn.textContent = "What are you doing here?";
  whereBtn.textContent = "Where are your parents?";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(talkBtn);
  applyGlassStylingGreyBtn(whatBtn);
  applyGlassStylingGreyBtn(whereBtn);

  // local conditionals

  if (SWIMMING_POOL_GIRL == true) {
    await typeText(
      textContainer,
      "<p>The area around the swimming pool is empty, there is nothing else to see here.</p>",
      applyGlassStylingRed
    );
  } else {
    await typeText(
      textContainer,
      "<p>Before you lies a meticulously maintained swimming pool, enclosed by a white fence. The gate, creaking on its rusty hinges, stands ajar. Adjacent to the pool, a solitary little girl, her grip tender on a time-worn stuffed toy bear, amuses herself by playfully kicking a ball against the inn's weathered wall.</p>",
      applyGlassStylingRed
    );
  }

  await sleep(1500);

  // append button to user controls container
  if (SWIMMING_POOL_GIRL == true) {
    userControlsContainer.appendChild(townSquareBtn);
  } else {
    userControlsContainer.appendChild(talkBtn);
    userControlsContainer.appendChild(townSquareBtn);
  }

  townSquareBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    SWIMMING_POOL_GIRL = true;
    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    townSquareBtn.remove();
    talkBtn.remove();
    whatBtn.remove();

    sceneTownSquare();
  });

  talkBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    talkBtn.remove();
    townSquareBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>Hello. What's you name?</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Without turning to face you, little girl responds...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Hello mister, my name is Nora...</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Nora continues to kick her ball against the wall.</p>",
      applyGlassStylingRed
    );

    // append new button
    userControlsContainer.appendChild(whatBtn);
    userControlsContainer.appendChild(townSquareBtn);
  });

  whatBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    whatBtn.remove();
    townSquareBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>May I ask what you are doing here all by yourself?</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Still not acknowledging you, Nora responds...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>I'm visiting Auntie Ingrid. She owns the Inn. She's busy now and can't come out to play with me...</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(whereBtn);
  });

  whereBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Change background image
    gameContainer.style.backgroundImage = "url(img/12-little-girl.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    whereBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>Nora kicks the ball, it thuds against the wall and bounces back past her legs.<br><br>She turns to face you, a sullen expression has gripped her face...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Mommy and Daddy left. They said I should stay with Grandma Astrid and Grandpa Filip for a while.<br><br>Grandma Astrid also left. Grandpa Filip went to sleep and I got bored...<br><br>I came to ask Auntie Ingrid if she would play with me... </p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";
    gameContainer.style.backgroundImage = "url(img/000pool.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    await typeText(
      textContainer,
      "<p>Before you could respond, Nora picked up her ball and ran through the gate. You could see tears welling up in her eyes.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    if (COTTAGE_DEAD_BODY == true) {
      textContainer.innerHTML = "";
      await typeTextItalic(
        textContainer,
        "<p>I wonder if she knows about her grandfather?<br><br>I should speak to her aunt, Ingrid.</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      userControlsContainer.append(townSquareBtn);
    } else {
      userControlsContainer.appendChild(townSquareBtn);
    }
  });
}
