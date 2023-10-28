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
    if (isMountain(i, j)) {
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

//Kirajzolja a térképet
function drawMap() {
  //Először lenullázza a teljes térképet majd az egészet feltölti az adatokkal
  gridContainer.innerHTML = "";
  for (let i = 0; i < 11; i++) {
    const Row = document.createElement('div');
    Row.className = 'row';
    gridContainer.append(Row);
    for (let j = 0; j < 11; j++) {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      if (isMountain(i, j)) {
        gridItem.className = 'mountainTile';
      }
      if (isVillage(i, j)) {
        gridItem.className = 'townTile';
      }
      if (isWater(i, j)) {
        gridItem.className = 'waterTile';
      }
      if (isForest(i, j)) {
        gridItem.className = 'forestTile';
      }
      if (isFarm(i, j)) {
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
function randomizeElements() {
  mixedElements = [];
  for (const element of elements) {
    mixedElements.push(element);
  }
  mixedElements.sort(() => Math.random() - 0.5);
}

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
        nextItemArray[i][j].className = mixedElements[0].type + "Tile";
      }
    }
  }
  timeCounterDraw();
}

//Kirajzolja a következő elem lerakásához szükséges időt
function timeCounterDraw() {
  let time = document.createElement('div');
  time.className = "timeCounter";
  time.innerHTML = "Time to place:" + mixedElements[0].time;
  nextItemContainer.append(time);
}

//Gombok
const rotateItemButton = document.getElementById("rotateItemButton");
rotateItemButton.addEventListener("click", rotateClicked);
const mirrorItemButton = document.getElementById("mirrorItemButton");
mirrorItemButton.addEventListener("click", mirrorClicked);

//Az elem orientációja alapján forgatja az elemet 90 fokban óramutató járása szerint(ha ez éppen 3 akkor lenullázza az orientációt)
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

//Megtükrözi az elemet
function mirrorClicked() {
  mirrorElement();
}

//A jelenlegi orient alapján egy switch-case-el forgatja az elemet minden lépésnél 90 fokkal, majd frissíti az elem állását a kijelzőn
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

//Elforgatja 90 fokkal mátrix adattagjait egy segédmátrix használatával, majd visszamásolja az eredeti mátrixba az értékeket
function rotate90DegreesClockwise() {
  const tempMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      tempMatrix[row][col] = nextItemArray[2 - col][row];
    }
  }

  copyMatrix(tempMatrix, nextItemArray);

}

//Kitörli a következő elemnek az összes tartalmát, majd azt feltölti az új elemmel és kiírja az új elem lerakásának idejét
function updateElement() {
  nextItemContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const Row = document.createElement('div');
    Row.className = 'row';
    nextItemContainer.append(Row);
    for (let j = 0; j < 3; j++) {
      const previewItem = document.createElement('div');
      previewItem.className = nextItemArray[i][j].className;
      Row.appendChild(previewItem);
    }
    nextItemArray.push(Array.from(Row.children));
  }
  timeCounterDraw();
}

//Megtükrözi az elemet soronként 
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

//A teljes játékállást frissíti
function update() {
  updateMap();
  updateElements();
}

//Kirajzolja a térképet, létrehozza a mátrixos megvalósítását, majd az összes cellához hozzáadja az eventeket
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
  //A háttérben használt gridhez hozzá adja a jelenlegi állását a gridnek
  deepCopyGrid(grid, backgroundGrid);
}

//Kitörli a legfelső elemet, majd az új legfelső elemet a következő elem helyére generálja
function updateElements() {
  mixedElements.splice(0, 1);
  generateNextElement();
  selectNextElement();
}

//A billentyűkért felelős eventek
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

//Játékkezdet
randomizeElements();
convertToMatrix();
update();

//Ellenőrzi, hogy jelenlegi helyzetében lerakható-e a következő elem
let canPlace = true;
function canDraw(i, j) {
  //Ellenőrzi, hogy a 3x3-mas lerakó mátrix része-e a pályának
  if (i + 3 > 11 || j + 3 > 11) {
    for (let k = i; k < i + 3; k++) {
      for (let l = j; l < j + 3; l++) {
        try {
          grid[k][l].style.border = "dashed crimson"; 
        } catch (error) {}
      }
    }
    canPlace = false;
    return canPlace;
  }

  //Ellenőrzi, hogy a 3x3-mas terület, ahová le akarjuk rakni, már tartalmaz-e olyan cellát, amiben van elem
  for (let k = i; k < i + 3; k++) {
    for (let l = j; l < j + 3; l++) {
      grid[k][l].style.border = "dashed lightgreen";
      if (backgroundGrid[k][l].className != "grid-item") {
        //Ellenőrzi, hogy a 3x3-mas területen ütközne-e a cella egy olyan cellával, amit le akarunk rakni
        if (nextItemArray[k - i][l - j].className != "preview-item") {
          grid[k][l].style.border = "dashed crimson";
          canPlace = false;
          return canPlace;
        }
      }
    }
  }
  canPlace = true;
  return canPlace;
}

