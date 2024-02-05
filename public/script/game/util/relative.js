export default class Relative {
  static NULL = 0;
  static UP = 1;
  static DOWN = 2;
  static LEFT = 3;
  static RIGHT = 4;

  constructor(distance, direction_x, direction_y) {
    this.distance = distance;
    // if (direction_x !== 3 || direction_x !== 4 || direction_x !== 0)
    //   throw new Error("Invalid direction");
    // if (direction_y !== 1 || direction_y !== 2 || direction_y !== 0)
    //   throw new Error("Invalid direction");

    this.direction_x = direction_x;
    this.direction_y = direction_y;
  }

  getPoint(base_point) {
    // calculate the x and y coordinated of the relative point according to base point
    let x = base_point.x;
    let y = base_point.y;

    if (this.direction_x === Relative.LEFT) {
      x -= this.distance;
    } else if (this.direction_x === Relative.RIGHT) {
      x += this.distance;
    }

    if (this.direction_y === Relative.UP) {
      y -= this.distance;
    } else if (this.direction_y === Relative.DOWN) {
      y += this.distance;
    }

    return { x, y };
  }
}
