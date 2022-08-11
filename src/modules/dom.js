import genBoard from "./seeBoard";
import knightsTravalis from "./knightsTravalis";

export default function init() {
    genBoard();
    activateButtons();

    /* Events Listeners */
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
            if (cell.firstChild) return;
            hoverCheck(cell);
        });
        cell.addEventListener('mouseleave', () => {
            if (cell.firstChild) {
            const child = cell.firstChild
            if (child.classList.contains('placedIcon')) return;
            }
            cell.textContent = '';
        });
        cell.addEventListener('click', () => {
            placeThing(cell);
        })
    })
}

const hoverCheck = (cell) => {
    const knight = document.querySelector('.place');
    const end = document.querySelector('.end');
    if (knight.classList.contains('active')) {
        const knightImg = document.createElement('img');
        knightImg.classList.add('hoverIcon');
        knightImg.src = "./resources/knight.svg";
        cell.appendChild(knightImg);
    }
    if (end.classList.contains('active')) {
        const endImg = document.createElement('img');
        endImg.classList.add('hoverIcon');
        endImg.src = "./resources/rook.png";
        cell.appendChild(endImg);
    }
};

const placeThing = (cell, type) => {
    const knight = document.querySelector('.place');
    const end = document.querySelector('.end');
    if (knight.classList.contains('active') || type === 'knight') {
        const prevK = document.querySelector('.placedKnight');
        if (prevK) prevK.parentElement.textContent = '';
        cell.textContent = '';
        const knightImg = document.createElement('img');
        knightImg.classList.add('placedIcon');
        knightImg.classList.add('placedKnight');
        knightImg.src = "./resources/knight.svg";
        cell.appendChild(knightImg);
    }
    if (end.classList.contains('active') || type === 'end') {
        const prevE = document.querySelector('.placedEnd');
        if (prevE) prevE.parentElement.textContent = '';
        cell.textContent = '';
        const endImg = document.createElement('img');
        endImg.classList.add('placedIcon');
        endImg.classList.add('placedEnd');
        endImg.src = "./resources/rook.png";
        cell.appendChild(endImg);
    }
}

/* Activate Buttons */
const activateButtons = () => {
    const placeKnight = document.querySelector('.place');
    const placeEnd = document.querySelector('.end');
    const knightRandom = document.querySelector('.placeR');
    const endRandom = document.querySelector('.endR');
    const travail = document.querySelector('.go');
    const reset = document.querySelector('.reset');

    placeKnight.addEventListener('click', () => {
        placeKnight.classList.remove('active');
        placeEnd.classList.remove('active');

        placeKnight.classList.add('active');
    });
    placeEnd.addEventListener('click', () => {
        placeKnight.classList.remove('active');
        placeEnd.classList.remove('active');

        placeEnd.classList.add('active');
    });
    knightRandom.addEventListener('click', () => {
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * 8);

        const rows = document.querySelector('.board').children;
        const correctRow = rows.item(row);
        const rowChildren = correctRow.children;
        const cell = rowChildren.item(col);
        placeThing(cell, 'knight');   
    });
    endRandom.addEventListener('click', () => {
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * 8);

        const rows = document.querySelector('.board').children;
        const correctRow = rows.item(row);
        const rowChildren = correctRow.children;
        const cell = rowChildren.item(col);
        if (cell.firstChild) return;
        placeThing(cell, 'end');
    });
    travail.addEventListener('click', () => {
        const knight = document.querySelector('.placedKnight');
        const end = document.querySelector('.placedEnd');
        const infoTxt = document.querySelector('.info');
        if (!knight || !end) {infoTxt.textContent = 'Please place both a knight and a castle.'; return}
        infoTxt.textContent = '';
        coordsAndRun(knight, end);
    });
    reset.addEventListener('click', () => {
        clearActive();
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.textContent = '';
        })
    });
}

const clearActive = () => {
    const placeKnight = document.querySelector('.place');
    const placeEnd = document.querySelector('.end');
    placeKnight.classList.remove('active');
    placeEnd.classList.remove('active');
}

const coordsAndRun = (start, end) => {
    const knightCell = start.parentElement;
    const endCell = end.parentElement;

    const knightX = parseInt(knightCell.dataset.x);
    const knightY = parseInt(knightCell.dataset.y);
    
    const endX = parseInt(endCell.dataset.x);
    const endY = parseInt(endCell.dataset.y);
    knightsTravalis([knightX, knightY], [endX, endY]);
}