function applyGlitchCss() {
  // Check if the glitch styles are already added
  if (!document.querySelector("#glitch-styles")) {
    // Create a style element
    const style = document.createElement("style");
    style.id = "glitch-styles";
    document.head.appendChild(style);

    // Add CSS rules for .glitch to the style element
    style.sheet.insertRule(
      `
      .glitch:before,
      .glitch:after {
        padding: 30px;
        color: white;
        content: attr(data-text);
        position: absolute;
        width: 100%;
        height: 100%;
      }
    `,
      style.sheet.cssRules.length
    );

    style.sheet.insertRule(
      `
      .glitch:before {
        left: 3px;
        text-shadow: -2px 0 #d8031c;
        animation: glitch-1 2s linear infinite reverse;
      }
    `,
      style.sheet.cssRules.length
    );

    style.sheet.insertRule(
      `
      .glitch:after {
        left: -3px;
        text-shadow: -2px 0 #00008B;
        animation: glitch-2 2s linear infinite reverse;
      }
    `,
      style.sheet.cssRules.length
    );
    
    style.sheet.insertRule(`
    @keyframes glitch-1 {
  0% {
    clip: rect(132px, 350px, 101px, 30px);
  }
  5% {
    clip: rect(17px, 350px, 94px, 30px);
  }
  10% {
    clip: rect(40px, 350px, 66px, 30px);
  }
  15% {
    clip: rect(87px, 350px, 82px, 30px);
  }
  20% {
    clip: rect(137px, 350px, 61px, 30px);
  }
  25% {
    clip: rect(34px, 350px, 14px, 30px);
  }
  30% {
    clip: rect(133px, 350px, 74px, 30px);
  }
  35% {
    clip: rect(76px, 350px, 107px, 30px);
  }
  40% {
    clip: rect(59px, 350px, 130px, 30px);
  }
  45% {
    clip: rect(29px, 350px, 84px, 30px);
  }
  50% {
    clip: rect(22px, 350px, 67px, 30px);
  }
  55% {
    clip: rect(67px, 350px, 62px, 30px);
  }
  60% {
    clip: rect(10px, 350px, 105px, 30px);
  }
  65% {
    clip: rect(78px, 350px, 115px, 30px);
  }
  70% {
    clip: rect(105px, 350px, 13px, 30px);
  }
  75% {
    clip: rect(15px, 350px, 75px, 30px);
  }
  80% {
    clip: rect(66px, 350px, 39px, 30px);
  }
  85% {
    clip: rect(133px, 350px, 73px, 30px);
  }
  90% {
    clip: rect(36px, 350px, 128px, 30px);
  }
  95% {
    clip: rect(68px, 350px, 103px, 30px);
  }
  100% {
    clip: rect(14px, 350px, 100px, 30px);
  }
}`, style.sheet.cssRules.length);
      
      style.sheet.insertRule(`
      @keyframes glitch-2 {
  0% {
    clip: rect(129px, 350px, 36px, 30px);
  }
  5% {
    clip: rect(36px, 350px, 4px, 30px);
  }
  10% {
    clip: rect(85px, 350px, 66px, 30px);
  }
  15% {
    clip: rect(91px, 350px, 91px, 30px);
  }
  20% {
    clip: rect(148px, 350px, 138px, 30px);
  }
  25% {
    clip: rect(38px, 350px, 122px, 30px);
  }
  30% {
    clip: rect(69px, 350px, 54px, 30px);
  }
  35% {
    clip: rect(98px, 350px, 71px, 30px);
  }
  40% {
    clip: rect(146px, 350px, 34px, 30px);
  }
  45% {
    clip: rect(134px, 350px, 43px, 30px);
  }
  50% {
    clip: rect(102px, 350px, 80px, 30px);
  }
  55% {
    clip: rect(119px, 350px, 44px, 30px);
  }
  60% {
    clip: rect(106px, 350px, 99px, 30px);
  }
  65% {
    clip: rect(141px, 350px, 74px, 30px);
  }
  70% {
    clip: rect(20px, 350px, 78px, 30px);
  }
  75% {
    clip: rect(133px, 350px, 79px, 30px);
  }
  80% {
    clip: rect(78px, 350px, 52px, 30px);
  }
  85% {
    clip: rect(35px, 350px, 39px, 30px);
  }
  90% {
    clip: rect(67px, 350px, 70px, 30px);
  }
  95% {
    clip: rect(71px, 350px, 103px, 30px);
  }
  100% {
    clip: rect(83px, 350px, 40px, 30px);
  }
}`, style.sheet.cssRules.length);
  }
}

/*

async function typeText(element, html, boxColor, delay = 30, isGlitch = false) {
  const regex = /<[^>]*>|[^<]+/g;
  const parts = html.match(regex);
  element.style.fontStyle = "normal";
  for (let part of parts) {
    if (part.startsWith("<p")) {
      let p = document.createElement("p");
      boxColor(p); // apply the color style to the paragraph
      if (isGlitch) {
        p.classList.add('glitch');
        // Set the data-text attribute to the content of this part of the HTML
        const content = part.replace(/<[^>]*>/g, ""); // Strips HTML tags
        p.setAttribute('data-text', content); // Set the data-text for glitch effect
        applyGlitchCss(); // Ensure glitch styles are added
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



await typeText(
  textContainer,
  '<p>The glitchy text content goes here...</p>',
  applyGlassStylingRed,
  undefined, // Use default delay
  true // This flag enables the glitch effect
);







async function typeText(element, html, boxColor, delay = 30, isGlitch = false) {
  const regex = /<[^>]*>|[^<]+/g;
  const parts = html.match(regex);
  element.style.fontStyle = "normal";
  for (let part of parts) {
    if (part.startsWith("<p")) {
      let p = document.createElement("p");
      boxColor(p); // apply the color style to the paragraph
      if (isGlitch) {
        let textContainer = document.querySelector(".text-container");
        textContainer.className += " glitch";
        let content = part.replace(/<[^>]*>/g, ""); // Strips HTML tags
        textContainer.setAttribute("data-text", content);
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

*/