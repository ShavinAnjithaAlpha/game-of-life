// this is the main part of the render engine
import Engine from "../game.engine/engine";

class RenderEngine {
  canvas; // canvas context used

  constructor() {
    // get the canvas from the DOM
    const canvasElement = document.getElementById("canvas");
    // initialize the canvas context for rendering processes
    canvas = canvasElement.getContext("2d");
  }

  render(engine) {}
}
