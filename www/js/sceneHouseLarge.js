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

export async function sceneHouseLarge() {
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
  let takeBtn = document.createElement("button");
  let mayorLetterBtn = document.createElement("button");
  let noSenderLetterBtn = document.createElement("button");
  let keyBtn = document.createElement("button");
  let silverKeyBtn = document.createElement("button");

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
  takeBtn.textContent = "Take the map";
  mayorLetterBtn.textContent = "Read the letter addressed to the mayor";
  noSenderLetterBtn.textContent = "Read letter with no sender information";
  keyBtn.textContent = "Take key";
  silverKeyBtn.textContent = "Take silver key";

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
  applyGlassStylingGreyBtn(takeBtn);
  applyGlassStylingGreyBtn(mayorLetterBtn);
  applyGlassStylingGreyBtn(noSenderLetterBtn);
  applyGlassStylingGreyBtn(keyBtn);
  applyGlassStylingGreyBtn(silverKeyBtn);

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

    //Load image
    gameContainer.style.backgroundImage = "url(img/mantle-photo.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

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
        "<p>Some of the pages in the journal are numbered.<br>As you flip through, the numbers you find are 8, 15, 32, 48.<br><br>Nothing written on these pages seem to have any significance to the numbers.</p>",
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

      // video element start
      let video = document.createElement("video");
      video.src = "vid/01_large_house.mp4";
      video.autoplay = true;
      video.muted = true;
      video.loop = false;
      video.style.position = "fixed";
      video.style.top = "0";
      video.style.left = "0";
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.objectFit = "cover";
      video.style.zIndex = "0"; // above other elements
      video.style.pointerEvents = "none";

      // Video loops
      let loopCount = 0;
      let maxLoops = 2;

      // insert video as first child (background)
      gameContainer.insertBefore(video, gameContainer.firstChild);

      video.addEventListener("ended", () => {
        loopCount++;
        if (loopCount < maxLoops) {
          video.currentTime = 0;
          video.play();
        } else {
          video.pause();
          video.removeAttribute("Controls");
        }
      });
      // insert video into container
      //        gameContainer.appendChild(video);

      await typeText(
        textContainer,
        "<p>Behind the desk looms a figure.<br>Before you could find your voice and cry out, you dash forward, leap across the desk and grab the figure by the throat.<br><br>Your eyes are probably playing tricks on you, but you see you red glow in the figure's eyes.<br>You raise your fist to strike</p>",
        applyGlassStylingRedFlicker
      );

      await pause();

      // let cleanupVideo = () => {
      //   if (gameContainer.contains(video)) {
      //     gameContainer.removeChild(video);
      //   }
      //   gameContainer.style.backgroundImage = "url(img/111large-house.png)";
      // };

      // // add cleanup to all following buttons
      // inspectBodyBtn.addEventListener("pointerup", cleanupVideo);
      // inspectRoomBtn.addEventListener("pointerup", cleanupVideo);
      // leaveRoomBtn.addEventListener("pointerup", cleanupVideo);

      textContainer.innerHTML = "";
      gameContainer.removeChild(video);
      gameContainer.style.backgroundImage = "url(img/111large-house.png)";
      gameContainer.style.transition = "background-image 4s ease-in-out";

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
    }
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
    safeBtn.remove();

    // write new text
    if (LARGE_HOUSE_PHOTOS_VIEWED == true) {
      await typeText(
        textContainer,
        "<p>Hesitantly, you glance at the man once more, now that the shock has passed you recognize the face. It's the man from the photos in the living room, it's Mayor Nilsen!<br><br>You see the head of an old fashioned key jutting from his coat pocket.</p>",
        applyGlassStylingRed
      );

      await sleep(1500);

      // append new button
      if (LARGE_HOUSE_MAYOR_KEY == false) {
        userControlsContainer.appendChild(keyBtn);
      }
      userControlsContainer.appendChild(inspectRoomBtn);
      userControlsContainer.appendChild(leaveRoomBtn);
    } else {
      await typeText(
        textContainer,
        "<p>Hesitantly, you glance at the man once more, it does not look like this poor soul stood a chance in this fight.<br><br>You see the head of an old fashioned key jutting from his coat pocket.</p>",
        applyGlassStylingRed
      );

      if (LARGE_HOUSE_MAYOR_KEY == false) {
        userControlsContainer.appendChild(keyBtn);
      }
      userControlsContainer.appendChild(inspectRoomBtn);
      userControlsContainer.appendChild(leaveRoomBtn);
    }
  });

  keyBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    HALL_KEY = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    keyBtn.remove();
    inspectRoomBtn.remove();
    leaveRoomBtn.remove();

    // write new text
    if (LARGE_HOUSE_PHOTOS_VIEWED == true) {
      await typeText(
        textContainer,
        "<p>You remove the key from the mayor's body and place it in your pocket.</p>",
        applyGlassStylingRed
      );
    }
    if (LARGE_HOUSE_PHOTOS_VIEWED == false) {
      await typeText(
        textContainer,
        "<p>You remove the key from the body and place it in your pocket.</p>",
        applyGlassStylingRed
      );
    }

    await sleep(1500);

    INVENTORY.push({
      name: "Old Fashioned Key",
      description:
        "An old fashioned key you found on the mayor's mutilated corpse.",
    });

    // append new button
    userControlsContainer.appendChild(inspectRoomBtn); // append relevant buttons
    userControlsContainer.appendChild(leaveRoomBtn);
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
    safeBtn.remove();

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
    safeBtn.remove();

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
    safeBtn.remove();

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
      if (HALL_KEY == false) {
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
      if (HALL_KEY == false) {
        userControlsContainer.appendChild(inspectBodyBtn);
      }
      if (LARGE_HOUSE_DESK_VIEWED == false) {
        userControlsContainer.appendChild(inspectDeskBtn);
      }
      userControlsContainer.appendChild(leaveRoomBtn);
    }
  });

  //|OG safe button start
  /*
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
        "<p>You jiggle at the handle... it's locked. The safe has a combination dial.</p>",
        applyGlassStylingRed
      );

      // |TEST SAFE BUTTON FROM HERE
      const { DialLock } = await import("./dial-lock.js");
      const lock = new DialLock(
        [8, 15, 32, 48], // the combination from the journal (8, 15, 32, 48)
        async () => {
          //success callback
          textContainer.innerHTML = "";
          await typeText(
            textContainer,
            "<p>With a click, the safe door swings open.<br><br>You find a collection of old letters and documents. A few of them catch your attention -<br><br>A letter addressed to Mayor Nilsen.<br><br>A blank envelope with no sender information.A single piece of parchment.<br><br>Unfolding the parchment, you find a hand-drawn map which resembles the town and its surrounding area but with more detail than the one you looked at near the town square.<br><br>And lastly, a silver key.</p>",
            applyGlassStylingRed
          );

          await sleep(1500);

          userControlsContainer.appendChild(takeBtn);
          userControlsContainer.appendChild(mayorLetterBtn);
          userControlsContainer.appendChild(noSenderLetterBtn);
          userControlsContainer.appendChild(silverKeyBtn);
        },
        async () => {
          //failure callback
          textContainer.innerHTML = "";
          await typeText(
            textContainer,
            "<p>The safe remains locked. The combination doesn't seem to work.</p>",
            applyGlassStylingRed
          );

          this.resetCombination();

          userControlsContainer.appendChild(safeBtn);
          if (LARGE_HOUSE_DESK_VIEWED == false) {
            userControlsContainer.appendChild(inspectDeskBtn);
          }
          userControlsContainer.appendChild(leaveRoomBtn);
        }
      );

      textContainer.appendChild(lock.init());
    
      await sleep(1500);
  
      // append new button
      if (LARGE_HOUSE_DESK_VIEWED == false) {
        userControlsContainer.appendChild(inspectDeskBtn);
        };
        userControlsContainer.appendChild(safeBtn);
        userControlsContainer.appendChild(leaveRoomBtn);
        });
        */
  //|OG safe button end

  //|NEW safe button start
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
      "<p>You jiggle at the handle... it's locked. The safe has a combination dial.</p>",
      applyGlassStylingRed
    );

    // Remove all buttons except leaveRoomBtn and relevant inspection buttons
    const buttonsToKeep = [];
    if (LARGE_HOUSE_DESK_VIEWED == false) {
      buttonsToKeep.push(inspectDeskBtn);
    }
    if (HALL_KEY == false) {
      buttonsToKeep.push(inspectBodyBtn);
    }
    buttonsToKeep.push(leaveRoomBtn);

    // Clear all buttons
    userControlsContainer.innerHTML = "";

    // Add back the buttons we want to keep
    buttonsToKeep.forEach((btn) => {
      userControlsContainer.appendChild(btn);
    });

    // Initialize the dial lock
    const { DialLock } = await import("./dial-lock.js");
    const lock = new DialLock(
      [8, 15, 32, 48], // the combination from the journal (8, 15, 32, 48)
      async () => {
        // Success callback
        textContainer.innerHTML = "";
        captureBtn.remove();
        sumbitBtn.remove();
        resetBtn.remove();

        await typeText(
          textContainer,
          "<p>With a click, the safe door swings open.<br><br>You find a collection of old letters and documents. A few of them catch your attention -<br><br>A letter addressed to Mayor Nilsen.<br><br>A blank envelope with no sender information.A single piece of parchment.<br><br>Unfolding the parchment, you find a hand-drawn map which resembles the town and its surrounding area but with more detail than the one you looked at near the town square.<br><br>And lastly, a silver key.</p>",
          applyGlassStylingRed
        );
        // Rest of success callback...?

        await sleep(1500);

        userControlsContainer.appendChild(takeBtn);
        userControlsContainer.appendChild(mayorLetterBtn);
        userControlsContainer.appendChild(noSenderLetterBtn);
        userControlsContainer.appendChild(silverKeyBtn);
      },
      async () => {
        // Failure callback
        textContainer.innerHTML = "";
        await typeText(
          textContainer,
          "<p>The safe remains locked. The combination doesn't seem to work.</p>",
          applyGlassStylingRed
        );
        lock.resetCombination();
      }
    );

    // Initialize lock and get the dial container and buttons
    const { dialContainer, buttons } = lock.init();

    // Add the dial to the text container
    textContainer.appendChild(dialContainer);

    // Add the lock buttons to user controls container
    buttons.forEach((btn) => {
      userControlsContainer.appendChild(btn);
    });

    await sleep(1500);
  });
  //|NEW safe button end

  takeBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    LARGE_HOUSE_MAP = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    safeBtn.remove(); // remove relevant buttons
    takeBtn.remove();
    mayorLetterBtn.remove();
    noSenderLetterBtn.remove();
    keyBtn.remove();
    silverKeyBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You fold the map up neatly and stuff it in your back pocket.<br>This might come in handy later.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    INVENTORY.push({
      name: "Map",
      description:
        "A detailed map of the town and its surroundings you found in the mayor's safe.",
    });

    // append new button
    if (LARGE_HOUSE_MAYOR_LETTER_READ == false) {
      userControlsContainer.appendChild(mayorLetterBtn); // append relevant buttons
    }
    if (LARGE_HOUSE_NO_SENDER_LETTER_READ == false) {
      userControlsContainer.appendChild(noSenderLetterBtn);
    }
    if (LARGE_HOUSE_MAYOR_KEY == false) {
      userControlsContainer.appendChild(silverKeyBtn);
    }
    userControlsContainer.appendChild(leaveRoomBtn);
  });

  mayorLetterBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    LARGE_HOUSE_MAYOR_LETTER_READ = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    safeBtn.remove(); // remove relevant buttons
    takeBtn.remove();
    mayorLetterBtn.remove();
    noSenderLetterBtn.remove();
    keyBtn.remove();
    silverKeyBtn.remove();
    leaveRoomBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You scan through the letter. Judging by how the sender uses 'Dennis' instead of 'Mayor Nilsen', you can tell that these two knew each other on a personal level.<br><br>The sender warns the Mayor to evacuate his town as an unknown threat is now imminent.<br><br><br>The letter is signed 'Dr. Ignis'</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    if (LARGE_HOUSE_MAYOR_LETTER_READ == false) {
      userControlsContainer.appendChild(mayorLetterBtn);
    }
    if (LARGE_HOUSE_NO_SENDER_LETTER_READ == false) {
      userControlsContainer.appendChild(noSenderLetterBtn);
    }
    if (LARGE_HOUSE_MAYOR_KEY == false) {
      userControlsContainer.appendChild(silverKeyBtn);
    }
    userControlsContainer.appendChild(leaveRoomBtn);
  });

  noSenderLetterBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    LARGE_HOUSE_NO_SENDER_LETTER_READ = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    safeBtn.remove(); // remove relevant buttons
    takeBtn.remove();
    mayorLetterBtn.remove();
    noSenderLetterBtn.remove();
    keyBtn.remove();
    silverKeyBtn.remove();
    leaveRoomBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>The sender of this letter is requesting financial aid from the Mayor to support a cause.<br>They are not elaborating on the subject matter.<br><br>You assume that the Mayor is familiar with whatever it may be.<br><br<br>The letter is signed 'Thelir Sabotører'</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    if (LARGE_HOUSE_MAYOR_LETTER_READ == false) {
      userControlsContainer.appendChild(mayorLetterBtn);
    }
    if (LARGE_HOUSE_NO_SENDER_LETTER_READ == false) {
      userControlsContainer.appendChild(noSenderLetterBtn);
    }
    if (LARGE_HOUSE_MAYOR_KEY == false) {
      userControlsContainer.appendChild(silverKeyBtn);
    }
    userControlsContainer.appendChild(leaveRoomBtn);
  });

  silverKeyBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    LARGE_HOUSE_MAYOR_KEY = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    safeBtn.remove(); // remove relevant buttons
    takeBtn.remove();
    mayorLetterBtn.remove();
    noSenderLetterBtn.remove();
    keyBtn.remove();
    silverKeyBtn.remove();
    leaveRoomBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You hastily stuff the key in your pocket. A key like this must open an important door.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    INVENTORY.push({
      name: "Silver Key",
      description: "A silver key you found in the mayor's safe.",
    });

    // append new button
    if (LARGE_HOUSE_MAYOR_LETTER_READ == false) {
      userControlsContainer.appendChild(mayorLetterBtn);
    }
    if (LARGE_HOUSE_NO_SENDER_LETTER_READ == false) {
      userControlsContainer.appendChild(noSenderLetterBtn);
    }
    if (LARGE_HOUSE_MAYOR_KEY == false) {
      userControlsContainer.appendChild(silverKeyBtn);
    }
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
    safeBtn.remove();
    takeBtn.remove();
    mayorLetterBtn.remove();
    noSenderLetterBtn.remove();
    keyBtn.remove();
    silverKeyBtn.remove();

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
    askBtn.remove();
    enterBtn.remove();
    ascendBtn.remove();
    exploreBtn.remove();
    mantleBtn.remove();
    examineBtn.remove();
    hallwayBtn.remove();
    otherBtn.remove();
    firstDoorRightBtn.remove();
    firstDoorLeftBtn.remove();
    upstairsHallwayBtn.remove();
    secondDoorRightBtn.remove();
    secondDoorLeftBtn.remove();
    downstairsBtn.remove();
    inspectBodyBtn.remove();
    inspectRoomBtn.remove();
    leaveRoomBtn.remove();
    inspectDeskBtn.remove();
    inspectShelfBtn.remove();
    safeBtn.remove();
    takeBtn.remove();
    mayorLetterBtn.remove();
    noSenderLetterBtn.remove();
    keyBtn.remove();
    silverKeyBtn.remove();

    if (
      LARGE_HOUSE_BODY_SEEN == true &&
      LARGE_HOUSE_ENTERING_SECOND_TIME == false
    ) {
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
