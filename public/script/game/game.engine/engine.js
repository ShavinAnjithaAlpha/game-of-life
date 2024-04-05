import GameModel from "../game.model/model.js";

export default class GameEngine {
  constructor(renderEngine) {
    this.renderEngine = renderEngine;
    this.gameModel = new GameModel(renderEngine.grid);
    this.running = false;
    this.is_grid = true;
    this.is_mousedown = false;
    this.gameSpeed = 30;
    this.handleEvents();
    this.initialize();
  }

  initialize() {
    // initialize the game model
    this.gameModel.addCell(26, 24);
    this.gameModel.addCell(26, 26);
    this.gameModel.addCell(25, 25);
    this.gameModel.addCell(25, 26);
    this.gameModel.addCell(27, 26);

    this.gameModel.addCell(36, 34);
    this.gameModel.addCell(36, 36);
    this.gameModel.addCell(35, 35);
    this.gameModel.addCell(35, 36);
    this.gameModel.addCell(37, 36);

    this.gameModel.addCell(46, 44);
    this.gameModel.addCell(46, 46);
    this.gameModel.addCell(46, 45);
    this.gameModel.addCell(45, 45);
    this.gameModel.addCell(47, 44);

    this.gameModel.addCell(146, 144);
    this.gameModel.addCell(146, 146);
    this.gameModel.addCell(146, 145);
    this.gameModel.addCell(145, 145);
    this.gameModel.addCell(147, 144);

    // render the objects
    this.renderObjects();
  }

