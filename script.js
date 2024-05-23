let $ = document

const menuContiner = $.querySelector(".menu-continer")
const startBtn = $.querySelector("#start-btn")
const Score = $.querySelector("#score")
const xScoreElem = $.querySelector("#x-score")
const oScoreElem = $.querySelector("#o-score")
const gametimerElem = $.querySelector("#game-timer")
const menuBtn = $.querySelector("#menu-btn")
const gameBox = $.querySelectorAll(".game div")
const turnElem = $.querySelector("#turn")
const turnTimerElem = $.querySelector("#turn-time")
const audio = $.querySelector("#audio")
const gameBoxArray = Array.from(gameBox)
const a1 = $.querySelector("#a1")
const b1 = $.querySelector("#b1")
const c1 = $.querySelector("#c1")
const a2 = $.querySelector("#a2")
const b2 = $.querySelector("#b2")
const c2 = $.querySelector("#c2")
const a3 = $.querySelector("#a3")
const b3 = $.querySelector("#b3")
const c3 = $.querySelector("#c3")

let minute = "00"
let second = 0
let gameTimer
let turnTimer
let turn = ["X", "O"]
let turnIndex = 0
let minuteTurn = "00"
let secondTurn = 0
let i = 0
let winner = ""
let xScore = 0
let oScore = 0
let number = 0
let musics = [
    "./music/35 Staff Roll.mp3",
    "./music/14 Cave Dungeon.mp3",
    "./music/09 Dire, Dire Docks.mp3"
]

const startGame = () => {
    menuContiner.style.display = "none"
    gameTimer = setInterval(gameTimerFunc, 1000)
    turnTimer = setInterval(turnTimerfunc,1000)
    turnIndex = Math.floor(Math.random()*2)
    turnElem.innerHTML = turn[turnIndex]
    if(turnElem.innerHTML == "X"){
        turnElem.className = "X"
    }else{
        turnElem.className = "O"
    }
    number = Math.floor(Math.random()*musics.length)
    audio.setAttribute("src", musics[number])
    audio.play()
}
const gameTimerFunc = () => {
    second++
    if(audio.currentTime == audio.duration){
        number = Math.floor(Math.random()*musics.length - 1)

        audio.setAttribute("src", musics[number])
        audio.play()
    }
    if (second > 59) {
        second = 0
        minute++
        if (minute < 10) {
            minute = "0" + minute
        }
    }
    if (second < 10) {
        second = "0" + second
    }
    gametimerElem.innerHTML = minute + ":" + second
}
const menuFunc = () =>{
    audio.pause()
    menuContiner.style.display = "flex"
    menuContiner.firstElementChild.innerHTML = `
    <h1>Stop</h1>
    <div class="menu-btns">
    <span id="resume">resume</span>
    <span id="restart">restart</span>
    </div>
    `
    clearInterval(gameTimer)
    clearInterval(turnTimer)
    gametimerElem.innerHTML = minute+":"+second
    const resume = $.querySelector("#resume")
    resume.addEventListener("click", function () {
        menuContiner.style.display = "none"
        gameTimer = setInterval(gameTimerFunc, 1000)
        turnTimer = setInterval(turnTimerfunc,1000)    
        audio.play()
    })
    restart.addEventListener("click", restartBtnFunc)
}


