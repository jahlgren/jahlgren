import { Vector2d } from "./Vector2d.js";

export class Box {
  /**
   * Creates a new box object (geometry).
   * @param {number} x 
   * @param {number} y 
   * @param {number} width
   * @param {number} height 
   */
  constructor(x, y, width, height) {
    /** @type {Vector2d} */
    this.position = new Vector2d(x, y);
    
    /** @type {Vector2d} */
    this.size = new Vector2d(width, height); 

    /** @type {Vector2d} */
    this.origin = new Vector2d(0.5, 0.5);
  }

  /**
   * Returns true if this box overlaps another box.
   * @param {Box} other
   * @returns {boolean} 
   */
  overlapBox(other) {
    return Box.overlapBox(this, other);
  }

  /**
   * Returns true if 2 boxes overlap.
   * @param {Box} first 
   * @param {Box} second 
   * @returns {boolean}
   */
  static overlapBox(first, second) {
    const x1 = first.position.x - first.origin.x * first.size.x;
    const y1 = first.position.y - first.origin.y * first.size.y;
    const x2 = second.position.x - second.origin.x * second.size.x;
    const y2 = second.position.y- second.origin.y * second.size.y;
    return (
      x1 < x2 + second.size.x &&
      x1 + first.size.x > x2 &&
      y1 < y2 + second.size.y &&
      y1 + first.size.y > y2
    );
  }
}