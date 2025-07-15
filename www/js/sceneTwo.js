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

//|SCENE TWO
  export async function sceneTwo() {
    let gameContainer = document.querySelector(".container");
    gameContainer.style.backgroundImage = "url(img/03-fork-in-the-road.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    let userControlsContainer = document.querySelector(
      ".user-controls-container"
    );

    let textContainer = document.querySelector(".text-container");
    applyTypingCss(textContainer);

    // header title
    setCurrentSceneTitle("Fork in the Road");
    document.getElementById("header-title").textContent = getCurrentSceneTitle();

    // create button
    let inspectBtn = document.createElement("button");
    let leftBtn = document.createElement("button");
    let rightBtn = document.createElement("button");
    let townBtn = document.createElement("button");
    let investigateBtn = document.createElement("button");

    // set button text
    inspectBtn.textContent = "Inspect sign post";
    leftBtn.textContent = "Go left";
    rightBtn.textContent = "Go right";
    townBtn.textContent = "Continue to town";
    investigateBtn.textContent = "Investigate cottage";

    // add styling for button
    applyGlassStylingGreyBtn(inspectBtn);
    applyGlassStylingGreyBtn(leftBtn);
    applyGlassStylingGreyBtn(rightBtn);
    applyGlassStylingGreyBtn(townBtn);
    applyGlassStylingGreyBtn(investigateBtn);

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You reach a fork in your path... a dull and faded sign post can be partially seen between the wild foliage.</p>",
      applyGlassStylingRed
    );

    userControlsContainer.appendChild(inspectBtn);
    userControlsContainer.appendChild(leftBtn);
    if (FOREST_RIGHT == false) {
      userControlsContainer.appendChild(rightBtn);
    }

    inspectBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 500);

      // Clear text container
      textContainer.innerHTML = "";

      // remove button from user controls container
      inspectBtn.remove();
      leftBtn.remove();
      rightBtn.remove();

      // write new text
      await typeText(
        textContainer,
        "<p>You brush away the leaves to reveal the signage. <br><br> An arrow poining left 'Gammelstad 1.5km'. <br><br> An arrow pointing right 'Neo-Norway 20km'</p>",
        applyGlassStylingRed
      );

      //append buttons
      userControlsContainer.appendChild(leftBtn);
      if (FOREST_RIGHT == false) {
        userControlsContainer.appendChild(rightBtn);
      }
    });

    leftBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 500);

      // Clear text container
      textContainer.innerHTML = "";
      gameContainer.style.backgroundImage = "url(img/04-forest-path.png)";
      gameContainer.style.transition = "background-image 3s ease-in-out";

      // remove button from user controls container
      inspectBtn.remove();
      leftBtn.remove();
      rightBtn.remove();
      
      // write new text
      await typeText(
        textContainer,
        "<p>You decide on walking to the nearest town. Hopefully a doctor will be able to mend your injured leg...</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>...Nestled amidst rolling hills and surrounded by a lush, dense forest, the small town of Gammelstad once stood as a picture of idyllic serenity. <br> Its charming, neat rows of cottages with colorful shutters and white picket fences exuded a timeless charm that seemed frozen in the past...</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>...Thanks to your cumbersome injury, a trip that would have taken you 20 minutes has turned into an hour, nevertheless; the rooftops of Gammelstad become visible in the distance...</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      await typeText(
        textContainer,
        "<p>You also see a small footpath that diverts from the main path. You see a small cottage peeking out from between the trees.</p>",
        applyGlassStylingRed
      );

      //append buttons
      userControlsContainer.appendChild(investigateBtn);
      userControlsContainer.appendChild(townBtn);
    });

    rightBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);

      FOREST_RIGHT = true;
      // Clear text container
      textContainer.innerHTML = "";
      gameContainer.style.backgroundImage = "url(img/08-path-to-neo-norway.png)";
      gameContainer.style.transition = "background-image 4s ease-in-out";
      
      // remove button from user controls container
      inspectBtn.remove();
      leftBtn.remove();
      rightBtn.remove();

      // write new text
      await typeText(
        textContainer,
        "<p>This is the road to the city of Neo-Norway. Its a wide dirt road that curves through steep hills before joining the main road that leads through the mountain passes. It's a comfortable and peaceful walk.</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>After about 5 minutes of walking you turn a sharp curve, and see a problem up ahead... the road is blocked.</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>As you move closer, you see that the road is not just blocked, but barricaded. Large trees have been piled across the road...</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>This isn't a treefall... these trees have been cut.<br>Some are even scorched... were they set on fire? They might have been blasted...<br><br>Either way there is no way I'm getting through this...<br>I suppose I should rather head to the nearest town from that fork in the road.</p>",
        applyGlassStylingGreen
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>You turn around and head back to the fork in the road where you came from.</p>",
        applyGlassStylingRed
      );

      await pause();

      sceneTwo();
    });

    investigateBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 500);
      // Clear text container
      textContainer.innerHTML = "";
      // remove button from user controls container
      townBtn.remove();
      investigateBtn.remove();
      sceneCottage();
    });

    townBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 500);
      // Clear text container
      textContainer.innerHTML = "";
      // remove button from user controls container
      townBtn.remove();
      investigateBtn.remove();
      sceneThree();
    });
  }