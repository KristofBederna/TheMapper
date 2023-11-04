let gameOver = false;

let total = 0;

class Challenge {
  constructor(img, isActive, name, description, mission) {
    this.img = img;
    this.isActive = isActive;
    this.name = name;
    this.description = description;
    this.mission = mission;
  }
}

const challengeImages = Array.from(document.getElementsByClassName('challengeImages'));
const challengeNames = Array.from(document.getElementsByClassName('challengeNames'));
const challengeDescriptions = Array.from(document.getElementsByClassName('challengeDescriptions'));

const challenges = [];
const borderlands = new Challenge("img/missions_eng/Borderlands.png", false, "Borderlands", "For each full row or column you get six points.", borderlandsCalculation);
const edgeOfTheForest = new Challenge("img/missions_eng/EdgeOfTheForest.png", false, "Edge of the forest", "You get one point for each forest field adjacent to the edge of the map.", edgeOfTheForestCalculation);
const emptySite = new Challenge("img/missions_eng/EmptySite.png", false, "Empty site", "You get two points for empty fields adjacent to your village fields.", emptySiteCalculation);
const magiciansValley = new Challenge("img/missions_eng/MagiciansValley.png", false, "Magicians' valley", "You get three points for each of your water fields adjacent to your mountain fields.", magiciansValleyCalculation);
const oddNumberedSilos = new Challenge("img/missions_eng/OddNumberedSilos.png", false, "Odd numbered silos", "For each of your odd numbered full columns you get 10 points.", oddNumberedSilosCalculation);
const richCountryside = new Challenge("img/missions_eng/RichCountryside.png", false, "Rich countryside", "For each row with at least five different terrain types, you will recieve four points.", richCountrysideCalculation);
const rowOfHouses = new Challenge("img/missions_eng/RowOfHouses.png", false, "Row of houses", "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.", rowOfHousesCalculation);
const sleepyValley = new Challenge("img/missions_eng/SleepyValley.png", false, "Sleepy valley", "For every row with three forest fields, you get four points.", sleepyValleyCalculation);
const treeLine = new Challenge("img/missions_eng/TreeLine.png", false, "Tree line", "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.", treeLineCalculation);
const wateringCanal = new Challenge("img/missions_eng/WateringCanal.png", false, "Watering canal", "For each column of your map that has the same number of farm and water fields, you will recieve four points. You must have at least one field of both terrain types in your column to score points.", wateringCanalCalculation);
const wateringPotatoes = new Challenge("img/missions_eng/WateringPotatoes.png", false, "Watering potatoes", "You get two points for each water field adjacent to your farm fields.", wateringPotatoesCalculation);
const wealthyTown = new Challenge("img/missions_eng/WealthyTown.png", false, "Wealthy town", "You get three points for each of your village fields adjacent to at least three different terrain types.", wealthyTownCalculation);

challenges.push(borderlands, edgeOfTheForest, emptySite, magiciansValley, oddNumberedSilos, richCountryside, rowOfHouses, sleepyValley, treeLine, wateringCanal, wateringPotatoes, wealthyTown);

const challengeHolders = Array.from(document.getElementById("challenges").children);
const pointsPerChallenge = Array.from(document.getElementsByClassName("point"));

//Challanges
function randomizeChallenges() {
  challenges.sort(() => Math.random() - 0.5);
}

function selectChallenges() {
  randomizeChallenges();
  for (let i = 0; i < 4; i++) {
    challengeImages[i].style.backgroundImage = `url('${challenges[i].img}')`;
    challengeNames[i].innerHTML = challenges[i].name;
    challengeDescriptions[i].innerHTML = challenges[i].description;
  }
}

selectChallenges();

function checkActive() {
  for (let i = 0; i < 4; i++) {
    if (challenges[i].isActive) {
      challengeHolders[i].style.borderColor = "green"
    }
  }
}

function setActive(season) {
  for (let i = 0; i < 4; i++) {
    challengeHolders[i].style.borderColor = "black";
    challenges[i].isActive = false;
  }
  switch (season) {
    case "Spring":
      challenges[0].isActive = true;
      challenges[1].isActive = true;
      break;
    case "Summer":
      challenges[1].isActive = true;
      challenges[2].isActive = true;
      break;
    case "Fall":
      challenges[2].isActive = true;
      challenges[3].isActive = true;
      break;
    case "Winter":
      challenges[3].isActive = true;
      challenges[0].isActive = true;
      break;
  }
  checkActive();
}

function calculatePoints() {
  for (let i = 0; i < 4; i++) {
    if (challenges[i].isActive) {
      total += challenges[i].mission();
    }
  }
}

