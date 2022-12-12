const container = document.querySelector('.container');

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

function changeGridColor(e){
    this.style.transition = `0.2s ease`;
    if(e.type === 'mouseenter'){
        let maxColorVal = 0xFFFFFF;
        let randomColor = Math.floor(Math.random()* maxColorVal).toString(16);
        this.style.backgroundColor = "#" + randomColor;
    }
}

window.addEventListener('load', createBoxes(64));



