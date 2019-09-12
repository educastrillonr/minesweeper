const get = id => {
  return document.getElementById(id);
};

class Cell {
  constructor(isAMine, x, y) {
    this._isAMine = isAMine;
    this._coord = {
      x: x,
      y: y
    };
    this._cellDom = null;
    this._mines = 0;
    this._neighbours = [];
  }

  get isAMine() {
    return this._isAMine;
  }

  get coord() {
    return this._coord;
  }

  get cellDom() {
    return this._cellDom;
  }

  set neighbours(newCell) {
    this._neighbours.push(newCell);
  }

  set isAMine(newValue) {
    this._isAMine = newValue;
  }

  set mines(newValue) {
    this._mines = newValue;
  }

  insertCell = row => {
    this._cellDom = row.insertCell(this._coord.y);
  };

  handleCellClick = cellArray => {
    if (this._isAMine) {
      showMines(cellArray);
      alert("Game Over");
    } else {
      this.cellDom.className = "clicked";
      this.cellDom.onclick = null;
      this.cellDom.innerHTML = this._mines > 0 ? this._mines : " ";
      if (this._mines === 0) {
        for (let index = 0; index < this._neighbours.length; index++) {
          if (this._neighbours[index].cellDom.innerHTML == "") {
            this._neighbours[index].handleCellClick(cellArray);
          }
        }
      }
      if (isComplete(cellArray)) {
        alert("YOU WIN");
      }
    }
  };
}

const isComplete = cellArray => {
  for (let index = 0; index < cellArray.length; index++) {
    for (let index2 = 0; index2 < cellArray[index].length; index2++) {
      let cell = cellArray[index][index2];
      if (!cell.isAMine && cell.cellDom.innerHTML == "") {
        return false;
      }
    }
  }
  return true;
};

const getGrid = (rows, columns, mines) => {
  let cellArray = [];
  for (let x = 0; x < rows; x++) {
    let row = get("grid").insertRow(x);
    cellArray.push([]);
    for (let y = 0; y < columns; y++) {
      const cell = new Cell(false, x, y);
      cell.insertCell(row);
      cell.cellDom.onclick = () => cell.handleCellClick(cellArray);
      cellArray[x].push(cell);
    }
  }
  get(
    "game-info"
  ).innerHTML = `Game, W: ${columns}, H: ${rows}, Mines: ${mines}`;

  getMines(cellArray, mines);
  getResults(cellArray);

  return cellArray;
};

const getMines = (cellArray, mines) => {
  for (let index = 0; index < mines; index++) {
    let x = Math.floor(Math.random() * cellArray.length);
    let y = Math.floor(Math.random() * cellArray[0].length);
    cellArray[x][y].isAMine = true;
  }
};

const getResults = cellArray => {
  for (let index = 0; index < cellArray.length; index++) {
    for (let index2 = 0; index2 < cellArray[index].length; index2++) {
      let cell = cellArray[index][index2];
      if (!cell.isAMine) {
        generateNeighbours(cell, cellArray);
      }
    }
  }
};

const generateNeighbours = (cell, cellArray) => {
  const firstRow = Math.max(cell.coord.x - 1, 0);
  const lastRow = Math.min(cell.coord.x + 1, cellArray.length - 1);
  const firstColumn = Math.max(cell.coord.y - 1, 0);
  const lastColumn = Math.min(cell.coord.y + 1, cellArray[0].length - 1);
  let mines = 0;

  for (let index = firstRow; index <= lastRow; index++) {
    for (let index2 = firstColumn; index2 <= lastColumn; index2++) {
      let neighbour = cellArray[index][index2];
      cell.neighbours = neighbour;
      if (neighbour.isAMine) {
        mines++;
      }
    }
  }
  cell.mines = mines;
};

const showMines = cellArray => {
  for (let index = 0; index < cellArray.length; index++) {
    for (let index2 = 0; index2 < cellArray[index].length; index2++) {
      let cell = cellArray[index][index2];
      cell.cellDom.onclick = null;
      if (cell.isAMine) {
        cell.cellDom.className = "mine";
      }
    }
  }
};

const getRandomCell = cellArray => {
  let x = Math.floor(Math.random() * cellArray.length);
  let y = Math.floor(Math.random() * cellArray[0].length);
  return cellArray[x][y];
};

const generateClue = cellArray => {
  let cell = getRandomCell(cellArray);

  while (cell.isAMine || cell.cellDom.innerHTML === 0) {
    cell = getRandomCell(cellArray);
  }
  cell.handleCellClick(cellArray);
};

const resetGrid = () => {
  get("grid").innerHTML = "";
  let cellArray = getGrid(15, 15, 40);
  generateClue(cellArray);
};

resetGrid();