let pointsThisChallenge = 0;
let pointsFromMountains = 0;
function drawPointsPerChallenge() {
  for (let i = 0; i < 4; i++) {
    if (i == 0) {
      pointsFromMountains = enclosedMountainCalculation();
      total += pointsFromMountains;
    }
    if (challenges[i].isActive) {
      pointsThisChallenge += challenges[i].mission();
      pointsPerChallenge[i].innerHTML = parseInt(pointsPerChallenge[i].innerHTML) + pointsThisChallenge;
      drawPointsPerSeason();
    }
  }
}

function drawPointsPerSeason() {
  for (let i = 0; i < 4; i++) {
    if (challenges[i].isActive) {
      seasons[1].innerHTML = parseInt(seasons[1].innerHTML) + pointsThisChallenge + pointsFromMountains;
      pointsFromMountains = 0;
      pointsThisChallenge = 0;
    }
  }
}
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
  //Ha vége a játéknak, már nem lehet rakni
  if (gameOver) {
    return false;
  }
  //Ellenőrzi, hogy a 3x3-mas lerakó mátrix része-e a pályának
  if (i + 3 > 11 || j + 3 > 11) {
    for (let k = i; k < i + 3; k++) {
      for (let l = j; l < j + 3; l++) {
        try {
          grid[k][l].style.border = "dashed crimson";
        } catch (error) { }
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
      if (!gameOver) {
        timeLeft--;
        updateSeasons();
      }
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
  //Reseteli a háttér gridet
  backgroundGrid = [];
  //Vissza rajzolja az előző gridet
  updateMap();
}

let timeLeft = 28;
const seasonTimeLeft = document.getElementById("seasonTimeLeft");

//Az összes szezont reprezentáló div-nek egy kollekciója
const seasons = Array.from(document.getElementById("seasons").children);
//Az első szezonnak beállítja a 0. elemet
let currentSeason = seasons[0];

const currentSeasonText = document.getElementById("currentSeason");

//Az első szezonnak beállítja a nevét és a hátralévő időt
currentSeasonText.innerHTML = seasons[0].id;
currentSeason.style.border = "double thick lightgreen";
seasonTimeLeft.innerHTML = "Time left of this season: 7";
setActive(seasons[0].id);

//Frissíti a szezonokat
function updateSeasons() {
  //A szezonból hátralévő napokat tárolja
  let daysLeft = timeLeft % 7;

  //Ha a hátralévő idő 7-el osztható, akkor a következő szezonra ugrik a currentSeason
  if (timeLeft % 7 == 0) {
    calculatePoints();
    drawPointsPerChallenge()
    //Kettőt kell levágni, mivel a pontok is a seasonsbe kerülnek
    if (seasons.length > 3) {
      seasons.splice(0, 2);
    }
    currentSeason.style.border = "";
    //Ha 0-val egyenlő vagy kisebb a hátralévő idő akkor a játék véget ér
    if (timeLeft == 0) {
      gameOver = true;
      currentSeasonText.innerHTML = total;
      seasonTimeLeft.innerHTML = "";
      document.getElementById("placement").innerHTML = "";
      setActive(seasons[0].id);
      console.log("Points from challenge 'Borderlands' had it been one of the 4 challenges: " + borderlandsCalculation());
      return;
    }
    currentSeason = seasons[0];
    currentSeason.style.border = "double thick lightgreen";
    randomizeElements();
    //Ha ez egyenlő 0-val, azaz szezont váltunk, akkor reseteli 7-re
    daysLeft += 7;
    setActive(seasons[0].id);
  }
  //Frissíti a jelenlegi szezont
  currentSeasonText.innerHTML = seasons[0].id;

  seasonTimeLeft.innerHTML = "Time left of this season:" + daysLeft;
}

function edgeOfTheForestCalculation() {
  let points = 0;
  for (let i = 1; i < 11; i++) {
    if (grid[0][i - 1].className == "forestTile") {
      points++;
    }
    if (grid[i - 1][10].className == "forestTile") {
      points++;
    }
    if (grid[i][0].className == "forestTile") {
      points++;
    }
  }
  for (let i = 1; i < 11; i++) {
    if (grid[10][i].className == "forestTile") {
      points++;
    }
  }
  return points;
}

function sleepyValleyCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i++) {
    let forests = 0;
    for (let j = 0; j < 11; j++) {
      if (grid[i][j].className == "forestTile") {
        forests++;
      }
    }
    if (forests >= 3) {
      points += 4;
    }
    forests = 0;
  }
  return points;
}

function wateringPotatoesCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (grid[i][j].className == "farmTile") {
        if (i > 0 && grid[i - 1][j].className == "waterTile") {
          points += 2;
        }
        if (i < 10 && grid[i + 1][j].className == "waterTile") {
          points += 2;
        }
        if (j > 0 && grid[i][j - 1].className == "waterTile") {
          points += 2;
        }
        if (j < 10 && grid[i][j + 1].className == "waterTile") {
          points += 2;
        }
      }
    }
  }
  return points;
}

function borderlandsCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i++) {
    let isRowFull = true;
    let isColumnFull = true;
    for (let j = 0; j < 11; j++) {
      if (grid[i][j].className == "grid-item") {
        isRowFull = false;
        break;
      }
    }
    for (let j = 0; j < 11; j++) {
      if (grid[j][i].className == "grid-item") {
        isColumnFull = false;
        break;
      }
    }
    if (isRowFull) {
      points += 6;
    }
    if (isColumnFull) {
      points += 6;
    }
  }
  return points;
}

function treeLineCalculation() {
  let points = 0;
  let curMax = 0;
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (grid[j][i].className != "forestTile") {
        if (points > curMax) {
          curMax = points;
        }
        points = 0;
      }
      if (grid[j][i].className == "forestTile") {
        points += 2;
      }
    }
  }
  return curMax;
}

function wealthyTownCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i++) {
    let threshold = [];
    for (let j = 0; j < 11; j++) {
      if (grid[i][j].className == "townTile") {
        if (i > 0) {
          threshold.push(grid[i - 1][j].className);
        }
        if (i < 10) {
          threshold.push(grid[i + 1][j].className);
        }
        if (j > 0) {
          threshold.push(grid[i][j - 1].className);
        }
        if (j < 10) {
          threshold.push(grid[i][j + 1].className);
        }
      }
      threshold = threshold.filter((item) => item != "grid-item");
      let uniques = new Set(threshold);
      if (uniques.size >= 3) {
        points += 3;
      }
      threshold = [];
    }
  }
  return points;
}

function wateringCanalCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i++) {
    let balance = 0;
    let valid = false;
    for (let j = 0; j < 11; j++) {
      if (grid[j][i].className == "farmTile") {
        balance++;
        valid = true;
      }
      if (grid[j][i].className == "waterTile") {
        balance--;
        valid = true;
      }
    }
    if (balance == 0 && valid) {
      points += 4;
    }
  }
  return points;
}

function magiciansValleyCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (grid[i][j].className == "mountainTile") {
        if (i > 0 && grid[i - 1][j].className == "waterTile") {
          points += 3;
        }
        if (i < 10 && grid[i + 1][j].className == "waterTile") {
          points += 3;
        }
        if (j > 0 && grid[i][j - 1].className == "waterTile") {
          points += 3;
        }
        if (j < 10 && grid[i][j + 1].className == "waterTile") {
          points += 3;
        }
      }
    }
  }
  return points;
}

function emptySiteCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (grid[i][j].className == "townTile") {
        if (i > 0 && grid[i - 1][j].className == "grid-item") {
          points += 2;
        }
        if (i < 10 && grid[i + 1][j].className == "grid-item") {
          points += 2;
        }
        if (j > 0 && grid[i][j - 1].className == "grid-item") {
          points += 2;
        }
        if (j < 10 && grid[i][j + 1].className == "grid-item") {
          points += 2;
        }
      }
    }
  }
  return points;
}

function rowOfHousesCalculation() {
  let points = 0;
  let curMax = 0;
  let instances = 0;
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (grid[i][j].className != "townTile") {
        if (points == curMax && points != 0) {
          instances++;
        }
        if (points > curMax) {
          curMax = points;
          instances = 1;
        }
        points = 0;
      }
      if (grid[i][j].className == "townTile") {
        points += 2;
      }
    }
  }
  return curMax * instances;
}

function oddNumberedSilosCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i += 2) {
    let isColumnFull = true;
    for (let j = 0; j < 11; j++) {
      if (grid[j][i].className == "grid-item") {
        isColumnFull = false;
        break;
      }
    }
    if (isColumnFull) {
      points += 10;
    }
  }
  return points;
}

function richCountrysideCalculation() {
  let points = 0;
  for (let i = 0; i < 11; i++) {
    let row = [];
    for (let j = 0; j < 11; j++) {
      row.push(grid[i][j].className);
    }
    let uniques = new Set(row.filter(item => item != "grid-item"));
    if (uniques.size == 5) {
      points += 4;
    }
  }
  return points;
}

function enclosedMountainCalculation() {
  let points = 0;
  let invalidMountain = false;
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (grid[i][j].className == "mountainTile") {
        if (grid[i - 1][j].className == "grid-item") {
          invalidMountain = true;
        }
        if (grid[i + 1][j].className == "grid-item") {
          invalidMountain = true;
        }
        if (grid[i][j - 1].className == "grid-item") {
          invalidMountain = true;
        }
        if (grid[i][j + 1].className == "grid-item") {
          invalidMountain = true;
        }
        if (!invalidMountain) {
          points += 1;
        }
        invalidMountain = false;
      }
    }
  }
  return points;
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
      Cell.className = source[i][j].className;
      Row.append(Cell);
    }
    destination.push(Array.from(Row.children));
  }
}

//TODO: Solution for no moves left
//TODO: Implement: if season has less than 2 days left and you draw a 2 day card your season ends
//TODO: Can place blocks anywhere
//TODO: Saving
//TODO: MediaQuery down to 800px
