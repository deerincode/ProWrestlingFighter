//Created by Vogue Boney 2022

//Globals
let player
let cpuOpponent
let playerMove
let cpuMove

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

let playerNameDisplay = document.getElementById("nameBoxPlayer")
let playerHealthDisplay = document.getElementById("playerHealth")
let playerStaminaDisplay = document.getElementById("playerStamina")
let playerHypeDisplay = document.getElementById("playerHype")
let playerStatusDisplay = document.getElementById("playerStatus")
let cpuNameDisplay = document.getElementById("nameBoxCPU")
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



function restartGame(){
    resetButtons()
}

class Wrestler {
    constructor(){
        this.name = "Wrestler"
        this.maxhealth = 100
        this.health = 100
        this.stamina = 25
        // this.hypeLevel = 1
        // this.conditions = []
        this.isDazed= false
        this.isProne = false
        this.isPinned = false
        // this.canBeFinished = false
        // this.currentMove = ''
        this.hypeLevel = 1
    }

    // Does 10 base damage * power multiplier. Damage will be reduced against 'block' action
    // Chance to daze opponent
    strike(opponent, opponentMove){
        let dazeChance = .15
        let returnLog = `${this.name} goes for a quick hit against ${opponent.name}.\n`

        if(opponentMove === 'block'){
            returnLog += `${opponent.name} goes on the defensive, taking a glancing blow for ${(10 * this.hypeLevel)/2} damage\n`
            opponent.health = opponent.health - (10 * this.hypeLevel)/2
        }else{
            opponent.health = opponent.health - (10 * this.hypeLevel)
        }
        
        if((Math.random() <= dazeChance) && (opponent.isDazed == false)){
            returnLog += `${opponent.name} looks disoreiented from that decisive hit!\n`
            opponent.isDazed = true
        }

        return returnLog
    }

    // Does 20 base damage * power multiplier; can be countered with 'reversal', dealing damage to user
    // Chance to knock opponent prone if attack is succesful
    slam(opponent, opponentMove){
        let proneChance = .5
        let returnLog = `It looks like ${this.name} is going charging at ${opponent.name} with full force!!!\n`

        if(opponentMove === 'reversal'){
            returnLog += `My god!!! ${opponent.name} completely reverses the attack and throws ${this.name} to the ground for ${this.health - (20 * 1.5)} damage\n `
            this.health = this.health - (20 * 1.5)
        }else{
            returnLog += `${this.name} slams directly into ${opponent.name} dealing a WHOPPING ${(20 * this.hypeLevel)} damage!!\n`
            opponent.health = opponent.health - (20 * this.hypeLevel)

            if((Math.random() <= proneChance) && (opponent.isProne == false)){
                returnLog += `Looks like ${opponent.name} has been knocked completely to the ground, and they can't get up!!!\n`
                opponent.isProne = true
            }

            return returnLog
        }

        
    }

    pin(opponent){
        this.stamina -= 3
        let returnLog = `${this.name} is going in for the pin!!! Could this be it for ${opponent.name}?\n`
        let successChance = this.findSuccessChance(opponent)

        if((Math.random() <= successChance)){
            returnLog += `3...2...1...0! THAT'S IT!!! WE HAVE A WINNER!!!\n`
            opponent.isPinned = true
        }

        return returnLog
    }

    findSuccessChance(opponent){
        let returnResult

        if((opponent.health < opponent.maxhealth * .15) && (opponent.stamina <= 0)){
            returnResult = .95
            return returnResult
        }else if(opponent.health <= opponent.maxhealth* .15 ){
            returnResult = .85
        }else if((opponent.health > opponent.maxhealth * .15) && (opponent.health  <= opponent.maxhealth * .3)){
            returnResult = .7
        }else if((opponent.health > opponent.maxhealth * .3) && (opponent.health <= opponent.maxhealth * .55)){
            returnResult = .5
        }else if((opponent.health > opponent.maxhealth * .55) && (opponent.health <= opponent.maxhealth * .75)){
            returnResult = .3
        }else if((opponent.health > opponent.maxhealth * .75) && (opponent.health <= opponent.maxhealth * .85)){
            returnResult = .15
        }else if (opponent.health > opponent.maxhealth * .85){
            returnResult = .05
        }

        if(opponent.isProne == false){
            returnResult *= .5
        }

        return returnResult
    }
    

    workTheCrowd(){
            let returnResult = `What's this? ${this.name} is taking a moment to work the crowd up!!\n`
            let crowdWorkResult = Math.random()
            returnResult += this.isTheCrowdPleased(crowdWorkResult)

            return returnResult
        }

    isTheCrowdPleased(crowdResult){
        if(crowdResult < .15){
           this.stamina -= 5
           return `The crowd boos at the weak display of showmanship. ${this.name} feels winded by the blow to their self esteem, losing a bit of stamina.\n`
        }else if(crowdResult < .90 ){
            this.hypeLevel = 1.5
            return `The crowd goes wild!! ${this.name} looks amped up!!\n`
        }else if(crowdResult >= .9){
            this.health += 10
            this.hypeLevel = 2
            return `The crowd is out of control for ${this.name}!! ${this.name} looks reinvigorated and ready for a big move!!\n`
        }else{
            console.log("MAH GAWD, SOMETHINGS GONE WRONG")
        }
            
    }

