import HashList from "../util/hash_list.js";

export default class GameModel {
  constructor(grid) {
    this.living_cells = new HashList(200); // track the living cells of the game of life
    this.removed_cells = []; // track the removed cells of the game of life
    this.created_cells = []; // track the created cells of the game of life
    this.grid = grid;
  }

  // function to add a cell to the living cells
  addCell(row, col) {
    this.created_cells.push({ row, col });
  }

  // function to remove a cell from the living cells
  removeCell(row, col) {
    this.removed_cells.push({ row, col });
    if (row === 192 && col === 131) {
      console.log("131, 192 added to removed cells");
    }
  }

  // function to update the game model
  updateModel() {
    // remove the cells from the living cells
    this.removed_cells.forEach((cell) => {
      this.living_cells.remove(cell.row, cell.col);
    });

    // add the cells to the living cells
    this.created_cells.forEach((cell) => {
      this.living_cells.add(cell.row, cell.col, cell);
    });

    // clear the created and removed cells
    this.created_cells = [];
    this.removed_cells = [];
  }

  get(i, j) {
    return this.living_cells.get(i, j);
  }

  // get the neighbours of the cell
  getNumberOfNeighours(row, col) {
    // get the neighbours of the cell
    const north = this.getAdjColRow(row - 1, col);
    const south = this.getAdjColRow(row + 1, col);
    const west = this.getAdjColRow(row, col - 1);
    const east = this.getAdjColRow(row, col + 1);
    const northWest = this.getAdjColRow(row - 1, col - 1);
    const northEast = this.getAdjColRow(row - 1, col + 1);
    const southWest = this.getAdjColRow(row + 1, col - 1);
    const southEast = this.getAdjColRow(row + 1, col + 1);

    // return the number of neighbours that are not undefined
    const l = [
      north,
      south,
      west,
      east,
      northWest,
      northEast,
      southEast,
      southWest,
    ].filter((el) => el !== undefined);
    return l.length;
  }

  getAdjColRow(row, col) {
    if (row < 0) row = this.grid.vertical_cell_number - 1;
    if (row >= this.grid.vertical_cell_number) row = 0;

    if (col < 0) col = this.grid.horizontal_cell_number - 1;
    if (col >= this.grid.horizontal_cell_number) col = 0;

    return this.living_cells.get(row, col);
  }

  reset() {
    this.living_cells.clear();
    this.removed_cells = [];
    this.created_cells = [];
  }
}
