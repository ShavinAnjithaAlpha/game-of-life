import Relative from "../util/relative.js";
import Rule from "./rule.js";
import Cell from "../game.engine/objects/cell.js";

export default class SurvivalRule extends Rule {
  static relativeSet = [
    new Relative(1, Relative.NULL, Relative.UP),
    new Relative(1, Relative.NULL, Relative.DOWN),
    new Relative(1, Relative.LEFT, Relative.NULL),
    new Relative(1, Relative.RIGHT, Relative.NULL),
    new Relative(1, Relative.LEFT, Relative.UP),
    new Relative(1, Relative.RIGHT, Relative.UP),
    new Relative(1, Relative.LEFT, Relative.DOWN),
    new Relative(1, Relative.RIGHT, Relative.DOWN),
  ];

  static apply(baseObject, gameModel) {
    // get the neighbors of the baseObject
    const neighbors = gameModel.getRelativeGameObjects(
      baseObject,
      SurvivalRule.relativeSet
    );

    // count the number of alive neighbors
    let aliveCount = 0;
    for (let neighbor of neighbors) {
      if (neighbor && neighbor.isAlive) {
        aliveCount++;
      }
    }

    if ((aliveCount === 2 || aliveCount === 3) && baseObject.isAlive) {
      // nothing happens stay alive
    }
  }
}
