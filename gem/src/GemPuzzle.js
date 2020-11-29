import ArrayData from './utils/ArrayData';

export default class GemPuzzle {
  constructor(size) {
    this._size = size;

    this.resetGame();
  }

  resetGame() {
    this._tiles = ArrayData.createSequence(this._size * this._size);
    this._tiles2d = ArrayData.convertToObject2D(this._tiles, this._size);
    this._goal2d = ArrayData.convertToObject2D(this._tiles, this._size);
  }

  startGame() {
    do {
      this._tiles = ArrayData.createSequence(this._size * this._size);
      ArrayData.shuffle(this._tiles);
    } while (!this.isSolvableArray());

    this._tiles2d = ArrayData.convertToObject2D(this._tiles, this._size);
    this._tiles = [];
  }

  setTiles2d(obj) {
    this._tiles2d = obj;
  }

  getTiles2d() {
    return this._tiles2d;
  }

  getMove(n) {
    if (this._tiles2d[n].column === this._tiles2d[0].column) {
      const dRow = this._tiles2d[0].row - this._tiles2d[n].row;

      if (dRow === 1 || dRow === -1) {
        this._tiles2d[n].row += dRow;
        this._tiles2d[0].row -= dRow;
        return true;
      }
    }

    if (this._tiles2d[n].row === this._tiles2d[0].row) {
      const dColumn = this._tiles2d[0].column - this._tiles2d[n].column;
      if (dColumn === 1 || dColumn === -1) {
        this._tiles2d[n].column += dColumn;
        this._tiles2d[0].column -= dColumn;
        return true;
      }
    }

    return false;
  }

  isSolved() {
    return ArrayData.isObjectsEqual(this._goal2d, this._tiles2d);
  }

  isSolvableArray() {
    let counter = 0;

    for (let i = 0; i < (this._tiles.length - 1); i++) {
      for (let j = 0; j < i; j++) {
        if (this._tiles[j] > this._tiles[i]) counter += 1;
      }
    }

    return counter % 2 === 0;
  }
}
