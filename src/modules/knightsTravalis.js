const squareStorage = new Map();

const square = (x,y) => {
    const xPos = x;
    const yPos = y;
    let predecessor;

    const KNIGHT_MOVES = [
        [1, 2], [1, -2],
        [2, 1], [2, -1],
        [-1, 2], [-1, -2],
        [-2, 1], [-2, -1]
    ];

    const getPredecessor = () => predecessor;
    const setPredecessor = (newPred) => {
      predecessor = predecessor || newPred;
    }

    const getMoves = () => {
        return KNIGHT_MOVES
                .map((move) => newMove(move[0], move[1]))
                .filter((move) => move !== undefined);
    };

    const newMove = (xOff, yOff) => {
        const [newX, newY] = [xPos + xOff, yPos + yOff];
        if (0 <= newX && newX < 8 && 0 <= newY && newY < 8) {
            return square(newX, newY);
        }
    }

    const name = () => `[${x}, ${y}]`

    if (squareStorage.has(name())) {
        return squareStorage.get(name());
      } else {
        let newSquare = { name, getPredecessor, setPredecessor, getMoves }
        squareStorage.set(name(), newSquare);
        return newSquare;
      }
}

const knightsTravalis = (start, finish) => {
    squareStorage.clear();

    const origin = square(...start);
    const target = square(...finish);

    const queue = [origin];
    while (!queue.includes(target)) {
        const currSqare = queue.shift();

        const enqueue = currSqare.getMoves();
        enqueue.forEach(move => move.setPredecessor(currSqare));
        queue.push(...enqueue);
    }

    const path = [target];
    while (!path.includes(origin)) {
        const prevSqr = path[0].getPredecessor();
        path.unshift(prevSqr);
    }


    console.log(`The shortest path is ${path.length - 1} moves!`);
    console.log('The moves are:')
    path.forEach(move => {
        console.log(move.name());
    });
    return path.map(move => move.name());
};

export default knightsTravalis;