const restartBtnFunc = () =>{
        i = 0
        minute = "00"
        second = "00"
        minuteTurn = "00"
        secondTurn = "00"
        gametimerElem.innerHTML = "00:00"
        turnTimerElem.innerHTML = "00:00"
        gameBox.forEach(function(sec){
            sec.innerHTML = ""
            sec.classList.remove('X' , 'O')
        })
        xTurn = true
        turnElem.innerHTML = "X"
        startGame()
}
const selectedSection = secId =>{

    gameBoxArray.find(function(sec){
        if(sec.id == secId){
            if(turn[turnIndex] == "X"){
                if(sec.innerHTML == ""){
                    turnIndex = 1
                    sec.innerHTML = "X"
                    turnElem.innerHTML = "O"
                    turnElem.className = "O"
                    sec.classList.add("X")
                    secondTurn = "00"
                    minuteTurn = "00"
                    i++
                }
            }
            else{
                if(sec.innerHTML == ""){
                    turnIndex = 0
                    sec.innerHTML = "O"
                    turnElem.innerHTML = "X"
                    turnElem.className = "X"
                    sec.classList.add("O")
                    secondTurn = "00"
                    minuteTurn = "00"
                    i++
                }
            }
            if(i>2){
                checkWiner()
            }
        }
    })
    turnTimerElem.innerHTML = minuteTurn + ":" + secondTurn
}
const checkWiner = () =>{
    if(a1.classList.contains("X") && a2.classList.contains("X") && a3.classList.contains("X") ||
        b1.classList.contains("X") && b2.classList.contains("X") && b3.classList.contains("X") || 
        c1.classList.contains("X") && c2.classList.contains("X") && c3.classList.contains("X") ||
        a1.classList.contains("X") && b1.classList.contains("X") && c1.classList.contains("X") ||
        a2.classList.contains("X") && b2.classList.contains("X") && c2.classList.contains("X") ||
        a3.classList.contains("X") && b3.classList.contains("X") && c3.classList.contains("X") ||
        a1.classList.contains("X") && b2.classList.contains("X") && c3.classList.contains("X") ||
        a3.classList.contains("X") && b2.classList.contains("X") && c1.classList.contains("X")){
            xScore++
            winner = "player X win!"
            resultGame(winner)
        }else if(a1.classList.contains("O") && a2.classList.contains("O") && a3.classList.contains("O") ||
        b1.classList.contains("O") && b2.classList.contains("O") && b3.classList.contains("O") || 
        c1.classList.contains("O") && c2.classList.contains("O") && c3.classList.contains("O") ||
        a1.classList.contains("O") && b1.classList.contains("O") && c1.classList.contains("O") ||
        a2.classList.contains("O") && b2.classList.contains("O") && c2.classList.contains("O") ||
        a3.classList.contains("O") && b3.classList.contains("O") && c3.classList.contains("O") ||
        a1.classList.contains("O") && b2.classList.contains("O") && c3.classList.contains("O") ||
        a3.classList.contains("O") && b2.classList.contains("O") && c1.classList.contains("O")){
            oScore++
            winner = "player O win!"
            resultGame(winner)
        }
        else if(i>8){
            winner = "equal :)"
            resultGame(winner)

        }
    }
    const resultGame = winner =>{
        if(winner == "equal :)"){
            audio.setAttribute("src", "./music/16 - Final Boss (Part 1 Intro).mp3")
        }else{
            audio.setAttribute("src", "./music/31 Koopa Clear.mp3")
        }
            audio.play()
            menuContiner.style.display = "flex"
            xScoreElem.innerHTML = xScore
            oScoreElem.innerHTML = oScore
            Score.replaceChildren(xScoreElem , " - " , oScoreElem)
            menuContiner.firstElementChild.innerHTML = `
            <h1>${winner}</h1>
            <div class="menu-btns">
            <span id="restart">play agin</span>
            </div>
            `
    clearInterval(gameTimer)
    clearInterval(turnTimer)
    restart.addEventListener("click", restartBtnFunc)
}
const turnTimerfunc = () =>{
    secondTurn++
    if (secondTurn > 59) {
        secondTurn = 0
        minuteTurn++
        if (minuteTurn < 10) {
            minuteTurn = "0" + minuteTurn
        }
    }
    if (secondTurn < 10) {
        secondTurn = "0" + secondTurn
    }
    turnTimerElem.innerHTML = minuteTurn + ":" + secondTurn
}
function some(){
    number = Math.floor(Math.random()*3)
}


menuBtn.addEventListener("click", menuFunc)
startBtn.addEventListener("click", startGame)