var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

let computer
let player

let cells = []
for (let i = 1; i < 10; i++) {
    cells.push(document.getElementsByClassName("cell" + i)[0])
}

function currentBoard() {
    let board = []
    let row1 = []
    let row2 = []
    let row3 = []

    // First row of cells
    if (cells[0].hasChildNodes()) {
        if (cells[0].children[0].className.baseVal == "cross") {
            row1.push("X");
        }
        else {
            row1.push("O");
        }
    }
    else {
        row1.push("");
    }
    if (cells[1].hasChildNodes()) {
        if (cells[1].children[0].className.baseVal == "cross") {
            row1.push("X");
        }
        else {
            row1.push("O");
        }
    }
    else {
        row1.push("");
    }
    if (cells[2].hasChildNodes()) {
        if (cells[2].children[0].className.baseVal == "cross") {
            row1.push("X");
        }
        else {
            row1.push("O");
        }
    }
    else {
        row1.push("");
    }

    // Second row of cells
    if (cells[3].hasChildNodes()) {
        if (cells[3].children[0].className.baseVal == "cross") {
            row2.push("X");
        }
        else {
            row2.push("O");
        }
    }
    else {
        row2.push("");
    }
    if (cells[4].hasChildNodes()) {
        if (cells[4].children[0].className.baseVal == "cross") {
            row2.push("X");
        }
        else {
            row2.push("O");
        }
    }
    else {
        row2.push("");
    }
    if (cells[5].hasChildNodes()) {
        if (cells[5].children[0].className.baseVal == "cross") {
            row2.push("X");
        }
        else {
            row2.push("O");
        }
    }
    else {
        row2.push("");
    }

    // Third row of cells
    if (cells[6].hasChildNodes()) {
        if (cells[6].children[0].className.baseVal == "cross") {
            row3.push("X");
        }
        else {
            row3.push("O");
        }
    }
    else {
        row3.push("");
    }
    if (cells[7].hasChildNodes()) {
        if (cells[7].children[0].className.baseVal == "cross") {
            row3.push("X");
        }
        else {
            row3.push("O");
        }
    }
    else {
        row3.push("");
    }
    if (cells[8].hasChildNodes()) {
        if (cells[8].children[0].className.baseVal == "cross") {
            row3.push("X");
        }
        else {
            row3.push("O");
        }
    }
    else {
        row3.push("");
    }

    board.push(row1)
    board.push(row2)
    board.push(row3)
    return board

}

function isTerminal(board) {
    computerWin = false
    playerWin = false

    // Checking for computer's win

    // Checking all Rows
    for (let i = 0; i < 3; i++) {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != computer) {
                win = false
                break
            }
        }
        if (win) {
            computerWin = true
            break
        }
    }

    // Checking all columns 
    for (let i = 0; i < 3; i++) {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (board[j][i] != computer) {
                win = false
                break
            }
        }
        if (win) {
            computerWin = true
            break
        }
    }

    // Checking diagonals
    if (board[0][0] == computer && board[1][1] == computer && board[2][2] == computer) computerWin = true
    if (board[2][0] == computer && board[1][1] == computer && board[0][2] == computer) computerWin = true


    // Checking for player's win

    // Checking all Rows
    for (let i = 0; i < 3; i++) {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (board[i][j] != player) {
                win = false
                break
            }
        }
        if (win) {
            playerWin = true
            break
        }
    }

    // Checking all columns 
    for (let i = 0; i < 3; i++) {
        let win = true
        for (let j = 0; j < 3; j++) {
            if (board[j][i] != player) {
                win = false
                break
            }
        }
        if (win) {
            playerWin = true
            break
        }
    }

    // Checking diagonals
    if (board[0][0] == player && board[1][1] == player && board[2][2] == player) playerWin = true
    if (board[2][0] == player && board[1][1] == player && board[0][2] == player) playerWin = true

    if (computerWin) return 10;
    else if (playerWin) return -10;
    else {
        let isFull = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    isFull = false;
                    break;
                }
            }
        }
        if (isFull) return 0;
        else return -1;
    }

}

function minimax(board, ply) {
    let score = isTerminal(board)
    if (score != -1) return [-1, -1, score]

    if (ply == 1) {
        let best = [-1, -1, -Infinity]
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = computer;
                    let value = minimax(board, -1)
                    board[i][j] = ""
                    if (value[2] > best[2]) best = [i, j, value[2]]
                }
            }
        }
        return best
    }
    else {
        let best = [-1, -1, Infinity]
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    board[i][j] = player;
                    let value = minimax(board, 1)
                    board[i][j] = ""
                    if (value[2] < best[2]) best = [i, j, value[2]]
                }
            }
        }
        return best
    }
}

