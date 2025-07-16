const PLAYER_1=1
const PLAYER_2=2

function createGrid() {
    return Array(6).fill('').map(()=>Array(7).fill(0))
}

function play(grid, tokenCol, player) {
  for(let i = grid.length - 1; i >=0; i--){
    if(grid[i][tokenCol] === 0) {
        grid[i][tokenCol] = player;
        return i;
    }
  }
}

function checkWinnerInSlice(gridSlice, player) {
    let tokenCount = 0
    for(let playerToken of gridSlice) {
        if(tokenCount === 4) {
            break;
        }
        
        if(playerToken === player){
            tokenCount++
        } else {
            tokenCount = 0
        }
    }

    return tokenCount === 4
}

function checkPlayerWon(grid, lastTokenRow, lastTokenCol, player) {
    // console.log(lastTokenRow, lastTokenCol, player)
    const vertical = [];
    const horizontal = [];
    const desDiagonal = [];
    const ascDiagonal = [];
    // check 3 from each side of the token
    for(let offset = -3; offset <= 3; offset++) {
       if(lastTokenRow + offset >= 0 && lastTokenRow + offset < grid.length) {
            vertical.push(grid[lastTokenRow + offset][lastTokenCol]);
       }

       if(lastTokenCol + offset >= 0 && lastTokenCol + offset < grid[0].length) {
            // console.log(lastTokenRow, lastTokenCol+offset);
            horizontal.push(grid[lastTokenRow][lastTokenCol + offset])
       }

       //descendent diagonal
       if(lastTokenCol + offset >= 0 && lastTokenCol + offset < grid[0].length && lastTokenRow + offset >= 0 && lastTokenRow + offset < grid.length) {
        // console.log(lastTokenRow, lastTokenCol, lastTokenRow + offset, lastTokenCol + offset)
        //  vertical.push(grid[lastTokenRow + offset][lastTokenCol]);
        //  horizontal.push(grid[lastTokenRow][lastTokenCol + offset])
         desDiagonal.push(grid[lastTokenRow + offset][lastTokenCol + offset]);
       }

       //asc diagonal
       if(lastTokenCol + offset >= 0 && lastTokenCol + offset < grid[0].length && lastTokenRow - offset >= 0 && lastTokenRow - offset < grid.length) {
        //  console.log(lastTokenRow, lastTokenCol, lastTokenRow + offset, lastTokenCol - offset)
         ascDiagonal.push(grid[lastTokenRow - offset][lastTokenCol + offset]);
       }
    }

    // console.table(grid);
    // console.log(lastTokenRow, lastTokenCol, desDiagonal, player)

    if(checkWinnerInSlice(vertical, player)){
        console.log('Winner:',player);
        console.log('Direction: Vertical')
        return true;
    }

    if(checkWinnerInSlice(horizontal, player)){
        console.log('Winner:',player);
        console.log('Direction: Horizontal')
        return true;
    }

    if(checkWinnerInSlice(desDiagonal, player)){
        console.log('Winner:',player);
        console.log('Direction: Diag Desc')
        return true;
    }

    if(checkWinnerInSlice(ascDiagonal, player)){
        console.log('Winner:',player);
        console.log('Direction: Diag Asc')
        return true;
    }
}

function Connect4(tokens) {
    const grid = createGrid();
    for(const [i, tokenCol] of tokens.entries()) {
        const currentPlayer = i % 2 === 0 ? PLAYER_1 : PLAYER_2;
        const tokenRow = play(grid, tokenCol, currentPlayer);
        // console.table(grid);
        const playerWon = checkPlayerWon(grid, tokenRow, tokenCol, currentPlayer);
        if(playerWon){
            console.table(grid);
            return currentPlayer;
        }
    }

    console.table(grid);
    console.log('No Winner')
}

console.log(Connect4( [3, 4, 3, 4, 3, 4, 3]));
console.log(Connect4([3, 4, 3, 4, 3, 4, 2, 4]));
console.log(Connect4([2, 3, 2, 3, 0, 4, 0, 5, 0, 6]));
console.log(Connect4([2, 3, 2, 3, 0, 3, 0, 5, 0, 6])); // no winner
console.log(Connect4(
    [
    1,0,
    0,1,
    0,1,
    0,1,
    1,3,
    6,2,
    6,2,
    2,6,
    2,6,
    3,5,
    3,5,
    4,6,
    4,5
]
));

console.log(Connect4(
[
    0,1,
    1,2,
    1,2,
    2,3,
    3,3,
    3,6
]
));
