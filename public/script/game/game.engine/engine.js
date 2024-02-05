import Relative from "../util/relative.js";
import Cell from "./objects/cell.js";

class Engine {
  constructor(renderEngine) {
    this.renderEngine = renderEngine; // render engine to be used for rendering the game
    this.gameObjects = []; // array of objects to be rendered
    this.trasitionGameObjects = []; // array of objects to be rendered in the next frame by removing old objects and adding new objects

    // TODO: remove this
    for (let i = 0; i < 200; i++) {
      const cell = new Cell(
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20)
      );
      this.gameObjects.push(cell);
    }
  }

  // update the state of the game model by applying the rules on each objects in the model
  evolve() {
    // apply the rules to the game model
    this.gameObjects.forEach((gameObject) => {
      gameObject.applyRules(this);
    });

    // replace the trasition objects to the game model
    this.replaceTrasitionObjects();
  }

  // render the each object in the csreen using the render engine on top of the obejcts
  renderObjects() {
    // render all the objects
    this.gameObjects.forEach((gameObject) => {
      gameObject.render(this.renderEngine);
    });
  }

  // main event loop of the game engine
  run() {
    setInterval(() => {
      this.renderObjects();
      this.evolve();
    }, 100);
  }

  // util functions directly related to the game model

  replaceTrasitionObjects() {
    this.trasitionGameObjects.forEach((object) => {
      // get the index of the game object to be replaced
      const objectIndex = object.index;
      // replace the object in the game model
      this.gameObjects[objectIndex] = object.object;
    });

    // clear the trasition game objects
    this.trasitionGameObjects = [];
  }

  // function to add the trasiotion objects to the game model
  addTransitionObject(object) {
    this.trasitionGameObjects.push(object);
  }

  // function for get the ralative game objects based on the given point
  getRelativeGameObjects(baseObject, relatives) {
    const x = baseObject.X;
    const y = baseObject.Y;

    const relativeObjects = [];
    for (let i = 0; i < relatives.length; i++) {
      // calculate the relative x and y accordig to base object
      const relativePoint = relatives[i].getPoint({ x, y });
      // find the game model if there is a object on that point
      const gameObject = this.gameObjects.find(
        (gameObject) =>
          gameObject.X === relativePoint.x && gameObject.Y === relativePoint.y
      );

      relativeObjects.push(gameObject);
    }

    // console.log(relativeObjects);
    return relativeObjects;
  }

  getIndex(gameObject) {
    const index = this.gameObjects.findIndex(
      (object) => object.X === gameObject.X && object.Y === gameObject.Y
    );
    return index;
  }
}

export default Engine;
