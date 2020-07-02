const board = [null, null, null, null, null, null, null, null, null];
let available = [0, 1, 2, 3, 4, 5, 6, 7, 8];

$(document).ready(() => {
    const playerMove = () => {
        $(".game-square").on("click", function (event) {
            event.preventDefault();

            let square = $(this).attr('id');
            square = +square;
            console.log(typeof (square));

            if (available.includes(square)) {

                $(this).html("X");
                board[square] = "X";
                available.splice(available.indexOf(square), 1);

                console.log(`Player chose: ${square}`)
                checkGame("player");
            }
        });
    }

    const computerMove = () => {
        console.log("Computer's Move");

        let index = Math.floor(Math.random() * available.length);
        let osquare = available[index];

        console.log(`Computer Chose: ${osquare}`);

        $(`#${osquare}`).html("O");
        board[osquare] = "O";
        available.splice(available.indexOf(osquare), 1);
        console.log(`Available Choices: ${available}`);

        checkGame("comp");
    }

    const checkGame = (turn) => {
        console.log(`Check for a Win by ${turn}`);
        const row1 = board[0] + board[1] + board[2];
        const row2 = board[3] + board[4] + board[5];
        const row3 = board[6] + board[7] + board[8];
        const col1 = board[0] + board[3] + board[6];
        const col2 = board[1] + board[4] + board[7];
        const col3 = board[2] + board[5] + board[8];
        const diag1 = board[0] + board[4] + board[8];
        const diag2 = board[2] + board[4] + board[6];

        console.log(row1, "\n", row2, "\n", row3, "\n", col1, "\n", col2, "\n", col3, "\n", diag1, "\n", diag2)

        if (row1 === "XXX" ||
            row2 === "XXX" ||
            row3 === "XXX" ||
            col1 === "XXX" ||
            col2 === "XXX" ||
            col3 === "XXX" ||
            diag1 === "XXX" ||
            diag2 === "XXX") {

              available = [];
              endGame("You are the Champion");
    
            } else if (row1 === "OOO" ||
            row2 === "OOO" ||
            row3 === "OOO" ||
            col1 === "OOO" ||
            col2 === "OOO" ||
            col3 === "OOO" ||
            diag1 === "OOO" ||
            diag2 === "OOO") {

              available = [];
              endGame("Better Luck Next Time");
    
            } else {

            nextMove(turn);

        }

    }

    const endGame = (result) => {
        const results = $(`<h1>${result}</h1>`);
        $("#results").append(results);

        const playAgain = $("<a type='button' id='playAgain' onClick='window.location.reload()'></a>").text("Play Again");
        $("#results").append(playAgain);

    }

    const nextMove = (turn) => {
        if (turn === "player") {
            computerMove();
        }
        else {
            playerMove();
        }
    }

    playerMove();

})







