export default class Grid {
  constructor(width, height, vertical_cell_number, horizontal_cell_number) {
    this.width = width;
    this.height = height;
    this.vertical_cell_number = vertical_cell_number;
    this.horizontal_cell_number = horizontal_cell_number;

    this.base_X = this.vertical_cell_number;
    this.base_Y = this.horizontal_cell_number;

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

  zoom(value) {
    // change the vertical and horizontal cell numbers based on the zoom value as a percentage
    this.vertical_cell_number = Math.floor(this.base_Y * value);

    this.horizontal_cell_number = Math.floor(this.base_X * value);

    // calculate the size of the cell
    this.cell_width = this.width / this.horizontal_cell_number;
    this.cell_height = this.height / this.vertical_cell_number;
  }

  // function to render the grid
  render(renderEngine) {
    // draw the vertical lines
    for (let i = 0; i <= this.horizontal_cell_number; i++) {
      const { cell_x, cell_y, cell_width, cell_height } =
        this.getCellCoordinates(i, 0);
      renderEngine.drawLine(
        cell_x,
        cell_y,
        cell_x,
        cell_y + this.height,
        "rgb(20, 20, 20)"
      );
    }

    // draw the horizontal lines
    for (let i = 0; i <= this.vertical_cell_number; i++) {
      const { cell_x, cell_y, cell_width, cell_height } =
        this.getCellCoordinates(0, i);
      renderEngine.drawLine(
        cell_x,
        cell_y,
        cell_x + this.width,
        cell_y,
        "rgb(50, 50, 50)"
      );
    }
  }

  size() {
    return {
      x_cells: this.horizontal_cell_number,
      y_cells: this.vertical_cell_number,
    };
  }
}
