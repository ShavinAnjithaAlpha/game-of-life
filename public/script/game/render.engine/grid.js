export default class Grid {
  constructor(width, height, vertical_cell_number, horizontal_cell_number) {
    this.width = width;
    this.height = height;
    this.vertical_cell_number = vertical_cell_number;
    this.horizontal_cell_number = horizontal_cell_number;

    // calculate the size of the cell
    this.cell_width = this.width / this.horizontal_cell_number;
    this.cell_height = this.height / this.vertical_cell_number;
  }

  // function to get the (x, y) from the cell coordinates
  getCellCoordinates(x, y) {
    const cell_x = x * this.cell_width;
    const cell_y = y * this.cell_height;

    return {
      cell_x,
      cell_y,
      cell_width: this.cell_width,
      cell_height: this.cell_height,
    };
  }

  // function to render the grid
  render(renderEngine) {
    // draw the vertical lines
    for (let i = 0; i <= this.horizontal_cell_number; i++) {
      const { cell_x, cell_y, cell_width, cell_height } =
        this.getCellCoordinates(i, 0);
      renderEngine.drawRawLine(
        cell_x,
        cell_y,
        cell_x,
        cell_y + this.height,
        "rgb(50, 50, 50)"
      );
    }

    // draw the horizontal lines
    for (let i = 0; i <= this.vertical_cell_number; i++) {
      const { cell_x, cell_y, cell_width, cell_height } =
        this.getCellCoordinates(0, i);
      renderEngine.drawRawLine(
        cell_x,
        cell_y,
        cell_x + this.width,
        cell_y,
        "rgb(50, 50, 50)"
      );
    }
  }
}
