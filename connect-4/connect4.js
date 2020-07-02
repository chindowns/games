$(document).ready(function () {
    // setup Board and Players

    let board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]]

    // give players the option to pick a color
    // we are player 1
    let player1 = "black"
    let player2 = "red"
    let currentPlayer = player1

    // setup HTML Page
    // create header

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Creates the Scoreboard and placement of the gameboard
    function setupDOM() {
        const header = `<header><h1>Connect 4</h1></header>`;
        const player1Title = capitalizeFirstLetter(player1)
        const player2Title = capitalizeFirstLetter(player2);
        const scoreBoard = `
            <div class="scoreBoard" id="scoreBoard">
                <div class="score ${player1}" id="player1">${player1Title}<br />
                    <div class="score black" id="player1Score">0</div>
                </div>
                <div class="player yellow" id="whosePlay">Play<br />
                    <div class="player ${currentPlayer}" id="whoseTurn">${capitalizeFirstLetter(currentPlayer)}</div>
                </div>
                <div class="score ${player2}" id="player2">${player2Title}<br />
                    <div class="score black" id="player2Score">0</div>
                </div>
            </div>`
        const gameBoard = `<table id="board"></table>`

        $("body").prepend(header, scoreBoard, gameBoard);

        let boardHeader = `<thead>
            <th id="0" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="1" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="2" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="3" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="4" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="5" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
            <th id="6" class="drop-zone"><i class="fas fa-arrow-alt-circle-down"></i></th>
        </thead>`

        $("#board").append(boardHeader)

        board.forEach((row, i) => {
            let rowVal = `<tr>
                <td id="${i}-0" data-col="0"> <i class="fas fa-circle fa-5x "></i></td>
                <td id="${i}-1" data-col="1"> <i class="fas fa-circle fa-5x "></i></td>
                <td id="${i}-2" data-col="2"> <i class="fas fa-circle fa-5x "></i></td>
                <td id="${i}-3" data-col="3"> <i class="fas fa-circle fa-5x "></i></td>
                <td id="${i}-4" data-col="4"> <i class="fas fa-circle fa-5x "></i></td>
                <td id="${i}-5" data-col="5"> <i class="fas fa-circle fa-5x "></i></td>
                <td id="${i}-6" data-col="6"> <i class="fas fa-circle fa-5x "></i></td>
            </tr>`

            $("#board").append(rowVal)
        })
    }

    $(document).on("click", ".drop-zone", (event) => {
        event.preventDefault();
        if (currentPlayer === player1) {
            let id = event.target.id;
            let color = currentPlayer;
            dropDisk(id, color)
        }
        else {
            alert("It's not your turn!!")
        }
    })

    function dropDisk(column, color) {
        let lowestRow = findLowestRow(column)
        console.log(lowestRow)

        // Animate disk drop with setInterval
        const setSpot = (row) => {
            $(`#${row}-${column}`).addClass(color);
        }

        const removeSpot = (row) => {
            $(`#${row}-${column}`).removeClass(color);
        }

        console.log(`Drop Disc LowestRow is ${lowestRow}`);

        for (let row = 0; row <= lowestRow; row++) {
            setTimeout(function () {
                console.log(`Dropped Row is: ${row}`)
                if (row > 0) {
                    removeSpot(row - 1);
                    setSpot(row);
                    // Disc at lowestRow, check if there is a winner
                } else { 
                    console.log(`Set top spot`); 
                    setSpot(row); 
                }

                if (row === lowestRow) {
                    console.log(`Checking if there is a  Winner`);
                    board[lowestRow][column] = color;
                    checkWin();
                    // Set the first spot
                }

            }, (row * 250) - row);
        }

        // $(`#${lowestRow}-${column}`).addClass(color)
        // board[lowestRow][column] = color
        // nextMove()

    }

    function findLowestRow(column) {
        console.log(board);
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][column] === "") {
                console.log(`row: ${row}  col: ${column}`);
                return row
            }
        }
        console.log("Column is FULL")
        return "full"

    }

    function computerRandomDrop() {
        let column = Math.floor(Math.random() * 6)
        if (findLowestRow(column) != "full") {
            return dropDisk(column, currentPlayer)
        }
        else {
            // return computerRandomDrop()
        }
    }

    function nextMove() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
            $('#whoseTurn').removeClass(player1);
            $('#whoseTurn').text(player2);
            $('#whoseTurn').addClass(player2);
            computerRandomDrop()

        }
        else {
            currentPlayer = player1;
            $('#whoseTurn').removeClass(player2);
            $('#whoseTurn').addClass(player1);
            $('#whoseTurn').text(player1);
        }
    }

    function checkWin() {
        let playNextMove = 0
        let resetWhosePlay = `<div class="winner ${currentPlayer}" id="whoseTurn">${currentPlayer}</div>`;
        let winner = "";
        // Check Rows
        board.forEach(row => {
            for (let col = 0; col < 4; col++) {
                if (row[col] !== "" &&
                    row[col] === row[col + 1] &&
                    row[col] === row[col + 2] &&
                    row[col] === row[col + 3]) {
                    
                    console.log(`${row[col]} WINS`)
                    $(`#whosePlay`).html("<h2 class='winner'>Winner<br />" + capitalizeFirstLetter(row[col]) +"</h2>")
                    return playNextMove = 0
                }
                else {playNextMove++}
            }
        });
        

        // Check Columns
        for (let row = board.length-1; row >= 0; row--) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] !== "" &&
                    board[row][col] === board[row - 1][col] &&
                    board[row][col] === board[row - 2][col] &&
                    board[row][col] === board[row - 3][col]) {

                    console.log(`${board[row][col]} WINS`)
                    $(`#whosePlay`).html("<h2 class='winner'>Winner<br />" + capitalizeFirstLetter(board[row][col]) + "</h2>")
                    return playNextMove = 0
                }
            }
        }
        playNextMove++

        // Check Diagonal Up Right
        for (let row = board.length-1; row > 1; row--) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] !== "" &&
                    board[row][col] === board[row - 1][col + 1] &&
                    board[row - 1][col + 1] === board[row - 2][col + 2] &&
                    board[row - 2][col + 2] === board[row - 3][col + 3]) {

                    console.log(`${board[row]} WINS`)
                    $(`#whosePlay`).html("<h2 class='winner'>Winner<br />" + capitalizeFirstLetter(board[row][col]) + "</h2>")
                    return playNextMove = 0

                } else {playNextMove++}
            }
        }
        

        // Check Diangonal Up Left
        for (let row = board.length-1; row > 1; row--) {
            for (let col = board[row].length - 1; col >= 0 ; col--) {
                if (board[row][col] !== "" &&
                    board[row][col] === board[row - 1][col - 1] &&
                    board[row - 1][col - 1] === board[row - 2][col - 2] &&
                    board[row - 2][col - 2] === board[row - 3][col - 3]) {

                    console.log(`${board[row]} WINS`)
                    $(`#whosePlay`).html("<h2 class='player'>Winner<br />" + capitalizeFirstLetter(board[row][col]) + "</h2>")
                    return playNextMove = 0
                }
                else {playNextMove++}
            }
        }
        
        console.log(playNextMove);
        if (playNextMove === 81) {
            nextMove();
        }
    }

    setupDOM();
})


