import Object from "./object.js";

export default class Organism extends Object {
  constructor(x, y) {
    super(x, y);
    this.isAlive = true;
  }
}
