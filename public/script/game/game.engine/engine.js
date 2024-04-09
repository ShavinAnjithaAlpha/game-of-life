import GameModel from "../game.model/model.js";

export default class GameEngine {
  constructor(renderEngine) {
    this.renderEngine = renderEngine;
    this.gameModel = new GameModel(renderEngine.grid);
    this.running = false;
    this.is_grid = true;
    this.is_mousedown = false;
    this.is_plot = false;
    this.pattern_selected = null;
    this.gameSpeed = 50;
    // color values of the game of life
    this.liveCellColor = "orange";
    this.deadCellColor = "black";

    this.handleEvents();
    this.initialize();
    this.initializePlot();

    this.prevHightlightedArea = null;
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

    // render the objects
    this.renderObjects("adding");
  }

  initializePlot() {
    // create the plot
    this.plot = new Chart(document.getElementById("plot"), {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Population",
            data: [],
            borderColor: "rgb(255, 99, 132)",
            fill: false,
            pointRadius: 0,
          },
          {
            label: "Toggled Births",
            data: [],
            borderColor: "rgb(0, 255, 0)",
            fill: false,
            pointRadius: 0,
          },
          {
            label: "Toggled Deaths",
            data: [],
            borderColor: "rgb(0, 0, 255)",
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
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

  renderObjects(status = "evolve") {
    // update the game model using the game model
    this.gameModel.created_cells.forEach((cell) => {
      this.renderEngine.drawRect(
        cell.col * this.renderEngine.grid.cell_width,
        cell.row * this.renderEngine.grid.cell_height,
        this.renderEngine.grid.cell_width,
        this.renderEngine.grid.cell_height,
        this.liveCellColor
      );
    });

    this.gameModel.removed_cells.forEach((cell) => {
      this.renderEngine.drawRect(
        cell.col * this.renderEngine.grid.cell_width,
        cell.row * this.renderEngine.grid.cell_height,
        this.renderEngine.grid.cell_width,
        this.renderEngine.grid.cell_height,
        this.deadCellColor
      );
    });

    if (this.is_grid) {
      // render the grid
      this.renderEngine.grid.render(this.renderEngine);
    }
    // update the game model
    this.gameModel.updateModel(status);
    this.updateStats();
  }
  // main event loop of the game engine
  run() {
    this.intervalId = setInterval(() => {
      if (!this.running) clearInterval(this.intervalId);
      // update the game
      this.evolve(); // evolve the game
      this.addPlotData(); // add data to the plot
    }, this.gameSpeed);
  }

  puase() {
    if (!this.running) return;
    // else pause the game
    this.running = false;
    clearInterval(this.intervalId);
  }

  play() {
    if (this.running) return;
    // else run the game
    this.running = true;
    this.run();
  }

  step() {
    // evolve one step at a time
    this.evolve();
    this.addPlotData();
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
      this.gameSpeed = (10 - e.target.value) * 10;
      // update the speed label
      speedLabel.innerText = `x${e.target.value}`;
      // clear the interval
      clearInterval(this.intervalId);
      // run the game
      this.run();
    });

    // document.getElementById("zoom").oninput = (e) => {
    //   this.zoom(1 - e.target.value / 10);
    // };

    document.getElementById("clear").addEventListener("click", () => {
      // clear the interval
      clearInterval(this.intervalId);
      // clear the living cells
      this.gameModel.reset();
      this.resetPlot(); // reset the plot
      this.updateStats();

      // render the objects
      this.renderEngine.resetCanvas(this.is_grid, this.deadCellColor);
      this.puase();
    });

    document.getElementById("random").addEventListener("click", () => {
      this.random();
    });

    const gridInput = document.getElementById("grid");
    gridInput.addEventListener("change", (e) => {
      this.is_grid = e.target.checked;
      this.renderEngine.resetCanvas(this.is_grid, this.deadCellColor);
      this.renderObjects("adding");
    });

    const graphCheckBox = document.getElementById("graph-checkbox");
    graphCheckBox.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.getElementById("plot").style.display = "block";
        this.is_plot = true;
      } else {
        document.getElementById("plot").style.display = "none";
        this.is_plot = false;
      }
    });

    // handle the pattern selection box
    const patternSelect = document.getElementById("pattern");
    patternSelect.addEventListener("change", (e) => {
      // add the selected pattern to the grid
      this.addSelectedPattern(e.target.value);
    });

    // set the color picker events
    document.getElementById("cell-color").addEventListener("change", (e) => {
      this.liveCellColor = e.target.value;
      // redraw the objects
      this.gameModel.renderModel(this.renderEngine, this.liveCellColor);
    });

    // document.getElementById("dead-color").addEventListener("change", (e) => {
    //   this.deadCellColor = e.target.value;
    // });

    // handle the canvas events
    this.handleCanvasEvents();
  }

  handleCanvasEvents() {
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

      if (this.pattern_selected !== null) {
        this.showCurrentCellsHighlighted(e);
      }
    });

    const getInput = document.getElementById("getInput");
    const eraser = document.getElementById("eraser");
    getInput.addEventListener("change", (e) => {
      if (eraser.checked) eraser.checked = false;
    });
    eraser.addEventListener("change", () => {
      // change the get input check box values to the opposite
      if (getInput.checked) getInput.checked = false;
    });

    canvas.addEventListener("click", (e) => {
      if (this.pattern_selected !== null) {
        // add thr selected pattern to the grid with appropriate offsets
        this.addPatternWithOffset(e);
        return;
      }

      if (getInput.checked) {
        this.addCell(e);
      } else if (eraser.checked) {
        this.erase(e);
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
        this.addCell(e);
      } else if (this.is_mousedown && eraser.checked) {
        this.erase(e);
      }
    });
  }

  addCell(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    const i = Math.floor(y / this.renderEngine.grid.cell_height);
    const j = Math.floor(x / this.renderEngine.grid.cell_width);

    if (this.gameModel.get(i, j) !== undefined) return; // return if the cell is already living

    this.gameModel.addCell(i, j); // add the cell to the living cells of the game model
    this.renderObjects("adding"); // render the newly added cell on the canvas
    this.updateStats(); // update the status of the game
  }

  erase(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    const i = Math.floor(y / this.renderEngine.grid.cell_height);
    const j = Math.floor(x / this.renderEngine.grid.cell_width);

    // check whether the cell is living
    const cell = this.gameModel.get(i, j);
    if (cell === undefined) return; // return if the cell is not living

    // then remove the cell from the game model
    this.gameModel.removeCell(i, j);
    this.renderObjects("removing"); // render the removed cell on the canvas
    this.updateStats(); // update the status of the game
  }

  zoom(value) {
    this.renderEngine.grid.zoom(value);
    this.renderEngine.resetCanvas(this.is_grid, this.deadCellColor);
    this.renderObjects();
  }

  // function to randomly generate the living cells
  random() {
    // clear the interval
    clearInterval(this.intervalId);
    // clear the living cells
    this.gameModel.living_cells.clear();
    this.gameModel.generation = 0; // reste the geneation to 0

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

    this.renderEngine.resetCanvas(this.is_grid, this.deadCellColor); // render the grid on the canvas
    this.renderObjects("adding"); // render object on the canvas
    this.updateStats(); // update the status of the game
  }

  updateStats() {
    const genLabel = document.getElementById("generation");
    const livingLabel = document.getElementById("livingCells");
    const deadCells = document.getElementById("deadCells");

    genLabel.innerText = `${this.gameModel.getGeneration()}`;
    livingLabel.innerText = `${this.gameModel.getPopulation()}`;
    deadCells.innerText = `${this.gameModel.getDeadPopulation()}`;
  }

  // Function to add new data to the chart
  addPlotData() {
    if (this.is_plot === false) return; // return if the plot is not enabled

    if (this.gameModel.getPopulation() % 10 === 0) {
      this.plot.data.labels.push(this.gameModel.getGeneration()); // add the generation data as the label
      this.plot.data.datasets[0].data.push(this.gameModel.getPopulation()); // add the population data
      this.plot.data.datasets[1].data.push(this.gameModel.getToggledBirths()); // add the toggled births data
      this.plot.data.datasets[2].data.push(this.gameModel.getToggledDeaths()); // add the toggled deaths data
      this.plot.update();
    }
  }

  resetPlot() {
    this.plot.data.labels = [];
    this.plot.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
    this.plot.update();
  }

  addSelectedPattern(pattern) {
    // read the pattern from the pattern file
    fetch("/script/game/data/patterns.json")
      .then((response) => response.json())
      .then((data) => {
        // read the pattern with the selected name
        const selectedPattern = data.find((p) => p.name === pattern);
        if (selectedPattern === undefined) return;

        // now read the cell values from the pattern
        this.pattern_selected = selectedPattern.cells;
      })
      .catch((error) => console.log(error));
  }

  addPatternWithOffset(e) {
    // determine the cell to be added
    const x = e.offsetX;
    const y = e.offsetY;

    // calculate the row and column of the cell
    const i = Math.floor(y / this.renderEngine.grid.cell_height);
    const j = Math.floor(x / this.renderEngine.grid.cell_width);

    // get the pattern selected
    this.pattern_selected.forEach((cell) => {
      this.gameModel.addCell(cell[0] + i, cell[1] + j);
    });

    // render the objects
    this.renderObjects("adding");

    this.pattern_selected = null; // reset the pattern selected
    this.prevHightlightedCell = null;
  }

  showCurrentCellsHighlighted(e) {
    // determine the offset cell to be added
    const x = e.offsetX;
    const y = e.offsetY;

    // calculate the row and column of the cell
    const offsetRow = Math.floor(y / this.renderEngine.grid.cell_height);
    const offsetCol = Math.floor(x / this.renderEngine.grid.cell_width);

    // get the coverage area of the pattern
    const { row, col, width, height } = this.getCoverageAreaOfPattern(
      this.pattern_selected,
      offsetCol,
      offsetRow
    );

    if (this.prevHightlightedArea) {
      // clear the previous hightlighted cells
      this.renderGridArea(
        this.prevHightlightedArea.row,
        this.prevHightlightedArea.col,
        this.prevHightlightedArea.width,
        this.prevHightlightedArea.height
      );
    }

    // first check whether is there are any living cells in the area
    if (this.isObjectinArea(row, col, width, height)) return;

    // render the grid area with selected pattern
    this.pattern_selected.forEach((cell) => {
      this.renderEngine.drawRect(
        (cell[1] + offsetCol) * this.renderEngine.grid.cell_width,
        (cell[0] + offsetRow) * this.renderEngine.grid.cell_height,
        this.renderEngine.grid.cell_width,
        this.renderEngine.grid.cell_height,
        "limegreen"
      );

      // draw the grid lines also
      this.renderEngine.drawVerticalFullLine(
        (cell[1] + offsetCol) * this.renderEngine.grid.cell_width,
        "rgb(40, 40, 40)"
      );

      this.renderEngine.drawHorizontalFullLine(
        (cell[0] + offsetRow) * this.renderEngine.grid.cell_height,
        "rgb(40, 40, 40)"
      );
    });

    this.prevHightlightedArea = { row, col, width, height };
  }

  // to render a part of the grid specified by the row and column
  renderGridArea(row, col, width, height) {
    // first clear the specified area from the canvas
    this.renderEngine.clearRect(
      col * this.renderEngine.grid.cell_width,
      row * this.renderEngine.grid.cell_height,
      width * this.renderEngine.grid.cell_width,
      height * this.renderEngine.grid.cell_height
    );

    // now draw the grid lines belongs to that area as horizontal and vertical lines
    // draw the horizontal lines
    for (let i = row; i < row + height; i++) {
      this.renderEngine.drawHorizontalFullLine(
        i * this.renderEngine.grid.cell_height,
        "rgb(40, 40, 40)"
      );
    }
    // draw the vertical lines
    for (let j = col; j < col + width; j++) {
      this.renderEngine.drawVerticalFullLine(
        j * this.renderEngine.grid.cell_width,
        "rgb(40, 40, 40)"
      );
    }

    // now render the game model's object that covers that area
    for (let i = row; i < row + height; i++) {
      for (let j = col; j < col + width; j++) {
        const cell = this.gameModel.get(i, j);
        if (cell !== undefined) {
          this.renderEngine.drawRect(
            j * this.renderEngine.grid.cell_width,
            i * this.renderEngine.grid.cell_height,
            this.renderEngine.grid.cell_width,
            this.renderEngine.grid.cell_height,
            this.liveCellColor
          );
        }
      }
    }
  }

  isObjectinArea(row, col, width, height) {
    for (let i = row; i < row + height; i++) {
      for (let j = col; j < col + width; j++) {
        if (this.gameModel.get(i, j) !== undefined) return true;
      }
    }
    return false;
  }

  // get the pattern covererd rectangle area as {rw, col ,width, height} from cell pattern
  getCoverageAreaOfPattern(pattern, offsetX, offsetY) {
    let minRow = Infinity;
    let minCol = Infinity;
    let maxRow = -Infinity;
    let maxCol = -Infinity;

    pattern.forEach((cell) => {
      const row = cell[0] + offsetY;
      const col = cell[1] + offsetX;

      if (row < minRow) minRow = row;
      if (col < minCol) minCol = col;
      if (row > maxRow) maxRow = row;
      if (col > maxCol) maxCol = col;
    });

    return {
      row: minRow,
      col: minCol,
      width: maxCol - minCol + 1,
      height: maxRow - minRow + 1,
    };
  }
}
