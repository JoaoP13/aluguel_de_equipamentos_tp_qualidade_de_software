class CompanyUserStock {
    constructor(users) {
        this.users = users;
    }

    addCompanyUser(user) {
        this.users.push(user);
    }

    getCompanyUsers() {
        return this.users;
    }
};

module.exports = {
    CompanyUserStock
};
