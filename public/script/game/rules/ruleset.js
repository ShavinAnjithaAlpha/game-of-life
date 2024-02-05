export default class RuleSet {
  constructor(rules) {
    this.rules = rules;
  }

  // function to appy rule to the game model objects
  apply(gameObject, gameModel) {
    this.rules.forEach((rule) => {
      rule.apply(gameObject, gameModel);
    });
  }
}
