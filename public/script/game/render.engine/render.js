// this is the main part of the render engine
import Grid from "./grid.js";

class RenderEngine {
  // constructor for the render engine
  constructor() {
    // get the canvas from the DOM
    this.canvasElement = document.getElementById("canvas");

    // initialize the canvas context for rendering processes
    this.canvas = this.canvasElement.getContext("2d");
    // create thhe grid instance to be used in the render engine
    this.grid = new Grid(
      this.canvasElement.width,
      this.canvasElement.height,
      50,
      50
    );
    this.canvas.lineWidth = 1;
    // render the grid in the canvas
    this.grid.render(this);
  }

  // clear the canvas
  clear() {
    this.canvas.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  }

  // render the game model on the screen using render methods
  render(engine) {
    this.clear(); // clear the canvas

    // render the grid
    this.grid.render(this);
  }

  // function to render single point in the canvas
  drawRawPoint(point) {
    // set the color of the point
    this.canvas.fillStyle = point.color;
    // draw the point
    const { cell_x, cell_y, cell_width, cell_height } =
      this.grid.getCellCoordinates(point.x, point.y);
    // draw the point on the canvas
    this.canvas.fillRect(cell_x, cell_y, cell_width, cell_height);
  }

  // function to draw a line in the canvas
  drawRawLine(x1, y1, x2, y2, strokeColor = "white") {
    this.canvas.strokeStyle = strokeColor;
    // start to the draw the line
    this.canvas.beginPath();
    // move to the starting point
    this.canvas.moveTo(x1, y1);
    this.canvas.lineTo(x2, y2); // draw the line
    this.canvas.stroke(); // finish the drawing
  }
}

export default RenderEngine;
