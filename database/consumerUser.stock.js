class ConsumerUserStock {
    constructor(users) {
        this.users = users;
    }

    addConsumerUser(user) {
        this.users.push(user);
    }

    getConsumerUsers() {
        return this.users;
    }
};

module.exports = {
    ConsumerUserStock
};
