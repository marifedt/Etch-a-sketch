const container = document.querySelector('.container');

function createBoxes(){
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            const square = document.createElement('div');
            square.classList.add('box');
            container.append(square);
        }
    }

    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.addEventListener('mouseenter', changeColor));
    boxes.forEach(box => box.addEventListener('mouseleave', changeColor));
}

function changeColor(e){
    this.style.transition = `0.6s ease`;
    if(e.type === 'mouseenter'){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.style.backgroundColor = "#" + randomColor;
    } else if(e.type === 'mouseleave'){
        this.style.backgroundColor = '#FFFFFF';
    }
}

window.addEventListener('load', createBoxes);



