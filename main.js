
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
        this.setCurrentMove('strike')
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
       
        this.setCurrentMove('slam')
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
    }

    defend(){
        // TODO
    }

    reversal(){
        // TODO
    }

    finisher(){
        // TODO
    }

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
}

