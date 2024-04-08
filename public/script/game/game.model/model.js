import HashList from "../util/hash_list.js";

export default class GameModel {
  constructor(grid) {
    this.living_cells = new HashList(200); // track the living cells of the game of life
    this.removed_cells = []; // track the removed cells of the game of life
    this.created_cells = []; // track the created cells of the game of life
    this.grid = grid;
    this.generation = 0;
    this.toggled_births = 0;
    this.toggled_deaths = 0;
  }

  // function to add a cell to the living cells
  addCell(row, col) {
    this.created_cells.push({ row, col });
  }

  // function to remove a cell from the living cells
  removeCell(row, col) {
    this.removed_cells.push({ row, col });
  }

  // function to update the game model
  updateModel(status = "evolve") {
    // remove the cells from the living cells
    this.removed_cells.forEach((cell) => {
      this.living_cells.remove(cell.row, cell.col);
    });

    // add the cells to the living cells
    this.created_cells.forEach((cell) => {
      this.living_cells.add(cell.row, cell.col, cell);
    });

    // update the toggled births and deaths
    this.toggled_births = this.created_cells.length;
    this.toggled_deaths = this.removed_cells.length;
    // clear the created and removed cells
    this.created_cells = [];
    this.removed_cells = [];
    if (status === "evolve") {
      // increment the generation
      this.generation++;
    }
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

  // function to redraw the entire grid in the canvas thriugh render engine
  renderModel(renderEngine, color) {
    // first fill the canvas with black color
    renderEngine.clearRect(0, 0, this.grid.width, this.grid.height);
    // then redraw the grid in the canvas
    this.grid.render(renderEngine);
    // redraw the living cells in the canvas
    for (let i = 0; i < this.living_cells.base_length; i++) {
      this.living_cells.getRow(i).forEach((cell) => {
        renderEngine.drawRect(
          cell.col * renderEngine.grid.cell_width,
          cell.row * renderEngine.grid.cell_height,
          renderEngine.grid.cell_width,
          renderEngine.grid.cell_height,
          color
        );
      });
    }
  }

  reset() {
    this.living_cells.clear();
    this.removed_cells = [];
    this.created_cells = [];
    this.generation = 0;
  }

  getGeneration() {
    return this.generation;
  }

  getPopulation() {
    return this.living_cells.getSize();
  }

  getDeadPopulation() {
    return (
      this.grid.horizontal_cell_number * this.grid.vertical_cell_number -
      this.living_cells.getSize()
    );
  }

  getToggledBirths() {
    return this.toggled_births;
  }

  getToggledDeaths() {
    return this.toggled_deaths;
  }
}
