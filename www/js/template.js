/*
async function-name
  declare gameContainer with query selector
  style gameContainer with background image
  style gameContainer transition
  declare userControlsContainer with query selector

  declare textContainer with query selector
    apply CSS styling to textContainer
  
  set header title

  create buttons to be used in this scene

  set button text

  style buttons

  await typeText / typeTextItalic(
  textContainer,
  "<p></p>",
  applyRelevantCssStyling
  )

  await sleep function between texts
  (also clear screen after 2+ text paragraphs)

  append buttons
    userControlsContainer.appendChild(buttonName);
  
  add event listener to buttons
  buttonName.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // Clear text container
    textContainer.innerHTML = "";
    // remove button from user controls container
    buttonName.remove();
    // write new text
    await typeText / typeTextItalic(
    textContainer,
    "<p></p>",
    applyRelevantCssStyling
    );
    // append new button
    userControlsContainer.appendChild(buttonName);
  });

*/

async function sceneName() {
  let gameContainer = document.querySelector(".game-container");
  gameContainer.style.backgroundImage = "url(img/)"; // Add BG image
  gameContainer.style.transition = "background-image 4s ease-in-out";
  let userControlsContainer = document.querySelector(
    ".user-controls-container"
  );

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);

  // header title
  currentSceneTitle = ""; // Add title
  document.getElementById("header-title").textContent = currentSceneTitle; 

  // create button
  let buttonNameBtn = document.createElement("button"); // create buttons for scene

  // set button text
  buttonNameBtn.textContent = "BUTTON NAMES HERE";

  // add styling for button
  applyGlassStylingGreyBtn(buttonNameBtn);

  await typeTextItalic(
    textContainer,
    "<p>NEW TEXT HERE. REMEMBER RELEVANT STYLING (NORMAL OR ITALIC) AND REMEMBER CSS</p>",
    applyGlassStylingGreen
  );

  await sleep(1500); // normal wait time between texts

  // append button to user controls container
  userControlsContainer.appendChild(buttonNameBtn); // append relevant buttons

  buttonNameBtn.addEventListener("pointerdown", async function () {
    // Button click check
    if (btnRecentlyClicked) return;
    btnRecentlyClicked = true;
    setTimeout(() => {
      btnRecentlyClicked = false;
    }, 500);

    // Clear text container
    textContainer.innerHTML = "";

    // remove button from user controls container
    buttonNameBtn.remove(); // remove relevant buttons

    // write new text
    await typeTextItalic(
      textContainer,
      "<p>NEW TEXT HERE. REMEMBER RELEVANT STYLING (NORMAL OR ITALIC) AND REMEMBER CSS</p>",
      applyGlassStylingGreen
    );

    await sleep(1500);

    // append new button
    userControlsContainer.appendChild(buttonNameBtn); // append relevant buttons

  });
}