  evolve() {
    // iterate through all the cell in the grid
    const rows = this.renderEngine.grid.horizontal_cell_number;
    const cols = this.renderEngine.grid.vertical_cell_number;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // get the number of neighbours of the cell
        const neighbours = this.gameModel.getNumberOfNeighours(i, j);

        // get the cell from the living cells
        const cell = this.gameModel.get(i, j);

        // check if the cell is alive
        if (cell !== undefined) {
          // check if the cell has less than 2 neighbours
          if (neighbours < 2) {
            // remove the cell from the living cells
            this.gameModel.removeCell(i, j);
          }

          // check if the cell has more than 3 neighbours
          if (neighbours > 3) {
            // remove the cell from the living cells
            this.gameModel.removeCell(i, j);
          }
        } else {
          // check if the cell has exactly 3 neighbours
          if (neighbours === 3) {
            // add the cell to the living cells
            this.gameModel.addCell(i, j);
          }
        }
      }
    }

    // render the objects
    this.renderObjects();
  }

  renderObjects() {
    // update the game model using the game model
    this.gameModel.created_cells.forEach((cell) => {
      this.renderEngine.drawRect(
        cell.col * this.renderEngine.grid.cell_width,
        cell.row * this.renderEngine.grid.cell_height,
        this.renderEngine.grid.cell_width,
        this.renderEngine.grid.cell_height,
        "orange"
      );
    });

    this.gameModel.removed_cells.forEach((cell) => {
      this.renderEngine.drawRect(
        cell.col * this.renderEngine.grid.cell_width,
        cell.row * this.renderEngine.grid.cell_height,
        this.renderEngine.grid.cell_width,
        this.renderEngine.grid.cell_height,
        "black"
      );
    });

    if (this.is_grid) {
      // render the grid
      this.renderEngine.grid.render(this.renderEngine);
    }
    // update the game model
    this.gameModel.updateModel();
    this.updateStats();
  }
  // main event loop of the game engine
  run() {
    this.intervalId = setInterval(() => {
      if (!this.running) clearInterval(this.intervalId);
      this.evolve();
    }, this.gameSpeed);
  }

  puase() {
    this.running = false;
    clearInterval(this.intervalId);
  }

  play() {
    this.running = true;
    this.run();
  }

  step() {
    // evolve one step at a time
    this.evolve();
  }

  handleEvents() {
    document.getElementById("pause").addEventListener("click", () => {
      this.puase();
    });

    document.getElementById("play").addEventListener("click", () => {
      this.play();
    });

    document.getElementById("step").addEventListener("click", () => {
      if (!this.running) {
        this.step();
      }
    });

    const speedLabel = document.getElementById("speedLabel");
    document.getElementById("speedRange").addEventListener("change", (e) => {
      // change the speed of the game
      this.gameSpeed = e.target.value;
      // update the speed label
      speedLabel.innerText = e.target.value;
      // clear the interval
      clearInterval(this.intervalId);
      // run the game
      this.run();
    });

    document.getElementById("zoom").addEventListener("change", (e) => {
      this.zoom(e.target.value / 10);
    });

    document.getElementById("clear").addEventListener("click", () => {
      // clear the interval
      clearInterval(this.intervalId);
      // clear the living cells
      this.gameModel.reset();

      // render the objects
      this.renderEngine.resetCanvas(this.is_grid);
      this.puase();
    });

    document.getElementById("random").addEventListener("click", () => {
      this.random();
    });

    const xLabel = document.getElementById("x");
    const yLabel = document.getElementById("y");
    const state = document.getElementById("state");

    const canvas = document.getElementById("canvas");
    canvas.addEventListener("mousemove", (e) => {
      const x = e.offsetX;
      const y = e.offsetY;

      const i = Math.floor(y / this.renderEngine.grid.cell_height);
      const j = Math.floor(x / this.renderEngine.grid.cell_width);

      xLabel.innerText = j;
      yLabel.innerText = i;

      // decide whether the cell is living or not
      const cell = this.gameModel.get(i, j);
      if (cell === undefined) {
        state.innerText = "Dead";
      } else {
        state.innerText = "Alive";
      }
    });

    const getInput = document.getElementById("getInput");
    canvas.addEventListener("click", (e) => {
      if (getInput.checked) {
        const x = e.offsetX;
        const y = e.offsetY;

        const i = Math.floor(y / this.renderEngine.grid.cell_height);
        const j = Math.floor(x / this.renderEngine.grid.cell_width);

        this.gameModel.addCell(i, j);
        this.renderObjects();
      }
    });

    canvas.addEventListener("mousedown", (e) => {
      this.is_mousedown = true;
    });

    canvas.addEventListener("mouseup", (e) => {
      this.is_mousedown = false;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (this.is_mousedown && getInput.checked) {
        const x = e.offsetX;
        const y = e.offsetY;

        const i = Math.floor(y / this.renderEngine.grid.cell_height);
        const j = Math.floor(x / this.renderEngine.grid.cell_width);

        this.gameModel.addCell(i, j);
        this.renderObjects();
      }
    });

    const gridInput = document.getElementById("grid");
    gridInput.addEventListener("change", (e) => {
      this.is_grid = e.target.checked;
      this.renderEngine.resetCanvas(this.is_grid);
      this.renderObjects();
    });
  }

  zoom(value) {
    this.renderEngine.grid.zoom(value);
    this.renderEngine.resetCanvas(this.is_grid);
    this.renderObjects();
  }

  // function to randomly generate the living cells
  random() {
    // clear the interval
    clearInterval(this.intervalId);
    // clear the living cells
    this.gameModel.living_cells.clear();

    // get the number of cells to be generated
    const n = Math.floor(Math.random() * 100);

    const leftLimit = Math.floor(
      Math.random() * this.renderEngine.grid.horizontal_cell_number
    );
    const topLimit = Math.floor(
      Math.random() * this.renderEngine.grid.vertical_cell_number
    );

    // generate the cells
    for (let i = 0; i < n; i++) {
      const row = Math.floor(Math.random() * 20) + topLimit;
      const col = Math.floor(Math.random() * 20) + leftLimit;

      this.gameModel.addCell(row, col);
    }

    this.renderEngine.resetCanvas(this.is_grid);
    // render the objects
    this.renderObjects();
  }

  updateStats() {
    const genLabel = document.getElementById("generation");
    const livingLabel = document.getElementById("livingCells");
    const deadCells = document.getElementById("deadCells");

    genLabel.innerText = this.gameModel.generation();
    livingLabel.innerText = this.gameModel.population();
    deadCells.innerText = this.gameModel.deadPopulation();
  }
}
