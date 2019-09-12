const get = id => {
  return document.getElementById(id);
};

class Cell {
  constructor(isAMine, coord) {
    this._isAMine = isAMine;
    this._coord = [...coord];
    this._cellDom = null;
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

  set isAMine(newValue) {
    this._isAMine = newValue;
  }

  insertCell = row => {
    this._cellDom = row.insertCell(this._coord[1]);
    this._cellDom.onclick = this.handleCellClick;
  };

  handleCellClick = () => {
    this._isAMine ? alert("Game Over") : null;
  };
}

const getGrid = (rows, columns, mines) => {
  let cellArray = [];
  for (let i = 0; i < rows; i++) {
    let row = get("grid").insertRow(i);
    cellArray.push([]);
    for (let j = 0; j < columns; j++) {
      const cell = new Cell(false, [i, j]);
      cell.insertCell(row);
      cellArray[i].push(cell);
    }
  }
  console.log(cellArray);

  getMines(cellArray, mines);
  colour(cellArray);
};

const getMines = (cellArray, mines) => {
  for (let index = 0; index < mines; index++) {
    let x = Math.floor(Math.random() * cellArray.length);
    let y = Math.floor(Math.random() * cellArray[0].length);
    cellArray[x][y].isAMine = true;
  }
};

const colour = cellArray => {
  for (let index = 0; index < cellArray.length; index++) {
    for (let index2 = 0; index2 < cellArray[index].length; index2++) {
      let cell = cellArray[index][index2];

      if (cell.isAMine) {
        cell.cellDom.className = "mine";
      }
    }
  }
};

resetGrid = () => {
  get("grid").innerHTML = "";
  getGrid(15, 15, 50);
};

getGrid(15, 15, 50);
