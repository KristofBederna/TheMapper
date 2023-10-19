//A pálya kirajzolása

//Hegyek elhelyezése
function isMountain(i, j) {
  if (i === 1 && j === 1) {
    return true;
  }
  else if (i === 3 && j === 8) {
    return true;
  }
  else if (i === 5 && j === 3) {
    return true;
  }
  else if (i === 8 && j === 9) {
    return true;
  }
  else if (i === 9 && j === 5) {
    return true;
  }
  return false;
}
//Falvak elhelyezése
function isVillage(i, j) {
  return grid[i][j].className === "townTile";
}
//Folyók elhelyezése
function isWater(i, j) {
  return grid[i][j].className === "waterTile";
}
//Erdők elhelyezése
function isForest(i, j) {
  return grid[i][j].className === "forestTile";
}
//Farmok elhelyezése
function isFarm(i, j) {
  return grid[i][j].className === "farmTile";
}


//Feltölt egy 11x11-es pályát 0-kkal és 1-ekkel az alapján, hogy üres vagy hegy van rajta a grid-container classban
const gridContainer = document.querySelector('.grid-container');
for (let i = 0; i < 11; i++) {
  const Row = document.createElement('div');
  Row.className = 'row';
  gridContainer.append(Row);
  for (let j = 0; j < 11; j++) {
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.innerHTML = 0;
    if (isMountain(i, j)) {
      gridItem.innerHTML = 1;
      gridItem.className = 'mountainTile';
    }
    Row.appendChild(gridItem);
  }
}

//A pálya megvalósítása egy mátrixban
let grid = [];
let backgroundGrid = [];

//Átkonvertálja a divekből álló pályát egy mátrixba, hogy a JS oldalon könnyebben kezeljük, majd behelyezi a grid arraybe
function convertToMatrix() {
  let rows = document.querySelectorAll(".row");
  grid = [];
  for (let i = 0; i < 11; i++) {
    let row = Array.from(rows[i].children);
    grid.push(row);
  }
}

function drawMap() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < 11; i++) {
    const Row = document.createElement('div');
    Row.className = 'row';
    gridContainer.append(Row);
    for (let j = 0; j < 11; j++) {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      gridItem.innerHTML = grid[i][j].innerHTML;
      if (isMountain(i, j)) {
        gridItem.innerHTML = 1;
        gridItem.className = 'mountainTile';
      }
      if (isVillage(i, j)) {
        gridItem.innerHTML = 1;
        gridItem.className = 'townTile';
      }
      if (isWater(i, j)) {
        gridItem.innerHTML = 1;
        gridItem.className = 'waterTile';
      }
      if (isForest(i, j)) {
        gridItem.innerHTML = 1;
        gridItem.className = 'forestTile';
      }
      if (isFarm(i, j)) {
        gridItem.innerHTML = 1;
        gridItem.className = 'farmTile';
      }
      Row.appendChild(gridItem);
    }
  }
}

