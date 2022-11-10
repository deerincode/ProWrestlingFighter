
class Wrestler {
    constructor(){
        this.name = "Wrestler"
        this.health = 100
        this.stamina = 100
        this.powerMultiplier = 1
        // this.conditions = []
        this.isDazed= false
        this.isProne = false
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

    pin(){
        // TODO
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
        this.hypeLevel = 1
        this.stamina = 25 * this.hypeLevel

    }
}

class OpponentWrestler extends Wrestler{
    constructor(){
        super()
    }
}

class Game{
    constructor(){
        this.player = new PlayerWrestler()
        this.currentOpponent = ''
        this.opponents = []
    }
    // Create a method that will select the cpu move and player move one after the other

}

// let wrassler = new Wrestler()
