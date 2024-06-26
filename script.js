const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let players = ['X', 'O'];
    let currentPlayer = players[0];

    let winner = '';
    let gameOver = false; 
    document.querySelector('.plX').style.color = 'red';
    document.querySelector('.plO').style.color = 'black';
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
        
        const parent = document.querySelector('.tictactoegrid');
        const cells = parent.children;
        for (let i=0; i<9; i++) {
            cells[i].innerHTML = '';
        }
        document.querySelector('.plX').style.color = 'red';
        document.querySelector('.plO').style.color = 'black';
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
                return; 
            }

        }

        if (!board.includes('')) {
            console.log('tie');
            document.querySelector('.game').innerHTML = 'Its a tie.';
            clearBoard();
            return 'tie';
        }


    }

    const play = (index) => {
        board = GameBoard.getBoard();
        if (gameOver) {
            return;
        }
        
        if (board[index] !== ''){
            return;
        }
        
        board[index] = currentPlayer;
         
        checkWinner();
        if (gameOver) {
            clearBoard();
        
            return;
        }
        else if(winner === ''){
            document.querySelector('.pl'+currentPlayer).style.color = 'black';
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

            document.querySelector('.pl'+currentPlayer).style.color = 'red';
            console.log('run');
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
    document.querySelector('.game').innerHTML = '‎ ';
    GameBoard.clearBoard();
    displayController();
    
});

displayController();


const test = document.querySelector('.test');

document.querySelector('.instructions').addEventListener('click', () => {
    document.querySelector("dialog").showModal();
    console.log('run');
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector("dialog").close();
});
