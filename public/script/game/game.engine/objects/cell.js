import SurvivalRule from "../../rules/SurvivalRule.js";
import OverPopulationRule from "../../rules/overPopulationRule.js";
import RuleSet from "../../rules/ruleset.js";
import UnderPopulationRule from "../../rules/underPopulationRule.js";
import ReproductionRule from "../../rules/reproductionRule.js";
import Point from "../../util/point.js";
import Organism from "./organism.js";

export default class Cell extends Organism {
  static ruleSet = new RuleSet([
    UnderPopulationRule,
    OverPopulationRule,
    SurvivalRule,
    ReproductionRule,
  ]);

  constructor(x, y) {
    super(x, y);
    this.isAlive = true;
    this.color = "yellow";
  }

  applyRules(gameModel) {
    Cell.ruleSet.apply(this, gameModel);
  }

  render(renderEngine) {
    if (this.isAlive) {
      renderEngine.drawRawPoint({ x: this.X, y: this.Y, color: this.color });
    } else {
      renderEngine.drawRawPoint({ x: this.X, y: this.Y, color: "red" });
    }
  }
}
