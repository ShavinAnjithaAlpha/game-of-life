export default class Object {
  static ruleSet;

  constructor(x, y) {
    this.X = x;
    this.Y = y;
  }
  // function for render the particular object in the cannas using the render engine
  render() {
    // function to be implemented by the child class
  }
}
