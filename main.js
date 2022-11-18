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

function resetCharacters(){
    player.health = 100
    player.stamina = 25
    player.hypeLevel = 1
    player.isDazed = false
    player.isProne = false
    player.isPinned = false

    cpuOpponent.health = 100
    cpuOpponent.stamina = 25
    cpuOpponent.hypeLevel = 1
    cpuOpponent.isDazed = false
    cpuOpponent.isProne = false
    cpuOpponent.isPinned = false
}


function restartGame(){
    resetButtons()
    resetCharacters()
    updateWrestlersStats()
    combatLog.textContent = ''
    numOfRounds = 0
    playerMove = ''
    cpuMove = ''
}

class Wrestler {
    constructor(){
        this.name = "Wrestler"
        this.maxhealth = 100
        this.health = 100
        this.stamina = 25
        this.isDazed= false
        this.isProne = false
        this.isPinned = false
        this.hypeLevel = 1
    }

    // Does 10 base damage * power multiplier. Damage will be reduced against 'block' action
    // Chance to daze opponent
    strike(opponent, opponentMove){
        let dazeChance = .15
        let returnLog = `${this.name} goes for a quick hit against ${opponent.name}.\n`

        if(opponentMove === 'block'){
            returnLog += `${opponent.name} goes on the defensive, taking a glancing blow for ${Math.floor((10 * this.hypeLevel)/2)} damage\n`
            opponent.health = opponent.health - Math.floor((10 * this.hypeLevel)/2)
        }else{
            returnLog += `${opponent.name} gets smacked around for ${Math.floor((10 * this.hypeLevel))} damage\n`
            opponent.health = opponent.health - (Math.floor((10 * this.hypeLevel)))
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
        let returnLog = `It looks like ${this.name} is charging at ${opponent.name} with full force!!!\n`

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

            
        }

        return returnLog
        
    }

    pin(opponent){
        this.stamina -= 3
        let returnLog = `${this.name} is going in for the pin!!! Could this be it for ${opponent.name}?\n`
        let successChance = this.findSuccessChance(opponent)

        if((Math.random() <= successChance)){
            returnLog += `1...2...3! THAT'S IT!!! WE HAVE A WINNER!!!\n`
            opponent.isPinned = true
        }else{
            returnLog += `1...2...OH!! ${opponent.name} manages to break out of the pin!!!\n`
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

        if(this.isDazed){
            this.isDazed = false
            returnLog += `${this.name} has come to their senses and is no longer dazed.\n`
        }
        if(this.isProne == true){
            this.isProne = false
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
            case 'crowdwork':
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
        this.name = "The Babyface"
    }
}

class OpponentWrestler extends Wrestler{
    constructor(){
        super()
        this.name = 'The Heel'
    }
}


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

function disableAttackButtons(booleanValue){
    if(booleanValue){
        strikeButton.disabled = true
        pinButton.disabled = true
        slamButton.disabled = true
    }else{
        strikeButton.disabled = false
        pinButton.disabled = false
        slamButton.disabled = false
    }
}

function disableDefenseButtons(booleanValue){
    if(booleanValue){
        blockButton.disabled = true
        reversalButton.disabled = true
        crowdworkButton.disabled = true
        recoverButton.disabled = true
    }else{
        blockButton.disabled = false
        reversalButton.disabled = false
        crowdworkButton.disabled = false
        recoverButton.disabled = false
    }
}

function attack(id){
    let turnLog = ``
    clearCombatLog()
    incrementRound()
    cpuMove = selectCpuDefense()
    cpuOpponent.executeDefensiveMove(cpuMove)
    player.executeOffensiveMove(id, cpuOpponent, cpuMove)
    resetHypeLevel(player)
    updateWrestlersStats()
    if(checkIfPlayerWins()){
        combatLog.textContent += `Congratulations!! You lead ${player.name} to victory! Click the restart button to start a new game.`
        resetButtons()
    }else if(checkIfCpuWins()){
        combatLog.textContent += `You've been defeated by ${cpuOpponent.name}...but don't give up! Click the restart button to try again.`
        resetButtons()
    }else{
        disableAttackButtons(true)
        disableDefenseButtons(false)
    }
    
}

function defend(id){
    let turnLog = ''
    clearCombatLog()
    incrementRound()
    playerMove = id
    player.executeDefensiveMove(playerMove)
    cpuMove = selectCpuOffense()
    cpuOpponent.executeOffensiveMove(cpuMove, player, playerMove)
    resetHypeLevel(cpuOpponent)
    updateWrestlersStats()
    if(checkIfCpuWins()){
        combatLog.textContent += `You've been defeated by ${cpuOpponent.name}...but don't give up! Click the restart button to try again.`
        resetButtons()
    }else if(checkIfPlayerWins()){
        combatLog.textContent += `Congratulations!! You lead ${player.name} to victory! Click the restart button to start a new game.`
        resetButtons()
    }
    disableDefenseButtons(true)
    disableAttackButtons(false)
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
        return 'crowdwork'
    }else if(numOfRounds % 4 == 0){
        return 'reversal'
    }else if(cpuOpponent.stamina >= 1){
        return 'block'
    }else{
        return 'recover'
    }
}

function selectCpuOffense(){
    if((cpuOpponent.health < cpuOpponent.maxhealth * .2) && (player.health < player.maxhealth * .15) && (cpuOpponent.stamina >= 3)){
        return 'pin'
    }else if(player.isProne && (player.health <= player.maxhealth * .75) && (cpuOpponent.stamina >= 3)){
        return 'pin'
    }else if(numOfRounds % 4 == 0){
        return 'slam'
    }else if(Math.random() <= .35){
        return 'slam'
    }else{
        return 'strike'
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

function checkIfPlayerWins(){
    if((cpuOpponent.health <= 0) || cpuOpponent.isPinned){
        return true
    }else{
        return false
    }
}

function checkIfCpuWins(){
    if((player.health <= 0) || player.isPinned){
        return true
    }else{
        return false
    }
}

function checkIfWinner(){
    if((cpuOpponent.health <= 0) || cpuOpponent.isPinned){
        return `Congratulations!! You lead ${player.name} to victory! Click the restart button to start a new game.`
    }else if((player.health <= 0) || player.isPinned){
        return `You've been defeated by ${cpuOpponent.name}...but don't give up! Click the restart button to try again.`
    }
}

function statusCheck(wrestler){
    let statusReturn = `Status: `
    if((wrestler.isDazed == false) && (wrestler.isPinned == false) && (wrestler.isProne == false)){
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

function resetHypeLevel(attacker){
    attacker.hypeLevel = 1
}

window.onload = resetButtons()
