import Point from "../../util/point.js";
import Organism from "./organism.js";

export default class Cell extends Organism {
  constructor(x, y) {
    super(x, y);
    this.color = "yellow";
  }

  render(renderEngine) {
    renderEngine.drawPoint(new Point(this.X, this.Y, this.color));
  }
}
