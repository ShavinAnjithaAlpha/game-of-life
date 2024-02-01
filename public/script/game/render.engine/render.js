// this is the main part of the render engine

class RenderEngine {
  constructor() {
    // get the canvas from the DOM
    this.canvasElement = document.getElementById("canvas");

    // initialize the canvas context for rendering processes
    this.canvas = this.canvasElement.getContext("2d");
  }

  render(engine) {
    // clear the canvas
    this.canvas.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    for (let i = 0; i < 1000; i++) {
      // get random x and y positions
      const x = Math.floor(Math.random() * this.canvasElement.width);
      const y = Math.floor(Math.random() * this.canvasElement.height);

      // get random color
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      // set the color of the rectangle
      this.canvas.fillStyle = `rgb(${r}, ${g}, ${b})`;
      // draw the rectangle
      this.canvas.fillRect(x, y, 1, 1);
    }
  }
}

export default RenderEngine;
