import genBoard from "./seeBoard";

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
            const child = cell.firstChild
            if (child.classList.contains('placedIcon')) return;
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

const placeThing = (cell) => {
    const knight = document.querySelector('.place');
    const end = document.querySelector('.end');
    if (knight.classList.contains('active')) {
        const prevK = document.querySelector('.placedKnight');
        if (prevK) prevK.parentElement.textContent = '';
        cell.textContent = '';
        const knightImg = document.createElement('img');
        knightImg.classList.add('placedIcon');
        knightImg.classList.add('placedKnight');
        knightImg.src = "./resources/knight.svg";
        cell.appendChild(knightImg);
    }
    if (end.classList.contains('active')) {
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

/* Buttons */
const activateButtons = () => {
    const placeKnight = document.querySelector('.place');
    const placeEnd = document.querySelector('.end');

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
}