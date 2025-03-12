/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

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

let isUserInterrupted = false;
let interruptionIndex = 0;
let btnRecentlyClicked = false;
let isTyping = false;

async function typeText(element, html, boxColor, delay = 30) {
  isTyping = true;
  const regex = /<[^>]*>|[^<]+/g;
  const parts = html.match(regex);
  element.style.fontStyle = "normal";
  for (let part of parts) {
    if (part.startsWith("<p")) {
      let p = document.createElement("p");
      p.className = "text-box"; // add a class to the p element
      boxColor(p); // apply the color style to the paragraph
      p.addEventListener("pointerup", function (event) {
        event.preventDefault();
        isUserInterrupted = true
      });
      element.appendChild(p);
      // Add pointerup event listener to the text box element
    } else if (part.startsWith("<br")) {
      element.lastChild.innerHTML += "<br>"; // add a line break
    } else if (!part.startsWith("<")) {
      for (let i = interruptionIndex; i < part.length; i++) {
        if (isUserInterrupted) {
          element.lastChild.innerHTML += part.slice(i);
          interruptionIndex = 0;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        element.lastChild.innerHTML += part[i];
      }
    }
    isUserInterrupted = false;
  }
  isTyping = false
}

async function typeTextItalic(element, html, boxColor, delay = 30) {
  isTyping = true;
  const regex = /<[^>]*>|[^<]+/g;
  const parts = html.match(regex);
  for (let part of parts) {
    if (part.startsWith("<p")) {
      let p = document.createElement("p");
      p.className = "text-box"; // add a class to the p element
      boxColor(p); // apply the color style to the paragraph
      p.style.fontStyle = "italic";
      p.addEventListener("pointerup", function (event) {
        event.preventDefault();
        isUserInterrupted = true;
      });
      element.appendChild(p);
    } else if (part.startsWith("<br")) {
      element.lastChild.innerHTML += "<br>"; // add a line break
    } else if (!part.startsWith("<")) {
      for (let i = interruptionIndex; i < part.length; i++) {
        if (isUserInterrupted) {
          element.lastChild.innerHTML += part.slice(i);
          interruptionIndex = 0;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        element.lastChild.innerHTML += part[i];
      }
    }
    isUserInterrupted = false;
  }
  isTyping = false;
}

function applyTypingCss(element) {
  let typingAnimation = "typing 2s steps(22), blink .5s step-end infinite alternate";
  element.style.animation = typingAnimation;
  element.style.fontFamily = "victorMono, monospace";
  element.style.fontWeight = "normal";
  element.style.fontSize = "0.8em";
  element.style.color = "#fff";
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

  // START //
  // document.querySelector(".text-box").addEventListener("pointerup", function () {
  //     isUserInterrupted = true;
  // });
  
  sceneZero();
}

//|SCENE TITLE
let currentSceneTitle = "Project: Salvation";
function getCurrentSceneTitle() {
  return currentSceneTitle;
}
function setCurrentSceneTitle(value) {
currentSceneTitle = value
}
//| INVENTORY
let INVENTORY = [];
document.addEventListener("DOMContentLoaded", function () {
  let inventoryVisible = false;
  let inventoryBtn = document.getElementById("header-button");
  const headerTitle = document.getElementById("header-title");

  inventoryBtn.addEventListener("pointerup", function () {
    const inventoryOverlay = document.getElementById("inventory-overlay");

    // toggle overlay visibility
    if (inventoryVisible) {
      inventoryOverlay.style.display = "none";
      headerTitle.textContent = currentSceneTitle; // revert to the original title when the inventory is closed
    } else {
      headerTitle.textContent = "Inventory"; // change the title when the inventory is opened
      inventoryOverlay.style.display = "flex"; // use flex to center content
      inventoryOverlay.innerHTML = ""; // clear previous content

      // check if inventory is empty
      if (INVENTORY.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No items in inventory.";
        applyGlassStylingGrey(emptyMessage); // style the message with grey glass effect
        inventoryOverlay.appendChild(emptyMessage);
      } else {
        // if not empty, display each item with its name and description
        INVENTORY.forEach((item) => {
          const itemContainer = document.createElement("div");
          const itemName = document.createElement("span");
          const itemDescription = document.createElement("p");
          const itemIcon = document.createElement("img");
          itemIcon.src = `img/${item.name}.png`;
          itemIcon.style.width = "32px";
          itemIcon.style.height = "32px";
          itemName.textContent = item.name;
          itemDescription.textContent = item.description;

          itemContainer.appendChild(itemIcon);
          itemContainer.appendChild(itemName);
          itemContainer.appendChild(itemDescription);

          applyGlassStylingGrey(itemContainer); // Apply glass effect
          inventoryOverlay.appendChild(itemContainer);
        });
      }
    }
    inventoryVisible = !inventoryVisible; // toggle the state
  });
});


//| GLOBAL BOOLEANS
//sceneOne
let FOREST_LEG = false;
let FOREST_LOOK = false;
//sceneTwo
let FOREST_RIGHT = false;
// sceneCottage
let COTTAGE_LETTER = false;
let COTTAGE_ROOM = false;
let COTTAGE_DEAD_BODY = false;
// sceneThree
let TOWN_MARKET = false;
// sceneSwimmingPool
let SWIMMING_POOL_GIRL = false;
// sceneInn
let INN_SAD = false;
let INN_LETTER_GIVEN = false;
let INN_WHERE = false;
let INN_SURVIVE = false;
let INN_LETTER_PICKED = false;
let INN_FILIP_PICKED = false;
let INN_ADVICE = false;
// sceneResidentail
// sceneHouseRundown
let HOUSE_RUNDOWN_EXPLORED = false;
let HOUSE_RUNDOWN_ASCENDED = false;
let HOUSE_RUNDOWN_ONE = false;
let HOUSE_RUNDOWN_ONE_AGAIN = false;
let HOUSE_RUNDOWN_TWO = false;
let HOUSE_RUNDOWN_TWO_AGAIN = false;
let HOUSE_RUNDOWN_THREE = false;
let HOUSE_RUNDOWN_THREE_AGAIN = false;
let HOUSE_RUNDOWN_FOUR = false;
let HOUSE_RUNDOWN_FOUR_AGAIN = false;
// sceneHouseFlag
let HOUSE_FLAG_FREQUENCY = false;
let HOUSE_FLAG_ONE = false;
let HOUSE_FLAG_TWO = false;
let HOUSE_FLAG_COORDINATES = false;
// sceneHouseLarge
let LARGE_HOUSE_LIVING_ROOM = false;
let LARGE_HOUSE_PHOTOS_VIEWED = false;
let LARGE_HOUSE_BOOK_VIEWED = false;
let LARGE_HOUSE_FIRST_ROOM_RIGHT = false;
let LARGE_HOUSE_FIRST_ROOM_LEFT = false;
let LARGE_HOUSE_FIRST_ROOM_LEFT_VIEWED_AGAIN = false;
let LARGE_HOUSE_SECOND_ROOM_RIGHT = false;
let LARGE_HOUSE_SECOND_ROOM_RIGHT_VIEWED_AGAIN = false;
let LARGE_HOUSE_BODY_SEEN = false;
let LARGE_HOUSE_ENTERING_SECOND_TIME = false;
let LARGE_HOUSE_MAYOR_KEY = false;
let LARGE_HOUSE_DESK_VIEWED = false;
let LARGE_HOUSE_SAFE_FOUND = false;
let LARGE_HOUSE_MAP = false;
// sceneHouseOvergrown
let HOUSE_OVERGROWN_STERIODS_USED = false;
let HOUSE_OVERGROWN_CAT_TOY = false;
let HOUSE_OVERGROWN_EXPLORED = false;
// sceneHouseWhite
let HOUSE_WHITE_EXPLORED = false;
let HOUSE_WHITE_SNAKE_BITE = false;
//
//sceneChurch
let CHURCH_STORY = false;
let INFORMATION = false;

// sceneClinic
let CLINIC_KEY = false; // check this when you get there
let CLINIC_KEY_USED = false;
let CLINIC_STEROIDS = false;
let CLINIC_LIGHT = false;
let CLINIC_BASEMENT = false;
let CLINIC_ROBOT_SEEN = false;
let CLINIC_RESEARCH_SAVED = false;
let CLINIC_SECRET_DOOR = false;
let CLINIC_LOCKED_IN = false;
let CLINIC_DOOR_LEFT = false;
let CLINIC_DOOR_RIGHT = false;

//|SLEEPER
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//|PAUSE
function pause() {
  return new Promise(resolve => {
    const pauseButton = document.createElement("button");
    pauseButton.textContent = "►"
    pauseButton.style.position = "absolute";
    pauseButton.style.bottom = "10px";
    pauseButton.style.right = "10px";
    pauseButton.style.border = "1px solid rgba(125, 125, 125, 0.5)";
    pauseButton.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
    pauseButton.style.backdropFilter = "blur(2px)";
    pauseButton.style.borderRadius = "10px";
    pauseButton.style.backgroundColor = "rgba(125, 125, 125, 0.5)";
    pauseButton.style.padding = "10px";


    pauseButton.addEventListener("pointerdown", () => {
      resolve();
      pauseButton.remove();
    });

    document.querySelector(".text-container").appendChild(pauseButton);
  });

}

//|SCENE ZERO
function sceneZero() {
    let gameContainer = document.querySelector(".container");
    gameContainer.style.backgroundImage = "url(img/00.png)";
    let textContainer = document.querySelector(".text-container");
    let userControlsContainer = document.querySelector(".user-controls-container");

    applyTypingCss(textContainer);
    typeText(
      textContainer,
      '<p>Press "wake up" to begin.</p>',
      applyGlassStylingGrey,
    );

    // create button
    let wakeUpButton = document.createElement("button");
    let townButton = document.createElement("button");

    // set button text
    wakeUpButton.textContent = "Wake up";
    townButton.textContent = "Teleport to town";

    // add styling for button
    applyGlassStylingGreyBtn(wakeUpButton);
    applyGlassStylingGreyBtn(townButton);

    // append button to user controls container
    userControlsContainer.appendChild(wakeUpButton);
    userControlsContainer.appendChild(townButton);

    // CLICK
  wakeUpButton.addEventListener("pointerup", function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);
    // Clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    userControlsContainer.removeChild(wakeUpButton);
    userControlsContainer.removeChild(townButton);
    // start SceneOne
    sceneOne();
  });

  townButton.addEventListener("pointerup", function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);
    // Clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    userControlsContainer.removeChild(wakeUpButton);
    userControlsContainer.removeChild(townButton);
    // start SceneOne
    sceneTownSquare();
  });
}

