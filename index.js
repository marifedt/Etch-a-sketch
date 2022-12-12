const container = document.querySelector('.container');
const btnChangeGrid = document.querySelector('button');

function createBoxes(grid){
    container.style.gridTemplateColumns = `repeat(${grid}, auto)`;

    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            const square = document.createElement('div');
            square.classList.add('box');
            container.append(square);
        }
    }

    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.addEventListener('mouseenter', changeGridColor));
}

function changeGrid(){
    let grid = prompt('Number of grids (Min:2 | Max:100)?');
    if(Number.isInteger(parseInt(grid))){
        if(!(grid < 2 || grid > 100)){
            while (container.hasChildNodes()) {
                container.removeChild(container.firstChild);
        }
        createBoxes(grid);
        }  
    }
}

function changeGridColor(e){
    this.style.transition = `0.2s ease`;
    if(e.type === 'mouseenter'){
        let maxColorVal = 0xFFFFFF;
        let randomColor = Math.floor(Math.random()* maxColorVal).toString(16);
        this.style.backgroundColor = "#" + randomColor;
    }
}

btnChangeGrid.addEventListener('click', changeGrid);
window.addEventListener('load', createBoxes(64));



