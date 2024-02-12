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
  element.style.fontFamily = "monospace";
  element.style.fontSize = "1em";
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
let LETTER = false;
let COORDINATES = false;
let GIRL = false;
let INFORMATION = false;
let ADVICE = false;
let STORY = false;
let CLINIC_KEY = false; // check this when you get there

//|SLEEPER
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//|PAUSE
function pause() {
  return new Promise(resolve => {
    const pauseButton = document.createElement("button");
    pauseButton.textContent = "..."
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
    wakeUpButton.textContent = "wake up";
    townButton.textContent = "teleport to town";

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
  inspectBtn.textContent = "inspect leg";
  lookBtn.textContent = "look at your surroundings";
  helpBtn.textContent = "find help";

  // add styling for button
  applyGlassStylingGreyBtn(inspectBtn);
  applyGlassStylingGreyBtn(lookBtn);
  applyGlassStylingGreyBtn(helpBtn);

  // once offs
  let LEG = false;
  let LOOK = false;

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
  await pause();
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
  await pause();
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
    LEG = true;
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
    if (LEG == true) {
      userControlsContainer.appendChild(helpBtn);
    }
    if (LOOK == false) {
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
    LOOK = true;
    // write new text
    await typeText(
      textContainer,
      "<p>You are standing in a dark forest, the morning sun just barely breaking through the thick canopy. It is silent except for a few birds in the distance. You can see what appears to be a disused forest path.</p>",
      applyGlassStylingRed
    );
    // append new button
    if (LEG == false) {
      userControlsContainer.appendChild(inspectBtn);
    }
    if (LEG == true) {
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
    inspectBtn.textContent = "inspect sign post";
    leftBtn.textContent = "go left";
    rightBtn.textContent = "go right";
    townBtn.textContent = "continue to town";
    investigateBtn.textContent = "investigate cottage";

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
    userControlsContainer.appendChild(rightBtn);

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
        "<p>You brush away the leaves to reveal the signage. <br><br> An arrow poining left 'Holmesburrow 1.5km'. <br><br> An arrow pointing right 'Neo-Norway 20km'</p>",
        applyGlassStylingRed
      );
      //append buttons
      userControlsContainer.appendChild(leftBtn);
      userControlsContainer.appendChild(rightBtn);
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

      await sleep(1500);
      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>...Nestled amidst rolling hills and surrounded by a lush, dense forest, the small town of Holmesburrow once stood as a picture of idyllic serenity. <br> Its charming, neat rows of cottages with colorful shutters and white picket fences exuded a timeless charm that seemed frozen in the past...</p>",
        applyGlassStylingRed
      );

      await sleep(1500);
      textContainer.innerHTML = "";
      await typeText(
        textContainer,
        "<p>...Thanks to your cumbersome injury, a trip that would have taken you 20 minutes has turned into an hour, nevertheless; the rooftops of Holmesburrow become visible in the distance...</p>",
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
      // write new text
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
      // write new text
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
  enterBtn.textContent = "enter cottage";
  townBtn.textContent = "continue to town";
  exitBtn.textContent = "leave cottage for town";
  readLetterBtn.textContent = "read letter";
  nextRoomBtn.textContent = "go to next room";
  takeLetterBtn.textContent = "take letter";
  leaveRoomBtn.textContent = "leave room";

  // add styling for button
  applyGlassStylingGreyBtn(enterBtn);
  applyGlassStylingGreyBtn(townBtn);
  applyGlassStylingGreyBtn(exitBtn);
  applyGlassStylingGreyBtn(readLetterBtn);
  applyGlassStylingGreyBtn(nextRoomBtn);
  applyGlassStylingGreyBtn(takeLetterBtn);
  applyGlassStylingGreyBtn(leaveRoomBtn);

  let ROOM = false;

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
    if (LETTER == false) {
      await typeText(
        textContainer,
        "<p>There is a piece of paper next to the rotten food, it looks like a letter</p>",
        applyGlassStylingRed
      );
    }
    
    if (ROOM == false) {
      userControlsContainer.appendChild(nextRoomBtn);
    }
    if (LETTER == false) {
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
    typeTextItalic(
      textContainer,
      "<p>Astrid, My Love <br><br> Today was a long day, I am very tired. I just sat down to write you this letter while having my dinner, oh how I miss your cooking, and how excited I am for you to get back. It's only been a week now, so I have another while to wait, but hopefully by the time you receive this letter it will be a week closer. <br> How is your sister? I hope she has recovered from her fall by now. With you there I am sure she will heal much faster. <br> The strangest thing happened today. Cartloads of people started leaving Holmesburrow, some even running into the forest. I saw it as I was taking a walk by the old road. A young man even came shouting for me to 'leave if you are wise' mumbling something about the military and the end of the world or some nonsense. These town folk are getting too much city influence these days. <br> Send my regards to your sister and the children. I will take a walk into town tomorrow to post this letter, but for now I don't feel very well, think I will have a lie down. Missing you every day. <br><br> x x Filip</p>",
      applyGlassStylingRedFlicker
    );
    
    await sleep(4000);
    userControlsContainer.appendChild(takeLetterBtn);
    if (ROOM == false) {
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
    LETTER = true;
    INVENTORY.push({ name: "Letter", description: "A letter you found at the cottage" });
    await sleep(1000);
    if (ROOM == false) {
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
    gameContainer.style.backgroundImage = "url(img/inside-cottage-bedroom.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";
    // clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    nextRoomBtn.remove();
    takeLetterBtn.remove();
    exitBtn.remove();

    // local conditional
    ROOM = true;
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
    if (LETTER == false) {
      userControlsContainer.appendChild(readLetterBtn);
    }
    if (ROOM == false) {
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
    if (LETTER == false) {
      readLetterBtn.remove();
    }
    // write new text
    await typeText(
      textContainer,
      "<p>As you step outside the cottage, you pause to catch your breath. You feel a little dazed and shaken. You just stare at the ground in front of you.</p>",
      applyGlassStylingRed
    );
    await sleep(1500);
    await typeTextItalic(
      textContainer,
      "<p>I only woke up an hour ago, not knowing where I am... or even WHO I am... and already I've seen a dead body... This feels like a dream.... or a nightmare. I suppose it can only get better from here. Gods forbid it gets worse...</p>",
      applyGlassStylingGreen
    );
    await sleep(2000);
    textContainer.innerHTML = "";
    sceneThree();
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
  lookBtn.textContent = "look around";
  townSquareBtn.textContent = "go to town square";
  marketBtn.textContent = "go to market";
  leftBtn.textContent = "investigate forest path";
  walkBtn.textContent = "walk further";

  // add styling for button
  applyGlassStylingGreyBtn(lookBtn);
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(marketBtn);
  applyGlassStylingGreyBtn(leftBtn);
  applyGlassStylingGreyBtn(walkBtn);

  // market once off
  let MARKET = false;

  await typeTextItalic(
    textContainer,
    "<p>... The picturesque town sits in eerie silence, it appears most of the townsfolk has locked their doors and went... somewhere... The air is filled with a haunting stillness, broken only by the occasional whispering breeze that rustles the leaves...</p>",
    applyGlassStylingRed
  );

  await sleep(1500);

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

    gameContainer.style.backgroundImage = "url(img/town-square.jpg)";
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
    MARKET = true;

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
    if (MARKET == false) {
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
      "<p>Bad idea, I might get lost up there... Maybe I should try to find out where this leads first.</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(townSquareBtn);
    if (MARKET == false) {
      userControlsContainer.appendChild(marketBtn);
    }
  });
}

//|SCENE TOWN SQUARE

async function sceneTownSquare() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/town-square.jpg)";
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
  clinicBtn.textContent = "go to clinic";
  poolBtn.textContent = "go to swimming pool";
  innBtn.textContent = "go to norrsund inn";
  hallBtn.textContent = "go to town hall";
  residentialBtn.textContent = "go to residential area";
  storeBtn.textContent = "go to store";
  churchBtn.textContent = "go to church";
  townSquareBtn.textContent = "go to town square";

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

    // write new text
    sceneClinic();
    // if he has key, add new options here *****
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

    // write new text
    scenePool();
    // if he has key, add new options here *****
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

    // write new text
    sceneInn();
    // if he has key, add new options here *****
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

    // write new text
    sceneHall();
    // if he has key, add new options here *****
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

    // write new text
    sceneResidential();
    // if he has key, add new options here *****
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

    // write new text
    sceneStore();
    // if he has key, add new options here *****
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

    // write new text
    sceneChurch();
    // if he has key, add new options here *****
  });

}

// ******************** |ZONES| *********************************
//| SCENE CLINIC
async function sceneClinic() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/000clinic.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";

  let userControlsContainer = document.querySelector(".user-controls-container");
  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title

  setCurrentSceneTitle("Clinic");
  document.getElementById("header-title").textContent = getCurrentSceneTitle();

  // create button
  let townSquareBtn = document.createElement("button"); // create buttons for scene

  // set button text
  townSquareBtn.textContent = "go to town square";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);

  // local conditionals
//   let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>The doors to the clinic are chained shut, a heavy silver padlock glistens in the sunlight</p>",
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
  townSquareBtn.textContent = "go to town square";
  talkBtn.textContent = "talk to the girl";
  whatBtn.textContent = "what are you doing here?";
  whereBtn.textContent = "where are your parents?";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(talkBtn);
  applyGlassStylingGreyBtn(whatBtn);
  applyGlassStylingGreyBtn(whereBtn);

  // local conditionals

  if (GIRL == true) {
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
  if (GIRL == true) {
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

    GIRL = true;
    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    townSquareBtn.remove();
    talkBtn.remove();

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
    talkBtn.remove(); // remove relevant buttons
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
    userControlsContainer.appendChild(whereBtn); // append relevant buttons
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
    whereBtn.remove(); // remove relevant buttons

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

    await sleep(1500);
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Before you could respond, Nora picked up her ball and ran through the gate. You could see tears welling up in her eyes.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);
    
    if (LETTER == true) {
      textContainer.innerHTML = "";
      await typeTextItalic(
        textContainer,
        "<p>I wonder if she knows about her grandfather?<br><br>I should speak to her aunt, Ingrid.</p>",
        applyGlassStylingGreen
      )

      await sleep(1500);

      userControlsContainer.append(townSquareBtn);
    } else {
      // append new button
      userControlsContainer.appendChild(townSquareBtn); // append relevant buttons
    }

  });
  // more here
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
  let filipBtn = document.createElement("button");
  let spokeToBtn = document.createElement("button");
  let spokeNotBtn = document.createElement("button");
  let nothingBtn = document.createElement("button");

  // set button text
  townSquareBtn.textContent = "go to town square";
  talkBtn.textContent = "talk to matriarch";
  moneyBtn.textContent = "i have no money";
  rememberBtn.textContent = "i don't remember";
  whereBtn.textContent = "where did they go?";
  surviveBtn.textContent = "survived?";
  resistanceBtn.textContent = "ask about the resistance";
  leaveBtn.textContent = "leave"; //| remember this button has text and then executes sceneTownSquare();
  letterBtn.textContent = "show her the letter";
  fatherBtn.textContent = "your father is dead";
  filipBtn.textContent = "tell her about filip";
  spokeToBtn.textContent = "i spoke to father jakob";
  spokeNotBtn.textContent = "i haven't spoken to father jacob";
  nothingBtn.textContent = "nothing at the moment";

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

  // local conditionals
  let SAD = false;
  let WHERE = false;
  let SURVIVE = false;
  let LETTER_PICKED = false;
  let FILIP_PICKED = false;

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

    if (SAD == false) {
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
      
      if (STORY == true) {
        userControlsContainer.appendChild(spokeToBtn);
      }
      if (STORY == false || ADVICE == true) {
        userControlsContainer.appendChild(spokeNotBtn);
      }
      if (COORDINATES == true && ADVICE == false) {
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

    await sleep(1500);
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

    await sleep(1500);
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

    await sleep(1500);
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
    if (LETTER_PICKED == false && LETTER == true && GIRL == true) {
      userControlsContainer.appendChild(letterBtn);
    }
    if (LETTER_PICKED == false && FILIP_PICKED == false && INFORMATION == true) {
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

    await sleep(2000);
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Ingrid lets out a low sigh and folds her hands on the table.</p>",
      applyGlassStylingRed
    );

    await typeTextItalic(
      textContainer,
      "<p>They left. They all went running for the hills! God only knows how many of them made it, or even how many survived...</p>",
      applyGlassStylingBlue
    );

    // append new button
    if (WHERE == false) {
      userControlsContainer.appendChild(whereBtn);
    }
    if (SURVIVE == false) {
      userControlsContainer.appendChild(surviveBtn);
    }
    if (WHERE && SURVIVE == true) {
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
    WHERE = true;

    // write new text
    if (SURVIVE == false) {
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

    await sleep(2000);

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

    await sleep(1500);
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
    if (WHERE == false) {
      userControlsContainer.appendChild(whereBtn); // append relevant buttons
    }
    if (SURVIVE == false) {
      userControlsContainer.appendChild(surviveBtn);
    }
    if (COORDINATES == true) {
      userControlsContainer.appendChild(resistanceBtn);
    }
    if (SURVIVE == true && WHERE == true) {

      textContainer.innerHTML = "";
      
      await typeTextItalic(
        textContainer,
        "<p>Well, is there anything else I can do for you?</p>",
        applyGlassStylingBlue
      );
      await sleep(1500);
      if (COORDINATES == true) {
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
    SURVIVE = true;

    // write new text
    if (WHERE == false) {
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

    await sleep(2000);

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

    await sleep(1500);
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

    await sleep(1500);

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>I have yet to see any, but if you see them, be sure to let me know?<br>My trigger finger is itching for action.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    if (SURVIVE == false) {
      userControlsContainer.appendChild(surviveBtn); // append relevant buttons
    }
    if (WHERE == false) {
      userControlsContainer.appendChild(whereBtn);
    }
    if (COORDINATES == true) {
      userControlsContainer.appendChild(resistanceBtn);
    }
    if (SURVIVE == true && WHERE == true) {

      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>Well, is there anything else I can do for you?</p>",
        applyGlassStylingBlue
      )
      await sleep(1500);
      if (COORDINATES == true) {
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

    await sleep(2000);

    await typeTextItalic(
      textContainer,
      "<p>Well I have a stew to tend and glasses to polish for all these customers.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);
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

    await sleep(1500);
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

    await sleep(1500);
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

    await sleep(1500)

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

    ADVICE = true;

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

    await sleep(2000);

    await typeTextItalic(
      textContainer,
      "<p>Well I have a stew to tend and glasses to polish for all these customers.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);
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

    await sleep(1500);
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

    LETTER_PICKED = true;
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
    userControlsContainer.appendChild(fatherBtn); // append relevant buttons
  });

  fatherBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    SAD = true;
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

    await sleep(1500);
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Ingrid's face pales...<br><br>She stared woefully at the table as an uncomfortable silence filled the inn's four walls. A single tear splashed onto the table's polished surface.</p>",
      applyGlassStylingRed
    );

    await sleep(2000);
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>After finding her voice again she thanks you for the letter, she will let her mother know what has happened. She asks if there is anything else she can do for you.</p>",
      applyGlassStylingRed
    );

    if (COORDINATES == true) {
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

    FILIP_PICKED = true;
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

    await sleep(1500);
    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>The good father came and told me that a stranger brought him news about Filip.<br><br>He was my father. Thank you for doing the right thing and speaking to Jakob. He will arrange the funeral.<br><br>Now I will have to take care of Nora ,until my mother returns at least. But then I will probably have to take care of her too<br><br>She chuckles but sheds a tear.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);
    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>But So our fates are mysteries to us. And we should be ready for what life sends our way.</p>",
      applyGlassStylingBlue
    );

    await typeText(
      textContainer,
      "<p>She smiles pensively as she stares into the fire, before seeming to snap back to reality and turns to you.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);
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

    await sleep(1500);
    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>That's very brave of you dear. Well, like I said, I found the key to the Clinic. I think I can trust you to not break the place down.<br><br>Here, take it, and go get what you need. Fix yourself up, and be careful.<br><br>You are welcome back in the Norrsund Inn any time you pass through here again.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);
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
  townSquareBtn.textContent = "go to town square";

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
  townSquareBtn.textContent = "go to town square";
  lookBtn.textContent = "look at houses";
  rundownHouseBtn.textContent = "enter the rundown house";
  flagHouseBtn.textContent = "enter house with the flag";
  largeHouseBtn.textContent = "enter the large house";
  overgrownHouseBtn.textContent = "enter the overgrown house";
  whiteHouseBtn.textContent = "enter the white house";

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
    currentSceneTitle = "The Rundown House"; // Add title
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
    exploreBtn.textContent = "explore the house";
    leaveBtn.textContent = "leave, this place gives you the creeps";
    ascendBtn.textContent = "ascend the stairs";
    closedDoorBtn.textContent = "open the closed door";
    hallwayBtn.textContent = "go down the hallway";
    openDoorBtn.textContent = "enter the open door";
    goBackBtn.textContent = "go downstairs and leave the house";
    leaveRoomTwoBtn.textContent = "leave";

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
    let ONE = false;
    let TWO = false;
    let THREE = false;
    let FOUR = false;

    if (ONE == true && TWO == true && THREE == true && FOUR == true) {
          await typeText(
            textContainer,
            "<p>You have already explored this house, there is nothing of interest here.</p>",
            applyGlassStylingRed
          );

      await sleep(1500);
      
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
      await typeText(
        textContainer,
        "<p>You walk into the living room, crunching leaves as you step.<br>What little furniture is left has either rotted with damp, or fell victim to insects and rodents.<br><br>You wonder why someone would just abandon their home like this. There is nothing much to look at, but there is a staircase leading to the upper floor.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      // append new button
      userControlsContainer.appendChild(ascendBtn);
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
      leaveBtn.remove();

      // write new text
      await typeText(
        textContainer,
        "<p>You walk towards the stairs, crunching leaves as you go, when you suddenly step on something soft... You recoil in surprise.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);
      textContainer.innerHTML = "";
      
      await typeText(
        textContainer,
        "<p>You look down to see what it is that you stepped on, and make out something furry between the leaves...<br><br>Looking closer you see that it's a dead rat...  as you step over it you notice that the rat isn't skeletal or dry... in fact there is some blood on the floor around it...</p>",
        applyGlassStylingRed
      );

      await sleep(1500);
      textContainer.innerHTML = "";

      await typeTextItalic(
        textContainer,
        "<p>It looks like it was stomped on... and not too long ago either...</p>",
        applyGlassStylingGreen
      )

      await sleep(1500);
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

      // append new button
      userControlsContainer.appendChild(closedDoorBtn);
      userControlsContainer.appendChild(hallwayBtn);
      userControlsContainer.appendChild(openDoorBtn);
      userControlsContainer.appendChild(goBackBtn);
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
      if (ONE == false) {
        await typeText(
          textContainer,
          "<p>You open the door with a creak, and you are shocked to see that there is a whole wall missing in this room.<br>Instead you are looking at rustling leaves with a light breeze blowing on your face.<br><br>You couldn't see this side of the house from the road, it is clearly more decayed than it looked from the outside.<br><br>Here is nothing else in this room and you decide to leave before the floor also gives way under you.</p>",
          applyGlassStylingRed
          );
          
          await sleep(1500);
          // append new button
          userControlsContainer.appendChild(hallwayBtn);
          userControlsContainer.appendChild(openDoorBtn);
          userControlsContainer.appendChild(goBackBtn);
        } else {
          await typeTextItalic(
            textContainer,
            "<p>I should probably not go back in there, the floor might cave in at any moment.<p>",
            applyGlassStylingGreen
            )
            
            await sleep(1500);
            
            userControlsContainer.appendChild(hallwayBtn);
            userControlsContainer.appendChild(openDoorBtn);
            userControlsContainer.appendChild(goBackBtn);
          }
          ONE = true;
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
      if (TWO == false) {
        await typeText(
          textContainer,
          "<p>You walk to the end of the hallway and peer into the room there.<br>This must have been the main bedroom.<br>There is still a very badly worn bed here, with an equally worse for wear desk and bedside table, and a very worn and threadbare rug.<br><br>There is nothing else of interest.</p>",
          applyGlassStylingRed
        );

        await sleep(1500);

        userControlsContainer.appendChild(leaveRoomTwoBtn);
      } else {
        await typeTextItalic(
          textContainer,
          "<p>I didn't see anything of value here...</p>",
          applyGlassStylingGreen
        )

        await sleep(1500);
        
        userControlsContainer.appendChild(closedDoorBtn);
        userControlsContainer.appendChild(hallwayBtn);
        userControlsContainer.appendChild(openDoorBtn);
        userControlsContainer.appendChild(goBackBtn);
      }
      TWO = true;
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
      userControlsContainer.appendChild(closedDoorBtn);
      userControlsContainer.appendChild(hallwayBtn);
      userControlsContainer.appendChild(openDoorBtn);
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
      if (THREE == false) {
        await typeText(
          textContainer,
          "<p>You look into the room through the open doorway and see nothing of interest.<br>There is a small desk in the room, its drawers lying on the floor with random papers scattered around.<br><br>You turn around and exit the room.</p>",
          applyGlassStylingRed
        );

        await sleep(1500);

        userControlsContainer.appendChild(closedDoorBtn);
        userControlsContainer.appendChild(hallwayBtn);
        userControlsContainer.appendChild(openDoorBtn);
        userControlsContainer.appendChild(goBackBtn);
      } else {
        await typeTextItalic(
          textContainer,
          "<p>There was nothing in there for me.</p>",
          applyGlassStylingGreen
        )

        await sleep(1500);
        
        userControlsContainer.appendChild(closedDoorBtn);
        userControlsContainer.appendChild(hallwayBtn);
        userControlsContainer.appendChild(openDoorBtn);
        userControlsContainer.appendChild(goBackBtn);
      }
      THREE = true;
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
      
      FOUR = true;
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
  // more here
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
  townSquareBtn.textContent = "go to town square";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);

  // local conditionals
  //   let ONCEOFF = false;

  await typeText(
    textContainer,
    "<p>As you enter, the bell chimes a whimsical tone. The shelves are sparse but there are still some items for sale here. Perhaps the store keeper is waiting for a delivery, or the town's people stocked up for the long winter...</p>",
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
  townSquareBtn.textContent = "go to town square";

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
