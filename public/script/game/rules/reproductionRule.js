import Relative from "../util/relative.js";
import Rule from "./rule.js";
import Cell from "../game.engine/objects/cell.js";

export default class ReproductionRule extends Rule {
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
      ReproductionRule.relativeSet
    );

    // count the number of alive neighbors
    let aliveCount = 0;
    for (let neighbor of neighbors) {
      if (neighbor && neighbor.isAlive) {
        aliveCount++;
      }
    }

    if (aliveCount === 3) {
      // make a deep copy of the baseObject
      const updatedObject = new Cell(baseObject.X, baseObject.Y);
      // change the state of the object
      updatedObject.isAlive = true;
      // get the index of the object in the model
      const index = gameModel.getIndex(baseObject);
      // add to the model's trasition model
      gameModel.addTransitionObject({ index: index, object: updatedObject });
    }
  }
}
