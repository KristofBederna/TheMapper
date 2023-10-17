let timeLeft = 28;

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
      //if (isVillage())
      //if (isWater())
      //if (isForest())
      //if (isFarm())
      Row.appendChild(gridItem);
    }
  }
}

//Elemek beimportálása
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
for (let i = 0; i < elements.length; i++) {
  mixedElements.push(elements[i]);
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
    nextItemArray.push(Row.children);
  }
}

//A következő elemet berakja a nextItemContainerbe
function selectNextElement() {
  let nextItem = mixedElements[0].shape;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (nextItem[i][j] === 1) {
        nextItemArray[i][j].innerHTML = 1;
      }
    }
  }

  let time = document.createElement('div');
  time.className = "timeCounter";
  time.innerHTML = "Time to place:" + mixedElements[0].time;
  timeLeft -= mixedElements[0].time;
  nextItemContainer.append(time);
  mixedElements.splice(0, 1);
}

function update() {
  drawMap();
  convertToMatrix();
  generateNextElement();
  selectNextElement();
}

convertToMatrix();
update();