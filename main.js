const get = id => {
  return document.getElementById(id);
};

const getGrid = (rows, columns, mines) => {
  for (let i = 0; i < rows; i++) {
    let row = get("grid").insertRow(i);
    for (let j = 0; j < columns; j++) {
      let cell = row.insertCell(j);
      let isAMine = document.createAttribute("isAMine");
      isAMine.value = false;
      cell.setAttributeNode(isAMine);
    }
  }
  getMines(rows, columns, mines);
};

const getMines = (rows, columns, mines) => {
  for (let index = 0; index < mines; index++) {
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * columns);
    console.log(x, y);

    let cell = get("grid").rows[x].cells[y];
    cell.innerHTML = "barry";
    cell.setAttribute("isAMine", true);
  }
};

getGrid(15, 15, 8);
