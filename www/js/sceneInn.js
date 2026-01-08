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

//| SCENE INN
export async function sceneInn() {
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
    if (
      INN_LETTER_PICKED == false &&
      COTTAGE_LETTER == true &&
      SWIMMING_POOL_GIRL == true
    ) {
      userControlsContainer.appendChild(letterBtn);
    }
    if (
      INN_LETTER_PICKED == false &&
      INN_FILIP_PICKED == false &&
      INFORMATION == true
    ) {
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
      userControlsContainer.appendChild(townSquareBtn);
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
      );
    }

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
    );

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
