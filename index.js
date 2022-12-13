const container = document.querySelector(".container");
const btnChangeGrid = document.querySelector("button");
const slideEraser = document.querySelector('#slideErase');
let numOfGrids = 16;

slideEraser.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #161C2E 0%, #161C2E ${value}%, #fff ${value}%, white 100%)`
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
  if (e.type === "mouseenter") {
    const color = randomRGBColor();
    this.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }
}

btnChangeGrid.addEventListener("click", changeGrid);
window.addEventListener("load", createBoxes(16));
