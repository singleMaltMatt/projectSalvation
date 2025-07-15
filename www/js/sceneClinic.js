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

export async function sceneClinic() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/clinic.jpg)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(".user-controls-container");
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title

  setCurrentSceneTitle("Clinic");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button"); // create buttons for scene
  let keyBtn = document.createElement("button");
  let enterBtn = document.createElement("button");
  let investigateBtn = document.createElement("button");
  let leaveBtn = document.createElement("button");
  let hallwayBtn = document.createElement("button");
  let continueBtn = document.createElement("button");
  let flickBtn = document.createElement("button");
  let doorLeftBtn = document.createElement("button");
  let doorRightBtn = document.createElement("button");
  let continueFurtherBtn = document.createElement("button");
  let continueCornerBtn = document.createElement("button");
  let locateBtn = document.createElement("button");
  let openDoorBtn = document.createElement("button");
  let fridgeBtn = document.createElement("button");
  let syringeBtn = document.createElement("button");
  let closeBtn = document.createElement("button");
  let findBtn = document.createElement("button");
  let returnBtn = document.createElement("button");
  let investigatePlateBtn = document.createElement("button");
  let openHatchBtn = document.createElement("button");
  let seekHelpLeaveBtn = document.createElement("button");
  let climbHatchBtn = document.createElement("button");
  let callBtn = document.createElement("button");
  let investigateRoomBtn = document.createElement("button");
  let investigateCounterBtn = document.createElement("button");
  let investigateDeskBtn = document.createElement("button");
  let computerBtn = document.createElement("button");
  let computerOffBtn = document.createElement("button");
  let openFolderBtn = document.createElement("button");
  let openDocBtn = document.createElement("button");
  let openImageBtn = document.createElement("button");
  let investigateTanksBtn = document.createElement("button");
  let investigateTableBtn = document.createElement("button");
  let investigateBodyBtn = document.createElement("button");
  let enoughLeaveBtn = document.createElement("button");
  let openSecretDoorBtn = document.createElement("button");
  let lookThroughBtn = document.createElement("button");
  let walkBtn = document.createElement("button");
  let tryToOpenDoorBtn = document.createElement("button");
  let lookAroundBtn = document.createElement("button");
  let returnToResidentialBtn = document.createElement("button");

  // set button text
  townSquareBtn.textContent = "Go to town square";
  keyBtn.textContent = "Use Clinic Key";
  enterBtn.textContent = "Enter the Clinic";
  investigateBtn.textContent = "Investigate your surroundings";
  leaveBtn.textContent = "This place is creepy, leave for now";
  hallwayBtn.textContent = "Walk down the corridor";
  continueBtn.textContent = "Continue further down the corridor";
  flickBtn.textContent = "Flick the light switch";
  doorLeftBtn.textContent = "Open door to the left";
  doorRightBtn.textContent = "Open door to the right";
  continueFurtherBtn.textContent = "Continue down the corridor";
  continueCornerBtn.textContent = "Continue around the corner";
  locateBtn.textContent = "Try to locate the humming";
  openDoorBtn.textContent = "Open the door";
  fridgeBtn.textContent = "Check inside the fridge";
  syringeBtn.textContent = "Take the syringe";
  closeBtn.textContent = "Close the fridge";
  findBtn.textContent = "Find painkillers";
  returnBtn.textContent = "Return to the entrance of the Clinic";
  investigatePlateBtn.textContent = "Investigate the metal plate";
  openHatchBtn.textContent = "Open the hatch";
  seekHelpLeaveBtn.textContent = "This could be dangerous, better to leave and get help";
  climbHatchBtn.textContent = "Climb down the hatch";
  callBtn.textContent = "Call out for someone";
  investigateRoomBtn.textContent = "Investigate the room";
  investigateCounterBtn.textContent = "Investigate counter";
  investigateDeskBtn.textContent = "Investigate study desk";
  computerBtn.textContent = "Switch on the computer";
  computerOffBtn.textContent = "Switch off the computer";
  openFolderBtn.textContent = "Open the folder";
  openDocBtn.textContent = "Open the text document";
  openImageBtn.textContent = "Open the image files";
  investigateTanksBtn.textContent = "Investigate glass tanks";
  investigateTableBtn.textContent = "Investigate operating table";
  investigateBodyBtn.textContent = "Investigate the body";
  enoughLeaveBtn.textContent = "You've seen enough, you want to leave";
  openSecretDoorBtn.textContent = "Open the secret door";
  lookThroughBtn.textContent = "Look through the secret door";
  walkBtn.textContent = "Walk down the secret passage";
  tryToOpenDoorBtn.textContent = "Try to open the door";
  lookAroundBtn.textContent = "Look around the house";
  returnToResidentialBtn.textContent = "Return to residential area";
  walkBtn.textContent = "Walk around the snake";
  scareBtn.textContent = "Try and scare the snake away";
  runBtn.textContent = "Run past the snake!";
  

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(keyBtn);
  applyGlassStylingGreyBtn(enterBtn);
  applyGlassStylingGreyBtn(investigateBtn);
  applyGlassStylingGreyBtn(leaveBtn);
  applyGlassStylingGreyBtn(hallwayBtn);
  applyGlassStylingGreyBtn(continueBtn);
  applyGlassStylingGreyBtn(flickBtn);
  applyGlassStylingGreyBtn(doorLeftBtn);
  applyGlassStylingGreyBtn(doorRightBtn);
  applyGlassStylingGreyBtn(continueFurtherBtn);
  applyGlassStylingGreyBtn(continueCornerBtn);
  applyGlassStylingGreyBtn(locateBtn);
  applyGlassStylingGreyBtn(openDoorBtn);
  applyGlassStylingGreyBtn(fridgeBtn);
  applyGlassStylingGreyBtn(syringeBtn);
  applyGlassStylingGreyBtn(closeBtn);
  applyGlassStylingGreyBtn(findBtn);
  applyGlassStylingGreyBtn(returnBtn);
  applyGlassStylingGreyBtn(investigatePlateBtn);
  applyGlassStylingGreyBtn(openHatchBtn);
  applyGlassStylingGreyBtn(seekHelpLeaveBtn);
  applyGlassStylingGreyBtn(climbHatchBtn);
  applyGlassStylingGreyBtn(callBtn);
  applyGlassStylingGreyBtn(investigateRoomBtn);
  applyGlassStylingGreyBtn(investigateCounterBtn);
  applyGlassStylingGreyBtn(investigateDeskBtn);
  applyGlassStylingGreyBtn(computerBtn);
  applyGlassStylingGreyBtn(computerOffBtn);
  applyGlassStylingGreyBtn(openFolderBtn);
  applyGlassStylingGreyBtn(openDocBtn);
  applyGlassStylingGreyBtn(openImageBtn);
  applyGlassStylingGreyBtn(investigateTanksBtn);
  applyGlassStylingGreyBtn(investigateTableBtn);
  applyGlassStylingGreyBtn(investigateBodyBtn);
  applyGlassStylingGreyBtn(enoughLeaveBtn);
  applyGlassStylingGreyBtn(openSecretDoorBtn);
  applyGlassStylingGreyBtn(lookThroughBtn);
  applyGlassStylingGreyBtn(walkBtn);
  applyGlassStylingGreyBtn(tryToOpenDoorBtn);
  applyGlassStylingGreyBtn(lookAroundBtn);
  applyGlassStylingGreyBtn(returnToResidentialBtn);
  applyGlassStylingGreyBtn(walkBtn);
  applyGlassStylingGreyBtn(scareBtn);
  applyGlassStylingGreyBtn(runBtn);

  if (CLINIC_KEY_USED == false) {
    await typeText(
      textContainer,
      "<p>The doors to the clinic are chained shut, a heavy silver padlock glistens in the sunlight<br><br>You try looking through the glass but the inside is dark, you can't see anything.</p>",
      applyGlassStylingRed
    );
  
    await sleep(1500);
  
    // append button to user controls container
    if (CLINIC_KEY == true) {
      userControlsContainer.appendChild(keyBtn);
      userControlsContainer.appendChild(townSquareBtn);
    } else {
      userControlsContainer.appendChild(townSquareBtn);
    }
  } else {
    await typeText(
      textContainer,
      "<p>The glass doors to the clinic are closed, a heavy silver padlock and chains lays on the ground in front of the door.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    userControlsContainer.appendChild(enterBtn);
  }
    

  keyBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    userControlsContainer.remove(keyBtn);
    userControlsContainer.remove(townSquareBtn);

    CLINIC_KEY_USED = true;

    // remove button from user controls container
    townSquareBtn.remove();
    keyBtn.remove();

    await typeText(
      textContainer,
      "<p>You take the key you received from Ingrid and slide it into the lock. With an easy turn the padlock springs open.<br><br>You unwrap the chains and they slink to the ground.</p>",
      applyGlassStylingRed
    );

    userControlsContainer.appendChild(enterBtn);
  });

  enterBtn.addEventListener("pointerup", async function () {
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

    if (CLINIC_BASEMENT == true) {
      await typeText(
        textContainer,
        "<p>You have already found enough important information inside the clinic, you don't think you want to go inside again.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(townSquareBtn);
    } else {
      await typeText(
        textContainer,
        "<p>You push open one of the glass doors, and you feel some resistance.<br>You notice it has one of those automatic closing devices attached.<br><br>You step into the dark interior and the door automatically closes behind you, banging loudly in the frame.</p>",
        applyGlassStylingRed
      );

      await pause();

      textContent.innerHTML = "";

      await typeText(
        textContainer,
        "<p>The sound echoes through the empty building and a shiver runs up your spine.<br><br>You are glad you made it inside the Clinic because you suddenly notice a sharp pain in our ankle again.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      userControlsContainer.appendChild(investigateBtn);
      userControlsContainer.appendChild(leaveBtn);
    }
  });

  investigateBtn.addEventListener("pointerup", async function () {
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
    investigateBtn.remove();
    leaveBtn.remove();

    await typeText(
      textContainer,
      "<p>You can see much better now that you are inside the dark room with the light coming in through the windows and doors, but it is still rather dark.<br><br>You seem to be standing in the reception area of the Clinic. To your right is the waiting area with many benches and some old magazines for patients to read; to your left is a reception window.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>There is an empty water cooler and some withering plants here and there throughout the room. There is a small dark hallway leading further into the Clinic.<br><br>You suddenly realize you can hear a faint humming sound coming from deeper within the building.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    userControlsContainer.appendChild(hallwayBtn);
    userControlsContainer.appendChild(leaveBtn);

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

    // remove button from user controls container
    leaveBtn.remove();
    hallwayBtn.remove();

    await typeText(
      textContainer,
      "<p>You can barely see in this dark area, but your eyes quickly adjust to the darkness thanks to the  faint light coming from the entrance.<br><br>Here on your right you see another window with a serving counter just like the reception, however here you see a big sign above it that reads 'Dispensary', but you cant make out anything inside the room, then you notice a light switch on the wall next to the counter.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    if (CLINIC_LIGHT == false) {
      userControlsContainer.appendChild(flickBtn);
      userControlsContainer.appendChild(continueBtn);
    } else {
      userControlsContainer.appendChild(continueBtn);
    }
  });


  flickBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_LIGHT = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    continueBtn.remove();
    flickBtn.remove();

    await typeText(
      textContainer,
      "<p>You flick on the light switch and nothing happens.<br><br>Then you hear a hum and a hollow sputtering sound as a light tube comes to life inside the dispensary.<br>You can now make out that there are rows of boxes and bottles on shelves lining all the walls of the small room... Medicine.<p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You want to have a look and see what you can take, when you suddenly realize there is no door on this side that leads into the dispensary, you can't really see a door in the interior of the room either.<br><br>There must be a way in somewhere in this building.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    userControlsContainer.appendChild(continueBtn);
  });

  
  continueBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    continueBtn.remove();
    flickBtn.remove();

    await typeText(
      textContainer,
      "<p>You walk further down the hallway and see a closed door on either side. You notice small plaques next to each door that read 'Dr. Hedda Johansen' and 'Dr. Erik Johansen'.  In front of you the hallway makes a sharp right turn around a corner.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    if (CLINIC_DOOR_LEFT == false) {
      userControlsContainer.appendChild(doorLeftBtn);
    }
    if (CLINIC_DOOR_RIGHT == false) {
      userControlsContainer.appendChild(doorRightBtn);
    }
    userControlsContainer.appendChild(continueFurtherBtn);

  });


  doorLeftBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_DOOR_LEFT = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    doorLeftBtn.remove();
    doorRightBtn.remove();
    continueFurtherBtn.remove();

    await typeText(
      textContainer,
      "<p>The door is locked.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    if (CLINIC_DOOR_LEFT == false) {
      userControlsContainer.appendChild(doorLeftBtn);
    }
    if (CLINIC_DOOR_RIGHT == false) {
      userControlsContainer.appendChild(doorRightBtn);
    }
    userControlsContainer.appendChild(continueFurtherBtn);

  });

  doorRightBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_DOOR_RIGHT = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    doorLeftBtn.remove();
    doorRightBtn.remove();
    continueFurtherBtn.remove();

    await typeText(
      textContainer,
      "<p>The door is locked.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    if (CLINIC_DOOR_LEFT == false) {
      userControlsContainer.appendChild(doorLeftBtn);
    }
    if (CLINIC_DOOR_RIGHT == false) {
      userControlsContainer.appendChild(doorRightBtn);
    }
    userControlsContainer.appendChild(continueFurtherBtn);

  });

  continueFurtherBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    doorLeftBtn.remove();
    doorRightBtn.remove();
    continueFurtherBtn.remove();

    await typeText(
      textContainer,
      "<p>You walk further down the hallway and turn the corner to the right. You are now standing in what looks to be a small staff kitchen.<br><br>There are a few kitchen cupboards and a small coffee station in one corner next to a very old looking refrigerator.<br><br>The light is very dim here; there is a dirty window that is obscured from the outside by leaves and branches above a small kitchen sink.</p>",
      applyGlassStylingRed
    );

    await pause();

    await typeText(
      textContainer,
      "<p>You hear a very distinct humming sound in this room but you can't place exactly where it is coming from.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>There is another small hallway that leads out of this room and makes another corner turn to the right.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    userControlsContainer.appendChild(continueCornerBtn);
    userControlsContainer.appendChild(locateBtn);
    
  });

  
  locateBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    locateBtn.remove(); // remove relevant buttons
    continueCornerBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You slowly walk around the room trying to discern where the humming is coming from, in this quiet area it feels like it is coming from everywhere...</p>",
      applyGlassStylingRed
    );

    await pause();

    await typeText(
      textContainer,
      "<p>You pace around and suddenly the fridge catches your attention.<br><br>Of course, it's the old refrigerator, they were much loader than modern refrigerators, and it must have been running all this time in the empty clinic.<br><br>What ever was kept in there must be rotten by now.</p>",
      applyGlassStylingRed
    )

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(fridgeBtn); // append relevant buttons
    userControlsContainer.appendChild(continueCornerBtn);
  });

  fridgeBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    fridgeBtn.remove(); // remove relevant buttons
    continueCornerBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You open the refrigerator and you are firstly assaulted by the sudden bright light, and secondly by the awful smell from inside.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>The fridge is mostly empty except for a plate holding the remains of what was once a sandwich, covered in black and green mold; and a very bloated plastic milk bottle.</p>",
      applyGlassStylingRed
    );

    await pause();

    await typeText(
      textContainer,
      "<p>You are surprised to also see an old ampoule syringe laying in one of the shelves, it's needle capped.<br>But then you realize it's not that strange to have medicines around that are kept cold.<br><br>There is a small label on the ampoule that reads 'Prototype-S'</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(syringeBtn); // append relevant buttons
    userControlsContainer.appendChild(closeBtn);
  });

  syringeBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_STEROIDS = true;

    INVENTORY.push({ name: "Syringe", description: "A syringe you found at the clinic" });

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    syringeBtn.remove(); // remove relevant buttons
    closeBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You take the 'prototype-S'</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(closeBtn); // append relevant buttons
  });

  closeBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    syringeBtn.remove(); // remove relevant buttons
    closeBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You close the fridge and take a few moments to adjust to the darkness again.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(continueCornerBtn); // append relevant buttons
  });

  continueCornerBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    continueCornerBtn.remove(); // remove relevant buttons
    locateBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>As you turn the corner you see a narrow corridor containing a desk with some files and an old computer on it. At the end of the corridor is a filing cabinet.<br><br>As you reach the desk you notice a door to your right with a plaque attached to it which reads 'Dispensary'.</p>",
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

    if (CLINIC_LIGHT == false) {
        // write new text
      await typeText(
        textContainer,
        "<p>You turn the handle and surprisingly the door is unlocked.<br>The door opens into a dark room. You see no windows, but is there is some light coming from outside the clinic through the service window.<br>There are medicine boxes and bottles lining the walls of the room, but you can't make out any of the names or labels. You notice the pain in your ankle again.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      // append new button
      userControlsContainer.appendChild(findBtn); // append relevant buttons
      } else {
        await typeText(
          textContainer,
          "<p>You turn the handle and surprisingly the door is unlocked.<br>The door opens into the brightly lit dispensary. On this side of the service window you can see the room is old fashioned with wooden furniture and thick carpeting .<br><br>You also see a pharmacist's station with a chair, an old computer, printer and a dried and dead plant.</p>",
          applyGlassStylingRed
        );
    
      await pause();

      textContainer.innerHTML = "";
      
      await typeText(
        textContainer,
        "<p>There are medicine boxes and bottles lining the walls . You notice the pain in your ankle again.</p>",
        applyGlassStylingRed
      );
    
        // append new button
        userControlsContainer.appendChild(findBtn); // append relevant buttons
    };
    
  });

  findBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    findBtn.remove(); // remove relevant buttons

    if (CLINIC_LIGHT == false) {
    // write new text
    await typeText(
      textContainer,
      "<p>You grab some bottles from the shelf in front of you and try to read the tiny label but you can't read it in this light... maybe you should try finding a light switch first.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
      userControlsContainer.appendChild(returnBtn); // append relevant buttons
    } else {
      // write new text
      await typeText(
        textContainer,
        "<p>You scan the shelves looking for anything that indicates pain medication. Suddenly some words stand out to you, paracetamol; ibuprofen, naproxen, phenazone... you don't know how you know this, but these are painkillers.</p>",
        applyGlassStylingRed
      );
  
      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>You take a few pills from a bottle labeled Mendaxil and swallow them. Hopefully this will do the trick.<br><br>You put the bottle back on the shelf but you put it too close to the edge and it falls. You instinctively reach out to grab it but you are too late and you hear it strike the floor with a metallic clang...",
        applyGlassStylingRed
      );
  
      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>You are startled by the sound... the whole floor is soft carpet?<br><br>Looking down you see that the bottle struck the edge of metal-looking plate, just sticking out from under a low coffee table stacked with files and magazines.</p>",
        applyGlassStylingRed
      );
  
      await sleep(1500);
  
      // append new button
      userControlsContainer.appendChild(investigatePlateBtn); // append relevant buttons
    }
  });

  returnBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    returnBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>You can barely see in this dark area, but your eyes quickly adjust to the darkness thanks to the  faint light coming from the entrance.<br><br>Here on your right you see another window with a serving counter just like the reception, however here you see a big sign above it that reads 'Dispensary', but you cant make out anything inside the room, then you notice a light switch on the wall next to the counter.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(continueBtn); // append relevant buttons
    userControlsContainer.appendChild(flickBtn);
  });

  investigatePlateBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigatePlateBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>You bend down and try to look at the plate, but it's well hidden under the table. You decide to move the table away.<br><br>You pick the table up and a few magazines and files fall to the floor, but you don't pay any attention to it, you are surprised by what you are looking at.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Where the table stood before there is now a small, flat metal square... you might mistake it for a manhole if not for the large handle attached to one edge..</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>This is a hatch door! There must be a basement underneath the clinic... but why was it hidden? I wonder if I should see what's down there...</p>",
      applyGlassStylingGreen
    );

    // append new button
    userControlsContainer.appendChild(openHatchBtn); // append relevant buttons
  });

  openHatchBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_BASEMENT = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    openHatchBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>There is a locking mechanism in the hatch door, so you rotate the handle anti-clockwise and feel the door release. You lift the hatch and a rush of cold air hits your face. you see a shaft and iron rungs leading straight down.<br><br>You can see a well lit white floor at the bottom of the shaft, about four meters down.<br><br>You notice the distinct smell of a musty room that has been closed off for a long time.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(seekHelpLeaveBtn); // append relevant buttons
    userControlsContainer.appendChild(climbHatchBtn);
  });
  
  seekHelpLeaveBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    seekHelpLeaveBtn.remove(); // remove relevant buttons
    climbHatchBtn.remove();

    sceneTownSquare();
  });
  
  climbHatchBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    seekHelpLeaveBtn.remove(); // remove relevant buttons
    climbHatchBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You stand in front of the open hatch, looking down into the deep hole, and decide to climb down.<br>As you climb down each rung you notice the air getting colder around you, and that your ankle still hurts.<br>Suddenly you hear a loud crash as the hatch door slams shut above you. You feel mild panic but decide to continue down and investigate.<br>After what feels like a really long time you reach the floor at the bottom and turn around...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You are standing in a short but very narrow hallway that leads a few meters ahead and then opens into a larger room.<br>Everything seems white and very brightly lit, It's making your eyes burn a bit.<br>You see Industrial looking equipment in the room ahead. The air smells stale down here.<br><br>You apprehensively move forward to get a better look.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(callBtn); // append relevant buttons
    userControlsContainer.appendChild(investigateRoomBtn); // append relevant buttons
  });
  
  callBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    callBtn.remove(); // remove relevant buttons
    investigateRoomBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>Hello? Is anyone down here?</p>",
      applyGlassStylingGreen
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You listen for a reply, The only reply is eerie silence, you are almost disappointed.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(investigateRoomBtn); // append relevant buttons
  });
  
  investigateRoomBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateRoomBtn.remove(); // remove relevant buttons
    callBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You step forward out of the hallway into the larger room, but this not just a room...<br><br>This is a laboratory. There are no other doors or windows in the room, just an air vent in one corner of the ceiling.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You see a counter against a wall which holds different tools like microscopes and other medical equipment that you don't know the purpose of.<br><br>You also see a regular study desk with a computer monitor and lots of papers on it.<br><br>Against the far wall there are 3 large glass tanks filled with a liquid that looks like water. There is some debris or detritus floating in the liquid.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You step forward out of the hallway into the larger room, but this not just a room...<br><br>This is a laboratory. There are no other doors or windows in the room, just an air vent in one corner of the ceiling.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>The rest of the room looks almost like an operating theatre, as you see a blue fabric screen with an operating table behind it to one side, with lights and various gas tanks standing around it.<br><br>The room is completely silent. It makes your skin crawl.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(investigateCounterBtn); // append relevant buttons
    userControlsContainer.appendChild(investigateDeskBtn);
    userControlsContainer.appendChild(investigateTanksBtn);
    userControlsContainer.appendChild(investigateTableBtn);
    userControlsContainer.appendChild(enoughLeaveBtn);
  });
  
  investigateCounterBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You move up to the counter on which you see a microscope, a circular device that holds a few vials of liquid, and what looks like some dried grass or twigs.<br><br>You look into the microscope, and see a sample of whatever the last person here was looking at, but you can't exactly make it out, you see lots of tiny circular shapes, but the sample has dried and the view is blurry, you decide to leave it alone.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You catch a glimpse of the dried grass or twigs and wonder what it's doing in a lab like this... maybe the doctors were trying...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Your thoughts catch and your eyes snap back to the long thin objects as you catch a slight glint of metal, you realise those aren't twigs... or grass...<br><br>you slowly move closer for a better look , just to confirm what your mind already knows is true...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Those are wires... caked in dried blood... </p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Just what in the hells was happening down here...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>You turn away before your mind can linger on the possibilities.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(investigateDeskBtn); // append relevant buttons
    userControlsContainer.appendChild(investigateTanksBtn);
    userControlsContainer.appendChild(investigateTableBtn);
    userControlsContainer.appendChild(enoughLeaveBtn);
  });
  
  investigateDeskBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You stand in front of the simple desk and see that there is a computer tower underneath it. It is not switched on. There are various papers littering the desk, most look like shorthand notes scribbled on different notepads.<br><br>A bright orange sticky note, stuck to the computer keyboard catches your eye. On it is written : 'PASSWORD' with a string of numbers underneath - 34-39-55-132-45-36.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You wonder why someone would choose such a strange password, and then keep it on a note next to the computer, but you decide that whoever was working down here in a secret laboratory probably didn't worry about someone finding and using their computer.<br><br>You notice a USB drive sticking out of the top of computer.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(computerBtn); // append relevant buttons
    userControlsContainer.appendChild(investigateCounterBtn);
    userControlsContainer.appendChild(investigateTanksBtn);
    userControlsContainer.appendChild(investigateTableBtn);
    userControlsContainer.appendChild(enoughLeaveBtn);
  });
  
  computerBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    computerBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You sit down on the chair in front of the desk and press the large power button on the front of the computer and it starts buzzing and gives a beep which sounds extremely loud in the silence of this room.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>After a few seconds you see a cursor flashing on the screen and a plain blue background appears, with a prompt window that says 'Password:'<br><br>You enter the password you see on the sticky note and the text 'Welcome Dr. Johansen' appears on the screen before a few icons appear on the background.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>There is nothing much of interest, it all looks very medical in nature and you don't feel like reading medical journals at this moment.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(computerOffBtn); // append relevant buttons
  });
  
  computerOffBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    computerOffBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You reach for the power button again and as you touch it you see something on the screen and your hand freezes where it is...  a folder you didn't notice before in the upper right corner of the screen reads 'Project Salvation'.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Project Salvation? The government project father Jakob told me about?</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(openFolderBtn); // append relevant buttons
  });
  
  openFolderBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openFolderBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You click on the folder to open it's contents and the window opens a long list of files.<br><br>They mostly look like text documents, and the names are all called 'research notes' with different dates, there are also some image files.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(openDocBtn); // append relevant buttons
    userControlsContainer.appendChild(openImageBtn);
  });
  
  openDocBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_RESEARCH_SAVED = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You open the most recent dated file and a text document appears on the screen.<br>It consists of listed dates with a note next to each date.<br>You skim the page and see that these were progress reports of research the doctors were conducting on 'humanoid assets'<br><br>The last entry says 'finalising work before leaving for HQ, To return in a fortnight'</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You suddenly remember you saw a USB drive in the computer...<br><br>It might not be a bad idea to save this information and take it with you...<br><br>If you plan to go to the resistance, they will want to know what is happening in this town.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You save the images and text documents to the USB drive and remove it, safely putting it in your pocket. You have a feeling that this is very important to finding answers about what is happening here.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    INVENTORY.push({ name: "USB Drive", description: "A USB drive you found at the lab containing documents and images about 'Project Salvation'." });
    
    // append new button
    userControlsContainer.appendChild(openImageBtn); // append relevant buttons
  });

  openImageBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_SECRET_DOOR = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You open the photos and you are initially shocked, but then fascinated by what you are looking at.<br>You recognise the room around you in the pictures, the large water tanks having human subjects in them in various dissected states, but something about the humans look off...<br><br>You would rather say they look like dolls.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    // write new text
    await typeText(
      textContainer,
      "<p>You notice an open door in one image that you don't recognise...<br><br>You look up to the corner behind the operating screen, where the door should be but see only wall, you look down at the image again and you are sure it's the same room you are in now, but you are distracted by the most recent dated picture, a disturbing autopsy photo of a woman on an operating table, mangled limbs and blood everywhere, you decide to close the image.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    // write new text
    if (CLINIC_ROBOT_SEEN == true) {
      await typeText(
        textContainer,
        "<p>This is the android body on the table over there...<br><br>The other bodies from the tanks must have been removed or discarded...</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      // append new button
      if (CLINIC_RESEARCH_SAVED == false) {
        userControlsContainer.appendChild(openDocBtn);
      } else {
        userControlsContainer.appendChild(computerOffBtn);
      }
    }

    if (CLINIC_RESEARCH_SAVED == true) {
      userControlsContainer.appendChild(computerOffBtn);
    }    
  });

  computerOffBtn.addEventListener("pointerup", async function () {
  // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    computerOffBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You turn off the computer and get up from the desk./p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(investigateCounterBtn); // append relevant buttons
    userControlsContainer.appendChild(investigateTanksBtn);
    userControlsContainer.appendChild(investigateTableBtn);
    userControlsContainer.appendChild(enoughLeaveBtn);
  });

  // before moving on to the next button, which is probably tanks? just check if there is a way to add
  // alt text for the counter or desk, no global conditions provided. so maybe use research saved
  // maybe just use secret door for a check as well, this is the only place to find the boolean, so use it
  // as a condition that another place has already been investigated.

  investigateTanksBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You move towards the large tanks against a far wall. You see that these are probably specimen tanks, but they are so large that they could hold whole animals, or humans...<br><br>You shake your head and try to clear your mind of that thought. You take a closer look at the debris in the tank and try to make out what it is you are looking at. At the top of the tank you see small floating pieces of what look like paper, and hair...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>...and looking at the bottom sediment you see wires lying in a thick brownish sludge.<br><br>There is another shape in the sludge, and as you look closer, the curve of the tank suddenly magnifies the shape... it's a human hand...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Your eyes widen as you see the pale hand covered by the brown sludge...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Oh my God... there really was a human in this tank!?</p>",
      applyGlassStylingGreen
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You recoil from the tank you are looking at and apprehensively look in the other two tanks...<br><br>You see the same brown sludge with wires sticking out of it, and the same pieces of strange paper floating at the top, but no other body parts.<br><br>You sigh in relief... until your eye catches something floating in between the pieces of paper in one of the tanks...  it's a human ear...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You didn't see it because it's the same pale white as the paper.  Then you realise... that is not paper at all... those are bits of skin floating in the tanks...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>You turn away from the tanks,  nausea pushing up your throat... but you steel yourself, taking a deep breath of the dry stale air.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(investigateCounterBtn); // append relevant buttons
    userControlsContainer.appendChild(investigateDeskBtn);
    userControlsContainer.appendChild(investigateTableBtn);
    userControlsContainer.appendChild(enoughLeaveBtn);
  });

  investigateTableBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_ROBOT_SEEN = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You approach the operating table sticking out from behind the heavy fabric screen, and pull away the blue curtain to see if there is anything interesting worth looking at.<br>Your eyes widen and it takes your mind a second to comprehend what you see on the operating slab, and you instinctively clap your hands to your mouth, not wanting to breathe, not wanting to make a sound...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>In front of you is the pale and mutilated body of a woman, displaying grotesquely mangled body parts.<br><br>Both the legs are missing from the knee down, one seems cut and one seems like it was ripped off; one arm is missing from the elbow and there is a large gash down the center of her chest.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Her face is staring straight ahead of her, beautiful and calm. Thick dried blood is pooled around the body on the table.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    if (CLINIC_RESEARCH_SAVED == true) {
          await typeTextItalic(
            textContainer,
            "<p>This is the same woman I saw in the pictures on the computer, what were they doing to her? Is human experimentation part of Project Salvation?</p>",
            applyGlassStylingGreen
          );

      await sleep(1500);
      
      userControlsContainer.appendChild(investigateBodyBtn); // append relevant buttons
    } else {
      // append new button
      userControlsContainer.appendChild(investigateBodyBtn); // append relevant buttons
      userControlsContainer.appendChild(investigateCounterBtn);
      userControlsContainer.appendChild(investigateDeskBtn);
      userControlsContainer.appendChild(investigateTanksBtn);
      userControlsContainer.appendChild(enoughLeaveBtn);
    }
  });

  investigateBodyBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    investigateBodyBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>The first thing that snaps you out of your shock is the smell. You don't recognise it as blood or as decay... It is a faint, almost chemical smell like an oil or a solvent, then your eyes catches a glint in between the scarlet gore. You can't help yourself as you reach out to touch whatever it is you see, in the gash down her chest.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You cautiously reach for the shiny object and proceed to stick your hand into the bloody gash. As if realising what you are doing you want to recoil and pull your arm back, but something stops you... you feel something hard and cold beneath your fingers... Wires.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You look at the exposed flesh on the mangled legs and arm... and you see blood clumped wires where you expected to see bone. You slowly retract your fingers, covered in red liquid and bring them to your face.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>You apprehensively smell your fingers... this is the oily chemical smell you noticed earlier... before you can stop yourself you taste the liquid but immediately regret it, you spit the sour  greasy liquid from your mouth... definitely not blood...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>This is not a woman at all... this is not even a human...<br><br>It is a machine...<br><br>An Android...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Is this the AI technology Father Jakob was talking about? This must be what I saw in the mayor's house... Why is there an android here in this secret lab? What were the good doctors doing to it? dissecting it? or repairing it...</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(investigateCounterBtn); // append relevant buttons
    userControlsContainer.appendChild(investigateDeskBtn);
    userControlsContainer.appendChild(investigateTanksBtn);
    userControlsContainer.appendChild(enoughLeaveBtn);
  });

  enoughLeaveBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();

    if (CLINIC_LOCKED_IN == false) {
      // write new text
      await typeText(
        textContainer,
        "<p>You head back down the hallway towards the ladder leading up to the hatch door. You reach the ladder and look up at the dark tunnel, remembering that the door slammed shut behind you. You start making your way up the ladder and try to push open the hatch above you... but it doesn't budge.<br><br>You look above you, trying to find the handle to rotate, but there is no handle on this side.  Instead you see the small blue light of an LCD screen, with a keypad beneath it.  The hatch door needs a security code.</p>",
        applyGlassStylingRed
      );
  
      await pause();

      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>Damn it! I have no idea what the code could be. Maybe I should just try my luck...</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      await typeText(
        textContainer,
        "<p>You start pushing the number keys and after 4 numbers you hear a soft beep, with the word ERROR displayed on the screen. You try again; ERROR. Almost frantically you start pressing the buttons... ERROR.<br><br>You start to panic but you get a hold of yourself and climb back down the ladder.</p>",
        applyGlassStylingRed
      );
  
      await pause();

      await typeTextItalic(
        textContainer,
        "<p>Panicking and breaking the keypad is not going to help me in any way. I have to look around if there is anything that could help me get out of here.</p>",
        applyGlassStylingGreen
      );

      await pause();
      
      CLINIC_LOCKED_IN = true;

      // append new button
      if (CLINIC_SECRET_DOOR == true) {
        await typeText(
          textContainer,
          "<p>Your head suddenly snaps up as you remember the picture you saw on the computer...<br><br>There was another door! You remember seeing it in the corner behind the operating table.<br><br>You walk to the corner of the room but you only see the wall paneling. Your eyes drift along the seams of the panel, and then you see it! There is an almost indiscernible gap between the corner panels, if you weren't looking for it, you would never have seen it.</p>",
          applyGlassStylingRed
        );
  
        await sleep(1500);

        userControlsContainer.appendChild(openSecretDoorBtn);
      } else {
        userControlsContainer.appendChild(investigateCounterBtn);
        userControlsContainer.appendChild(investigateDeskBtn);
        userControlsContainer.appendChild(investigateTableBtn);
        userControlsContainer.appendChild(enoughLeaveBtn);
      }
    }
    if (CLINIC_LOCKED_IN == true) {
      // write new text
      await typeTextItalic(
        textContainer,
        "<p>I still need to find a way to open the hatch or find another way out of this place.</p>",
        applyGlassStylingGreen
      );
  
      await sleep(1500);

      if (CLINIC_SECRET_DOOR == true) {
        await typeText(
          textContainer,
          "<p>Your head suddenly snaps up as you remember the picture you saw on the computer...<br><br>There was another door! You remember seeing it in the corner behind the operating table.<br><br>You walk to the corner of the room but you only see the wall paneling. Your eyes drift along the seams of the panel, and then you see it! There is an almost indiscernible gap between the corner panels, if you weren't looking for it, you would never have seen it.</p>",
          applyGlassStylingRed
        );
  
        await sleep(1500);

        userControlsContainer.appendChild(openSecretDoorBtn);
      } else {
        userControlsContainer.appendChild(investigateCounterBtn);
        userControlsContainer.appendChild(investigateDeskBtn);
        userControlsContainer.appendChild(investigateTableBtn);
        userControlsContainer.appendChild(enoughLeaveBtn);
      }
    }
  });

  openSecretDoorBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    openSecretDoorBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>There is a work counter with metal trays and bloody wires on it blocking the door, but you easily move it out of the way, revealing a simple latch keeping the wall panel in place. you slide open the latch and give the wall a gentle push... it swings open slowly with a very eerie creak..</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(lookThroughBtn); // append relevant buttons
  });

  lookThroughBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    lookThroughBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>The secret door reveals a narrow hallway which is dimly lit in comparison to the stark white laboratory you are standing in. The walls of the hallway are simple concrete. It seems to stretch on for a long distance...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(walkBtn); // append relevant buttons
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
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    walkBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You stand in front of the open passage and apprehensively give a step forward. You let out an audible sigh... You realise you have no other choice, this is the only option you have right now. You hope that you can get out this way, and that this lab won't become your tomb.<br><br>You shake your head, getting rid of that morbid thought and start walking down the cold passage.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>After walking about 20 meters you realise you can't see the lab door anymore, but there is just hallway behind and in front of you...<br>The tunnel is curving. You keep walking, wondering how long this tunnel is...<br><br>after 5 minutes of walking you start feel a familiar sense of panic start to play in your mind...<br><br>you start walking faster.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You realise that you are probably deep underground, alone in the middle of a long tunnel, you don't know how far you have walked or how far you still have to go, you don't even know what you expect to find at the end of this tunnel...<br><br>You are almost running at this point as your imagination goes wild.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Perhaps you find a dead end brick wall... what if the lab door locked behind you like the hatch door did.... Would anyone hear you if were to call for help?   Suddenly out of nowhere a wooden door appears in front of you.<br><br>You have reached the end of the tunnel!</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Oh thank God, I almost started panicking back there...</p>",
      applyGlassStylingGreen
    );

    // append new button
    userControlsContainer.appendChild(tryToOpenDoorBtn); // append relevant buttons
  });

  // continue from try to open door paragraph

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
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    tryToOpenDoorBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>This seems like an ordinary door you have seen all too often in this town.<br>You grab the knob and give it a turn and push. <br>You are surprised that it opens up without as much as a creak.<br>You were expecting having to break it down to escape the hallway, but instead you step into a dark but nicely decorated home.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Looking to the left you see a shelf with various trinkets and decorations adorning it. A photo frame catches your eyes. There is photo of a middle aged couple, a gentle looking woman and a handsome man, smiling at the camera.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Are these the Johansen doctors? This must be their home...</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(lookAroundBtn); // append relevant buttons
  });

  lookAroundBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    lookAroundBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You know no one is home so you slowly walk through the house, looking for anything suspicious, but this house is as ordinary as any other. Large neat kitchen, Bedroom with a walk-in wardrobe, medical books on the coffee table in the living room...<br><br>Everything is neatly in it's place, the house is well kept and clean.<br><br>You suspect they had everything tidied up before they 'Left for HQ'... wherever that may be.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You decide that the Johansens have enough hidden secrets in their underground laboratory, and you doubt you would find anything more suspicious in their home. You are just happy to be out of that place, and you head for the front door to leave, but unfortunately it is locked.<br><br>Without giving it a second thought, you unlatch a window instead and open it. You give a quick glance to make sure no one is in the street watching, and then proceed to climb through the window and close it behind you.</p>",
      applyGlassStylingRed
    );

    // append new button
    userControlsContainer.appendChild(returnToResidentialBtn); // append relevant buttons
  });

  returnToResidentialBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    returnToResidentialBtn.remove();

    // write new text
    if (HOUSE_WHITE_SNAKE_BITE == true) {
      await typeText(
        textContainer,
        "<p>This is the same spot where you encountered that nasty snake that bit you! Luckily you don't see any sign of it anymore.</p>",
        applyGlassStylingRed
      );
  
      await pause();

      textContainer.innerHTML = "";

      sceneResidential();
    }
    if (HOUSE_WHITE_SNAKE_BITE == false) {
      await typeText(
        textContainer,
        "<p>As you turn around on the path to walk back to the main road, your breath catches in your throat... A large snake is looking straight at you, its head reared up from the gravel. You can see a twitching rabbit off to the side of the path, you must have interrupted a fresh kill.</p>",
        applyGlassStylingRed
      );
  
      await sleep(1500);
  
      // append new button
      userControlsContainer.appendChild(walkBtn); // append relevant buttons
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
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
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
    userControlsContainer.appendChild(runBtn); // append relevant buttons
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
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    walkBtn.remove();
    scareBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You raise your arms high into the air and try lunging at the snake, however it only hisses loudly and tries to rear itself higher... it looks both angry and defensive of its meal. You see shiny droplets of venom dripping from its exposed fangs.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(runBtn); // append relevant buttons
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
    investigateCounterBtn.remove(); // remove relevant buttons
    investigateDeskBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    enoughLeaveBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    walkBtn.remove();
    scareBtn.remove();
    runBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You stand still for a moment, carefully watching the snake... Then you dash and try to run right past the snake, if it gets any closer you will jump over it.<br><br>But the snake is faster than you expected and you have barely given two steps when you feel a sharp pain in your lower leg, you look down to see the snake retract, barely a split second after biting you.<br><br>You trip from the sudden fright, and as you land on the grass, you see the snake slither back to it's kill and start to wrap around it, confident that it has dispatched the intruder.</p>",
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
    townSquareBtn.remove();
    keyBtn.remove();
    enterBtn.remove();
    investigateBtn.remove();
    leaveBtn.remove();
    hallwayBtn.remove();
    continueBtn.remove();
    flickBtn.remove();
    doorLeftBtn.remove();
    doorRightBtn.remove();
    continueFurtherBtn.remove();
    continueCornerBtn.remove();
    locateBtn.remove();
    openDoorBtn.remove();
    fridgeBtn.remove();
    syringeBtn.remove();
    closeBtn.remove();
    findBtn.remove();
    returnBtn.remove();
    investigatePlateBtn.remove();
    openHatchBtn.remove();
    seekHelpLeaveBtn.remove();
    climbHatchBtn.remove();
    callBtn.remove();
    investigateRoomBtn.remove();
    investigateCounterBtn.remove();
    investigateDeskBtn.remove();
    computerBtn.remove();
    computerOffBtn.remove();
    openFolderBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    investigateBodyBtn.remove();
    enoughLeaveBtn.remove();
    openSecretDoorBtn.remove();
    lookThroughBtn.remove();
    walkBtn.remove();
    tryToOpenDoorBtn.remove();
    lookAroundBtn.remove();
    returnToResidentialBtn.remove();
    walkBtn.remove();
    scareBtn.remove();
    runBtn.remove();

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
    townSquareBtn.remove();
    keyBtn.remove();
    enterBtn.remove();
    investigateBtn.remove();
    leaveBtn.remove();
    hallwayBtn.remove();
    continueBtn.remove();
    flickBtn.remove();
    doorLeftBtn.remove();
    doorRightBtn.remove();
    continueFurtherBtn.remove();
    continueCornerBtn.remove();
    locateBtn.remove();
    openDoorBtn.remove();
    fridgeBtn.remove();
    syringeBtn.remove();
    closeBtn.remove();
    findBtn.remove();
    returnBtn.remove();
    investigatePlateBtn.remove();
    openHatchBtn.remove();
    seekHelpLeaveBtn.remove();
    climbHatchBtn.remove();
    callBtn.remove();
    investigateRoomBtn.remove();
    investigateCounterBtn.remove();
    investigateDeskBtn.remove();
    computerBtn.remove();
    computerOffBtn.remove();
    openFolderBtn.remove();
    openDocBtn.remove();
    openImageBtn.remove();
    investigateTanksBtn.remove();
    investigateTableBtn.remove();
    investigateBodyBtn.remove();
    enoughLeaveBtn.remove();
    openSecretDoorBtn.remove();
    lookThroughBtn.remove();
    walkBtn.remove();
    tryToOpenDoorBtn.remove();
    lookAroundBtn.remove();
    returnToResidentialBtn.remove();
    walkBtn.remove();
    scareBtn.remove();
    runBtn.remove();

    sceneTownSquare();

  });

  
}