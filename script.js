const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')
const winningMessage = document.querySelector('#winningMessage')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const restartBtn = winningMessage.querySelector('button');
const resetBtn = document.querySelector('#resetBtn')
resetBtn.addEventListener('click', ()=>{
    localStorage.clear()
    location.reload()
})
const spanXCount = document.querySelector('#xCount')
const spanCircleCount = document.querySelector('#circleCount')

let xCount = localStorage.getItem('xCount') || 0;
let circleCount = localStorage.getItem('circleCount') || 0;

localStorage.setItem("xCount",xCount)

let getXCount = localStorage.getItem('xCount')
let getCircleCount = localStorage.getItem('circleCount')

const WINNING_COMBINITIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn
const X_CLASS = "circle"
const CIRCLE_CLASS = "x"
startGame()
restartBtn.addEventListener('click' , ()=>{
    location.reload()
})
function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass);

    if(checkWin(currentClass)){
        if(currentClass === "circle"){
            circleCount++
            localStorage.setItem("circleCount",circleCount)
            spanCircleCount.textContent = `${localStorage.getItem('circleCount')}`
        }else{
            xCount++;
            localStorage.setItem("xCount",xCount)
            spanXCount.textContent = `${localStorage.getItem('xCount')}`
        }
        winningMessage.classList.add('show')
        winningMessageText.textContent = `${currentClass} wins`

    }
    swapTurns()
    setBoardHoverClass()
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn = !circleTurn
}
function setBoardHoverClass(){
    board.classList.remove(CIRCLE_CLASS)
    board.classList.remove(X_CLASS)

    if(circleTurn){
        return board.classList.add(CIRCLE_CLASS)
    }
    return board.classList.add(X_CLASS )
}

function startGame(){
    spanXCount.textContent = `${localStorage.getItem('xCount') || 0}`
    spanCircleCount.textContent = `${localStorage.getItem('circleCount') || 0}`
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.addEventListener('click', handleClick,{once:true})
    })
    setBoardHoverClass()
}

function checkWin(currentClass){
   return WINNING_COMBINITIONS.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
   })
}