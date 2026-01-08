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

//| SCENE CHURCH
export async function sceneChurch() {
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
  let enterChurchBtn = document.createElement("button");
  let badLeaveBtn = document.createElement("button");
  let walkManBtn = document.createElement("button");
  let clearThroatBtn = document.createElement("button");
  let tellPriestBtn = document.createElement("button");
  let explainBtn = document.createElement("button");
  let priestOldManBtn = document.createElement("button");
  let resistanceBtn = document.createElement("button");
  let leaveBtn = document.createElement("button");
  let problemBtn = document.createElement("button");
  let prayBtn = document.createElement("button");
  let mapBtn = document.createElement("button");
  let noMapBtn = document.createElement("button");
  let leaveChurchBtn = document.createElement("button");
  let continueBtn = document.createElement("button");

  // set button text
  townSquareBtn.textContent = "Go to town square";
  enterChurchBtn.textContent = "Enter the Church";
  badLeaveBtn.textContent = "Leave. This place gives you a bad feeling";
  walkManBtn.textContent = "Walk up to the man";
  clearThroatBtn.textContent = "Clear your throat loudly...";
  tellPriestBtn.textContent = "Go tell the priest Ingrid sent you";
  explainBtn.textContent = "Explain your presence to the Priest";
  priestOldManBtn.textContent =
    "Tell the Priest about the old man in the cottage";
  resistanceBtn.textContent = "Could you tell me about the resistance?";
  leaveBtn.textContent = "Leave";
  problemBtn.textContent =
    "I believe that we should solve our own problems, and not look to divine intervention";
  prayBtn.textContent = "Yes, I pray that we will be saved";
  mapBtn.textContent = "Give the map to Father Jakob";
  noMapBtn.textContent = "No, I don't have a map right now";
  leaveChurchBtn.textContent = "Leave the church and head back to town";
  continueBtn.textContent = "Continue";

  // add styling for button
  applyGlassStylingGreyBtn(townSquareBtn);
  applyGlassStylingGreyBtn(enterChurchBtn);
  applyGlassStylingGreyBtn(badLeaveBtn);
  applyGlassStylingGreyBtn(walkManBtn);
  applyGlassStylingGreyBtn(clearThroatBtn);
  applyGlassStylingGreyBtn(tellPriestBtn);
  applyGlassStylingGreyBtn(explainBtn);
  applyGlassStylingGreyBtn(priestOldManBtn);
  applyGlassStylingGreyBtn(resistanceBtn);
  applyGlassStylingGreyBtn(leaveBtn);
  applyGlassStylingGreyBtn(problemBtn);
  applyGlassStylingGreyBtn(prayBtn);
  applyGlassStylingGreyBtn(mapBtn);
  applyGlassStylingGreyBtn(noMapBtn);
  applyGlassStylingGreyBtn(leaveChurchBtn);
  applyGlassStylingGreyBtn(continueBtn);

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
  userControlsContainer.appendChild(enterChurchBtn);
  userControlsContainer.appendChild(badLeaveBtn);

  enterChurchBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    enterChurchBtn.remove(); // remove relevant buttons
    badLeaveBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You walk into the church and pause... The building looks even bigger on the inside.<br><br>There is no ceiling, only old looking chandeliers that reach higher and higher towards the roof. There is red carpet that leads between rows of pews towards the far end of the vast room, where you see a priest standing behind a pulpit, his face in his hands.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>He hasn't noticed you.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(walkManBtn); // append relevant buttons
    userControlsContainer.appendChild(clearThroatBtn);
  });

  walkManBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    walkManBtn.remove(); // remove relevant buttons
    clearThroatBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>As you approach him, he starts to speak as he looks up.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>I'm sorry but there will be no confessional today, I...<br><br>Oh... you're not from here. What do you want?</p>",
      applyGlassStylingBlue
    );

    await pause();
    textContainer.innerHTML = "";

    if (INN_ADVICE == true) {
      await typeTextItalic(
        textContainer,
        "<p>Are you Father Jakob? Ingrid said you might be able help me with some coordinates I have? I need to find out where they lead.</p>",
        applyGlassStylingGreen
      );

      await pause();
      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>Oh did she now? I sometimes wonder if I should have stayed in the military rather than join the clergy, that's all people seem to need me for in these times of trouble, my military experience.<br><br>Well then let me have a look...</p>",
        applyGlassStylingBlue
      );

      await pause();
      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>You show Father Jakob the coordinates you wrote down, he pauses and looks up, thinking...</p>",
        applyGlassStylingRed
      );

      await sleep(2000);

      await typeText(
        textContainer,
        "<p>Of course, you found the coordinates to the resistance's headquarters.<br><br>Do you really plan to go there?<br><br>Join their fight?</p>",
        applyGlassStylingBlue
      );

      await sleep(1500);

      if (CHURCH_STORY == true && LARGE_HOUSE_MAP == true) {
        userControlsContainer.appendChild(mapBtn);
      }

      //|what the hell happens here if you don't have the map?
    }

    // append new button
    userControlsContainer.appendChild(explainBtn); // append relevant buttons
    if (COTTAGE_DEAD_BODY == true) {
      userControlsContainer.appendChild(priestOldManBtn);
    }
  });

  priestOldManBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CHURCH_INFORMATION = true;
    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    explainBtn.remove(); // remove relevant buttons
    priestOldManBtn.remove();

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>I found the body of an old man in a cottage outside of town.<br>I thought you might want to know...<br>He must be dead a week by now...</p>",
      applyGlassStylingGreen
    );

    await pause();
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>The priest gives a long sigh, and mutters a prayer under his breath.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Poor Filip. Astrid will be devastated. Thank you, I will try to find some help to give him a proper burial at least. And I will let Ingrid know.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Was there anything else?</p>",
      applyGlassStylingBlue
    );

    // append new button
    userControlsContainer.appendChild(explainBtn); // append relevant buttons
  });

  clearThroatBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    clearThroatBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>The priest looks up, startled.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Who are you? If you're another 'recruiter', you can just leave now, there's no one left to join you, and I haven't got time for this.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(explainBtn); // append relevant buttons
  });

  explainBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    explainBtn.remove(); // remove relevant buttons

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>I'm not a recruiter, I'm actually not even sure where I am.<br><br>I just woke up this morning in the forest nearby, with only hazy memories and I stumbled on this town.<br><br>Do you know what happened here? Where is everyone?</p>",
      applyGlassStylingGreen
    );

    await pause();

    textContainer.innerHTML = "";

    // write new text
    await typeText(
      textContainer,
      "<p>The priest looks you up and down suspiciously.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Everyone fled. Either to get away from here, or to join this 'resistance'...<br>But how is it you don't know this? The world has gone to hell in the span of a week. People have lost their faith in God and that is why our world is as rotten and corrupt as it is.<br><br>I am Father Jakob, and this is my church. I refuse to leave my town and my flock because of fear.<br><br>My faith protects me, even though most of my congregation has clearly lost their own faith. So Tell me, do you still have faith?</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(prayBtn); // append relevant buttons
    userControlsContainer.appendChild(problemBtn);
  });

  problemBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CHURCH_DISMISS = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    prayBtn.remove(); // remove relevant buttons
    problemBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>Well then I have nothing more to say to you. Please leave me to my thoughts. And God help you.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(leaveBtn); // append relevant buttons
  });

  prayBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    buttonNameBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>Then may the Lord bless and keep you my child. Was there anything else?</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(resistanceBtn); // append relevant buttons
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
    buttonNameBtn.remove(); // remove relevant buttons

    // write new text
    await typeText(
      textContainer,
      "<p>Perhaps I have said too much already... but the resistance is a group of people, from this town and some others, who are trying to save humanity from this threat.<br><br>Foolish if you ask me, they should rather be praying for strength and forgiveness. So they might enter heaven when the time comes.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>I'm sorry father, but my memories are very faint. What is this threat? What are they trying to save humanity from?</p>",
      applyGlassStylingGreen
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>... From Salvation ...</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>The priest chuckles.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Ironic isn't it? That it should have a name like that. Project Salvation is a military program that was engineered by the government's top scientists in Artificial Intelligence. He motivated that AI could run the country's military security without failure, without human tendencies like corruption or greed or malice. It seemed like the project was a success, despite our neighboring countries warning of the dangers of AI.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Our military expanded the operation and procured massive budgets to give the AI system more power, and further reach. It has access to automated weapons, airstrikes, and even nuclear weapons.<br><br>Everyone was convinced that our country is the safest and most secure in the world, and it seems they were right.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>But if the country is safe and secure, what is the threat? Why is everyone fleeing? Isn't it safer to stay in the towns and cities?</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Well, the country is very safe and secure as long as project Salvation is operational...<br>But what if it was shut down?<br>What if our entire country's military power disappears over night?<br>Could you imagine what that would mean to the government and the military heads?</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Well we would be open to all kinds of threats and attacks... but I don't understand, why would they shut it down?<br>No one would disable their entire country's defense?</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>I believe you are right, however ask yourself...<br><br>If Project Salvation could be shut down, if there was one threat that could stop it and remove it's ability to protect it's country...<br><br>What would that threat be?</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Slowly the realisation comes to you</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>... Us... Humans...</p>",
      applyGlassStylingGreen
    );

    await typeText(
      textContainer,
      "<p>Precisely! Our neighbors warned us against AI because they knew it would get too intelligent for its, or OUR own good. But the military commanders were too concerned about making more money to expand the military, they even thought of selling the system to other countries once it was perfected. But for some reason the Chief scientist halted the project.<br><br>No one knows for sure what happened to him since he was no longer mentioned in the news.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>But I digress. The bottom line of this story is that Project Salvation has identified humans as a threat to it's continued existence, so in order for it to keep doing it's job, and keep our people safe, is by removing our people's ability to disable it... by  removing our people...</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>The priest chuckles again, it almost grows into a hearty laugh.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Suddenly it all dawns on you...<br><br>The reason why the town is empty; the reason why everyone has fled...<br><br>They are fleeing from extermination...</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Father Jakob stops laughing and looks sternly at you.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>So there you have it my child. All the country's military power is now focused on it's own people. Where people are fleeing to I do not know. And when Project Salvation will eventually strike is anyone's guess.<br><br>What we do know from inside the military compound is that Project Salvation has identified humans as a threat to eliminate. And that is why the resistance was formed. They are trying to find a way into the military compound where The Core of Project Salvation is located, and deactivate it.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>Some prominent experts have joined the resistance. I know this because they came to me as recruiters, because I know most of the people in town and I have a military background, I might have had some advise for them... but the only advice I have to offer now is to pray that the worst doesn't happen.</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(continueBtn); // append relevant buttons
  });

  continueBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CHURCH_STORY = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    continueBtn.remove(); // remove relevant buttons

    // write new text
    if (INN_ADVICE == true) {
      // need to do the longer one now
      await typeTextItalic(
        textContainer,
        "<p>Father Jakob, will you be able to show me where to find the resistance with those coordinates? I feel that I need to find them and perhaps help them if I can, in any way possible..</p>",
        applyGlassStylingGreen
      );

      await pause();
      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>Well my child, either you are very foolish, or very brave... but yes. I can show you where to find them. Do you have a map that I can mark for you?</p>",
        applyGlassStylingBlue
      );

      await sleep(1500);

      // append new button
      if (LARGE_HOUSE_MAP == true) {
        userControlsContainer.appendChild(mapBtn);
      } else {
        userControlsContainer.appendChild(noMapBtn);
      }
    } else {
      await typeTextItalic(
        textContainer,
        "<p>Father Jakob will you be able to show me where to find the resistance? I feel that I need to find them and perhaps help them if I can, in any way possible...</p>",
        applyGlassStylingGreen
      );

      await pause();

      textContainer.innerHTML = "";

      await typeText(
        textContainer,
        "<p>Well my child, either you are very foolish, or very brave... but unfortunately I don't know where they are located. They wanted to keep it quiet, lest the AI is able to pinpoint their whereabouts...<br><br>However if you are able to find any information about where they are, come back and I might be able to help you.</p>",
        applyGlassStylingBlue
      );

      await sleep(1500);

      // append new button
      userControlsContainer.appendChild(leaveChurchBtn); // append relevant buttons
    }
  });

  noMapBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    noMapBtn.remove(); // remove relevant buttons
    mapBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>You're going to need to find their headquarters. Come back once you have a map and I will mark it for you</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(leaveChurchBtn); // append relevant buttons
  });

  mapBtn.addEventListener("pointerup", async function () {
    // Button click check
    if (isTyping || btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 1000);

    CHURCH_DESTINATION = true;

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    mapBtn.remove(); // remove relevant buttons
    noMapBtn.remove();

    // write new text
    await typeText(
      textContainer,
      "<p>All right let's have a look...<br><br>Here, I have marked where you can find them if you leave town to the west and head north.<br><br>You'll find the main road to the city blocked off... safer that way.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>The priest hands you back the map with a big red X marked on it... You feel an odd sensation...</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>You're a brave man. Tell me, what is your name?</p>",
      applyGlassStylingBlue
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>You hear the priests muffled words echoing in your mind, as if spoken in a long empty hallway, you stare at the big red X as your mind starts to drift away,</p>",
      applyGlassStylingRed
    );

    await typeText(
      textContainer,
      "<p>you suddenly lose all sense of where you are...</p>",
      applyGlassStylingRedFlicker
    );

    await pause();

    textContainer.innerHTML = "";

    await typeTextItalic(
      textContainer,
      "<p>Doctor, the procedure was a success, he should be regaining consciousness soon.</p>",
      applyGlassStylingBlueFlicker
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>He is waking up. Quickly, leave the room. I need to be the first person he sees.</p>",
      applyGlassStylingBlueFlicker
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>But Doctor! We have not ran any of the safety tests yet, it could be dangerous!</p>",
      applyGlassStylingBlueFlicker
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Leave us! Now!</p>",
      applyGlassStylingBlueFlicker
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>Where... where am I?<br><br>Who are you?</p>",
      applyGlassStylingGreenFlicker
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Ah, Xander Ignis, you are finally awake my son. I have a very important task for you...</p>",
      applyGlassStylingRedFlicker
    );

    await pause();
    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You suddenly snap back. You are still in the church, still staring at the big X on the map that Father Jakob handed to you. You slowly look up at him with a perplexed look on your face.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeTextItalic(
      textContainer,
      "<p>My name? My name is Xander....  Xander Ignis.</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>It feels strange saying your own name, until now it did not even occur to you that you have a name, and that you did not know it.</p>",
      applyGlassStylingRed
    );

    await sleep(1500);

    await typeText(
      textContainer,
      "<p>Ignis? No relation to Dr. Ignis I hope... He is the very reason for all of this anarchy.<br><br>Ah but surely if you were related to the Government's top scientist you would have known all about this already.<br><br>Well, you have your destination now. Good luck out there Xander. I pray that you find what you seek and that God keep you.</p>",
      applyGlassStylingBlue
    );

    await pause();

    textContainer.innerHTML = "";

    await typeText(
      textContainer,
      "<p>You thank Father Jakob for his help and leave the church, heading back to the town square</p>",
      applyGlassStylingRed
    );

    await sleep(2500);

    await typeTextItalic(
      textContainer,
      "<p>... Dr. Ignis... is that the man I keep seeing in these memories? Could he be...<br><br>No. you can't think about this right now. You might find some more information once you reach the resistance HQ.</p>",
      applyGlassStylingGreen
    );

    await pause();

    textContainer.innerHTML = "";

    sceneTownSquare();
  });

  leaveChurchBtn.addEventListener("pointerup", async function () {
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
    enterChurchBtn.remove();
    badLeaveBtn.remove();
    walkManBtn.remove();
    clearThroatBtn.remove();
    tellPriestBtn.remove();
    explainBtn.remove();
    priestOldManBtn.remove();
    resistanceBtn.remove();
    leaveBtn.remove();
    problemBtn.remove();
    prayBtn.remove();
    mapBtn.remove();
    leaveChurchBtn.remove();

    await typeText(
      textContainer,
      "<p>You return to the town square.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    sceneTownSquare();
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
    townSquareBtn.remove(); // remove relevant buttons
    enterChurchBtn.remove();
    badLeaveBtn.remove();
    walkManBtn.remove();
    clearThroatBtn.remove();
    tellPriestBtn.remove();
    explainBtn.remove();
    priestOldManBtn.remove();
    resistanceBtn.remove();
    leaveBtn.remove();
    problemBtn.remove();
    prayBtn.remove();
    mapBtn.remove();
    leaveChurchBtn.remove();

    await typeText(
      textContainer,
      "<p>You return to the town square.</p>",
      applyGlassStylingRed
    );

    await pause();

    textContainer.innerHTML = "";

    sceneTownSquare();
  });

  badLeaveBtn.addEventListener("pointerup", async function () {
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
    enterChurchBtn.remove();
    badLeaveBtn.remove();
    walkManBtn.remove();
    clearThroatBtn.remove();
    tellPriestBtn.remove();
    explainBtn.remove();
    priestOldManBtn.remove();
    resistanceBtn.remove();
    leaveBtn.remove();
    problemBtn.remove();
    prayBtn.remove();
    mapBtn.remove();
    leaveChurchBtn.remove();

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
    townSquareBtn.remove(); // remove relevant buttons
    enterChurchBtn.remove();
    badLeaveBtn.remove();
    walkManBtn.remove();
    clearThroatBtn.remove();
    tellPriestBtn.remove();
    explainBtn.remove();
    priestOldManBtn.remove();
    resistanceBtn.remove();
    leaveBtn.remove();
    problemBtn.remove();
    prayBtn.remove();
    mapBtn.remove();
    leaveChurchBtn.remove();

    sceneTownSquare();
  });
}
