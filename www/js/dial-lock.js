// IMPORTS
// NORMAL
import { applyGlassStylingGrey } from "./boxes.js";
import { applyGlassStylingGreyBtn } from "./boxes.js";

// dial-lock.js
export class DialLock {
  constructor(combination, onSuccess, onFailure) {
    this.combination = combination;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.currentPosition = 0;
    this.currentStep = 0;
    this.dialElement = null;
    this.arrowElement = null;
    this.isDragging = false;
    this.startAngle = 0;
    this.currentAngle = 180; // Start at top position (0)
    this.enteredCombination = [null, null, null, null];
    this.container = null;
    this.messageElement = null;
    this.captureBtn = null;
    this.submitBtn = null;
    this.resetBtn = null;
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'dial-container';
    applyGlassStylingGrey(this.container);

    // Add instructions
    const instructions = document.createElement('p');
    instructions.textContent = 'Turn the dial to enter the 4-number combination:';
    applyGlassStylingGrey(instructions);
    this.container.appendChild(instructions);

    // Create dial container
    const dialContainer = document.createElement('div');
    dialContainer.className = 'dial-container-inner';
    
    // Create dial
    this.dialElement = document.createElement('div');
    this.dialElement.className = 'dial';
    this.dialElement.style.transform = `rotate(${this.currentAngle}deg)`;
    
    // Create ticks (0-49)
    for (let i = 0; i < 50; i++) {
      const tick = document.createElement('div');
      tick.className = 'tick';
      tick.style.transform = `rotate(${i * (360/50)}deg)`;
      if (i % 5 === 0) {
        tick.classList.add('major-tick');
        const number = document.createElement('span');
        number.className = 'tick-number';
        number.textContent = i;
        number.style.transform = `rotate(${-i * (360/50)}deg)`;
        tick.appendChild(number);
      }
      this.dialElement.appendChild(tick);
    }

    // Create arrow (fixed position)
    this.arrowElement = document.createElement('div');
    this.arrowElement.className = 'dial-arrow';

    // Start at 0 position (Top)
    this.currentAngle = 0;
    this.dialElement.style.transform = `rotate(${this.currentAngle}deg)`;
    
    // Create combination display
    const comboDisplay = document.createElement('div');
    comboDisplay.className = 'combo-display';
    this.comboNumbers = [];
    
    for (let i = 0; i < 4; i++) {
      const numBox = document.createElement('span');
      numBox.className = 'combo-number';
      numBox.textContent = '-';
      comboDisplay.appendChild(numBox);
      this.comboNumbers.push(numBox);
    }

    // Create buttons (not added to container yet)
    this.captureBtn = document.createElement('button');
    this.captureBtn.textContent = 'Capture Current Number';
    applyGlassStylingGreyBtn(this.captureBtn);
    this.captureBtn.addEventListener('pointerup', () => this.captureNumber());

    this.submitBtn = document.createElement('button');
    this.submitBtn.textContent = 'Try Combination';
    applyGlassStylingGreyBtn(this.submitBtn);
    this.submitBtn.addEventListener('pointerup', () => this.checkCombination());

    this.resetBtn = document.createElement('button');
    this.resetBtn.textContent = 'Reset Combination';
    applyGlassStylingGreyBtn(this.resetBtn);
    this.resetBtn.addEventListener('pointerup', () => this.resetCombination());

    dialContainer.appendChild(this.dialElement);
    dialContainer.appendChild(this.arrowElement);
    this.container.appendChild(dialContainer);
    this.container.appendChild(comboDisplay);

    // Event listeners
    this.dialElement.addEventListener('pointerdown', (e) => this.startDrag(e));
    document.addEventListener('pointermove', this.drag.bind(this));
    document.addEventListener('pointerup', this.endDrag.bind(this));

    return {
      dialContainer: this.container,
      buttons: [this.captureBtn, this.submitBtn, this.resetBtn]
    }
  }

  startDrag(e) {
    this.isDragging = true;
    const rect = this.dialElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    this.startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
  }

  endDrag() {
    this.isDragging = false;
  }

  drag(e) {
    if (!this.isDragging) return;
    
    const rect = this.dialElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
    
    let delta = angle - this.startAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    
    this.currentAngle += delta;
    this.startAngle = angle;
    
    this.dialElement.style.transform = `rotate(${this.currentAngle}deg)`;
    
    // Calculate current number (0-49)
    const normalizedAngle = (360 - (this.currentAngle % 360)) % 360; // Adjusted for 0 at top
    this.currentPosition = Math.round(normalizedAngle / (360/50)) % 50;
  }

  captureNumber() {
    if (this.currentStep < 4) {
      this.enteredCombination[this.currentStep] = this.currentPosition;
      this.comboNumbers[this.currentStep].textContent = this.currentPosition;
      this.currentStep++;
      
      if (this.currentStep === 4) {
        this.showMessage('All numbers captured. Try the combination now.');
      }
    }
  }

  showMessage(text) {
    if (this.messageElement) {
      this.messageElement.remove();
    }
    this.messageElement = document.createElement('p');
    this.messageElement.textContent = text;
    applyGlassStylingGrey(this.messageElement);
    this.container.appendChild(this.messageElement);
  }

  resetCombination() {
    this.currentStep = 0;
    this.enteredCombination = [null, null, null, null];
    this.comboNumbers.forEach(box => {
      box.textContent = '-';
      box.classList.remove('correct');
    });
    if (this.messageElement) {
      this.messageElement.remove();
      this.messageElement = null;
    }
  }

  checkCombination() {
    if (this.currentStep < 4) {
      this.showMessage('You need to capture all 4 numbers first!');
      return;
    }

    if (this.messageElement) {
      this.messageElement.remove();
      this.messageElement = null;
    }

    let allCorrect = true;
    for (let i = 0; i < 4; i++) {
      if (this.enteredCombination[i] === this.combination[i]) {
        this.comboNumbers[i].classList.add('correct');
      } else {
        this.comboNumbers[i].classList.remove('correct');
        allCorrect = false;
      }
    }
    
    if (allCorrect) {
      this.onSuccess();
    } else {
      this.onFailure();
      this.resetCombination();
    }
  }
}