// slidingPuzzle.js
// NORMAL
import { applyGlassStylingGrey } from "./boxes.js";
import { applyGlassStylingGreyBtn } from "./boxes.js";

export class SlidingPuzzle {
  constructor({ size = 3, onComplete, onCancel }) {
    this.size = size;
    this.onComplete = onComplete;
    this.onCancel = onCancel;
    this.tiles = [];
    this.emptyPos = { x: size - 1, y: size - 1 };
    this.moves = 0;
  }

  init() {
    const container = document.createElement('div');
    container.className = 'sliding-puzzle';
    
    // Create puzzle board
    this.board = document.createElement('div');
    this.board.className = 'puzzle-board';
    this.board.style.gridTemplateColumns = `repeat(${this.size}, 100px)`;
    
    // Initialize tiles
    this._generateTiles();
    this._shuffleTiles();
    this._renderTiles();
    
    // Add controls
    const controls = document.createElement('div');
    controls.className = 'puzzle-controls';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Give Up';
    cancelBtn.addEventListener('click', () => this.onCancel());
    applyGlassStylingGreyBtn(cancelBtn);
    
    container.appendChild(this.board);
    controls.appendChild(cancelBtn);
    container.appendChild(controls);
    
    return container;
  }

  _generateTiles() {
    const tileCount = this.size * this.size - 1;
    for (let i = 0; i < tileCount; i++) {
      this.tiles.push({
        value: i + 1,
        x: i % this.size,
        y: Math.floor(i / this.size)
      });
    }
  }

  _shuffleTiles() {
    // Fisher-Yates shuffle with valid puzzle check
    let shuffled;
    do {
      for (let i = this.tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
      }
      shuffled = this._isSolvable();
    } while (!shuffled);
    
    // Update positions after shuffle
    this.tiles.forEach((tile, index) => {
      tile.x = index % this.size;
      tile.y = Math.floor(index / this.size);
    });
  }

  _isSolvable() {
    // Implementation of solvability check for sliding puzzles
    let inversions = 0;
    const flatTiles = this.tiles.map(t => t.value);
    
    for (let i = 0; i < flatTiles.length; i++) {
      for (let j = i + 1; j < flatTiles.length; j++) {
        if (flatTiles[i] > flatTiles[j]) inversions++;
      }
    }
    
    return inversions % 2 === 0;
  }

  _renderTiles() {
    this.board.innerHTML = '';
    
    this.tiles.forEach(tile => {
      const tileElement = document.createElement('div');
      tileElement.className = 'puzzle-tile';
      tileElement.textContent = tile.value;
      tileElement.style.gridColumn = tile.x + 1;
      tileElement.style.gridRow = tile.y + 1;
      
      tileElement.addEventListener('click', () => this._moveTile(tile));
      
      this.board.appendChild(tileElement);
    });
  }

  _moveTile(tile) {
    // Check if adjacent to empty space
    const dx = Math.abs(tile.x - this.emptyPos.x);
    const dy = Math.abs(tile.y - this.emptyPos.y);
    
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
      // Swap positions
      [tile.x, this.emptyPos.x] = [this.emptyPos.x, tile.x];
      [tile.y, this.emptyPos.y] = [this.emptyPos.y, tile.y];
      
      this.moves++;
      this._renderTiles();
      
      if (this._isSolved()) {
        setTimeout(() => this.onComplete(), 500);
      }
    }
  }

  _isSolved() {
    return this.tiles.every((tile, index) => {
      const targetX = index % this.size;
      const targetY = Math.floor(index / this.size);
      return tile.x === targetX && tile.y === targetY;
    });
  }
}