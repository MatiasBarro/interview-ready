const PLAYER_1 = 1
const PLAYER_2 = 2

function playToken(grid, col, player) {
  if(col > grid.length) {
    throw Error('Out of scope');
  }

  const freeIdx = grid[col].findIndex(x => x === 0);

  if(freeIdx < 0) {
    return freeIdx;
  }

  grid[col][freeIdx] = player
  return freeIdx;
}

function checkVertical(grid, lastTokenPosition, player) {
  //check vertical, in this case only from the position to the bottom

  const [col, row] = lastTokenPosition;
  if(row - 3 < 0) {
    return false;
  }

  let currentCount = 0;
  for(let i = 0; i <= row; i++) {
    if(grid[col][i] === player) {
      currentCount++
    }
  }

  return currentCount === 4
}

//sliding window from the last position -3 cols and +3 cols
function checkHorizontal(grid, lastTokenPosition, player) {
  const [col, row] = lastTokenPosition;
  let left = col - 3 < 0 ? 0 : col - 3;
  let right = left;
  const end = col + 3 > 6 ? 6 : col + 3;
  
  let tokenCount = 0
  while(right <= end && tokenCount < 4) {
     //adjust window
     if(right - left + 1 > 4) {
        if(grid[left][row] === player) tokenCount--;
        left++;
        continue;
     }

     if(grid[right][row] === player) {
        tokenCount++
     }

     right++;
  }

//   if(tokenCount === 4) {
//     console.log(lastTokenPosition,left, right -1, player);
//   }

  return tokenCount === 4
}

function checkDiagonalDesc(grid, lastTokenPosition, player) {
  const [col, row] = lastTokenPosition;
  
  // calculate row start and col start
  let startCol = col
  let startRow = row
  while(startCol > 0 && startRow < 6) {
     startCol--
     startRow++
  }

  //calculate row end and col end
  let endCol = col
  let endRow = row
  while(endCol < 6 && endRow > 0) {
     endCol++
     endRow--
  }

  let tokenCount = 0
  let currentWindowSize = 0
  let currentRow = startRow;
  let currentCol = startCol
//   console.log(startCol, startRow, currentCol, currentRow, endCol, endRow, lastTokenPosition, grid, player )
  while(currentCol <= endCol && currentRow >= endRow && tokenCount < 4) {
    //  console.log(currentCol, currentRow);
      if(currentWindowSize === 4) {
        // console.log('entro',currentWindowSize, startCol, startRow, currentCol, currentRow)
        if(grid[startCol][startRow] === player) tokenCount--;
        //move one position down
        startCol++;
        startRow--;
        currentWindowSize--;
        continue;
     } 

     if(grid[currentCol][currentRow] === player) {
        tokenCount++;
     }

     currentCol++
     currentRow--
     currentWindowSize++
  }


//   if(tokenCount === 4) {
//     console.log(lastTokenPosition, player, grid);
//   }

  return tokenCount === 4
}

function checkDiagonalAsc(grid, lastTokenPosition, player) {
    const [col, row] = lastTokenPosition;
    
    // calculate row start and col start
    let startCol = col
    let startRow = row
    while(startCol > 0 && startRow > 0) {
       startCol--
       startRow--
    }
  
    //calculate row end and col end
    let endCol = col
    let endRow = row
    while(endCol < 6 && endRow < 5) {
       endCol++
       endRow++
    }
  
    let tokenCount = 0
    let currentWindowSize = 0
    let currentRow = startRow;
    let currentCol = startCol
  //   console.log(startCol, startRow, currentCol, currentRow, endCol, endRow, lastTokenPosition, grid, player )
    while(currentCol <= endCol && currentRow <= endRow && tokenCount < 4) {
      //  console.log(currentCol, currentRow);
        if(currentWindowSize === 4) {
          // console.log('entro',currentWindowSize, startCol, startRow, currentCol, currentRow)
          if(grid[startCol][startRow] === player) tokenCount--;
          //move one position UP
          startCol++;
          startRow++;
          currentWindowSize--;
          continue;
       } 
  
       if(grid[currentCol][currentRow] === player) {
          tokenCount++;
       }
  
       currentCol++
       currentRow++
       currentWindowSize++
    }
  
  
    // if(tokenCount === 4) {
    //   console.log(lastTokenPosition, player, grid);
    // }
  
    return tokenCount === 4
  }

function checkWinner(grid, lastTokenPosition, player) {
  const winVertical = checkVertical(grid, lastTokenPosition, player);
  if(winVertical) {
    console.log('win vertical');
    return true
  }
  
  const winHorizontal = checkHorizontal(grid, lastTokenPosition, player)
  if(winHorizontal) {
    console.log('win Horizontal');
    return true
  }

  const diagonalDescWin = checkDiagonalDesc(grid, lastTokenPosition, player);
  if(diagonalDescWin) {
    console.log('win diagonal desc');
    return true;
  }

  return checkDiagonalAsc(grid,lastTokenPosition, player)
}

function Connect4(arr) {
  const grid = Array(7)

  for(let i=0; i < grid.length; i++) {
    grid[i] = new Array(6).fill(0);
  }

  for(let i=0; i < arr.length; i++) {
    const player = i%2 === 0 ? PLAYER_1 : PLAYER_2;
    const tokenIdx = playToken(grid, arr[i], player);
    const winner = checkWinner(grid, [arr[i], tokenIdx], player);

    if(winner) {
      console.log(grid)
      return player
    }
  }

  console.log(grid)
  console.log('TIE');
  
  // code goes here  
  return -1; 
}
   
// keep this function call here 
console.log(Connect4(
        [
    1,0,
    1,0,
    4,2,
    5,2,
    2,5,
    6,3,
    3,6,
    5,3,
    3,1,
    6,4,
    5,4,
    4,6,
    4,5,
]));


// Input: [3, 4, 3, 4, 3, 4, 3]
// Output: 1

// Input: [3, 4, 3, 4, 3, 4, 2, 4]
// Output: 2

// Horizontal win
//[2, 3, 2, 3, 0, 4, 0, 5, 0, 6]
//output:2

// Horizontal win
//[0,1,0,2,0,3,1,4,4]
//output:2

// Horizontal win
//[1,0,0,3,0,5,1,4,1,2]
//output:2

// Horizontal not win
//[2, 3, 2, 3, 0, 3, 0, 5, 0, 6]


// Diagonal desc win
// [
//     0,5,
//     0,0,
//     6,0,
//     0,0,
//     0,3,
//     3,1,
//     4,1,
//     4,1,
//     1,5,
//     6,2,
//     2,0,
//     2,0
// ]
//output: 1

// Diagonal desc not win
// [
//     0,5,
//     0,0,
//     6,0,
//     0,0,
//     0,3,
//     3,1,
//     4,1,
//     4,1,
//     1,5,
//     6,2,
//     2,0,
//     6,2
// ]
//output: 1

// Diagonal asc win
// [
//     1,0,
//     1,0,
//     4,2,
//     5,2,
//     2,5,
//     6,3,
//     3,6,
//     5,3,
//     3,1,
//     6,4,
//     5,4,
//     4,6,
//     4,5,
// ]
//output: 1