//|SCENE ONE
async function sceneOne() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/01.jpg)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let headerBtn = document.getElementById("header-button");
  headerBtn.style.display = "block";

  let userControlsContainer = document.querySelector(".user-controls-container");
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
    applyGlassStylingGreen,
  );

  await sleep(1500);

  await typeText(
    textContainer,
    "<p>You open your eyes and stare up at the sky, you find yourself laying on your back in the forest. You push your hands against the damp earth and lift yourself into a sitting position.</p>",
    applyGlassStylingRed,
  );

  await sleep(1500);
  
  textContainer.innerHTML = "";

  gameContainer.style.backgroundImage = "url(img/01.jpg)";
  gameContainer.style.transition = "background-image 3s ease-in-out";

  await typeTextItalic(
    textContainer,
    "<p>How did I get here? Last thing I remember...</p>",
    applyGlassStylingGreen,
  );

  await sleep(1500);

  textContainer.innerHTML = "";

  await typeTextItalic(
    textContainer,
    "<p>Bright lights...</p>",
    applyGlassStylingGreen,
  )

  await sleep(1500);

  textContainer.innerHTML = "";

  await typeTextItalic(
    textContainer,
    "<p>Someone... speaking to me...</p>",
    applyGlassStylingGreen,
  )

  await sleep(1500);

  textContainer.innerHTML = "";

  await typeText(
    textContainer,
    "<p>As you lift yourself to your feet you cry out as a sharp pain in your right leg causes you to fall over.</p>",
    applyGlassStylingRed,
  );

  // append button to user controls container
  userControlsContainer.appendChild(inspectBtn);
  userControlsContainer.appendChild(lookBtn);

  inspectBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true
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

//|SCENE TWO
  async function sceneTwo() {
    let gameContainer = document.querySelector(".container");
    gameContainer.style.backgroundImage = "url(img/03.jpg)";
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
      gameContainer.style.backgroundImage = "url(img/01.jpg)";
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

//|SCENE COTTAGE
  
async function sceneCottage() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/05.jpg)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  //header title
  setCurrentSceneTitle("The Cottage");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  //create button
  let enterBtn = document.createElement("button");
  let townBtn = document.createElement("button");
  let exitBtn = document.createElement("button");
  let readLetterBtn = document.createElement("button");
  let nextRoomBtn = document.createElement("button");
  let takeLetterBtn = document.createElement("button");
  let leaveRoomBtn = document.createElement("button");
  
  // set button text
  enterBtn.textContent = "Enter cottage";
  townBtn.textContent = "Continue to town";
  exitBtn.textContent = "Leave cottage for town";
  readLetterBtn.textContent = "Read letter";
  nextRoomBtn.textContent = "Go to next room";
  takeLetterBtn.textContent = "Take letter";
  leaveRoomBtn.textContent = "Leave room";

  // add styling for button
  applyGlassStylingGreyBtn(enterBtn);
  applyGlassStylingGreyBtn(townBtn);
  applyGlassStylingGreyBtn(exitBtn);
  applyGlassStylingGreyBtn(readLetterBtn);
  applyGlassStylingGreyBtn(nextRoomBtn);
  applyGlassStylingGreyBtn(takeLetterBtn);
  applyGlassStylingGreyBtn(leaveRoomBtn);

  await typeText(
    textContainer,
    "<p>As you clear the trees, you see a small plot of land with a cottage and some patches of corn growing beside it.  It's completely silent, except for a windmill that slowly creaks as it turns. It seems no life has been here for some time... Then you see some chickens scratching and pecking around the cottage.</p>",
    applyGlassStylingRed
  );

  // append button to user controls container
  userControlsContainer.appendChild(enterBtn);
  userControlsContainer.appendChild(townBtn);

  enterBtn.addEventListener("pointerup", async function () {
    //Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // change bg
    gameContainer.style.backgroundImage = "url(img/inside-cottage.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    enterBtn.remove();
    townBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You enter the cottage through a shabby, worn wooden door. You instantly notice a horrid stench...  it's almost blinding.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>You cover your mouth and nose with your hands, and see that you are standing in a small room with a rough wooden table in the centre. a half eaten plate of food sits rotting on the edge.  there is little else in the room besides some plates and cups on wooden shelves.  another room leads off to the right.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    if (COTTAGE_LETTER == false) {
      await typeText(
        textContainer,
        "<p>There is a piece of paper next to the rotten food, it looks like a letter</p>",
        applyGlassStylingRed
      );
    }
    
    if (COTTAGE_ROOM == false) {
      userControlsContainer.appendChild(nextRoomBtn);
    }
    if (COTTAGE_LETTER == false) {
      userControlsContainer.appendChild(readLetterBtn);
    };
    userControlsContainer.appendChild(exitBtn);

  })

  readLetterBtn.addEventListener("pointerup", async function () {
    //Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    //clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    nextRoomBtn.remove();
    readLetterBtn.remove();
    exitBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>The letter is written on yellowing paper, in a neat but quivering script...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Astrid, My Love <br><br> Today was a long day, I am very tired. I just sat down to write you this letter while having my dinner, oh how I miss your cooking, and how excited I am for you to get back. It's only been a week now, so I have another while to wait, but hopefully by the time you receive this letter it will be a week closer. <br> How is your sister? I hope she has recovered from her fall by now. With you there I am sure she will heal much faster. <br> The strangest thing happened today. Cartloads of people started leaving Gammelstad, some even running into the forest. I saw it as I was taking a walk by the old road. A young man even came shouting for me to 'leave if you are wise' mumbling something about the military and the end of the world or some nonsense. These town folk are getting too much city influence these days. <br> Send my regards to your sister and the children. I will take a walk into town tomorrow to post this letter, but for now I don't feel very well, think I will have a lie down. Missing you every day. <br><br> x x Filip</p>",
      applyGlassStylingRed
    );
    
    await sleep(4000);

    userControlsContainer.appendChild(takeLetterBtn);
    if (COTTAGE_ROOM == false) {
      userControlsContainer.appendChild(nextRoomBtn);
    }
    userControlsContainer.appendChild(exitBtn);
  });

  takeLetterBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    nextRoomBtn.remove();
    takeLetterBtn.remove();
    exitBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>I could try posting this letter? Maybe it will reach Astrid.</p>",
      applyGlassStylingGreen
    );

    COTTAGE_LETTER = true;

    INVENTORY.push({ name: "Letter", description: "A letter you found at the cottage" });

    await sleep(1500);

    if (COTTAGE_ROOM == false) {
      userControlsContainer.appendChild(nextRoomBtn);
    }
    userControlsContainer.appendChild(exitBtn);
  });

  nextRoomBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // change bg
    gameContainer.style.backgroundImage = "url(img/dead-old-man.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    nextRoomBtn.remove();
    takeLetterBtn.remove();
    exitBtn.remove();

    COTTAGE_ROOM = true;
    COTTAGE_DEAD_BODY = true;

    // write new text
    await typeText(
      textContainer,
      "<p>As you enter the small bedroom, you discover the source of the stench. Laying in a wooden bed, covered up to the neck , are the bloated remains of what was once an old man. You can barely make out the grey sparse hair against the green-black skin and swarming flies. He must be dead at least a week by now...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>The smell is unbearable! I need to get out of here!</p>",
      applyGlassStylingGreen
    );

    userControlsContainer.appendChild(leaveRoomBtn);
    userControlsContainer.appendChild(exitBtn);
  });

  leaveRoomBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // change bg
    gameContainer.style.backgroundImage = "url(img/inside-cottage.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    leaveRoomBtn.remove();
    exitBtn.remove();

    await typeText(
      textContainer,
      "<p>You gasp for air as you leave the bedroom and close the door behind you. you are back in the kitchen.</p>",
      applyGlassStylingRed
    );
    if (COTTAGE_LETTER == false) {
      userControlsContainer.appendChild(readLetterBtn);
    }
    if (COTTAGE_ROOM == false) {
      userControlsContainer.appendChild(nextRoomBtn);
    }
    userControlsContainer.appendChild(exitBtn);
  });

  exitBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // change bg
    gameContainer.style.backgroundImage = "url(img/05.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    exitBtn.remove();
    nextRoomBtn.remove();
    leaveRoomBtn.remove();
    if (COTTAGE_LETTER == false) {
      readLetterBtn.remove();
    }

    // write new text
    if (COTTAGE_DEAD_BODY == true) {
      await typeText(
      textContainer,
      "<p>As you step outside the cottage, you pause to catch your breath. You feel a little dazed and shaken. You just stare at the ground in front of you.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>I only woke up an hour ago, not knowing where I am...<br>or even WHO I am...<br>And already I've seen a dead body...<br>This feels like a dream...<br>or a nightmare...<br>I suppose it can only get better from here. Gods forbid it gets worse...</p>",
      applyGlassStylingGreen
    );

    await pause();

    textContainer.innerHTML = "";

      sceneThree();
    } else {
      sceneThree();
    }
  });

  townBtn.addEventListener("pointerup", async function () {
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
    townBtn.remove();
    leaveRoomBtn.remove();

    sceneThree();
  });

}

