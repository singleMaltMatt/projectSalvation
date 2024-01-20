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

let isUserInterrupted = false;
let interruptionIndex = 0;
let btnRecentlyClicked = false;

/* COLOR: GREY */
function applyGlassStylingGrey(element) {
  element.style.border = "1px solid rgba(125, 125, 125, 0.5)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "8px";
  element.style.backgroundColor = "rgba(125, 125, 125, 0.5)";
  element.style.textAlign = "left";
}

/* COLOR: RED */
function applyGlassStylingRed(element) {
  element.style.border = "1px solid rgba(234, 108, 108, 0.2)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "8px";
  element.style.backgroundColor = "rgba(234, 108, 108, 0.2)";
  element.style.textAlign = "left";
}

/* COLOR: GREEN */
function applyGlassStylingGreen(element) {
  element.style.border = "1px solid rgba(117, 224, 108, 0.2)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "8px";
  element.style.backgroundColor = "rgba(117, 224, 108, 0.2)";
  element.style.textAlign = "left";
}

/* COLOR: BLUE */
function applyGlassStylingBlue(element) {
  element.style.border = "1px solid rgba(108, 149, 224, 0.2)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "8px";
  element.style.backgroundColor = "rgba(108, 149, 224, 0.2)";
  element.style.textAlign = "left";
}

function applyGlassStylingGreyBtn(element) {
  element.style.border = "1px solid rgba(125, 125, 125, 0.5)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "15px";
  element.style.backgroundColor = "rgba(125, 125, 125, 0.5)";
  element.style.textAlign = "center";
  element.style.width = "75%";
}

