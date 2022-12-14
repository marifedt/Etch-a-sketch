const container = document.querySelector(".container");
const btnClear = document.querySelector("#btnClear");
const btnChangeGrid = document.querySelector("#sizeChange");
const btnRandom = document.querySelector("#btnRandom");
const btnBlack = document.querySelector("#btnBlack");
const colorPick = document.querySelector(".cp-container");
const btnErase = document.querySelector("#btnErase");

let numOfGrids = 16;
let mouseDown = false;
let mode = "random";
let eraseMode = false;
let isActive = (element) => {
  return element.classList.contains("active");
};

function randomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRGBColor() {
  let r = randomNumber(255);
  let g = randomNumber(255);
  let b = randomNumber(255);

  return [r, g, b];
}

function createBoxes(grid) {
  numOfGrids = grid;
  container.style.gridTemplateColumns = `repeat(${grid}, auto)`;
  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
      const square = document.createElement("div");
      square.classList.add("box");
      container.append(square);
    }
  }

  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => box.addEventListener("mouseenter", changeGridColor));
  boxes.forEach((box) => box.addEventListener("mousedown", changeGridColor));
}

function changeGrid() {
  let grid = prompt("Number of grids (Min: 3 | Max: 100)?");
  if (Number.isInteger(parseInt(grid))) {
    if (!(grid < 3 || grid > 100)) {
      while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
      }
      createBoxes(grid);
    }
  }
}

function changeGridColor(e) {
  let color;
  this.style.transition = `0.2s ease`;
  if (e.type === "mouseenter" && mouseDown) {
    if (eraseMode) {
      this.style.backgroundColor = "inherit";
    } else {
      switch (mode) {
        case "random":
          color = randomRGBColor();
          this.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          break;
        case "black":
          this.style.backgroundColor = "black";
          break;
        case "colorPick":
          const colorValue = document.querySelector("#colorPick").value;
          this.style.backgroundColor = colorValue;
          break;
      }
    }
  }
}

function clearGrid() {
  const grid = document.querySelectorAll(".box");
  grid.forEach((box) => {
    box.style.backgroundColor = "inherit";
  });
  eraseMode = false;
  btnErase.classList.remove("active");
}

function checkActive() {
  if (this === btnRandom && !isActive(this)) {
    this.classList.add("active");
    if (isActive(btnBlack)) btnBlack.classList.remove("active");
    if (isActive(colorPick)) colorPick.classList.remove("active");
    mode = "random";
  } else if (this === btnBlack && !isActive(this)) {
    this.classList.add("active");
    if (isActive(btnRandom)) btnRandom.classList.remove("active");
    if (isActive(colorPick)) colorPick.classList.remove("active");
    mode = "black";
  } else if (this === colorPick && !isActive(this)) {
    this.classList.add("active");
    if (isActive(btnRandom)) btnRandom.classList.remove("active");
    if (isActive(btnBlack)) btnBlack.classList.remove("active");
    mode = "colorPick";
  } else if (this === btnErase) {
    btnErase.classList.toggle("active");
    eraseMode = !eraseMode;
  }
}

container.addEventListener("mousedown", () => (mouseDown = true));
container.addEventListener("mouseup", () => (mouseDown = false));
container.addEventListener("mouseleave", () => (mouseDown = false));

// Modes
btnRandom.addEventListener("click", checkActive);
btnBlack.addEventListener("click", checkActive);
colorPick.addEventListener("click", checkActive);
// Tools
btnErase.addEventListener("click", checkActive);
btnClear.addEventListener("click", clearGrid);
btnChangeGrid.addEventListener("click", changeGrid);
window.addEventListener("load", () => {
  createBoxes(16);
  btnRandom.classList.add("active");
});