//|SCENE THREE

async function sceneThree() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/town-in-the-distance.jpg)";
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

    gameContainer.style.backgroundImage = "url(img/town-square-2.jpg)";
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

//|SCENE TOWN SQUARE

async function sceneTownSquare() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/town-square-2.jpg)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Town Square");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let clinicBtn = document.createElement("button");
  let poolBtn = document.createElement("button");
  let innBtn = document.createElement("button");
  let hallBtn = document.createElement("button");
  let residentialBtn = document.createElement("button");
  let storeBtn = document.createElement("button");
  let churchBtn = document.createElement("button");
  let townSquareBtn = document.createElement("button");

  // set button text
  clinicBtn.textContent = "Go to Clinic";
  poolBtn.textContent = "Go to Swimming Pool";
  innBtn.textContent = "Go to Norrsund Inn";
  hallBtn.textContent = "Go to Town Hall";
  residentialBtn.textContent = "Go to Residential Area";
  storeBtn.textContent = "Go to Store";
  churchBtn.textContent = "Go to Church";
  townSquareBtn.textContent = "Go to Town Square";

  // add styling for button
  applyGlassStylingGreyBtn(clinicBtn);
  applyGlassStylingGreyBtn(poolBtn);
  applyGlassStylingGreyBtn(innBtn);
  applyGlassStylingGreyBtn(hallBtn);
  applyGlassStylingGreyBtn(residentialBtn);
  applyGlassStylingGreyBtn(storeBtn);
  applyGlassStylingGreyBtn(churchBtn);
  applyGlassStylingGreyBtn(townSquareBtn);

  await typeText(
    textContainer,
    "<p>You are standing in the town square, you can see roads leading to different areas of town. You see a notice board with a town map on it.</p>",
    applyGlassStylingRed
  );

  await sleep(1500); // normal wait time between texts

  // append button to user controls container
  userControlsContainer.appendChild(clinicBtn);
  userControlsContainer.appendChild(poolBtn); // remember to add pool visited conditional
  userControlsContainer.appendChild(innBtn);
  userControlsContainer.appendChild(hallBtn);
  userControlsContainer.appendChild(residentialBtn);
  userControlsContainer.appendChild(storeBtn);
  userControlsContainer.appendChild(churchBtn);

  clinicBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneClinic();
  });

  poolBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    scenePool();
  });

  innBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneInn();
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
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneHall();
  });

  residentialBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneResidential();
  });

  storeBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneStore();
  });

  churchBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clinicBtn.remove();
    poolBtn.remove();
    innBtn.remove();
    hallBtn.remove();
    residentialBtn.remove();
    storeBtn.remove();
    churchBtn.remove();
    townSquareBtn.remove();

    sceneChurch();
  });

}

// ******************** |ZONES| *********************************
//| SCENE CLINIC
async function sceneClinic() {
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
      "<p>NEW TEXT HERE. REMEMBER RELEVANT STYLING (NORMAL OR ITALIC) AND REMEMBER CSS</p>",
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

//| SCENE SWIMMING POOL
async function scenePool() {
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
    )

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
    gameContainer.style.backgroundImage = "url(img/little-girl.jpg)";
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
      )

      await sleep(1500);

      userControlsContainer.append(townSquareBtn);
    } else {
      userControlsContainer.appendChild(townSquareBtn); 
    }

  });
}

