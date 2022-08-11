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
        if (prevK) prevK.parentElement.removeChild(prevK);
        cell.textContent = '';
        const knightImg = document.createElement('img');
        knightImg.classList.add('placedIcon');
        knightImg.classList.add('placedKnight');
        knightImg.src = "./resources/knight.svg";
        cell.appendChild(knightImg);
    }
    if (end.classList.contains('active') || type === 'end') {
        const prevE = document.querySelector('.placedEnd');
        if (prevE) prevE.parentElement.removeChild(prevE);
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
        clearActive();
        const row = Math.floor(Math.random() * 8);
        const col = Math.floor(Math.random() * 8);

        const rows = document.querySelector('.board').children;
        const correctRow = rows.item(row);
        const rowChildren = correctRow.children;
        const cell = rowChildren.item(col);
        placeThing(cell, 'knight');   
    });
    endRandom.addEventListener('click', () => {
        clearActive();
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
        clearActive();
        const knight = document.querySelector('.placedKnight');
        const end = document.querySelector('.placedEnd');
        const infoTxt = document.querySelector('.info');
        if (!knight || !end) {infoTxt.textContent = 'Please place both a knight and a castle.'; return}
        infoTxt.textContent = '';
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.classList.remove('visited');
        })
        coordsAndRun(knight, end);
    });
    reset.addEventListener('click', () => {
        clearActive();
        const cells = document.querySelectorAll('.cell');
        const info = document.querySelector('.info');
        const infoSub = document.querySelector('.infoSub');
        info.textContent = '';
        infoSub.textContent = '';
        cells.forEach((cell) => {
            cell.textContent = '';
            cell.classList.remove('visited');
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
    const path = knightsTravalis([knightX, knightY], [endX, endY]);
    knightsTravalis([knightX, knightY], [endX, endY]);
    animKnight(path);

    /* Info Text */
    const formedNames = formatNames(path);
    updateInfo(formedNames);
}

/* Knight Animation */ 

const animKnight = (moves) => {
    const startingSqr = document.querySelector('.placedKnight')
    startingSqr.parentElement.classList.add('visited');
    findAnim(startingSqr, moves[0], moves[1]);
    for (let i = 1; i < moves.length; i++) {
        const currMove = moves[i];
        const currX= currMove[1];
        const currY = currMove[4];

        const newCell = document.querySelector(`[data-x="${currX}"][data-y="${currY}"]`);
        const knightImg = document.createElement('img');
        knightImg.classList.add('placedIcon');
        knightImg.classList.add('placedKnight');
        knightImg.src = "./resources/knight.svg";
        setTimeout(function() {
            const prevK = document.querySelector('.placedKnight');
            if (prevK) prevK.parentElement.removeChild(prevK);
            newCell.appendChild(knightImg);
            findAnim(knightImg, currMove, moves[i+1]);
            newCell.classList.add('visited');
        }, 1000*i);
    }
}

const findAnim = (knight, move, next) => {
    if (!next) return;
    const currentX = move[1];
    const currentY = move[4];
    const nextX = next[1];
    const nextY = next[4];

    const xDiff = (parseInt(nextX)- parseInt(currentX));
    const yDiff = (parseInt(nextY)- parseInt(currentY));
    if (xDiff === 2 && yDiff === 1) {
        knight.style.animation = "uOneRTwo 1s forwards"
    }
    if (xDiff === 2 && yDiff === -1) {
        knight.style.animation = "dOneRTwo 1s forwards"
    }
    if (xDiff === 1 && yDiff === 2) {
        knight.style.animation = "uTwoROne 1s forwards"
    }
    if (xDiff === 1 && yDiff === -2) {
        knight.style.animation = "dTwoROne 1s forwards"
    }
    if (xDiff === -1 && yDiff === 2) {
        knight.style.animation = "uTwoLOne 1s forwards"
    }
    if (xDiff === -1 && yDiff === -2) {
        knight.style.animation = "dTwoLOne 1s forwards"
    }
    if (xDiff === -2 && yDiff === 1) {
        knight.style.animation = "uOneLTwo 1s forwards"
    }
    if (xDiff === -2 && yDiff === -1) {
        knight.style.animation = "dOneLTwo 1s forwards"
    }
}

/* Format Names for Info */

const formatNames = (array) => {
    let newNames = [];
    array.forEach((item) => {
        let numX = parseInt(item.charAt(1));
        const numY = parseInt(item.charAt(4));
        const letter = convertToLetter(numX)
        item = `${letter}${numY + 1}`;
        newNames.push(item);
    });
    return newNames;
}

const updateInfo = (names) => {
    const infoTxt = document.querySelector('.info');
    const infoSub = document.querySelector('.infoSub');
    infoSub.textContent = 'The moves are:'
    infoTxt.textContent = `The shortest path is ${names.length - 1} moves long!`
    names.forEach((name) => {
        infoSub.textContent = infoSub.textContent + ` ${name}`;
    });
}

const convertToLetter = (num) => {
    if (num === 0) {
        return 'A'
    }
    if (num === 1) {
        return 'B'
    }
    if (num === 2) {
        return 'C'
    }
    if (num === 3) {
        return 'D'
    }
    if (num === 4) {
        return 'E'
    }
    if (num === 5) {
        return 'F'
    }
    if (num === 6) {
        return 'G'
    } else {
        return 'H'
    }
}