async function typeText(element, html, boxColor, delay = 30, isJitter = false) {
  const regex = /<[^>]*>|[^<]+/g;
  const parts = html.match(regex);
  element.style.fontStyle = "normal";
  let content;
  if (isJitter) {
    content = html.replace(/<[^>]*>/g, ""); // strips HTML tages from the entire HTML string
  }
  for (let part of parts) {
    if (part.startsWith("<p")) {
      let p = document.createElement("p");
      boxColor(p); // apply the color style to the paragraph
            if (isJitter) {
              let textContainer = document.querySelector(".text-container");
              textContainer.classList.add("jitter-text");
              textContainer.setAttribute("data-text", content);
              console.log(content);
            }
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
}

async function typeTextItalic(element, html, boxColor, delay = 30) {
  const regex = /<[^>]*>|[^<]+/g;
  const parts = html.match(regex);
  for (let part of parts) {
    if (part.startsWith("<p")) {
      let p = document.createElement("p");
      boxColor(p); // apply the color style to the paragraph
      p.style.fontStyle = "italic";
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
}

function applyTypingCss(element, isJitter = false) {
  let typingAnimation = "typing 2s steps(22), blink .5s step-end infinite alternate";
  let jitterAnimation = "jitter 0.1s infinite";
  if (isJitter) {
    typingAnimation += ", " + jitterAnimation;
  }
  element.style.animation = typingAnimation;
  element.style.fontFamily = "monospace";
  element.style.fontSize = "1.5em";
  element.style.color = "#fff";
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

  // START //
  document.querySelector(".text-container").addEventListener("pointerdown", function () {
      isUserInterrupted = true;
  });
  
  sceneZero();
}

//|SCENE TITLE
let currentSceneTitle = "Project: Salvation"
//| INVENTORY
let INVENTORY = [];
document.addEventListener("DOMContentLoaded", function () {
  let inventoryVisible = false;
  let inventoryBtn = document.getElementById("header-button");
  const headerTitle = document.getElementById("header-title");

  inventoryBtn.addEventListener("pointerdown", function () {
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
          itemIcon.src = `img/inventory/${item.name}.png`;
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

//|SLEEPER
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//|SCENE ZERO

function sceneZero() {
    let textContainer = document.querySelector(".text-container");
    let userControlsContainer = document.querySelector(
      ".user-controls-container"
    );
    applyTypingCss(textContainer, true);
    typeText(
      textContainer,
      '<p>Greetings... <br> Press "wake up" to begin.</p>',
      applyGlassStylingGrey,
      undefined,
      true
    );

    // create button
    let wakeUpButton = document.createElement("button");

    // set button text
    wakeUpButton.textContent = "wake up";

    // add styling for button
    applyGlassStylingGreyBtn(wakeUpButton);

    // append button to user controls container
    userControlsContainer.appendChild(wakeUpButton);

    // CLICK
    wakeUpButton.addEventListener("pointerdown", function () {
      // Clear text container
      textContainer.innerHTML = "";
      // remove button from user controls container
      userControlsContainer.removeChild(wakeUpButton);
      // start SceneOne
      sceneOne();
    });
}

//|SCENE ONE

async function sceneOne() {
  let gameContainer = document.querySelector(".game-container");
  gameContainer.style.backgroundImage = "url(img/01.jpg)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = "Deep in the Forest";
  document.getElementById("header-title").textContent = currentSceneTitle;
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

  await typeTextItalic(
    textContainer,
    "<p>Cold... drops on my face... dew? Morning. It's morning.</p>",
    applyGlassStylingGreen
  );

  await sleep(1500);
  await typeText(
    textContainer,
    "<p>You open your eyes and stare up at the sky, you find yourself laying on your back in the forest. You push your hands against the damp earth and lift yourself into a sitting position.</p>",
    applyGlassStylingRed
  );

  await sleep(2000);
  textContainer.innerHTML = "";
  gameContainer.style.backgroundImage = "url(img/01.jpg)";
  gameContainer.style.transition = "background-image 3s ease-in-out";

  await typeTextItalic(
    textContainer,
    "<p>How did I get here? Last thing I remember...</p>",
    applyGlassStylingGreen
  );

  await sleep(1500);
  textContainer.innerHTML = "";
  await typeTextItalic(
    textContainer,
    "<p>Bright lights...</p>",
    applyGlassStylingGreen
  )

  await sleep(1500);
  textContainer.innerHTML = "";
  await typeTextItalic(
    textContainer,
    "<p>Someone... speaking to me...</p>",
    applyGlassStylingGreen
  )

  await sleep(2000);
  textContainer.innerHTML = "";
  await typeText(
    textContainer,
    "<p>As you lift yourself to your feet you cry out as a sharp pain in your right leg causes you to fall over.</p>",
    applyGlassStylingRed
  );

  // append button to user controls container
  userControlsContainer.appendChild(inspectBtn);
  userControlsContainer.appendChild(lookBtn);

  inspectBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // Clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    inspectBtn.remove();
    lookBtn.remove();
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
    userControlsContainer.appendChild(helpBtn);
    userControlsContainer.appendChild(lookBtn);
  });

  lookBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // Clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    inspectBtn.remove();
    lookBtn.remove();
    // write new text
    await typeText(
      textContainer,
      "<p>You are standing in a dark forest, the morning sun just barely breaking through the thick canopy. It is silent except for a few birds in the distance. You can see what appears to be a disused forest path.</p>",
      applyGlassStylingRed
    );
    // append new button
    userControlsContainer.appendChild(inspectBtn);
  });

  helpBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

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
    let gameContainer = document.querySelector(".game-container");
    gameContainer.style.backgroundImage = "url(img/03.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    let userControlsContainer = document.querySelector(
      ".user-controls-container"
    );

    let textContainer = document.querySelector(".text-container");
    applyTypingCss(textContainer);

    // header title
    currentSceneTitle = "Fork in the Road";
    document.getElementById("header-title").textContent = currentSceneTitle;

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

    inspectBtn.addEventListener("pointerdown", async function () {
      // Button click check
      if (btnRecentlyClicked) return;
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

    leftBtn.addEventListener("pointerdown", async function () {
      // Button click check
      if (btnRecentlyClicked) return;
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

      await sleep(2000);
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

    investigateBtn.addEventListener("pointerdown", async function () {
      // Button click check
      if (btnRecentlyClicked) return;
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

    townBtn.addEventListener("pointerdown", async function () {
      // Button click check
      if (btnRecentlyClicked) return;
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
  let gameContainer = document.querySelector(".game-container");
  gameContainer.style.backgroundImage = "url(img/05.jpg)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  //header title
  currentSceneTitle = "The Cottage";
  document.getElementById("header-title").textContent = currentSceneTitle;
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

  await typeText(
    textContainer,
    "<p>As you clear the trees, you see a small plot of land with a cottage and some patches of corn growing beside it.  It's completely silent, except for a windmill that slowly creaks as it turns. It seems no life has been here for some time... Then you see some chickens scratching and pecking around the cottage.</p>",
    applyGlassStylingRed
  );

  await sleep(1500);
  
  // append button to user controls container
  userControlsContainer.appendChild(enterBtn);
  userControlsContainer.appendChild(townBtn);

  enterBtn.addEventListener("pointerdown", async function () {
    //Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

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
    
    userControlsContainer.appendChild(nextRoomBtn);
    if (LETTER == false) {
      userControlsContainer.appendChild(readLetterBtn);
    };
    userControlsContainer.appendChild(exitBtn);

  })

  readLetterBtn.addEventListener("pointerdown", async function () {
    //Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

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
      applyGlassStylingRed
    );
    
    await sleep(3000);
    userControlsContainer.appendChild(takeLetterBtn);
    userControlsContainer.appendChild(nextRoomBtn);
    userControlsContainer.appendChild(exitBtn);
  });

  takeLetterBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

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
    userControlsContainer.appendChild(nextRoomBtn);
    userControlsContainer.appendChild(exitBtn);

  });

  nextRoomBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // change bg
    gameContainer.style.backgroundImage = "url(img/inside-cottage-bedroom.jpg)";
    gameContainer.style.transition = "background-image 4s ease-in-out";
    // clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    nextRoomBtn.remove();
    takeLetterBtn.remove();
    exitBtn.remove();
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

  leaveRoomBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);
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
    userControlsContainer.appendChild(nextRoomBtn);
    userControlsContainer.appendChild(exitBtn);
  });

  exitBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);
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

  townBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

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
  let gameContainer = document.querySelector(".game-container");
  gameContainer.style.backgroundImage = "url(img/06.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = "Forest Path to Town";
  document.getElementById("header-title").textContent = currentSceneTitle;

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

  lookBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

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

  townSquareBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    townSquareBtn.remove();
    marketBtn.remove();
    leftBtn.remove();

    // await sleep(1500);

    sceneTownSquare();
  });

  marketBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

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

  leftBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

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

  walkBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    walkBtn.remove();
    townSquareBtn.remove();
    marketBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>Bad idea, I might get lost up there...</p>",
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
  let gameContainer = document.querySelector(".game-container");
  gameContainer.style.backgroundImage = "url(img/07.png)";
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = "Town Square";
  document.getElementById("header-title").textContent = currentSceneTitle;

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

  clinicBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // header title
    document.getElementById("header-title").textContent = "Clinic";
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
    await typeText(
      textContainer,
      "<p>The doors to the clinic are chained shut, a heavy silver padlock glistens in the sunlight</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(townSquareBtn);
    // if he has key, add new options here *****
  });

  // ******************** REST OF BUTTONS HERE *********************************
}