//| SCENE INN
async function sceneInn() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/000inn.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Norrsund Inn");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button");
  let talkBtn = document.createElement("button");
  let moneyBtn = document.createElement("button");
  let rememberBtn = document.createElement("button");
  let whereBtn = document.createElement("button");
  let surviveBtn = document.createElement("button");
  let resistanceBtn = document.createElement("button");
  let leaveBtn = document.createElement("button");
  let letterBtn = document.createElement("button");
  let fatherBtn = document.createElement("button");
  let cottageBtn = document.createElement("button");
  let filipBtn = document.createElement("button");
  let spokeToBtn = document.createElement("button");
  let spokeNotBtn = document.createElement("button");
  let nothingBtn = document.createElement("button");

  // set button text
  townSquareBtn.textContent = "Go to town square";
  talkBtn.textContent = "Talk to matriarch";
  moneyBtn.textContent = "I have no money";
  rememberBtn.textContent = "I don't remember";
  whereBtn.textContent = "Where did they go?";
  surviveBtn.textContent = "Survived?";
  resistanceBtn.textContent = "Ask about the resistance";
  leaveBtn.textContent = "Leave"; //| remember this button has text and then executes sceneTownSquare();
  letterBtn.textContent = "Show her the letter";
  fatherBtn.textContent = "Your father is dead";
  cottageBtn.textContent = "In a cottage nearby";
  filipBtn.textContent = "Tell her about filip";
  spokeToBtn.textContent = "I spoke to father jakob";
  spokeNotBtn.textContent = "I haven't spoken to father jacob";
  nothingBtn.textContent = "Nothing at the moment";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(talkBtn);
  applyGlassStylingGreyBtn(moneyBtn);
  applyGlassStylingGreyBtn(rememberBtn);
  applyGlassStylingGreyBtn(whereBtn);
  applyGlassStylingGreyBtn(surviveBtn);
  applyGlassStylingGreyBtn(resistanceBtn);
  applyGlassStylingGreyBtn(leaveBtn);
  applyGlassStylingGreyBtn(letterBtn);
  applyGlassStylingGreyBtn(fatherBtn);
  applyGlassStylingGreyBtn(filipBtn);
  applyGlassStylingGreyBtn(spokeToBtn);
  applyGlassStylingGreyBtn(spokeNotBtn);
  applyGlassStylingGreyBtn(nothingBtn);

  await typeText(
    textContainer,
    "<p>The small inn exudes warmth and charm, with its polished wooden floors and cozy hearth crackling gently. Wooden chairs and tables, each bearing the mark of countless conversations and laughter, invite patrons to linger. In one corner, the inn's matriarch, an old, greying lady with a twinkle in her eye, tends to the hearth, her wisdom evident in the lines etched upon her face</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

  // append button to user controls container
  userControlsContainer.appendChild(talkBtn);
  userControlsContainer.appendChild(townSquareBtn);

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
    talkBtn.remove();
    moneyBtn.remove();
    rememberBtn.remove();
    whereBtn.remove();
    surviveBtn.remove();
    resistanceBtn.remove();
    leaveBtn.remove();
    letterBtn.remove();
    fatherBtn.remove();
    cottageBtn.remove();
    filipBtn.remove();
    spokeToBtn.remove();
    spokeNotBtn.remove();
    nothingBtn.remove();

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
    townSquareBtn.remove(); // remove relevant buttons
    talkBtn.remove();

    if (INN_SAD == false || INN_LETTER_GIVEN == false) {
      await typeText(
        textContainer,
        "<p>As you approach the Matriarch, she stands and wipes her soot covered hands on a cloth. She offers a wary smile.</p>",
        applyGlassStylingRed
      );
  
      await sleep(1500);
  
      await typeTextItalic(
        textContainer,
        "<p>You look a bit worse for wear...<br>May I offer you some Glogg?<br>Stew?</p>",
        applyGlassStylingBlue
      );
  
      await sleep(1500);
  
      userControlsContainer.appendChild(moneyBtn);
    } else {
      await typeTextItalic(
        textContainer,
        "<p>Ah our handsome new face in town. What can I do for you deary?</p>",
        applyGlassStylingBlue
      );

      await sleep(1500);
      
      if (CHURCH_STORY == true) {
        userControlsContainer.appendChild(spokeToBtn);
      }
      if (CHURCH_STORY == false || INN_ADVICE == true) {
        userControlsContainer.appendChild(spokeNotBtn);
      }
      if (HOUSE_FLAG_COORDINATES == true && INN_ADVICE == false) {
        userControlsContainer.appendChild(resistanceBtn);
      }
      userControlsContainer.appendChild(townSquareBtn); //| just check this later
    }

  });

  moneyBtn.addEventListener("pointerup", async function () {
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
    moneyBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>Not to worry, this one's on the house.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>She gestures for you to take a seat...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You take a seat at the table closest to the the hearth while she disappears through a door behind the bar...<br><br>Moments later she returns with a steamy bowl of stew and places in on the table in front of you...</p>",
      applyGlassStylingRed
    );

    await typeText(
      textContainer,
      "<p>Your nose catches a whiff of your delicious meal and you can't remember the last time you ate anything.<br>You immediately start slurping it down.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>The Matriarch smiles as she sits down at the opposite end of the table.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>I haven't seen you around here before. You must be new.<br><br>I'm Ingrid, the proud owner of the Norrsund Inn. My family helped build this town many years ago. I was 4 years old when my father lit a fire in here for the very first time.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Ingrid smiles fondly at the crackling fire before turning her attention back to you...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Now what brings you here?</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(rememberBtn);
    if (INN_LETTER_PICKED == false && COTTAGE_LETTER == true && SWIMMING_POOL_GIRL == true) {
      userControlsContainer.appendChild(letterBtn);
    }
    if (INN_LETTER_PICKED == false && INN_FILIP_PICKED == false && INFORMATION == true) {
      userControlsContainer.appendChild(filipBtn);
    }
  });

  rememberBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rememberBtn.remove();
    letterBtn.remove();
    filipBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>I... I can't remember how I got here, or even where I came from... I awoke in the forest this morning.<br>I managed to make my way to this town, hoping to find some answers...<br>But when I got here, the town looked deserted. Where are all the people?</p>",
      applyGlassStylingGreen
    );

    await pause();
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Ingrid lets out a low sigh and folds her hands on the table.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>They left. They all went running for the hills! God only knows how many of them made it, or even how many survived...</p>",
      applyGlassStylingBlue
    );

    // append new button
    if (INN_WHERE == false) {
      userControlsContainer.appendChild(whereBtn);
    }
    if (INN_SURVIVE == false) {
      userControlsContainer.appendChild(surviveBtn);
    }
    if (INN_WHERE && INN_SURVIVE == true) {
    userControlsContainer.appendChild(townSquareBtn)
    }
  });

  whereBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    whereBtn.remove();
    surviveBtn.remove();

    // LC
    INN_WHERE = true;

    // write new text
    if (INN_SURVIVE == false) {
      await typeTextItalic(
      textContainer,
      "<p>Since you are not from around here; I think it would be wise to start from the beginning before I answer any more of your questions.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>While I am not as clued up about this entire situation as others that are left in the town might be, I can tell you that a little over a week ago the news started arriving from the City that our government is completely unhinged and that they plan to kill us all. No one is safe.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Now I am not one who blindly believes in these rumors, but the rest of the people in the town were clearly fearing for their lives.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>A while after that, another rumor spread like wildfire that a sort of 'resistance' has formed and any abled body willing to fight may join them.</p>",
      applyGlassStylingBlue
    );}

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Now, regarding where they went...</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);
    
    await typeTextItalic(
      textContainer,
      "<p>I assume they all ran to the Resistance with their tails tucked between their legs.<br><br>I have no doubt that they would pick up a weapon when the time comes. But, as you may have guessed from my tone...<br>I harbor some resentment that they did not even hesitate for a single moment before they fled this beautiful town of ours.</p>",
      applyGlassStylingBlue
    );

    // append new button
    if (INN_WHERE == false) {
      userControlsContainer.appendChild(whereBtn); // append relevant buttons
    }
    if (INN_SURVIVE == false) {
      userControlsContainer.appendChild(surviveBtn);
    }
    if (HOUSE_FLAG_COORDINATES == true) {
      userControlsContainer.appendChild(resistanceBtn);
    }
    if (INN_SURVIVE == true && INN_WHERE == true) {
      
      await pause();

      textContainer.innerHTML = "";
      
      await typeTextItalic(
        textContainer,
        "<p>Well, is there anything else I can do for you?</p>",
        applyGlassStylingBlue
      );

      await sleep(1500);

      if (HOUSE_FLAG_COORDINATES == true) {
        userControlsContainer.appendChild(resistanceBtn);
      }
      userControlsContainer.appendChild(nothingBtn);
    }
  });

  surviveBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    surviveBtn.remove();
    whereBtn.remove();

    // LC
    INN_SURVIVE = true;

    // write new text
    if (INN_WHERE == false) {
      await typeTextItalic(
      textContainer,
      "<p>Since you are not from around here; I think it would be wise to start from the beginning before I answer any more of your questions.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>While I am not as clued up about this entire situation as others that are left in the town might be, I can tell you that a little over a week ago the news started arriving from the City that our government is completely unhinged and that they plan to kill us all. No one is safe.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Now I am not one who blindly believes in these rumors, but the rest of the people in the town were clearly fearing for their lives.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>A while after that, another rumor spread like wildfire that a sort of 'resistance' has formed and any abled body willing to fight may join them.</p>",
      applyGlassStylingBlue
      );
    }

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>To answer your question...</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Some say that it is not the government that wants to kill us, but this AI system that they have been working on. Rumor has it that the system has gone haywire and sent robots and drones to shoot any human they see on sight.<br><br>Some swear they have even seen these machines snooping through the trees around town.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>I have yet to see any, but if you see them, be sure to let me know?<br>My trigger finger is itching for action.</p>",
      applyGlassStylingBlue
    );

    // append new button
    if (INN_SURVIVE == false) {
      userControlsContainer.appendChild(surviveBtn); // append relevant buttons
    }
    if (INN_WHERE == false) {
      userControlsContainer.appendChild(whereBtn);
    }
    if (HOUSE_FLAG_COORDINATES == true) {
      userControlsContainer.appendChild(resistanceBtn);
    }
    if (INN_SURVIVE == true && INN_WHERE == true) {

      await pause();

      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>Well, is there anything else I can do for you?</p>",
        applyGlassStylingBlue
      );

      await sleep(1500);

      if (HOUSE_FLAG_COORDINATES == true) {
        userControlsContainer.appendChild(resistanceBtn);
      }
      userControlsContainer.appendChild(nothingBtn);
    }
  });

  nothingBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    nothingBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>Ingrid starts getting up from the table.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Well I have a stew to tend and glasses to polish for all these customers.</p>",
      applyGlassStylingBlue
    );

    await pause();
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>She gestures to the empty Inn and chuckles, then places an aged hand on your shoulder</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Good luck out there, dear.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);
    // append new button
    userControlsContainer.appendChild(townSquareBtn); // append relevant buttons
  });

  resistanceBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    resistanceBtn.remove();
    whereBtn.remove();
    surviveBtn.remove();
    filipBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>What else can you tell me about the resistance?<br><br>I heard a CB radio broadcast in one of the houses... they gave their location, but in geographical coordinates.<br><br>Could you help me find them?</p>",
      applyGlassStylingGreen
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>She raises an eyebrow and gives you a weary look.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>I would advise you not to go into houses uninvited young man.<br>Especially in these seemingly dangerous times... but unfortunately I can't tell you any more, and I can't help you decipher these coordinates either...</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>She looks at you unblinking for a moment and then continues..</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>But I may be able to direct you to someone who can  help you.<br><br>Father Jakob used to be a military man before he became a man of the cloth.<br>He was in reconnaissance if I'm not mistaken.<br><br>He will undoubtedly be able to locate these coordinates for you, why don't you pay him a visit at the church?</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);
    // append new button
    userControlsContainer.appendChild(leaveBtn); // append relevant buttons
  });

  leaveBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    INN_ADVICE = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    leaveBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>Ingrid starts getting up from the table.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Well I have a stew to tend and glasses to polish for all these customers.</p>",
      applyGlassStylingBlue
    );

    await pause();
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>She gestures to the empty Inn and chuckles, then places an aged hand on your shoulder</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Good luck out there, dear.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>As she walks back towards the hearth she turns to you looking thoughtful...</p>",
      applyGlassStylingRed
    );
  
    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>I noticed a bit of a limp when you walked in..<br>You have a problem with your leg? Well when old Hedda fled the town she locked up the clinic and left the key with me.<br><br>I have to look for it first, but come back after you spoke to father Jakob, if I find the key, maybe we can get you something for that leg of yours.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>She flashes a quick smile and returns to her chores.</p>",
      applyGlassStylingRed
    );
    

    // append new button
    userControlsContainer.appendChild(townSquareBtn); // append relevant buttons
  });

  letterBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    INN_LETTER_PICKED = true;
    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    letterBtn.remove();
    rememberBtn.remove();
    filipBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>You're Ingrid?<br>I spoke to a little girl, Nora, near the swimming pool. She says she stays with her grandparents outside of town and that she came to visit you...<br><br>I found this letter and thought it might be best if I delivered it to you...</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Ingrid frowns and takes the letter from you.<br><br>When she is done reading she says...</p>",
      applyGlassStylingRed
    )
    
    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>I was planning on locking up early and visiting my father today. He always gets so lonely when my mother is not around, the poor soul... I'm sure he will enjoy tasting my mother's famous stew recipe while she's away. Where did you find this?</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    if (COTTAGE_DEAD_BODY == true) {
      userControlsContainer.appendChild(fatherBtn); // append relevant buttons
    } else {
      userControlsContainer.appendChild(cottageBtn);
    }
  });

  fatherBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    INN_SAD = true;
    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    fatherBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>There is no easy way to tell you this...<br>I woke up in the forest, not knowing where I am.<br>I saw a cottage and decided to ask for help and directions.<br>When I looked inside I saw the body of an elderly man... he has been dead for quite some time...</p>",
      applyGlassStylingGreen
    );

    await pause();
    
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Ingrid's face pales...<br><br>She stared woefully at the table as an uncomfortable silence filled the inn's four walls. A single tear splashed onto the table's polished surface.</p>",
      applyGlassStylingRed
    );

    await pause();
    
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>After finding her voice again she thanks you for the letter, she will let her mother know what has happened. She asks if there is anything else she can do for you.</p>",
      applyGlassStylingRed
    );

    if (HOUSE_FLAG_COORDINATES == true) {
      userControlsContainer.appendChild(resistanceBtn);
    }
    if (INFORMATION == true) {
      userControlsContainer.appendChild(filipBtn);
    }
    userControlsContainer.appendChild(townSquareBtn);
  });

  cottageBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    INN_LETTER_GIVEN = true;
    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    cottageBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>I woke up in the forest, not knowing where I am.<br>I saw a cottage and decided to ask for help and directions.<br>But when I looked inside I saw that it was empty...<br><br>I noticed that letter which had a sorrowful air to it, so I took it, with the hope that I could find somewhere to post it.<br></p>",
      applyGlassStylingGreen
    );

    await pause();
    
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Ingrid thanks you for the letter and tells you that she will check up on her father tonight.</p>",
      applyGlassStylingRed
    );

    if (HOUSE_FLAG_COORDINATES == true) {
      userControlsContainer.appendChild(resistanceBtn);
    }
    if (INFORMATION == true) {
      userControlsContainer.appendChild(filipBtn);
    }
    userControlsContainer.appendChild(townSquareBtn);
  });

  filipBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    if (SAD !== true) {
      SAD = true;
    }

    INN_FILIP_PICKED = true;
    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    filipBtn.remove();
    rememberBtn.remove();
    letterBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>Ingrid? I spoke to Father Jakob earlier about Filip...</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>She closes her eyes and holds up her hand... you let her speak.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>The good father came and told me that a stranger brought him news about Filip.<br><br>He was my father. Thank you for doing the right thing and speaking to Jakob. He will arrange the funeral.<br><br>Now I will have to take care of Nora ,until my mother returns at least. But then I will probably have to take care of her too<br><br>She chuckles but sheds a tear.</p>",
      applyGlassStylingBlue
    );

    await pause();
    
    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>But so our fates are mysteries to us. And we should be ready for what life sends our way.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>She smiles pensively as she stares into the fire, before seeming to snap back to reality and turns to you.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>I will let my mother know about this. Thank you. Is there anything else I can do for you?</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);
    // append new button
    userControlsContainer.appendChild(rememberBtn);
  });
  
  spokeToBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CLINIC_KEY = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    spokeToBtn.remove(); // remove relevant buttons

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>I spoke to Father Jakob and he helped me with the location of the resistance. I mean to find them.<br>Somehow I feel connected to this whole thing, and I need to find out why...</p>",
      applyGlassStylingGreen
    );

    await pause();
    
    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>That's very brave of you dear. Well, like I said, I found the key to the Clinic. I think I can trust you to not break the place down.<br><br>Here, take it, and go get what you need. Fix yourself up, and be careful.<br><br>You are welcome back in the Norrsund Inn any time you pass through here again.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>She smiles warmly at you and hands you the clinic key.</p>",
      applyGlassStylingRed
    );
    
    // append new button
    userControlsContainer.appendChild(townSquareBtn);
  });

  spokeNotBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    spokeNotBtn.remove(); // remove relevant buttons

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>I think you should pay him a visit, he should be at the church. No doubt he will be able to help you</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(townSquareBtn); // append relevant buttons
  });
  //more here
}

