export default function genBoard() {
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = i + 1;

        const container = document.querySelector('.board');
        container.appendChild(cell);
    }
}