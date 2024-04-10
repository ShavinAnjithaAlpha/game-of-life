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
      200,
      200
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

  // function to draw a line in the canvas
  drawLine(x1, y1, x2, y2, strokeColor = "white") {
    this.canvas.strokeStyle = strokeColor;
    // start to the draw the line
    this.canvas.beginPath();
    // move to the starting point
    this.canvas.moveTo(x1, y1);
    this.canvas.lineTo(x2, y2); // draw the line
    this.canvas.stroke(); // finish the drawing
  }

  drawVerticalFullLine(x, color) {
    this.drawLine(x, 0, x, this.canvasElement.height, color);
  }

  drawHorizontalFullLine(y, color) {
    this.drawLine(0, y, this.canvasElement.width, y, color);
  }

  drawHorizontalLine(x1, x2, y, color) {
    this.drawLine(x1, y, x2, y, color);
  }

  drawVerticalLine(x, y1, y2, color) {
    this.drawLine(x, y1, x, y2, color);
  }

  drawRect(x, y, width, height, color) {
    this.canvas.fillStyle = color;
    this.canvas.fillRect(x, y, width, height);
  }

  drawBorderRect(x, y, width, height, color) {
    this.canvas.strokeStyle = color;
    this.canvas.strokeRect(x, y, width, height);
  }

  clearRect(x, y, width, height) {
    this.canvas.clearRect(x, y, width, height);
  }

  resetCanvas(is_grid = true, color = "black") {
    for (let i = 0; i < this.grid.horizontal_cell_number; i++) {
      for (let j = 0; j < this.grid.vertical_cell_number; j++) {
        const { cell_x, cell_y, cell_width, cell_height } =
          this.grid.getCellCoordinates(i, j);
        this.drawRect(cell_x, cell_y, cell_width, cell_height, color);
      }
    }

    if (is_grid) this.grid.render(this);
  }
}

export default RenderEngine;
