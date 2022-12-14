const container = document.querySelector(".container");
const btnClear = document.querySelector("#btnClear");
const btnChangeGrid = document.querySelector("#sizeChange");
const slideEraser = document.querySelector("#slideErase");

let numOfGrids = 16;
let mouseDown = false;

slideEraser.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #161C2E 0%, #161C2E ${value}%, #fff ${value}%, white 100%)`;
});

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
  this.style.transition = `0.2s ease`;
  if (e.type === "mouseenter" && mouseDown) {
    const color = randomRGBColor();
    this.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }
}

function clearGrid() {
  const grid = document.querySelectorAll(".box");
  grid.forEach((box) => {
    box.style.backgroundColor = "inherit";
  });
}

container.addEventListener("mousedown", () => (mouseDown = true));
container.addEventListener("mouseup", () => (mouseDown = false));
container.addEventListener("mouseleave", () => (mouseDown = false));

btnClear.addEventListener("click", clearGrid);
btnChangeGrid.addEventListener("click", changeGrid);
window.addEventListener("load", () => {
  createBoxes(16);
});
