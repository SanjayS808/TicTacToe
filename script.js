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
        console.log(board);
        const parent = document.querySelector('.tictactoegrid');
        const cells = parent.children;
        for (let i=0; i<9; i++) {
            cells[i].innerHTML = '';
        }
    }

    const checkWinner = () => {
        //itertate through the winning combos
        for (let i=0; i<winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                document.querySelector('.game').innerHTML = 'Winner is ' + board[a];
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                clearBoard();
                console.log('winner is ' + board[a]);
                gameOver = true;
                winner = board[a];
                return board[a];  
            }

        }

        if (!board.includes('')) {
            console.log('tie');
            document.querySelector('.game').innerHTML = 'Its a tie.';
            gameOver = true;
            winner = 'tie';

            return 'tie';
        }


    }

    const play = (index) => {
        board = GameBoard.getBoard();
        console.log(board[index]);
        if (board[index] !== ''){
            console.log(board[index]);
            console.log('invalid move' + board[index]);
            return;
        }
        
        board[index] = currentPlayer;
        console.log('valid move');  
        checkWinner();
        if (gameOver) {
            clearBoard();
            console.log('game over');
            return;
        }
        else{
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
            document.querySelector('.game').innerHTML = 'Current player is ' + currentPlayer;
        }

    }    
    
    const getBoard = () => board;
    return {play , getBoard, clearBoard}  
  
  
})();


const displayController = (() => {

    
    const parent = document.querySelector('.tictactoegrid');
    const cells = parent.children;

    

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
    document.querySelector('.game').innerHTML = '';
    GameBoard.clearBoard();
    displayController();
    
});

displayController();


const test = document.querySelector('.test');





