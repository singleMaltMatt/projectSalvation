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

export async function sceneHouseRundown() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/13-rundown-house.png)"; // Add BG image
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = "Rundown House"; // Add title
  document.getElementById("header-title").textContent = currentSceneTitle;

  // create button
  let exploreBtn = document.createElement("button");
  let leaveBtn = document.createElement("button");
  let ascendBtn = document.createElement("button");
  let closedDoorBtn = document.createElement("button");
  let hallwayBtn = document.createElement("button");
  let openDoorBtn = document.createElement("button");
  let goBackBtn = document.createElement("button");
  let leaveRoomTwoBtn = document.createElement("button");

  // set button text
  exploreBtn.textContent = "Explore the house";
  leaveBtn.textContent = "Leave house";
  ascendBtn.textContent = "Ascend the stairs";
  closedDoorBtn.textContent = "Open the closed door";
  hallwayBtn.textContent = "Go down the hallway";
  openDoorBtn.textContent = "Enter the open door";
  goBackBtn.textContent = "Go downstairs and leave the house";
  leaveRoomTwoBtn.textContent = "Leave";

  // add styling for button
  applyGlassStylingGreyBtn(exploreBtn);
  applyGlassStylingGreyBtn(leaveBtn);
  applyGlassStylingGreyBtn(ascendBtn);
  applyGlassStylingGreyBtn(closedDoorBtn);
  applyGlassStylingGreyBtn(hallwayBtn);
  applyGlassStylingGreyBtn(openDoorBtn);
  applyGlassStylingGreyBtn(goBackBtn);
  applyGlassStylingGreyBtn(leaveRoomTwoBtn);

  // local conditionals

  if (
    HOUSE_RUNDOWN_ONE_AGAIN == true &&
    HOUSE_RUNDOWN_TWO_AGAIN == true &&
    HOUSE_RUNDOWN_THREE_AGAIN == true &&
    HOUSE_RUNDOWN_FOUR_AGAIN == true
  ) {
    await typeText(
      textContainer,
      "<p>You have already explored this house, there is nothing of interest here.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    userControlsContainer.appendChild(leaveBtn);
  } else if (HOUSE_RUNDOWN_FOUR == true) {
    await typeText(
      textContainer,
      "<p>For reasons unknown, you enter the rundown house again.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);
    // append button to user controls container
    userControlsContainer.appendChild(exploreBtn);
    userControlsContainer.appendChild(leaveBtn);
  } else {
    await typeText(
      textContainer,
      "<p>You try the door of the shabby looking house, and unsurprisingly it is unlocked.<br><br>As you step inside you want to call out to see if someone is home, but stop yourself. It is very evident that no one lives here.<br><br>Dried leaves litter the inside of the small house. They must have blown through the broken windows over time.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append button to user controls container
    userControlsContainer.appendChild(exploreBtn);
    userControlsContainer.appendChild(leaveBtn);
  }

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

    // write new text
    if (HOUSE_RUNDOWN_EXPLORED == false) {
      await typeText(
        textContainer,
        "<p>You walk into the living room, crunching leaves as you step.<br>What little furniture is left has either rotted with damp, or fell victim to insects and rodents.<br><br>You wonder why someone would just abandon their home like this. There is nothing much to look at, but there is a staircase leading to the upper floor.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      HOUSE_RUNDOWN_EXPLORED = true;

      // append new button
      userControlsContainer.appendChild(ascendBtn);
      userControlsContainer.appendChild(leaveBtn);
    } else {
      await typeText(
        textContainer,
        "<p>You are standing in the living room, the state of disarray makes you feel uneasy.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(ascendBtn);
      userControlsContainer.appendChild(leaveBtn);
    }
  });

  ascendBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    ascendBtn.remove();
    leaveBtn.remove();

    // write new text
    if (HOUSE_RUNDOWN_ASCENDED == false) {
      await typeText(
        textContainer,
        "<p>You walk towards the stairs, crunching leaves as you go, when you suddenly step on something soft... You recoil in surprise.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      await typeText(
        textContainer,
        "<p>You look down to see what it is that you stepped on, and make out something furry between the leaves...<br><br>Looking closer you see that it's a dead rat...  as you step over it you notice that the rat isn't skeletal or dry... in fact there is some blood on the floor around it...</p>",
        applyGlassStylingRed
      );

      await pause();
      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>It looks like it was stomped on... and not too long ago either...</p>",
        applyGlassStylingGreen
      );

      await pause();
      textContainer.innerHTML = "";
      // change bg
      gameContainer.style.backgroundImage =
        "url(img/14-rundown-house-upstairs.png)";
      gameContainer.style.transition = "background-image 4s ease-in-out";

      await typeText(
        textContainer,
        "<p>You ignore the rat and step over it onto the stairs.<br><br>They creek heavily...<br><br>As you reach the top of the stairs you actually hear a loud crack as the wood strains under your weight</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      await typeText(
        textContainer,
        "<p>At the top of the stairs is a narrow dark hallway leading to a room at the end, with an open door to the right and a closed door to the left.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      HOUSE_RUNDOWN_ASCENDED = true;
      // append new button
      if (HOUSE_RUNDOWN_ONE_AGAIN == false) {
        userControlsContainer.appendChild(closedDoorBtn);
      }
      if (HOUSE_RUNDOWN_TWO_AGAIN == false) {
        userControlsContainer.appendChild(hallwayBtn);
      }
      if (HOUSE_RUNDOWN_THREE_AGAIN == false) {
        userControlsContainer.appendChild(openDoorBtn);
      }
      userControlsContainer.appendChild(goBackBtn);
    } else {
      await typeText(
        textContainer,
        "<p>You skillfully ascend the staircase, being careful not to step on the floor board you cracked with your previous visit.</p>",
        applyGlassStylingRed
      );

      if (HOUSE_RUNDOWN_ONE_AGAIN == false) {
        userControlsContainer.appendChild(closedDoorBtn);
      }
      if (HOUSE_RUNDOWN_TWO_AGAIN == false) {
        userControlsContainer.appendChild(hallwayBtn);
      }
      if (HOUSE_RUNDOWN_THREE_AGAIN == false) {
        userControlsContainer.appendChild(openDoorBtn);
      }
      userControlsContainer.appendChild(goBackBtn);
    }
  });
  //*********************************************************************************** */
  closedDoorBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // change bg
    gameContainer.style.backgroundImage =
      "url(img/15-rundown-house-closed-door.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // remove button from user controls container
    closedDoorBtn.remove();
    hallwayBtn.remove();
    openDoorBtn.remove();
    goBackBtn.remove();

    // write new text
    if (HOUSE_RUNDOWN_ONE == false) {
      await typeText(
        textContainer,
        "<p>You open the door with a creak, and you are shocked to see that there is a whole wall missing in this room.<br>Instead you are looking at rustling leaves with a light breeze blowing on your face.<br><br>You couldn't see this side of the house from the road, it is clearly more decayed than it looked from the outside.<br><br>Here is nothing else in this room and you decide to leave before the floor also gives way under you.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      HOUSE_RUNDOWN_ONE = true;

      // append new button
      if (HOUSE_RUNDOWN_TWO_AGAIN == false) {
        userControlsContainer.appendChild(hallwayBtn);
      }
      if (HOUSE_RUNDOWN_THREE_AGAIN == false) {
        userControlsContainer.appendChild(openDoorBtn);
      }
      userControlsContainer.appendChild(goBackBtn);
    } else {
      await typeTextItalic(
        textContainer,
        "<p>I should probably not go back in there, the floor might cave in at any moment.</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      HOUSE_RUNDOWN_ONE_AGAIN = true;

      if (HOUSE_RUNDOWN_TWO_AGAIN == false) {
        userControlsContainer.appendChild(hallwayBtn);
      }
      if (HOUSE_RUNDOWN_THREE_AGAIN == false) {
        userControlsContainer.appendChild(openDoorBtn);
      }
      userControlsContainer.appendChild(goBackBtn);
    }
  });

  hallwayBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // change bg
    gameContainer.style.backgroundImage =
      "url(img/16-rundown-house-main-bedroom.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // remove button from user controls container
    closedDoorBtn.remove();
    hallwayBtn.remove();
    openDoorBtn.remove();
    goBackBtn.remove();

    // write new text
    if (HOUSE_RUNDOWN_TWO == false) {
      await typeText(
        textContainer,
        "<p>You walk to the end of the hallway and peer into the room there.<br>This must have been the main bedroom.<br>There is still a very badly worn bed here, with an equally worse for wear desk and bedside table, and a very worn and threadbare rug.<br><br>There is nothing else of interest.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      HOUSE_RUNDOWN_TWO = true;

      userControlsContainer.appendChild(leaveRoomTwoBtn);
    } else {
      await typeTextItalic(
        textContainer,
        "<p>I didn't see anything of value here...</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      HOUSE_RUNDOWN_TWO_AGAIN = true;

      if (HOUSE_RUNDOWN_ONE_AGAIN == false) {
        userControlsContainer.appendChild(closedDoorBtn);
      }
      if (HOUSE_RUNDOWN_TWO_AGAIN == false) {
        userControlsContainer.appendChild(hallwayBtn);
      }
      if (HOUSE_RUNDOWN_THREE_AGAIN == false) {
        userControlsContainer.appendChild(openDoorBtn);
      }
      userControlsContainer.appendChild(goBackBtn);
    }
  });

  leaveRoomTwoBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    leaveRoomTwoBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>As you turn to leave, something strikes you as odd...<br>The drawers of the desk and bedside table are scattered on the floor. It doesn't look out of place in this rundown house, but if this house was still in a good condition, it would surely look like someone ransacked this room, like they were looking for something...<br><br>You can't imagine finding anything valuable in an abandoned house. You leave the room.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    if (HOUSE_RUNDOWN_ONE_AGAIN == false) {
      userControlsContainer.appendChild(closedDoorBtn);
    }
    if (HOUSE_RUNDOWN_TWO_AGAIN == false) {
      userControlsContainer.appendChild(hallwayBtn);
    }
    if (HOUSE_RUNDOWN_THREE_AGAIN == false) {
      userControlsContainer.appendChild(openDoorBtn);
    }
    userControlsContainer.appendChild(goBackBtn);
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

    // change bg
    gameContainer.style.backgroundImage =
      "url(img/17-rundown-house-desk-room.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // remove button from user controls container
    closedDoorBtn.remove();
    hallwayBtn.remove();
    openDoorBtn.remove();
    goBackBtn.remove();

    // write new text
    if (HOUSE_RUNDOWN_THREE == false) {
      await typeText(
        textContainer,
        "<p>You look into the room through the open doorway and see nothing of interest.<br>There is a small desk in the room, its drawers lying on the floor with random papers scattered around.<br><br>You turn around and exit the room.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      HOUSE_RUNDOWN_THREE = true;

      if (HOUSE_RUNDOWN_ONE_AGAIN == false) {
        userControlsContainer.appendChild(closedDoorBtn);
      }
      if (HOUSE_RUNDOWN_TWO_AGAIN == false) {
        userControlsContainer.appendChild(hallwayBtn);
      }
      if (HOUSE_RUNDOWN_THREE_AGAIN == false) {
        userControlsContainer.appendChild(openDoorBtn);
      }
      userControlsContainer.appendChild(goBackBtn);
    } else {
      await typeTextItalic(
        textContainer,
        "<p>There was nothing in there for me.</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      HOUSE_RUNDOWN_THREE_AGAIN = true;

      if (HOUSE_RUNDOWN_ONE_AGAIN == false) {
        userControlsContainer.appendChild(closedDoorBtn);
      }
      if (HOUSE_RUNDOWN_TWO_AGAIN == false) {
        userControlsContainer.appendChild(hallwayBtn);
      }
      if (HOUSE_RUNDOWN_THREE_AGAIN == false) {
        userControlsContainer.appendChild(openDoorBtn);
      }
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
    exploreBtn.remove();
    leaveBtn.remove();
    ascendBtn.remove();
    closedDoorBtn.remove();
    hallwayBtn.remove();
    openDoorBtn.remove();
    goBackBtn.remove();
    leaveRoomTwoBtn.remove();

    HOUSE_RUNDOWN_FOUR = true;
    sceneResidential();
  });

  leaveBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    HOUSE_RUNDOWN_FOUR = true;
    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    exploreBtn.remove();
    leaveBtn.remove();
    ascendBtn.remove();
    closedDoorBtn.remove();
    hallwayBtn.remove();
    openDoorBtn.remove();
    goBackBtn.remove();
    leaveRoomTwoBtn.remove();

    sceneResidential();
  });
  // more here
}
