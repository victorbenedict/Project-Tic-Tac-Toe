// ---Features---
// ✓ Player marking for X and O
// ✓ Keep players from marking the marked box
// ✓ Randomize the player who will get the first turn on the first round (currently affects all rounds)
// ✓ Winning combinations and game results
// Scoring
// Options to change player name 
// Player switch who will get the first turn in every round
// AI
// UI 

const game = (() => {
  let board = ['', '', '', '', '', '', '', '',''];
  let players = [];
  let playerTurnID;
  let winCombinations = [
    [0, 1, 2], [3 ,4 ,5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonal
  ]; 
  let winner = false;

  const renderBoard = () => {
    let container_gameboard = document.querySelector('.container_gameboard');
    console.log(`renderBoard, board = ${board}`)
     // Clearing the contents of the div
    while (container_gameboard.firstChild) {
      container_gameboard.removeChild(container_gameboard.firstChild);
    }

    // Render the squares
    board.forEach((mark, index) => {
      const newDiv = document.createElement('div');
      newDiv.textContent = `${mark}`;
      newDiv.classList.add('box', `${index}`);
      container_gameboard.appendChild(newDiv);
    });

    // Select all the box divs and attach click event
    const boxElem = document.querySelectorAll('.box');
    boxElem.forEach((boxElem) => {
      boxElem.addEventListener('click', handleClick)
    })
  } 

  const createPlayers = () => {
    let player1 = new playerFactory('Player 1', 'X', 1);
    let player2 = new playerFactory('Player 2', 'O', 2);
    players.splice(0, 1, player1)
    players.splice(1, 1, player2)
  }

  const initTurnID = () => {
    playerTurnID = Math.floor(Math.random() * 2);
    console.log(`initTurnID set playerTurnID to ${playerTurnID}`);
  }

  //Clicking the box
  const handleClick = (event) => {
    let index = parseInt(event.target.classList.item(1));
    //Mark the box
    markBox(index);
  }

  const playerTurn = () => {
    playerTurnID = playerTurnID != 0 ? 0 : 1
    console.log('playerTurnID -',playerTurnID)
  }

  const markBox = (index) => {
    console.log('markBox')
    if ( board[index] == '' && winner == false) {
      console.log(`Mark box ${board[index]} with ${players[playerTurnID].mark}`);
      board[index] = players[playerTurnID].mark
      renderBoard();
      checkWin();
      roundOver();
    }
  }

  const restart = () => {
    board = ['', '', '', '', '', '', '', '',''];
    winner = false;
    createPlayers();
    initTurnID();
    renderBoard();
  }

  const checkWin = () => {
    for (let combination of winCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true
        console.log(players[playerTurnID].name, 'is the winner!');
        setTimeout(() => {
          alert(`${players[playerTurnID].name} is the winner!`);
          nextRound();
        }, 100); //Announce the winner
        //reset board
      }
    }

    if ( winner == false ){
      playerTurn();
    }
  }
  const roundOver = () => {
    let isBoardFull = !board.includes('');
    console.log('Board array isFull?', isBoardFull)
    if ( winner == false && isBoardFull == true){
      setTimeout(() => {
        alert('Draw!');
        nextRound();
      }, 100);
    }
  }
  const nextRound = () => {
    console.log('nextRound')
    board = ['', '', '', '', '', '', '', '',''];
    winner = false;
    renderBoard();
    playerTurn();
  }

  const test = () => {
    
  }

  return {
    restart,
    test
  };
})();
//-----End of game module-----

function playerFactory(name, mark, id) {
  this.name = name;
  this.mark = mark;
  this.id = id
}

playerFactory.prototype.getMark = function() {
  return this.mark;
}

playerFactory.prototype.winner = function() {
  return `The winner is ${this.name}`;
}
//-----End of game playerFactory constructor-----

//-----Start of document-----
game.restart();
document.querySelector('.btn_restart').addEventListener('click', () => {
  game.restart();
})

document.querySelector('.btn_test').addEventListener('click', () => {
  game.test();
});

