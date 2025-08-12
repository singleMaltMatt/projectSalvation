// slidingPuzzle.js
// NORMAL
import { applyGlassStylingGrey } from "./boxes.js";
import { applyGlassStylingGreyBtn } from "./boxes.js";

export class SlidingPuzzle {
  // Add a new option for the image path
  constructor({ size = 3, imageSrc, tileSize = 100, onComplete, onCancel }) {
    this.size = size;
    this.imageSrc = imageSrc; // Path to the full image
    this.tileSize = tileSize; // Size of each tile in pixels (e.g., 100 for 100x100px)
    this.onComplete = onComplete;
    this.onCancel = onCancel;
    this.tiles = [];
    this.emptyPos = { x: size - 1, y: size - 1 };
    this.moves = 0;
    // Store the correct order for solving check
    this.correctOrder = [];
  }

  init() {
    // Basic container setup remains the same
    const container = document.createElement('div');
    container.className = 'sliding-puzzle';
    
    // Create puzzle board
    this.board = document.createElement('div');
    this.board.className = 'puzzle-board';
    this.board.style.gridTemplateColumns = `repeat(${this.size}, ${this.tileSize}px)`;
    // Optional: Add some styling to make it look like a picture frame
    // this.board.style.border = '2px solid #333'; 
    // this.board.style.padding = '5px';
    // this.board.style.background = 'rgba(0, 0, 0, 0.7)'; // Dark background
    
    // Check if image source is provided
    if (!this.imageSrc) {
        console.error("SlidingPuzzle: No image source provided.");
        // Fallback to numbered tiles or show an error
        // For now, let's just return an error message in the container
        container.textContent = "Error: No image provided for puzzle.";
        const controls = document.createElement('div');
        controls.className = 'puzzle-controls';
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Give Up';
        cancelBtn.addEventListener('click', () => this.onCancel());
        applyGlassStylingGreyBtn(cancelBtn);
        controls.appendChild(cancelBtn);
        container.appendChild(controls);
        return { container: container, cancelButton: cancelBtn };
    }

    // Initialize tiles with image pieces
    this._generateTiles();
    this._shuffleTiles();
    this._renderTiles(); // This will now use images
    
    // Add controls (same as before)
    const controls = document.createElement('div');
    controls.className = 'puzzle-controls';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Give Up';
    cancelBtn.addEventListener('click', () => {
        // Call the onCancel callback provided when the puzzle was created
        if (this.onCancel) { 
            this.onCancel(); 
        }
    });
    applyGlassStylingGreyBtn(cancelBtn);
    
    container.appendChild(this.board);
    controls.appendChild(cancelBtn);
    container.appendChild(controls);
    
    return { container: container, cancelButton: cancelBtn }; 
  }

  _generateTiles() {
    const tileCount = this.size * this.size - 1; // 15 for 4x4
    this.tiles = [];
    this.correctOrder = []; // Store the initial (correct) order

    for (let i = 0; i < tileCount; i++) {
      const tile = {
        // Store the original index for reference/checking
        originalIndex: i, 
        // Calculate initial grid positions (like before)
        x: i % this.size,
        y: Math.floor(i / this.size),
        // We will set the background image part later in _renderTiles
        element: null // Will hold the DOM element reference
      };
      this.tiles.push(tile);
      this.correctOrder.push(i); // Store correct index order
    }
    // The empty space doesn't need a tile object
  }

  _shuffleTiles() {
    // Fisher-Yates shuffle with valid puzzle check (logic remains the same)
    let shuffled;
    do {
      for (let i = this.tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap positions in the array
        [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
        // Also swap their stored x,y coordinates for the shuffle
        [this.tiles[i].x, this.tiles[j].x] = [this.tiles[j].x, this.tiles[i].x];
        [this.tiles[i].y, this.tiles[j].y] = [this.tiles[j].y, this.tiles[i].y];
      }
      shuffled = this._isSolvable();
    } while (!shuffled);
    
    // Update positions after shuffle (this part is now handled by the swap above)
    // The x,y coordinates on the tile objects are already updated by the swap loop
    // No need for the separate loop that was here before.
  }

  _isSolvable() {
    // Implementation of solvability check for sliding puzzles (remains the same)
    // Use the originalIndex to determine inversions
    let inversions = 0;
    const flatIndices = this.tiles.map(t => t.originalIndex);
    
    for (let i = 0; i < flatIndices.length; i++) {
      for (let j = i + 1; j < flatIndices.length; j++) {
        if (flatIndices[i] > flatIndices[j]) inversions++;
      }
    }
    
    return inversions % 2 === 0;
  }

  _renderTiles() {
    // Clear the board
    this.board.innerHTML = '';
    
    // Loop through the tiles and create elements with background images
    this.tiles.forEach(tile => {
      const tileElement = document.createElement('div');
      tileElement.className = 'puzzle-tile';
      // Set size
      tileElement.style.width = `${this.tileSize}px`;
      tileElement.style.height = `${this.tileSize}px`;
      
      // --- KEY CHANGE: Use background image ---
      tileElement.style.backgroundImage = `url('${this.imageSrc}')`;
      // Calculate the background position to show the correct piece
      // Background position is negative because we are shifting the view
      const bgX = - (tile.originalIndex % this.size) * this.tileSize;
      const bgY = - Math.floor(tile.originalIndex / this.size) * this.tileSize;
      tileElement.style.backgroundPosition = `${bgX}px ${bgY}px`;
      tileElement.style.backgroundSize = `${this.size * this.tileSize}px ${this.size * this.tileSize}px`; // Scale the full image to fit the grid
      // --- END KEY CHANGE ---
      
      // Set grid position
      tileElement.style.gridColumn = tile.x + 1;
      tileElement.style.gridRow = tile.y + 1;
      
      // Add click listener
      tileElement.addEventListener('click', () => this._moveTile(tile));
      
      // Store reference to the element on the tile object (useful for potential future styling)
      tile.element = tileElement;
      
      this.board.appendChild(tileElement);
    });
    // The empty space is just the gap in the grid, no element needed for it.
  }

  _moveTile(tile) {
    // Check if adjacent to empty space (logic remains the same)
    const dx = Math.abs(tile.x - this.emptyPos.x);
    const dy = Math.abs(tile.y - this.emptyPos.y);
    
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
      // Swap positions in the grid logic
      [tile.x, this.emptyPos.x] = [this.emptyPos.x, tile.x];
      [tile.y, this.emptyPos.y] = [this.emptyPos.y, tile.y];
      
      this.moves++;
      this._renderTiles(); // Re-render to update positions
      
      if (this._isSolved()) {
        setTimeout(() => this.onComplete(), 500); // Delay success callback slightly
      }
    }
  }

  _isSolved() {
    // Check if all tiles are in their original positions
    // Compare current tile positions (x,y) with their original index positions
    for (let i = 0; i < this.tiles.length; i++) {
        const tile = this.tiles[i];
        const targetX = tile.originalIndex % this.size;
        const targetY = Math.floor(tile.originalIndex / this.size);
        if (tile.x !== targetX || tile.y !== targetY) {
            return false; // Found a tile out of place
        }
    }
    return true; // All tiles are in the correct position
  }
}