//Elemek importálása
const elements = [
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'town',
    shape: [[1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'farm',
    shape: [[1, 1, 1],
    [0, 0, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 1],
    [0, 0, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'town',
    shape: [[1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'farm',
    shape: [[1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'town',
    shape: [[1, 1, 0],
    [1, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'town',
    shape: [[1, 1, 1],
    [1, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'farm',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'farm',
    shape: [[0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 1],
    [1, 0, 0],
    [1, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 0, 0],
    [1, 1, 1],
    [1, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 1]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
]

//Elemek randomizálása
let mixedElements = [];
for (const element of elements) {
  mixedElements.push(element);
}
mixedElements.sort(() => Math.random() - 0.5);

//A következő elem feltöltése 0-val
let nextItemContainer = document.querySelector("#nextItemContainer");
let nextItemArray = [];
function generateNextElement() {
  nextItemContainer.innerHTML = "";
  nextItemArray = [];
  for (let i = 0; i < 3; i++) {
    const Row = document.createElement('div');
    Row.className = 'row';
    nextItemContainer.append(Row);
    for (let j = 0; j < 3; j++) {
      const previewItem = document.createElement('div');
      previewItem.className = 'preview-item';
      previewItem.innerHTML = 0;
      Row.appendChild(previewItem);
    }
    nextItemArray.push(Array.from(Row.children));
  }
}

//A következő elemet berakja a nextItemContainerbe
function selectNextElement() {
  let nextItem = mixedElements[0].shape;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (nextItem[i][j] === 1) {
        nextItemArray[i][j].innerHTML = 1;
        nextItemArray[i][j].className = mixedElements[0].type + "Tile";
      }
    }
  }
  timeCounterDraw();
}

function timeCounterDraw() {
  let time = document.createElement('div');
  time.className = "timeCounter";
  time.innerHTML = "Time to place:" + mixedElements[0].time;
  nextItemContainer.append(time);
}

const rotateItemButton = document.getElementById("rotateItemButton");
rotateItemButton.addEventListener("click", rotateClicked);
const mirrorItemButton = document.getElementById("mirrorItemButton");
mirrorItemButton.addEventListener("click", mirrorClicked);

let orient = 0;
function rotateClicked() {
  if (orient != 3) {
    orient++;
  }
  else if (orient == 3) {
    orient = 0;
  }
  rotateElement(orient);
}

function mirrorClicked() {
  mirrorElement();
}

function rotateElement(orientation) {
  switch (orientation) {
    case 1:
      rotate90DegreesClockwise();
      break;
    case 2:
      rotate90DegreesClockwise()
      break;
    case 3:
      rotate90DegreesClockwise()
      break;
    case 0:
      rotate90DegreesClockwise()
      break;
  }
  updateElement();
}

function rotate90DegreesClockwise() {
  const tempMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      tempMatrix[row][col] = nextItemArray[2 - col][row];
    }
  }

  copyMatrix(tempMatrix, nextItemArray);

}

function updateElement() {
  nextItemContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const Row = document.createElement('div');
    Row.className = 'row';
    nextItemContainer.append(Row);
    for (let j = 0; j < 3; j++) {
      const previewItem = document.createElement('div');
      previewItem.className = nextItemArray[i][j].className;
      previewItem.innerHTML = nextItemArray[i][j].innerHTML;
      Row.appendChild(previewItem);
    }
    nextItemArray.push(Array.from(Row.children));
  }
  timeCounterDraw();
}

function mirrorElement() {
  for (let i = 0; i < 3; i++) {
    let curRow = nextItemArray[i];
    let mirrorRow = [];
    for (let j = 2; j >= 0; j--) {
      mirrorRow.push(curRow[j]);
    }
    nextItemArray[i] = mirrorRow;
  }
  updateElement();
}


function update() {
  updateMap();
  updateElements();
}

function updateMap() {
  drawMap();
  convertToMatrix();
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      grid[i][j].addEventListener("mouseenter", () => previewDraw(i, j));
      grid[i][j].addEventListener("mouseleave", checkForSaving)
      grid[i][j].addEventListener("mouseup", placeElementOnGrid)
    }
  }
  deepCopyGrid(grid, backgroundGrid);
}

function updateElements() {
  mixedElements.splice(0, 1);
  generateNextElement();
  selectNextElement();
}

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    placeElementOnGrid();
  }
  if (event.key === "r") {
    event.preventDefault();
    rotateClicked();
  }
  if (event.key === "m") {
    event.preventDefault();
    mirrorClicked();
  }
  if (event.key === "R") {
    event.preventDefault();
    rotateClicked();
  }
  if (event.key === "M") {
    event.preventDefault();
    mirrorClicked();
  }
});

convertToMatrix();
update();

let canPlace = true;
function canDraw(i, j) {
  //Ellenőrzi, hogy a 3x3-mas lerakó mátrix része-e a pályának
  if (i + 3 > 11 || j + 3 > 11) {
    for (let k = i; k < i + 3; k++) {
      for (let l = j; l < j + 3; l++) {
        try {
          grid[k][l].style.border = "thick double crimson"; 
        } catch (error) {}
      }
    }
    canPlace = false;
    return canPlace;
  }

  //Ellenőrzi, hogy a 3x3-mas terület, ahová le akarjuk rakni, már tartalmaz-e olyan cellát, amiben van elem
  for (let k = i; k < i + 3; k++) {
    for (let l = j; l < j + 3; l++) {
      grid[k][l].style.border = "thick double lightgreen";
      if (backgroundGrid[k][l].innerHTML == 1) {
        //Ellenőrzi, hogy a 3x3-mas területen ütközne-e a cella egy olyan cellával, amit le akarunk rakni
        if (nextItemArray[k - i][l - j].innerHTML == 1) {
          grid[k][l].style.border = "thick double crimson";
          canPlace = false;
          return canPlace;
        }
      }
    }
  }
  canPlace = true;
  return canPlace;
}

function previewDraw(i, j) {
  if (canDraw(i, j)) {
    for (let k = i; k < i + 3; k++) {
      for (let l = j; l < j + 3; l++) {
        if (nextItemArray[k - i][l - j].innerHTML == 1) {
          grid[k][l].innerHTML = nextItemArray[k - i][l - j].innerHTML;
          grid[k][l].className = nextItemArray[k - i][l - j].className;
          grid[k][l].style.border = "thick double lightgreen";
        }
      }
    }
  }
}

let save = false;
function placeElementOnGrid() {
  if (canPlace) {
    canPlace = false;
    save = true;
    for (let i = 0; i < mixedElements[0].time; i++) {
      timeLeft--;
      updateSeasons()
    }
    updateElements();
  } else {
    alert("can't place")
  }
}

function checkForSaving() {
  if (save) {
    backgroundGrid = [];
    deepCopyGrid(grid, backgroundGrid);
    save = false;
    return;
  }
  grid = [];
  deepCopyGrid(backgroundGrid, grid);
  updateMap();
}

let timeLeft = 28;
const seasonTimeLeft = document.getElementById("seasonTimeLeft");

const seasons = Array.from(document.getElementById("seasons").children);
let currentSeason = seasons[0];
const curentSeasonText = document.getElementById("currentSeason");
curentSeasonText.innerHTML = seasons[0].innerHTML;
seasonTimeLeft.innerHTML = "Time left of this season: 7";
function updateSeasons() {

  if (timeLeft % 7 == 0) {
    seasons.splice(0, 1);
    currentSeason = seasons[0];
  }
  if (timeLeft <= 0) {
    console.log("Game Over!") //TODO: Implement game over
  }
  curentSeasonText.innerHTML = seasons[0].innerHTML;
  let daysLeft = timeLeft % 7;
  if (timeLeft % 7 == 0) {
    daysLeft += 7;
  }
  seasonTimeLeft.innerHTML = "Time left of this season:" + daysLeft;
}

//Utils
function copyMatrix(source, destination) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      destination[row][col] = source[row][col];
    }
  }
}

function deepCopyGrid(source, destination) {
  for (let i = 0; i < 11; i++) {
    const Row = document.createElement('div');
    Row.className = 'row';
    for (let j = 0; j < 11; j++) {
      const Cell = document.createElement('div');
      Cell.innerHTML = source[i][j].innerHTML;
      Cell.className = source[i][j].className;
      Row.append(Cell);
    }
    destination.push(Array.from(Row.children));
  }
}