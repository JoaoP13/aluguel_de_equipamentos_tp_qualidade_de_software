const { User } = require('./User');

class ConsumerUser extends User {
    constructor(register, password, cpf, money, cellPhone) {
        super(register, password, cellPhone)
        this.cpf = cpf;
        this.money = money;
        this.canRegisterProduct = false;
    }

    getMoney() {
        return this.money;
    }

    decreaseMoney(valueToDecrease) {
        this.money -= valueToDecrease;
    }
};

module.exports = {
    ConsumerUser
};