//| SCENE TOWN HALL
async function sceneHall() {
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

  // set button text
  townSquareBtn.textContent = "Go to town square";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);

  // local conditionals
  //   let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>The doors to the town hall are chained shut. There is a notice nailed to the door <br><br>'Closed until further notice' <br><br>There is a big old fashioned lock keeping the chains together.</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

  // append button to user controls container
  userControlsContainer.appendChild(townSquareBtn);

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

    sceneTownSquare();
  });
}

//| SCENE RESIDENTAIL AREA
async function sceneResidential() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/000residential-area.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Residential Area");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button");
  let lookBtn = document.createElement("button");
  let rundownHouseBtn = document.createElement("button");
  let flagHouseBtn = document.createElement("button");
  let largeHouseBtn = document.createElement("button");
  let overgrownHouseBtn = document.createElement("button");
  let whiteHouseBtn = document.createElement("button");

  // set button text
  townSquareBtn.textContent = "Go to town square";
  lookBtn.textContent = "Look at houses";
  rundownHouseBtn.textContent = "Enter the rundown house";
  flagHouseBtn.textContent = "Enter house with the flag";
  largeHouseBtn.textContent = "Enter the large house";
  overgrownHouseBtn.textContent = "Enter the overgrown house";
  whiteHouseBtn.textContent = "Enter the white house";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(lookBtn);
  applyGlassStylingGreyBtn(rundownHouseBtn);
  applyGlassStylingGreyBtn(flagHouseBtn);
  applyGlassStylingGreyBtn(largeHouseBtn);
  applyGlassStylingGreyBtn(overgrownHouseBtn);
  applyGlassStylingGreyBtn(whiteHouseBtn);

  // local conditionals
  //   let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>You enter the residential area, a grassy park with a very large Wych Elm tree is growing at the center.<br>A few wooden benches have been placed underneath the tree.<br>As you look around you can see various houses, each radiating with its own personality.</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

  // append button to user controls container
  userControlsContainer.appendChild(lookBtn);
  userControlsContainer.appendChild(townSquareBtn);

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
    lookBtn.remove();

    sceneTownSquare();
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
    townSquareBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You see a rundown and dilapitated house.<br><br>You see a neat house with a large flag outside.<br><br>You see a large house with a manicured garden.<br><br>You see a house overgrown with plants.<br><br>You see a bright white house.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(rundownHouseBtn);
    userControlsContainer.appendChild(flagHouseBtn);
    userControlsContainer.appendChild(largeHouseBtn);
    userControlsContainer.appendChild(overgrownHouseBtn);
    userControlsContainer.appendChild(whiteHouseBtn);
    userControlsContainer.appendChild(townSquareBtn);
  });
