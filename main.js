//Created by Vogue Boney 2022

//Globals
let player
let opponent
let opponentMove

let numOfRounds = 0

// Buttons and resettable elements/variables
let combatLog = document.getElementById('combatLog')
let startButton = document.getElementById('startButton')
let restartButton = document.getElementById('restartButton')

let strikeButton = document.getElementById('strike')
let slamButton = document.getElementById('slam')
let pinButton = document.getElementById('pin')
let blockButton = document.getElementById('block')
let reversalButton = document.getElementById('reversal')
let crowdworkButton = document.getElementById('crowdwork')
let recoverButton = document.getElementById('recover')

let playerHealthDisplay = document.getElementById("playerHealth")
let playerStaminaDisplay = document.getElementById("playerStamina")
let playerHypeDisplay = document.getElementById("playerHype")
let playerStatusDisplay = document.getElementById("playerStatus")
let cpuHealthDisplay = document.getElementById("cpuHealth")
let cpuStaminaDisplay = document.getElementById("cpuStamina")
let cpuHypeDisplay = document.getElementById("cpuHype")
let cpuStatusDisplay = document.getElementById("cpuStatus")



function resetButtons(){
    startButton.disabled = false
    restartButton.disabled = false

    strikeButton.disabled = true
    pinButton.disabled = true
    slamButton.disabled = true
    blockButton.disabled = true
    reversalButton.disabled = true
    crowdworkButton.disabled = true
    recoverButton.disabled = true
}

function startGame(){
    startButton.disabled = true
    strikeButton.disabled = false
    pinButton.disabled = false
    slamButton.disabled = false
}

function restartGame(){
    resetButtons()
}

class Wrestler {
    constructor(){
        this.name = "Wrestler"
        this.health = 100
        this.stamina = 100
        this.powerMultiplier = 1
        // this.conditions = []
        this.isDazed= false
        this.isProne = false
        this.isPinned = false
        this.canBeFinished = false
        this.currentMove = ''
    }

    // Does 10 base damage * power multiplier. Damage will be reduced against 'defend' action
    // Chance to daze opponent
    strike(opponent){
        // TODO: functionality to deal with special moves
        
        // this.setCurrentMove('strike')
        let dazeChance = .15
        if(opponent.currentMove === 'defend'){
            opponent.health = opponent.health - (10 * this.powerMultiplier)/2
        }else{
            opponent.health = opponent.health - (10 * this.powerMultiplier)
        }
        
        if(Math.random() <= dazeChance){
            opponent.isDazed = true
        }
    }

    // Does 20 base damage * power multiplier; can be countered with 'reversal', dealing damage to user
    // Chance to knock opponent prone if attack is succesful
    slam(opponent){
        //TODO: add functionality to deal with special moves
       
        // this.setCurrentMove('slam')
        let proneChance = .5

        if(opponent.currentMove === 'reversal'){
            this.health = this.health - (20 * 1.5)
        }else{
            opponent.health = opponent.health - (20 * this.powerMultiplier)
        }

        if(Math.random() <= proneChance){
            opponent.isProne = true
        }
    }

    pin(opponent){
        // TODO
        let successChance = this.findSuccessChance(opponent)

        if((Math.random() <= successChance)){
            opponent.isPinned = true
        }

    }

    findSuccessChance(opponent){
        let returnResult = 0

        if((opponent.health < opponent.health * .15) && (opponent.stamina <= 0)){
            returnResult = .95
            return returnResult
        }else if(opponent.health <= opponent.health * .15 ){
            returnResult = .85
        }else if((opponent.health > opponent.health * .15) && (opponent.health *.3)){
            returnResult = .7
        }else if((opponent.health > opponent.health * .3) && (opponent.health <= opponent.health * .55)){
            returnResult = .5
        }else if((opponent.health > opponent.health * .55) && (opponent.health <= opponent.health * .75)){
            returnResult = .3
        }else if((opponent.health > opponent.health * .75) && (opponent.health <= opponent.health * .85)){
            returnResult = .15
        }else if (opponent.health > opponent.health * .85){
            returnResult = .05
        }

        if(opponent.isProne == false){
            returnResult /= .5
        }

        return returnResult
    }
    

    workTheCrowd(){
            // TODO
            let crowdWorkResult = Math.random()
            this.isTheCrowdPleased(crowdWorkResult)
        }

    isTheCrowdPleased(crowdResult){
        if(crowdResult < .15){
           console.log(`The crowd boos at the weak display of showmanship. ${this.name} feels winded by the blow to their self esteem...`)
           this.stamina -= 5
        }else if(crowdResult < .90 ){
            console.log(`The crowd goes wild!! ${this.name} looks amped up!!`)
            this.powerMultiplier = 1.5
        }else if(crowdResult >= .9){
            console.log(`The crowd is out of control for ${this.name}!! ${this.name} looks reinvigorated and ready for a big move!!`)
            this.health += 10
            this.powerMultiplier = 2
        }else{
            console.log("MAH GAWD, SOMETHINGS GONE WRONG")
        }
            
    }

    finisher(){
            // TODO
        }

    defend(){
        // TODO

        // this.currentMove = "defend"
    }

    reversal(){
        // TODO
        // this.currentMove = "reversal"
    }

    recover(){
        if(this.isDazed == true){
            console.log(`${this.name} has come to their senses.`)
        }
        
    }

    // TODO: Maybe implement this into the Game class instead; avoid timing issues when doing attack/defend comparisons
    setCurrentMove(move){
        this.currentMove = move
    }
}

class PlayerWrestler extends Wrestler {
    constructor(){
        super()
        this.name = "Wireframe"
        this.hypeLevel = 1
        this.stamina = 25 * this.hypeLevel

    }
}

class OpponentWrestler extends Wrestler{
    constructor(){
        super()
        this.name = 'The Heel'
    }
}

class Game{
    constructor(){
        this.player = new PlayerWrestler()
        this.currentOpponent = ''
        this.opponents = []
    }

    generateOpponents(){
        let opponent = new OpponentWrestler()
        this.opponents.push(opponent)
    }

    startGame(){
        //TODO
    }

    startFight(){
        //TODO
    }

    startRound(){
        //TODO
    }
    // Create a method that will select the cpu move and player move one after the other

}

window.onload = resetButtons()


// let results = "This is a test!!!!" + "<br>"
// log.innerHTML += results
// log.innerHTML += "New move" + "<br>"
// log.innerHTML += "Player is bringing the SMACKDOWN brother <br>"
// log.innerHTML += "OPPONENT is down for the count"

// // let wrassler = new Wrestler()

// function attack(id){
//     if(id == 'strike'){
//         log.innerHTML = "Player strikes out at the The Heel!!"
//     }else if(id === 'slam'){
//         log.innerHTML = "Player lunges from the ropes to get the drop on The Heel!!!"
//     }
// }
