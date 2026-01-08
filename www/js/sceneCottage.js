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

//|SCENE COTTAGE
export async function sceneCottage() {
  let gameContainer = document.querySelector(".container");
  gameContainer.style.backgroundImage = "url(img/05-cottage.png)";
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
    gameContainer.style.backgroundImage = "url(img/06-cottage-inside.png)";
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
    }
    userControlsContainer.appendChild(exitBtn);
  });

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

    INVENTORY.push({
      name: "Letter",
      description: "A letter you found at the cottage",
    });
    JOURNAL.push({
      title: "The Cottage",
      text: "While wandering to town I stumbled upon a cottage and found a letter addressed 'Astrid'. I took it with me. I should find someone in Gammelstad who could post it for Filip.",
    });

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
    gameContainer.style.backgroundImage =
      "url(img/07-cottage-dead-old-man.png)";
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
    gameContainer.style.backgroundImage = "url(img/06-cottage-inside.png)";
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
    gameContainer.style.backgroundImage = "url(img/05-cottage.png)";
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

      JOURNAL.push({
        title: "The Cottage",
        text: "I saw the dead body of an old man. He must have been the write of the letter I found. I should report this to someone in Gammelstad...",
      });

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
