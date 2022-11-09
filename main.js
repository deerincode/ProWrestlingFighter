
class Wrestler {
    constructor(){
        this.name = "Wrestler"
        this.health = 100
        this.stamina = 100
        this.conditions = []
    }

    strike(){
        // TODO
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
}

class PlayerWrestler extends Wrestler {
    constructor(){
        super()
        this.hypeLevel = 1
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