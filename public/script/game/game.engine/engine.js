import Cell from "./objects/cell.js";

class Engine {
  constructor(renderEngine) {
    this.renderEngine = renderEngine; // render engine to be used for rendering the game
    // array of objects to be rendered
    this.gameObjects = [new Cell(10, 10), new Cell(20, 20), new Cell(30, 30)];
  }

  renderObjects() {
    // render all the objects
    this.gameObjects.forEach((gameObject) => {
      gameObject.render(this.renderEngine);
    });
  }

  run() {
    setInterval(() => {
      this.renderObjects();
    }, 100);
  }
}

export default Engine;