//Ad egy előképet a lehelyezésről, csak azokat a cellákat mutálja, ahol a következő elem 3x3-mas mátrixában 1-es elem szerepel
function previewDraw(i, j) {
  if (canDraw(i, j)) {
    for (let k = i; k < i + 3; k++) {
      for (let l = j; l < j + 3; l++) {
        if (nextItemArray[k - i][l - j].className != "preview-item") {
          grid[k][l].className = nextItemArray[k - i][l - j].className;
          grid[k][l].style.border = "dashed lightgreen";
        }
      }
    }
  }
}

//Ellenőrzi, hogy a játékos mentené-e a jelenlegi állapotát a táblának(az előképet megtartaná-e)
let save = false;
//Ha az elem lerakható, és a játékos mentené az állást, akkor az első ág hívódik meg
function placeElementOnGrid() {
  if (canPlace) {
    //Reseteli a canPlace-t
    canPlace = false;
    //Beállítja, hogy a játékos menteni szeretne
    save = true;
    //Kivonja egyesével a napokat a maradék napokból, majd meghívja a szezonokat ellenőrző függvényt
    for (let i = 0; i < mixedElements[0].time; i++) {
      timeLeft--;
      updateSeasons()
    }
    //Frissíti a következő elem helyén lévő 3x3-mas mátrixot
    updateElements();
  } else {
    //Figyelmezteti a játékost, hogy illegális a lépése
    alert("can't place")
  }
}

//Ha a játékos kimozgatja az egeret a jelenlegi cellából, és már jelezte, hogy mentene akkor meghívódik az if statement
function checkForSaving() {
  if (save) {
    //Reseteli a háttér gridet
    backgroundGrid = [];
    //Átmásolja a front-end gridet a háttér grid-be
    deepCopyGrid(grid, backgroundGrid);
    //Visszaállítja a save-t
    save = false;
    //Kilép
    return;
  }
  //Ha a játékos nem mentene, akkor a front-end-be visszamenti a backenden eltárolt gridet, ami az előző állást tárolja
  grid = [];
  deepCopyGrid(backgroundGrid, grid);
  //Vissza rajzolja az előző gridet
  updateMap();
}

let timeLeft = 28;
const seasonTimeLeft = document.getElementById("seasonTimeLeft");

//Az összes szezont reprezentáló div-nek egy kollekciója
const seasons = Array.from(document.getElementById("seasons").children);
//Az első szezonnak beállítja a 0. elemet
let currentSeason = seasons[0];

const curentSeasonText = document.getElementById("currentSeason");

//Az első szezonnak beállítja a nevét és a hátralévő időt
curentSeasonText.innerHTML = seasons[0].id;
seasonTimeLeft.innerHTML = "Time left of this season: 7";

//Frissíti a szezonokat
function updateSeasons() {
    //A szezonból hátralévő napokat tárolja
    let daysLeft = timeLeft % 7;
  //Ha a hátralévő idő 1 nap és 2 napos kártyát húzunk, akkor a szezonnak vége
  if (timeLeft % 7 == 1) {
    if (mixedElements[0].time > 1) {
      seasons.splice(0, 1);
      currentSeason = seasons[0];
      randomizeElements();
      daysLeft += 6;
      timeLeft--;
    }
  }
  //Ha a hátralévő idő 7-el osztható, akkor a következő szezonra ugrik a currentSeason
  else if (timeLeft % 7 == 0) {
    seasons.splice(0, 1);
    currentSeason = seasons[0];
    randomizeElements();
  }
  //Ha 0-val egyenlő vagy kisebb a hátralévő idő akkor a játék véget ér
  if (timeLeft <= 0) {
    console.log("Game Over!") //TODO: Implement game over
  }
  //Frissíti a jelenlegi szezont
  curentSeasonText.innerHTML = seasons[0].id;

  //Ha ez egyenlő 0-val, azaz szezont váltunk, akkor reseteli 7-re
  if (timeLeft % 7 == 0) {
    daysLeft += 7;
  }
  seasonTimeLeft.innerHTML = "Time left of this season:" + daysLeft;
}

//TODO: Challange implementation
//TODO: Season change if card's time is over the time left
//TODO: MediaQuery for the tiles

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
      Cell.className = source[i][j].className;
      Row.append(Cell);
    }
    destination.push(Array.from(Row.children));
  }
}