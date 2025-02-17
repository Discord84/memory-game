let screens = document.querySelectorAll(".container") 
let again = document.querySelector(".again-btn")
let start = document.querySelector(".board-btn")
let time = document.getElementById("time")
let timeEl = 0
let ulu = document.getElementById("board-list")
console.log(ulu)
let container = document.getElementById("game")
let cardsCount = 0
let firstCard = null
let secondCard = null
let cardsArray = []
let cardsNumberArray = []
let timer;
class Card{
    _open = false
    _success = false
    constructor(container, number, action){
        this.card=document.createElement("div")
        this.card.classList.add("card")
        this.card.textContent=number
        this.number=number
        this.card.addEventListener("click",()=>{
            if(this._open==this.open){
                this.open=true
                action(this)
            }
        })
        container.append(this.card)
    }
    set open(value){
        this._open=value
        if(value){
            this.card.classList.add("open")
        }
        else{
            this.card.classList.remove("open")
        }
    }
    get open(){
        return this._open
    }
    set success(value){
        this._success=value
        if(value){
            this.card.classList.add("success")
        }
        else{
            this.card.classList.remove("success")
        }
    }
    get success(){
        return this._success
    }
}

again.addEventListener("click",(event)=>{
    event.preventDefault()
    container.innerHTML=""
    stopGame()
    cardsCount=parseInt(10)
    timeEl=parseInt(40)
    startGame()
    console.log("1")
})

ulu.addEventListener("click",(event)=>{
    if(event.target.classList.contains('board-btn')){
        cardsCount=parseInt(10)
        board(cardsCount)
        screens[0].innerHTML=""
    }
})
ulu.addEventListener("click",(event)=>{
    if(event.target.classList.contains('board-btn')){
        timeEl=parseInt(40)
        startGame()
    }
})

function board(element){
    if(element>=16){
        container.style.width="400px"
    } else if(element>=24){
        container.style.width="600px"
    } else if(element>=32){
        container.style.width="800px"
    }
}

function timeer() {
    if (timeEl === 0) {
        timeStop();
    } else {
        // let currentTime = --timeEl;
        // setTime(currentTime);
        // setTimeout(timeer, 1000); // Рекурсивный вызов
		let current = --timeEl;
		if (current < 10) {
		current = `0${current}`
		};
		setTime(current);
    }
}

function setTime(value){
    // time.innerHTML=`у вас осталось ${value} секунд`
	if (value >= 60) {
		let sec = value - 60;

		if (sec < 10) {
		sec = `0${sec}`
		};
		time.innerHTML = `01:${sec} осталось`;
	} else {
		time.innerHTML = `00:${value} осталось`;
	}
}

function timeStop(){
    stopGame()
    timer=clearInterval(timer)
    timeEl=0
    container.innerHTML=`<h1> время вышло</h1>`
}

function createCards(){
    for(let i = 1;i<=cardsCount/2;i++){
        cardsNumberArray.push(i)
        cardsNumberArray.push(i)
    }
    cardsNumberArray=cardsNumberArray.sort(()=> Math.random()-0.5)
    for(const cardNum of cardsNumberArray){
        cardsArray.push(new Card(container, cardNum, flip))
    }
}

function startGame() {
    screens[1].classList.add("up");
	timer = setInterval(timeer, 1000);
    setTime(timeEl);
    createCards();
    time.parentNode.classList.remove("hide");
}

function stopGame(){
    cardsArray=[]
    cardsNumberArray=[]
    firstCard=null
    secondCard=null
    cardsCount=0
    timer=clearInterval(timer)
    time.parentNode.classList.add("hide")
    // again.classList.add("active")
}

function flip(card){
    if(firstCard!==null && secondCard!==null){
        if(firstCard.number!==secondCard.number){
            firstCard.open=false
            secondCard.open=false
            firstCard=null
            secondCard=null
        }
    }
    if(firstCard==null){
        firstCard=card
    } else{
        if(secondCard==null){
            secondCard=card
        }
    }
    
    if(firstCard!==null && secondCard!==null){
        if(firstCard.number==secondCard.number){
            firstCard.success=true
            secondCard.success=true
            secondCard=null
            firstCard=null
        }
    }
    if(document.querySelectorAll(".card.success").length==cardsNumberArray.length){
        stopGame()
        container.innerHTML="<h1>Победа!</h1>"
    }
}