//**************************************************************************************** */
  rundownHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseRundown();
  });

  flagHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseFlag();
  });

  largeHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseLarge();
  });

  overgrownHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseOvergrown();
  });

  whiteHouseBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    rundownHouseBtn.remove();
    flagHouseBtn.remove();
    largeHouseBtn.remove();
    overgrownHouseBtn.remove();
    whiteHouseBtn.remove();
    townSquareBtn.remove();

    sceneHouseWhite();
  });

  // SCENE HOUSES
  // SCENE HOUSE RUNDOWN
  async function sceneHouseRundown() {
    let gameContainer = document.querySelector(".container");
    gameContainer.style.backgroundImage = "url(img/111rundown-house.png)"; // Add BG image
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


    if (HOUSE_RUNDOWN_ONE_AGAIN == true && HOUSE_RUNDOWN_TWO_AGAIN == true && HOUSE_RUNDOWN_THREE_AGAIN == true && HOUSE_RUNDOWN_FOUR_AGAIN == true) {
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
        )

        await pause();
        textContainer.innerHTML = "";

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
        )

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
        )

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

  async function sceneHouseFlag() {
    let gameContainer = document.querySelector(".container");
    gameContainer.style.backgroundImage = "url(img/111flag-house.png)";
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
      if (HOUSE_FLAG_FREQUENCY == true && HOUSE_FLAG_ONE == true && HOUSE_FLAG_TWO == true) {
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
        )

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
        HOUSE_FLAG_ONE = true

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
        HOUSE_FLAG_TWO = true

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

  async function sceneHouseLarge() {
    let gameContainer = document.querySelector(".container");
    gameContainer.style.backgroundImage = "url(img/111large-house.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";
  
    let userControlsContainer = document.querySelector(
      ".user-controls-container"
    );
    let textContainer = document.querySelector(".text-container");
    applyTypingCss(textContainer);
  
    // header title
    currentSceneTitle = "The Large House";
    document.getElementById("header-title").textContent = currentSceneTitle;
  
    // create button
    let leaveBtn = document.createElement("button");
    let knockBtn = document.createElement("button");
    let askBtn = document.createElement("button");
    let enterBtn = document.createElement("button");
    let ascendBtn = document.createElement("button");
    let exploreBtn = document.createElement("button");
    let mantleBtn = document.createElement("button");
    let examineBtn = document.createElement("button");
    let hallwayBtn = document.createElement("button");
    let otherBtn = document.createElement("button");
    let firstDoorRightBtn = document.createElement("button");
    let firstDoorLeftBtn = document.createElement("button");
    let upstairsHallwayBtn = document.createElement("button");
    let secondDoorRightBtn = document.createElement("button");
    let secondDoorLeftBtn = document.createElement("button");
    let downstairsBtn = document.createElement("button");
    let inspectBodyBtn = document.createElement("button");
    let inspectRoomBtn = document.createElement("button");
    let leaveRoomBtn = document.createElement("button");
    let inspectDeskBtn = document.createElement("button");
    let inspectShelfBtn = document.createElement("button");
    let safeBtn = document.createElement("button");
    let tryAgainBtn = document.createElement("button");
    let takeBtn = document.createElement("button");
    let mayorLetterBtn = document.createElement("button");
    let noSenderLetterBtn = document.createElement("button");
    let keyBtn = document.createElement("button");
  
    // set button text
    leaveBtn.textContent = "Leave";
    knockBtn.textContent = "Knock on door";
    askBtn.textContent = "Ask if anyone's home";
    enterBtn.textContent = "Enter house";
    ascendBtn.textContent = "Ascend the staircase";
    exploreBtn.textContent = "Explore the living room";
    mantleBtn.textContent = "View pictures on the mantle";
    examineBtn.textContent = "Examine the book";
    hallwayBtn.textContent = "Return to the hallway";
    otherBtn.textContent = "Check other rooms on the ground floor";
    firstDoorRightBtn.textContent = "Try the first door on the right";
    firstDoorLeftBtn.textContent = "Try the first door on the left";
    upstairsHallwayBtn.textContent = "Continue down the hallway";
    secondDoorRightBtn.textContent = "Try the second door on the right";
    secondDoorLeftBtn.textContent = "Try the second door on the left";
    downstairsBtn.textContent = "Go downstairs";
    inspectBodyBtn.textContent = "Inspect body";
    inspectRoomBtn.textContent = "Inspect room";
    leaveRoomBtn.textContent = "Leave room";
    inspectDeskBtn.textContent = "Inspect desk";
    inspectShelfBtn.textContent = "Inspect shelf";
    safeBtn.textContent = "Attempt to open safe";
    tryAgainBtn.textContent = "Try again";
    takeBtn.textContent = "Take the map";
    mayorLetterBtn.textContent = "Read the letter addressed to the mayor";
    noSenderLetterBtn.textContent = "Read letter with no sender information";
    keyBtn.textContent = "Take key";
  
    // add styling for button
    applyGlassStylingGreyBtn(leaveBtn);
    applyGlassStylingGreyBtn(knockBtn);
    applyGlassStylingGreyBtn(askBtn);
    applyGlassStylingGreyBtn(enterBtn);
    applyGlassStylingGreyBtn(ascendBtn);
    applyGlassStylingGreyBtn(exploreBtn);
    applyGlassStylingGreyBtn(mantleBtn);
    applyGlassStylingGreyBtn(examineBtn);
    applyGlassStylingGreyBtn(hallwayBtn);
    applyGlassStylingGreyBtn(otherBtn);
    applyGlassStylingGreyBtn(firstDoorRightBtn);
    applyGlassStylingGreyBtn(firstDoorLeftBtn);
    applyGlassStylingGreyBtn(upstairsHallwayBtn);
    applyGlassStylingGreyBtn(secondDoorRightBtn);
    applyGlassStylingGreyBtn(secondDoorLeftBtn);
    applyGlassStylingGreyBtn(downstairsBtn);
    applyGlassStylingGreyBtn(inspectBodyBtn);
    applyGlassStylingGreyBtn(inspectRoomBtn);
    applyGlassStylingGreyBtn(leaveRoomBtn);
    applyGlassStylingGreyBtn(inspectDeskBtn);
    applyGlassStylingGreyBtn(inspectShelfBtn);
    applyGlassStylingGreyBtn(safeBtn);
    applyGlassStylingGreyBtn(tryAgainBtn);
    applyGlassStylingGreyBtn(takeBtn);
    applyGlassStylingGreyBtn(mayorLetterBtn);
    applyGlassStylingGreyBtn(noSenderLetterBtn);
    applyGlassStylingGreyBtn(keyBtn);
    
    await typeText(
      textContainer,
      "<p>You notice that the house you are standing outside of is much nicer than the other homes in the area.<br>The garden is neatly manicured and the door is embellished with gold trims around the frame.<br>A heavy brass knocker is mounted on the solid oak door.<br><br>Someone important must be dwelling here, however as you peer through the window you don't see any signs of movement or lights.</p>",
      applyGlassStylingRed
    );
  
    await sleep(1500);
  
    // append button to user controls container
    userControlsContainer.appendChild(knockBtn);
    userControlsContainer.appendChild(leaveBtn);
  
    knockBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      knockBtn.remove();
      leaveBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>As you rap on the heavy oak door, the sound echoes through the trees around you.</p>",
        applyGlassStylingRed
      );
  
      await sleep(1500);

      await typeText(
        textContainer,
        "<p>After a moment, you hear a creaking noise, and the door slowly swings open.<br>The interior of the large house is dimly lit by sunlight sifting though the windows, and a musty smell wafts out.</p>",
        applyGlassStylingRed
      );
  
      // append new button
      userControlsContainer.appendChild(askBtn);
      userControlsContainer.appendChild(enterBtn);
    });
    
    askBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      askBtn.remove();
      enterBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>You call out into the silent hallway...</p>",
        applyGlassStylingRed
      );
  
      await sleep(1500);

      await typeTextItalic(
        textContainer,
        "<p>Hello? Is anyone home?</p>",
        applyGlassStylingGreen
      );

      await sleep(1500);

      await typeText(
        textContainer,
        "<p>There's no immediate response, but you hear a faint rustling sound from deeper within the house.</p>",
        applyGlassStylingRed
      );
  
      // append new button
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
      askBtn.remove();
      enterBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>You cautiously step inside the grand entrance of the large house.<br>The air is heavy, and the silence seems to press against you.<br>The hallway stretches before you, adorned with faded tapestries and polished furniture.</p>",
        applyGlassStylingRed
      );
  
      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>To your left, a staircase leads to the upper floor, and to your right, a doorway opens into what appears to be a darkened living room.</p>",
        applyGlassStylingRed
      );
  
      // append new button
      userControlsContainer.appendChild(ascendBtn);
      userControlsContainer.appendChild(exploreBtn);
      userControlsContainer.appendChild(leaveBtn);
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
      exploreBtn.remove();
      otherBtn.remove();
      leaveBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>You ascend the grand staircase, which creaks beneath your weight. At the top, a corridor stretches before you, lined with closed doors.<br><br>Faint sunlight filters through the windows, casting a dim glow on the faded wallpaper.</p>",
        applyGlassStylingRed
      );
  
      await sleep(1500);
  
      // append new button
      if (LARGE_HOUSE_SECOND_ROOM_RIGHT_VIEWED_AGAIN == false) {
        userControlsContainer.appendChild(firstDoorRightBtn);
      }
      if (LARGE_HOUSE_SECOND_ROOM_LEFT_VIEWED_AGAIN == false) {
        userControlsContainer.appendChild(firstDoorLeftBtn);
      }
      userControlsContainer.appendChild(upstairsHallwayBtn);
      userControlsContainer.appendChild(downstairsBtn);
    });
    
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
      ascendBtn.remove();
      exploreBtn.remove();
      leaveBtn.remove();
  
      // write new text
      if (LARGE_HOUSE_LIVING_ROOM == false) {
        await typeText(
          textContainer,
          "<p>You enter the dimly lit living room, and your eyes adjust to the darkness.<br>The furniture is draped in sheets, a thin layer of dust has started to accumulate.<br>A fireplace sits against the far wall, its mantle adorned with old photographs and curious trinkets.</p>",
          applyGlassStylingRed
        );
  
        await pause();

        textContainer.innerHTML = "";

        await typeText(
          textContainer,
          "<p>As you investigate the room, you notice a peculiar-looking book on a small table near the fireplace.<br><br>The cover is adorned with intricate patterns, and it seems out of place among the other items displayed in this room.</p>",
          applyGlassStylingRed
        );
  
        await sleep(1500);

        // append new button
        userControlsContainer.appendChild(mantleBtn);
        userControlsContainer.appendChild(examineBtn);
        userControlsContainer.appendChild(hallwayBtn);
      } else {
        await typeText(
          textContainer,
          "<p>You step back into the living room, everything looks exactly the way you left it.</p>",
          applyGlassStylingRed
        );

        await sleep(1500);

        userControlsContainer.appendChild(mantleBtn);
        userControlsContainer.appendChild(examineBtn);
        userControlsContainer.appendChild(hallwayBtn);
      }
    });
    
    mantleBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      mantleBtn.remove();
      examineBtn.remove();
      hallwayBtn.remove();
  
      // write new text
      if (LARGE_HOUSE_PHOTOS_VIEWED == false) {
        await typeText(
          textContainer,
          "<p>You recognize the town in some of the photographs, but from many years ago. There are photographs of young men sawing logs and hammering nails. The person who lives here must have helped build this town.</p>",
          applyGlassStylingRed
        );
  
        await pause();
  
        await typeText(
          textContainer,
          "<p>Another photograph is that of a young, strong man next to the town hall. The plaque on the frame reads 'Mayor D Nilsen, 1973'.</p>",
          applyGlassStylingRed
        );
  
        await pause();
  
        await typeText(
          textContainer,
          "<p>Apart from interesting look through history, none of the other photographs pique your curiosity...</p>",
          applyGlassStylingRed
        );
  
        await pause();

        textContainer.innerHTML = "";

        await typeTextItalic(
          textContainer,
          "<p>I should have guessed an important figure such as the town's mayor would be dwelling in such a large house.</p>",
          applyGlassStylingGreen
        );

        await sleep(1500);

        LARGE_HOUSE_PHOTOS_VIEWED = true;
  
        // append new button
        userControlsContainer.appendChild(examineBtn);
        userControlsContainer.appendChild(hallwayBtn);
      } else {
        await typeText(
          textContainer,
          "<p>Apart from interesting look through history, none of the other photographs pique your curiosity...</p>",
          applyGlassStylingRed
        );

        await sleep(1500);

        userControlsContainer.appendChild(examineBtn);
        userControlsContainer.appendChild(hallwayBtn);
      }
    });
    
    examineBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      mantleBtn.remove();
      examineBtn.remove();
      hallwayBtn.remove();
  
      // write new text
      if (LARGE_HOUSE_BOOK_VIEWED == false) {
        await typeText(
          textContainer,
          "<p>You pick up the mysterious book and flip through its pages.<br><br>The book is journal written in bold authoritative strokes.<br>As you leaf through, you notice some of the more recent pages were torn out.</p>",
          applyGlassStylingRed
        );
  
        await pause();
  
        await typeText(
          textContainer,
          "<p>Some of the pages in the journal are numbered.<br>As you flip through, the numbers you find are 8, 15, 32, 89.<br><br>Nothing written on these pages seem to have any significance to the numbers.</p>",
          applyGlassStylingRed
        );
  
        await sleep(1500);

        LARGE_HOUSE_BOOK_VIEWED = true;
  
        // append new button
        userControlsContainer.appendChild(mantleBtn);
        userControlsContainer.appendChild(hallwayBtn);
      } else {
        await typeText(
          textContainer,
          "<p>You flip through the pages and notice the numbers again, 8, 15, 32, 89.<br><br>Nothing written in the rest of the journal seem to have any significance.</p>",
          applyGlassStylingRed
        );

        await sleep(1500);

        userControlsContainer.appendChild(mantleBtn);
        userControlsContainer.appendChild(hallwayBtn);
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
  
      // remove button from user controls container
      mantleBtn.remove();
      examineBtn.remove();
      hallwayBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>You leave the living room, the hallway extends further, and you can see a few more doorways leading to different rooms.</p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);

      LARGE_HOUSE_LIVING_ROOM = true;
  
      // append new button
      userControlsContainer.appendChild(otherBtn);
      userControlsContainer.appendChild(ascendBtn);
      userControlsContainer.appendChild(leaveBtn);
    });
    
    otherBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      otherBtn.remove();
      ascendBtn.remove();
      leaveBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>You walk down the hallway and try the handle of each room but find them locked.</p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);
  
      // append new button
      userControlsContainer.appendChild(ascendBtn);
      userControlsContainer.appendChild(exploreBtn);
      userControlsContainer.appendChild(leaveBtn);
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
      firstDoorRightBtn.remove();
      firstDoorLeftBtn.remove();
      upstairsHallwayBtn.remove();
      leaveBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>You descend the staircase, some leaves have blown in through the open doorway.</p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);
  
      // append new button
      userControlsContainer.appendChild(ascendBtn);
      userControlsContainer.appendChild(exploreBtn);
      userControlsContainer.appendChild(leaveBtn);
    });

    firstDoorRightBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      firstDoorLeftBtn.remove();
      firstDoorRightBtn.remove();
      upstairsHallwayBtn.remove();
      downstairsBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>You try the handle but the door is locked.</p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);

      LARGE_HOUSE_FIRST_ROOM_RIGHT = true;
  
      // append new button
      if (LARGE_HOUSE_FIRST_ROOM_LEFT_VIEWED_AGAIN == false) {
        userControlsContainer.appendChild(firstDoorLeftBtn);
      }
      userControlsContainer.appendChild(upstairsHallwayBtn);
      userControlsContainer.appendChild(downstairsBtn);
    });

    firstDoorLeftBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      firstDoorRightBtn.remove();
      firstDoorLeftBtn.remove();
      secondDoorRightBtn.remove();
      secondDoorLeftBtn.remove();
      upstairsHallwayBtn.remove();
      downstairsBtn.remove();
  
      // write new text
      if (LARGE_HOUSE_FIRST_ROOM_LEFT == false) {
        await typeText(
          textContainer,
          "<p>You open the door and peer inside, a tidy bed with oak side tables stands against the eastern wall, and a vanity table against the western wall.<br><br>This must be a guest room.</p>",
          applyGlassStylingRed
        );
    
        await sleep(1500);
        
        LARGE_HOUSE_FIRST_ROOM_LEFT = true;

        // append new button
        if (LARGE_HOUSE_FIRST_ROOM_RIGHT == false) {
          userControlsContainer.appendChild(firstDoorRightBtn);
        }
        userControlsContainer.appendChild(upstairsHallwayBtn);
        userControlsContainer.appendChild(downstairsBtn);
      } else {
        await typeText(
          textContainer,
          "<p>I don't think the owner would be amused to find me sleeping in this bed...</p>",
          applyGlassStylingGreen
        );

        LARGE_HOUSE_FIRST_ROOM_LEFT_VIEWED_AGAIN = true;

        if (LARGE_HOUSE_FIRST_ROOM_RIGHT == false) {
          userControlsContainer.appendChild(firstDoorRightBtn);
        }
        userControlsContainer.appendChild(upstairsHallwayBtn);
        userControlsContainer.appendChild(downstairsBtn);
      }
    });

    upstairsHallwayBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      upstairsHallwayBtn.remove();
      firstDoorRightBtn.remove();
      firstDoorLeftBtn.remove();
      downstairsBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>As you walk, the floorboards groan beneath your footsteps, and the silence of the house amplifies the sound.<br>A couple of doors line the hallway, each seemingly concealing its own mystery.</p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);
  
      // append new button
      if (LARGE_HOUSE_SECOND_ROOM_RIGHT_VIEWED_AGAIN == false) {
        userControlsContainer.appendChild(secondDoorRightBtn);
      }
      userControlsContainer.appendChild(secondDoorLeftBtn);
      if (LARGE_HOUSE_FIRST_ROOM_RIGHT == false) {
        userControlsContainer.appendChild(firstDoorRightBtn);
      }
      if (LARGE_HOUSE_FIRST_ROOM_LEFT_VIEWED_AGAIN == false) {
        userControlsContainer.appendChild(firstDoorLeftBtn);
      }
      userControlsContainer.appendChild(downstairsBtn);
    });

    secondDoorRightBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      secondDoorRightBtn.remove();
      secondDoorLeftBtn.remove();
      firstDoorRightBtn.remove();
      firstDoorLeftBtn.remove();
      downstairsBtn.remove();
  
      // write new text
      if (LARGE_HOUSE_SECOND_ROOM_RIGHT == false) {
        await typeText(
          textContainer,
          "<p>As you push open the door to the room, a musty smell hits your nostrils.<br>As with most of the rooms in this house; this one is also dimly lit, and the only source of light comes the cracks between the antique shutters covering the windows.<br><br>As your eyes adjust to the darkness, you notice that the walls are covered in old, cracked paintings of people with twisted, contorted faces.<br><br>There are an assortment of hunting trophies on the walls, the largest being that of a Musk Ox and the smallest an Arctic Fox.<br><br>They seem to stare at you with their lifeless eyes, and you can't shake the feeling that you're being watched.<br><br>You can't help but feel like you've stumbled upon a room that was meant to be forgotten.</p>",
          applyGlassStylingRed
        );
    
        await sleep(1500);

        LARGE_HOUSE_SECOND_ROOM_RIGHT = true;
  
        // append new button
        userControlsContainer.appendChild(secondDoorLeftBtn);
        userControlsContainer.appendChild(downstairsBtn);
      } else {
        await typeText(
          textContainer,
          "<p>That room creeped me out...</p>",
          applyGlassStylingGreen
        );

        await sleep(1500);

        LARGE_HOUSE_SECOND_ROOM_RIGHT_VIEWED_AGAIN = true;

        userControlsContainer.appendChild(secondDoorLeftBtn);
        userControlsContainer.appendChild(downstairsBtn);
      }
    });

    secondDoorLeftBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      secondDoorLeftBtn.remove();
      secondDoorRightBtn.remove();
      firstDoorRightBtn.remove();
      firstDoorLeftBtn.remove();
      downstairsBtn.remove();
  
      // write new text
      if (LARGE_HOUSE_BODY_SEEN == false) {
        await typeText(
          textContainer,
          "<p>You turn the handle of the second door on the left, and it creaks open to reveal a small study.<br>The room is filled with the scent of aged paper and leather.<br>The curtains are partly drawn.</p>",
          applyGlassStylingRed
        );
    
        await pause();

        textContainer.innerHTML = "";

        await typeText(
          textContainer,
          "<p>As you step into the room, your boot skids on something slippery, you catch your balance and stare down at the floor...<br><br>...your face pales at the sight in front of you. A man has been viciously attacked. The body of the man is slumped unnaturally against the bookshelf...<br><br>...spine protruding from the neck, neck dangling downward, head staring forward...<br><br>...his legs are broken at several locations and the arms hanging from their last tendons...</p>",
          applyGlassStylingRed
        );

        await pause();

        textContainer.innerHTML = "";

        await typeText(
          textContainer,
          "<p>The horrific scene is amplified by the amount of blood that has drained from this victim, he appears to be poised on a vermillion proscenium for his killer to regard...</p>",
          applyGlassStylingRed
        );

        await pause();

        LARGE_HOUSE_BODY_SEEN = true;

        textContainer.innerHTML = "";

        await typeText(
          textContainer,
          "<p>The sight is almost unbearable and you have the sudden urge to bolt for the entrance and never return.<br><br>You look up and the final bit of color drains from your face. You are not alone.</p>",
          applyGlassStylingRed
        );

        await pause();

        textContainer.innerHTML = "";

        await typeText(
          textContainer,
          "<p>Behind the desk looms a figure.<br>Before you could find your voice and cry out, you dash forward, leap across the desk and grab the figure by the throat.<br><br>Your eyes are probably playing tricks on you, but you see you red glow in the figure's eyes.<br>You raise your fist to strike</p>",
          applyGlassStylingRedFlicker
        );

        await pause();

        textContainer.innerHTML = "";

        await typeText(
          textContainer,
          "<p>Behind the desk looms a figure.<br>Before you could find your voice and cry out, the figure darts for the the window with blinding speed, leaping through, and landing unharmed on the ground one story below.<br><br>It disappeared into the woods.</p>",
          applyGlassStylingRed
        );

        await sleep(1500);
  
        // append new button
        userControlsContainer.appendChild(inspectBodyBtn);
        userControlsContainer.appendChild(inspectRoomBtn);
        userControlsContainer.appendChild(leaveRoomBtn);
      } else {
        await typeText(
          textContainer,
          "<p>The body is still propped up against the bookshelf, the blood has dried. You can feel your stomach turning again, whatever it is you need to do here needs to be quick.</p>",
          applyGlassStylingRed
        );

        userControlsContainer.appendChild(inspectRoomBtn);
        userControlsContainer.appendChild(leaveRoomBtn);
      };

    });

    inspectBodyBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      inspectBodyBtn.remove();
      inspectRoomBtn.remove();
      leaveRoomBtn.remove();
  
      // write new text
      if (LARGE_HOUSE_PHOTOS_VIEWED == true) {
        await typeText(
          textContainer,
          "<p>Hesitantly, you glance at the man once more, now that the shock has passed you recognize the face. It's the man from the photos in the living room, it's Mayor Nilsen!<br><br>You see the head of an old fashioned key jutting from his coat pocket.</p>",
          applyGlassStylingRed
        );
    
        await sleep(1500);
  
        // append new button
        userControlsContainer.appendChild(keyBtn);
        userControlsContainer.appendChild(inspectRoomBtn);
        userControlsContainer.appendChild(leaveRoomBtn);
      } else {
        await typeText(
          textContainer,
          "<p>Hesitantly, you glance at the man once more, it does not look like this poor soul stood a chance in this fight.</p>",
          applyGlassStylingRed
        );

        userControlsContainer.appendChild(inspectRoomBtn);
        userControlsContainer.appendChild(leaveRoomBtn);
      }
    });

    inspectRoomBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      inspectBodyBtn.remove();
      inspectRoomBtn.remove();
      keyBtn.remove();
      leaveRoomBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>A desk sits against one wall, cluttered with papers and quills. You suspect it was tidier before the figure rummaged through the drawers.<br><br>A large bookshelf dominates another wall, its shelves stacked with various volumes.</p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);
  
      // append new button
      if (LARGE_HOUSE_DESK_VIEWED == false) {
        userControlsContainer.appendChild(inspectDeskBtn);
      }
      userControlsContainer.appendChild(inspectShelfBtn);
    });

    inspectDeskBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      inspectDeskBtn.remove();
      inspectShelfBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>The figure that was going through this desk left quite the mess, but you do not think he found what he was looking for.<br><br>You quickly scan the assortment of items across the desk and find nothing of interest.</p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);

      LARGE_HOUSE_DESK_VIEWED = true;
  
      // append new button
      userControlsContainer.appendChild(inspectShelfBtn);
      userControlsContainer.appendChild(leaveRoomBtn);
    });

    inspectShelfBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      inspectShelfBtn.remove();
      inspectDeskBtn.remove();
      leaveRoomBtn.remove();
  
      // write new text
      if (LARGE_HOUSE_SAFE_FOUND == false) {
        await typeText(
          textContainer,
          "<p>You approach the bookshelf and start perusing the titles of the various books. Many of them seem to be about history, technology, and folklore.</p>",
          applyGlassStylingRed
        );
    
        await sleep(1500);

        await typeText(
          textContainer,
          "<p>Some titles catch your eye: 'Shadow on the Mountain', 'The Singularity Is Near', and 'The Secrets of the Nordic Woods'.</p>",
          applyGlassStylingRed
        );

        await pause();

        textContainer.innerHTML = "";

        await typeText(
          textContainer,
          "<p>While scanning the titles, you accidentally knock a dusty leather-bound book off the shelf.<br><br>You notice a cold steel frame against the wall from where the book fell out. You move more books to the side and reveal a hidden wall safe.</p>",
          applyGlassStylingRed
        );

        await sleep(1500);

        LARGE_HOUSE_SAFE_FOUND = true;
  
        // append new button
        userControlsContainer.appendChild(safeBtn);
        if (LARGE_HOUSE_DESK_VIEWED == false) {
          userControlsContainer.appendChild(inspectDeskBtn);
        }
        if (LARGE_HOUSE_MAYOR_KEY == false) {
          userControlsContainer.appendChild(inspectBodyBtn);
        }
        userControlsContainer.appendChild(leaveRoomBtn);
      } else {
        await typeText(
          textContainer,
          "<p>You are standing in front of the wall safe.</p>",
          applyGlassStylingRed
        );
        userControlsContainer.appendChild(safeBtn);
        if (LARGE_HOUSE_MAYOR_KEY == false) {
          userControlsContainer.appendChild(inspectBodyBtn);
        }
        if (LARGE_HOUSE_DESK_VIEWED == false) {
          userControlsContainer.appendChild(inspectDeskBtn);
        }
        userControlsContainer.appendChild(leaveRoomBtn);
      }
    });

    safeBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      safeBtn.remove();
      inspectBodyBtn.remove();
      inspectDeskBtn.remove();
      leaveRoomBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p>You jiggle at the handle... it's locked. and also not coded into the game yet.</p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);
  
      // append new button
      // userControlsContainer.appendChild(tryAgainBtn); remember this exists!
      if (LARGE_HOUSE_DESK_VIEWED == false) {
        userControlsContainer.appendChild(inspectDeskBtn);
      };
      userControlsContainer.appendChild(leaveRoomBtn);
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
      inspectBodyBtn.remove();
      inspectRoomBtn.remove();
      leaveRoomBtn.remove();
  
      // write new text
      await typeText(
          textContainer,
          "<p>Shaking, you stand in the hallway.<br><br>After what you just witnessed, every cell in you body commands you to leave this house and never speak a word of it to anyone.</p>",
          applyGlassStylingRed
        );
    
        await sleep(1500);
  
        // append new button
        userControlsContainer.appendChild(downstairsBtn);
        userControlsContainer.appendChild(leaveBtn);
    });

    inspectBodyBtn.addEventListener("pointerup", async function () {
      // Button click check
      if (isTyping || btnRecentlyClicked) return;
      btnRecentlyClicked = true;
      setTimeout(() => {
        btnRecentlyClicked = false;
      }, 1000);
  
      // Clear text container
      textContainer.innerHTML = "";
  
      // remove button from user controls container
      inspectBodyBtn.remove();
      inspectRoomBtn.remove();
      leaveRoomBtn.remove();
  
      // write new text
      await typeText(
        textContainer,
        "<p></p>",
        applyGlassStylingRed
      );
    
      await sleep(1500);
  
      // append new button
      userControlsContainer.appendChild(keyBtn);
      userControlsContainer.appendChild(inspectRoomBtn);
      userControlsContainer.appendChild(leaveRoomBtn);
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
      knockBtn.remove();
      leaveBtn.remove();
      askBtn.remove()
      enterBtn.remove()
      ascendBtn.remove()
      exploreBtn.remove()
      mantleBtn.remove()
      examineBtn.remove()
      hallwayBtn.remove()
      otherBtn.remove()
      firstDoorRightBtn.remove()
      firstDoorLeftBtn.remove()
      upstairsHallwayBtn.remove()
      secondDoorRightBtn.remove()
      secondDoorLeftBtn.remove()
      downstairsBtn.remove()
      inspectBodyBtn.remove()
      inspectRoomBtn.remove()
      leaveRoomBtn.remove()
      inspectDeskBtn.remove()
      inspectShelfBtn.remove()
      safeBtn.remove()
      tryAgainBtn.remove()
      takeBtn.remove()
      mayorLetterBtn.remove()
      noSenderLetterBtn.remove()
      keyBtn.remove()

      if (LARGE_HOUSE_BODY_SEEN == true && LARGE_HOUSE_ENTERING_SECOND_TIME == false) {
        await typeTextItalic(
          textContainer,
          "<p>I'm a stranger in this town. It's best to keep my head down and not tell anyone about what I just saw...</p>",
          applyGlassStylingGreen
        );

        await pause();

        LARGE_HOUSE_ENTERING_SECOND_TIME = true;
        
        textContainer.innerHTML = "";

        sceneResidential();
      } else {

        sceneResidential();
      }
    });

  }
  
  async function sceneHouseOvergrown() {
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

      userControlsContainer.appendChild(leaveBtn)
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

      INVENTORY.push({ name: "Cat Toy", description: "A fish-shaped cat toy you found at the overgrown house." });
  
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

  async function sceneHouseWhite() {
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
  // more house scenes here below }
}

//| SCENE STORE
async function sceneStore() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/000store.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Store");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button"); // create buttons for scene

  // set button text
  townSquareBtn.textContent = "Go to town square";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);

  // local conditionals
  //   let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>As you enter, the bell chimes a whimsical tone. The shelves are sparse but there are still some items for sale here. Perhaps the storekeeper is waiting for a delivery, or the town's people stocked up for the long winter...</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

  // append button to user controls container
  userControlsContainer.appendChild(townSquareBtn);

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

    sceneTownSquare();
  });
}

//| SCENE CHURCH
async function sceneChurch() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/000church.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  setCurrentSceneTitle("Church");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button"); // create buttons for scene

  // set button text
  townSquareBtn.textContent = "Go to town square";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);

  // local conditionals
  //   let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>You follow the direction of the signpost that points towards the church, however when you reach the imposing structure, you almost think that you have reached the wrong building.</p>",
    applyGlassStylingRed
  );

  await sleep(2000);

  textContainer.innerHTML = "";

  await typeText(
    textContainer,
    "<p>The church is unexpectedly tall, made completely of wood, and pitch black with very slanted rooves. It also looks like it could be hundreds of years old.<br>The high pointed roof tops are adorned with odd shapes that remind you of snakes or dragons.<br>There is also a small cemetery on the right side of the building.<br><br>The narrow door stands open, but you feel almost afraid to go inside...</p>",
    applyGlassStylingRed
  );

  // append button to user controls container
  userControlsContainer.appendChild(townSquareBtn);

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

    sceneTownSquare();
  });
}
