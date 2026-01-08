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

export async function sceneHouseFlag() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/18-house-with-flag.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = "House with the Flag"; // Add title
  document.getElementById("header-title").textContent = currentSceneTitle;

  // create button
  let exploreBtn = document.createElement("button");
  let leaveBtn = document.createElement("button");
  let upstairsBtn = document.createElement("button");
  let downstairsBtn = document.createElement("button");
  let basementBtn = document.createElement("button");
  let hallBtn = document.createElement("button");
  let leftBtn = document.createElement("button");
  let rightBtn = document.createElement("button");
  let lightBtn = document.createElement("button");
  let goBackBtn = document.createElement("button");
  let leaveRoomBtn = document.createElement("button");
  let radioBtn = document.createElement("button");

  // set button text
  exploreBtn.textContent = "Go through the house";
  leaveBtn.textContent = "Leave house";
  upstairsBtn.textContent = "Go upstairs";
  downstairsBtn.textContent = "Go downstairs";
  basementBtn.textContent = "Go to the basement";
  hallBtn.textContent = "Go the the end of the hall";
  leftBtn.textContent = "Try the door on the left";
  rightBtn.textContent = "Try the door on the right";
  lightBtn.textContent = "Head towards the light";
  goBackBtn.textContent = "Go back upstairs";
  leaveRoomBtn.textContent = "Leave room";
  radioBtn.textContent = "Try to use the CB radio";

  // add styling for button
  applyGlassStylingGreyBtn(exploreBtn);
  applyGlassStylingGreyBtn(leaveBtn);
  applyGlassStylingGreyBtn(upstairsBtn);
  applyGlassStylingGreyBtn(downstairsBtn);
  applyGlassStylingGreyBtn(basementBtn);
  applyGlassStylingGreyBtn(hallBtn);
  applyGlassStylingGreyBtn(leftBtn);
  applyGlassStylingGreyBtn(rightBtn);
  applyGlassStylingGreyBtn(lightBtn);
  applyGlassStylingGreyBtn(goBackBtn);
  applyGlassStylingGreyBtn(leaveRoomBtn);
  applyGlassStylingGreyBtn(radioBtn);

  await typeText(
    textContainer,
    "<p>You step inside the small house. If you didn't know better, you would expect someone to be home, spending the day in the kitchen, or reading a book in the clean comfortable living room, but as you look closer you can see that there is no one home.<br><br>An untouched plate of food sits on the kitchen counter, buzzing with flies. A thin layer of dust covers the counter tops, and a tap is constantly dripping.</p>",
    applyGlassStylingRed
  );

  await sleep(1500); // normal wait time between texts

  // append button to user controls container
  userControlsContainer.appendChild(exploreBtn);
  userControlsContainer.appendChild(leaveBtn);

  exploreBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    exploreBtn.remove();
    leaveBtn.remove();

    await typeText(
      textContainer,
      "<p>As you walk through the house, you see the staircase leading to the upper floor.<br>You are about to ascend the stairs when your eye catches a gleam of light.<br>You look closer and see that it is a brass ring, attached to a small door just off the right of the staircase.<br>It is painted the same color as the wall and is almost imperceptible.<br><br>As you pull on the ring you hear the low creaking as the door swings open on it's hinges, revealing a narrow staircase going down into a basement.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    userControlsContainer.appendChild(upstairsBtn);
    userControlsContainer.appendChild(basementBtn);
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
    upstairsBtn.remove();
    basementBtn.remove();
    leaveBtn.remove();
    goBackBtn.remove();

    // ADD A CONDITIONAL HERE THAT CHECKS IF ALL 3 ROOMS HAVE BEEN VISITED. IF TRUE. LET HIM GO DOWNSTAIRS AGAIN.
    if (
      HOUSE_FLAG_FREQUENCY == true &&
      HOUSE_FLAG_ONE == true &&
      HOUSE_FLAG_TWO == true
    ) {
      await typeText(
        textContainer,
        "<p>There is nothing else to explore upstairs.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(basementBtn);
      userControlsContainer.appendChild(leaveBtn);
    } else {
      await typeText(
        textContainer,
        "<p>At the top of the stairs you reach a narrow hallway. You see an open door at the end of the hallway, and two closed doors on either side of the hallway.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(hallBtn);
      userControlsContainer.appendChild(leftBtn);
      userControlsContainer.appendChild(rightBtn);
      userControlsContainer.appendChild(downstairsBtn);
    }
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
    hallBtn.remove();
    leftBtn.remove();
    rightBtn.remove();
    downstairsBtn.remove();

    if (HOUSE_FLAG_FREQUENCY == true) {
      await typeTextItalic(
        textContainer,
        "<p>There is nothing else in the room. I should check the rest of the house.</p>",
        applyGlassStylingGreen
      );

      userControlsContainer.appendChild(leftBtn);
      userControlsContainer.appendChild(rightBtn);
      userControlsContainer.appendChild(downstairsBtn);
    } else {
      await typeText(
        textContainer,
        "<p>You push through the open door leading into the main bedroom of the house.<br> The bed is neatly made, and nothing seems out of place.</p>",
        applyGlassStylingRed
      );

      userControlsContainer.appendChild(leaveRoomBtn);
    }
  });

  leaveRoomBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    leaveRoomBtn.remove();

    if (HOUSE_FLAG_FREQUENCY == false) {
      await typeText(
        textContainer,
        "<p>Just as you turn to leave, you notice something on the side table next to the bed.<br>An open notepad and pen, with a hastily scribbled note lay on the table.</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>The note reads:</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>I found the frequency! but it's no use now. Wasted too much time. 127.16 Mhz. I tried to...</p>",
        applyGlassStylingRed
      );

      await pause();
      HOUSE_FLAG_FREQUENCY = true;

      await typeText(
        textContainer,
        "<p>The note trails off here.</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>You are standing in the hallway.</p>",
        applyGlassStylingRed
      );

      userControlsContainer.appendChild(hallBtn);
      userControlsContainer.appendChild(leftBtn);
      userControlsContainer.appendChild(rightBtn);
      userControlsContainer.appendChild(downstairsBtn);
    }
  });

  leftBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    hallBtn.remove();
    leftBtn.remove();
    rightBtn.remove();
    downstairsBtn.remove();

    if (HOUSE_FLAG_ONE == true) {
      await typeTextItalic(
        textContainer,
        "<p>There is nothing here for me.</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      userControlsContainer.appendChild(hallBtn);
      userControlsContainer.appendChild(rightBtn);
      userControlsContainer.appendChild(downstairsBtn);
    }

    if (HOUSE_FLAG_ONE == false) {
      await typeText(
        textContainer,
        "<p>This room appears to the a child's bedroom. After looking around for a minute, you don't see anything of importance in here.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);
      HOUSE_FLAG_ONE = true;

      userControlsContainer.appendChild(hallBtn);
      userControlsContainer.appendChild(rightBtn);
      userControlsContainer.appendChild(downstairsBtn);
    }
  });

  rightBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    hallBtn.remove();
    leftBtn.remove();
    rightBtn.remove();
    downstairsBtn.remove();

    if (HOUSE_FLAG_TWO == true) {
      await typeTextItalic(
        textContainer,
        "<p>I don't need to use the toilet right now.</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      userControlsContainer.appendChild(hallBtn);
      userControlsContainer.appendChild(rightBtn);
      userControlsContainer.appendChild(downstairsBtn);
    }

    if (HOUSE_FLAG_TWO == false) {
      await typeText(
        textContainer,
        "<p>You step inside a tiny white tiled room that you ascertain to be a bathroom.<br>You try to turn on the light but it seems like the light bulb is broken.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);
      HOUSE_FLAG_TWO = true;

      userControlsContainer.appendChild(hallBtn);
      userControlsContainer.appendChild(leftBtn);
      userControlsContainer.appendChild(downstairsBtn);
    }
  });

  downstairsBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    downstairsBtn.remove();
    hallBtn.remove();
    leftBtn.remove();
    rightBtn.remove();
    goBackBtn.remove();

    await typeText(
      textContainer,
      "<p>You descend the staircase.</p>",
      applyGlassStylingRed
    );

    userControlsContainer.appendChild(upstairsBtn);
    userControlsContainer.appendChild(basementBtn);
    userControlsContainer.appendChild(leaveBtn);
  });

  basementBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    leaveBtn.remove();
    upstairsBtn.remove();
    basementBtn.remove();
    goBackBtn.remove();

    // REMEMBER TO ADD CONDITIONAL THAT BASEMENT WAS CHECKED!!!!!!!!!

    await typeText(
      textContainer,
      "<p>The room at the bottom of the staircase is pitch black. You can't make out anything in the room, but then you notice a single dim point of orange light in the distance.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    userControlsContainer.appendChild(lightBtn);
    userControlsContainer.appendChild(goBackBtn);
  });

  lightBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    lightBtn.remove();
    goBackBtn.remove();

    await typeText(
      textContainer,
      "<p>You slowly walk through the darkness towards the dim point of light, when suddenly something touches your face.<br><br>You swing your hands out and grab on to something and instinctually pull at it, and a lightbulb above you clicks to life.<br><br>You are startled by the sudden bright light illuminating the room, but as your eyes adjust, you see that you are in a workshop of sorts.<br><br>A few tools and spare parts lay around a workbench, with some mounted on the wall.<br>You see that the orange light you saw is coming from the microphone of a CB radio.</p>",
      applyGlassStylingRed
    );

    userControlsContainer.appendChild(radioBtn);
  });

  radioBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    radioBtn.remove();

    if (HOUSE_FLAG_FREQUENCY == true) {
      await typeTextItalic(
        textContainer,
        "<p>I could try finding the frequency on the note I found...</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>You turn the dial through the soft static until the needle reaches 127.16 Mhz...<br>and suddenly the silence is broken by a blaring sound, like a siren.<br><br>You listen to the continuous beeping for a few seconds when a garbled voice starts to speak:</p>",
        applyGlassStylingRed
      );

      await pause();

      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>'We are the last remaining citizens of Neo-Norway...<br><br>We are in an improvised bunker...<br><br>We are resisting the destruction of humanity...<br><br>Our coordinates are 59.1269 degrees North, 11.4036 degrees East...<br><br>Join us if you are able...<br><br>We are the last hope...'</p>",
        applyGlassStylingRed
      );

      await pause();
      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>You grab the microphone and speak into it:</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      await typeTextItalic(
        textContainer,
        "<p>Hello? Can you hear me? Hello!?</p>",
        applyGlassStylingGreen
      );

      await sleep(3500);
      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>...but the siren sound blares again, until a few moments later the message starts repeating.<br><br>This is a broadcast. Who knows how long it has been repeating.</p>",
        applyGlassStylingRed
      );

      await pause();
      textContainer.innerHTML = "";

      if (CHURCH_STORY == true) {
        await typeTextItalic(
          "<p>This must be the resistance Father Jakob Spoke about...<br>These coordinates are worth investigating...</p>",
          applyGlassStylingGreen
        );

        userControlsContainer.appendChild(goBackBtn);
      } else {
        await typeText(
          textContainer,
          "<p>Destruction of humanity?<br>What is going on??<br>Someone must know something about this?<br>Maybe these coordinates are worth investigating...</p>",
          applyGlassStylingGreen
        );

        HOUSE_FLAG_COORDINATES = true;

        userControlsContainer.appendChild(goBackBtn);
      }
    } else {
      await typeText(
        textContainer,
        "<p>You turn the dial on the radio between frequencies, but you hear only soft static.<br>You push the button on the microphone and say </p>",
        applyGlassStylingRed
      );

      await typeTextItalic(
        textContainer,
        "<p>Hello?</p>",
        applyGlassStylingGreen
      );

      await sleep(2500);

      await typeText(
        textContainer,
        "<p>... ... No Response.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(goBackBtn);
    }
  });

  goBackBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    lightBtn.remove();
    goBackBtn.remove();

    await typeText(
      textContainer,
      "<p>You walk back up the stairs and return to the ground floor.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    userControlsContainer.appendChild(upstairsBtn);
    userControlsContainer.appendChild(basementBtn);
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
    exploreBtn.remove();
    leaveBtn.remove();
    upstairsBtn.remove();
    downstairsBtn.remove();
    basementBtn.remove();
    hallBtn.remove();
    leftBtn.remove();
    rightBtn.remove();
    lightBtn.remove();
    goBackBtn.remove();
    leaveRoomBtn.remove();
    radioBtn.remove();

    sceneResidential();
  });
}