function stateChange(ele) {
    if (!ele.hasChildNodes()) {
        if (player == "O") {
            ele.innerHTML = `<svg class="circle" xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          </svg>`
        }
        else {
            ele.innerHTML = `
            <svg class="cross" xmlns="http://www.w3.org/2000/svg" width="85%" height="85%" fill="currentColor"
            class="bi bi-x" viewBox="0 0 16 16">
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>`
        }

        let curboard = currentBoard()
        let score = isTerminal(curboard)

        if (score != -1) {
            if (score == -10) {
                document.getElementById('modal-title').innerHTML = "Congratulations!"
                document.getElementById('modal-text').innerHTML = "You are way too smart!"
            }
            else if (score == 10) {
                document.getElementById('modal-title').innerHTML = "Computer Wins!"
                document.getElementById('modal-text').innerHTML = "Better luck next time."
            }
            else{
                document.getElementById('modal-title').innerHTML = "It's a draw!"
                document.getElementById('modal-text').innerHTML = "Perfectly balanced... as everything should be."
            }

            document.getElementById('modal').classList.add('active')
            document.getElementById('overlay').classList.add('active')

            document.getElementById('overlay').addEventListener('click', ()=>{
                document.getElementById('modal').classList.remove('active')
                document.getElementById('overlay').classList.remove('active')
            })
            removeHandler()
        }
        else {
            let position = minimax(curboard, 1)

            if (computer == "O") {
                cells[(3 * position[0]) + position[1]].innerHTML = `<svg class="circle" xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            </svg>`
            }
            else {
                cells[(3 * position[0]) + position[1]].innerHTML = `
                <svg class="cross" xmlns="http://www.w3.org/2000/svg" width="85%" height="85%" fill="currentColor"
                class="bi bi-x" viewBox="0 0 16 16">
                <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>`
            }

            curboard = currentBoard()
            score = isTerminal(curboard)
            if (score != -1) {
                if (score == -10) {
                    document.getElementById('modal-title').innerHTML = "Congratulations!"
                    document.getElementById('modal-text').innerHTML = "You are way too smart!"
                }
                else if (score == 10) {
                    document.getElementById('modal-title').innerHTML = "Computer Wins!"
                    document.getElementById('modal-text').innerHTML = "Better luck next time."
                }
                else{
                    document.getElementById('modal-title').innerHTML = "It's a draw!"
                    document.getElementById('modal-text').innerHTML = "Perfectly balanced... as everything should be."
                }
    
                document.getElementById('modal').classList.add('active')
                document.getElementById('overlay').classList.add('active')
    
                document.getElementById('overlay').addEventListener('click', ()=>{
                    document.getElementById('modal').classList.remove('active')
                    document.getElementById('overlay').classList.remove('active')
                })
                removeHandler()
            }
        }
    }
}

let listener_functions = []

function removeHandler() {
    for (let x = 0; x < 9; x++) cells[x].removeEventListener('click', listener_functions[x], true)
}

function initialize() {

    if (document.getElementById("X").checked) {
        player = "X"
        computer = "O"
    }
    else if (document.getElementById("O").checked) {
        console.log("In")
        player = "O"
        computer = "X"
    }

    if (!document.getElementById("firstTurn").checked) {
        let curboard = currentBoard()
        let position = minimax(curboard, 1)

        if (computer == "O") {
            cells[(3 * position[0]) + position[1]].innerHTML = `<svg class="circle" xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        </svg>`
        }
        else {
            cells[(3 * position[0]) + position[1]].innerHTML = `
            <svg class="cross" xmlns="http://www.w3.org/2000/svg" width="85%" height="85%" fill="currentColor"
            class="bi bi-x" viewBox="0 0 16 16">
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>`
        }
    }

    for (let i = 0; i < 9; i++) {
        listener_functions.push(stateChange.bind(event, cells[i]))
        cells[i].addEventListener('click', listener_functions[i], true)
    }

    document.getElementById("play").disabled = true;
    document.getElementById("restart").disabled = false;
    popoverList[0]._isEnabled = false;
}

function reinitialize(){
    for(let i=0; i<9; i++) cells[i].innerHTML = ``;
    document.getElementById("play").disabled = false;
    document.getElementById("restart").disabled = true;
    popoverList[0]._isEnabled = true;
    removeHandler()
    listener_functions = []
}

function closeModal(){
    document.getElementById('modal').classList.remove('active')
    document.getElementById('overlay').classList.remove('active')
}
