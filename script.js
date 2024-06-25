const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let players = ['X', 'O'];
    let currentPlayer = players[0];

    let winner = '';
    let gameOver = false; 

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];


    const clearBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = players[0];
        gameOver = false;
        winner = '';

    }

    const checkWinner = () => {
        //itertate through the winning combos
        for (let i=0; i<winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                document.querySelector('.game').innerHTML = 'Winner is ' + board[a];
                console.log('winner is ' + board[a]);
                gameOver = true;
                winner = board[a];
                return board[a];  
            }

        }

        if (!board.includes('')) {
            console.log('tie');
            gameOver = true;
            winner = 'tie';
            return 'tie';
        }


    }

    const play = (index) => {
        if (board[index] !== ''){
            
            console.log('invalid move' + board[index]);
            return;
        }

        board[index] = currentPlayer;

        checkWinner();
        if (gameOver) {
            clearBoard();
            console.log('game over');
            return;
        }
        else{
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        }

    }    
    
    const getBoard = () => board;
    return {play , getBoard, clearBoard}  
  
  
})();


const displayController = (() => {

    
    const parent = document.querySelector('.tictactoegrid');
    const cells = parent.children;

    for (let i=0; i<9; i++) {
        GameBoard.clearBoard();
        
    }

    for (let i=0;i<9;i++){
        cells[i].addEventListener('click', () => {
            GameBoard.play(i);
            render();
        });
    }

    const render = () => {
        for (let i=0; i<9; i++) {
            
            cells[i].innerHTML = GameBoard.getBoard()[i];
        }
    }
});


const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
    GameBoard.clearBoard();
    displayController();
    
});

displayController();