    // Functionality to be added in the future!!
    // finisher(){}

    block(){
        this.stamina -= 1
        let returnLog = `${this.name} takes on a defensive stance.\n`
        return returnLog
    }

    reversal(){
        let returnLog = `${this.name} looks like they're preparing to turn the tables on their opponent..\n`
        return returnLog
    }

    recover(){
        let returnLog = `${this.name} takes a moment to recover.\n`
        this.stamina += 2

        if(this.isDazed == true){
            this.isDazed == false
            returnLog += `${this.name} has come to their senses and is no longer dazed.\n`
        }
        if(this.isProne == true){
            this.isProne == false
            returnLog += `${this.name} jumps back on their feet.\n`
        }

        return returnLog
    }

    executeOffensiveMove(offensiveMove, opponent, opponentMove){
        switch(offensiveMove) {
            case 'strike':
                combatLog.textContent += this.strike(opponent, opponentMove)
                break;
            case 'slam':
                combatLog.textContent += this.slam(opponent, opponentMove)
                break;
            case 'pin':
                combatLog.textContent += this.pin(opponent)
                break;
            default:
                //Maybe use default for when player is dazed and unable to act??
        }
    }

    executeDefensiveMove(defensiveMove, moveLog){
        switch(defensiveMove) {
            case 'block':
                combatLog.textContent += this.block()
                break;
            case 'reversal':
                combatLog.textContent += this.reversal()
                break;
            case 'recover':
                combatLog.textContent += this.recover()
                break;
            case 'workTheCrowd':
                combatLog.textContent += this.workTheCrowd()
                break;
            default:
                //Maybe use default for when player is dazed and unable to act??
        }
    }

}

class PlayerWrestler extends Wrestler {
    constructor(){
        super()
        this.name = "Wireframe"
    }
}

class OpponentWrestler extends Wrestler{
    constructor(){
        super()
        this.name = 'The Heel'
    }
}

// class Game{
//     constructor(){
//         this.player = new PlayerWrestler()
//         this.currentOpponent = ''
//         this.opponents = []
//     }

//     generateOpponents(){
//         let opponent = new OpponentWrestler()
//         this.opponents.push(opponent)
//     }

//     startGame(){
//         //TODO
//     }

//     startFight(){
//         //TODO
//     }

//     startRound(){
//         //TODO
//     }
//     // Create a method that will select the cpu move and player move one after the other

// }


function startGame(){
    startButton.disabled = true
    strikeButton.disabled = false
    pinButton.disabled = false
    slamButton.disabled = false

    player = new PlayerWrestler()
    cpuOpponent= new OpponentWrestler()

    playerNameDisplay.textContent = player.name
    cpuNameDisplay.textContent = cpuOpponent.name
}

function attack(id){
    let turnLog = ``
    clearCombatLog()
    incrementRound()
    cpuMove = selectCpuDefense()
    cpuOpponent.executeDefensiveMove(cpuMove)
    player.executeOffensiveMove(id, cpuOpponent, cpuMove)
    updateWrestlersStats()
}

function clearCombatLog(){
    combatLog.textContent = ''
}

function incrementRound(){
    numOfRounds += 1
}

function selectCpuDefense(){
    if(cpuOpponent.isDazed && cpuOpponent.isProne){
        return 'recover'
    }else if(Math.random() <= .18){
        return 'workTheCrowd'
    }else if(numOfRounds % 3 == 0){
        return 'reversal'
    }else{
        return 'block'
    }
}

function updateWrestlersStats(){
    playerHealthDisplay.textContent = `Health: ${player.health}`
    playerStaminaDisplay.textContent = `Stamina: ${player.stamina}`
    playerHypeDisplay.textContent = `Hype Level: ${player.hypeLevel}`
    playerStatusDisplay.textContent = statusCheck(player)

    cpuHealthDisplay.textContent = `Health: ${cpuOpponent.health}`
    cpuStaminaDisplay.textContent = `Stamina: ${cpuOpponent.stamina}`
    cpuHypeDisplay.textContent = `Hype Level: ${cpuOpponent.hypeLevel}`
    cpuStatusDisplay.textContent = statusCheck(cpuOpponent)
}

function statusCheck(wrestler){
    let statusReturn = `Status: `
    if(wrestler.isDazed == false && wrestler.isPinned == false && wrestler.isProne == false){
        statusReturn += 'None'
    }

    if(wrestler.isDazed){
        statusReturn += 'Dazed '
    }
    if(wrestler.isProne){
        statusReturn += 'Prone '
    }
    if(wrestler.isPinned){
        statusReturn += `Pinned`
    }

    return statusReturn
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
