const { User } = require('./User');

class CompanyUser extends User {
    constructor(register, password, cnpj, cellPhone) {
        super(register, password, cellPhone)
        this.cnpj = cnpj;
        this.canRegisterProduct = true;
    }
};

module.exports = {
    CompanyUser
};

