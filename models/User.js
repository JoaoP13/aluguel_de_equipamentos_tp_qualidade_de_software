class User {
    constructor(register, password, cellPhone) {
        this.register = register;
        this.password = password;
        this.cellPhone = cellPhone;
    }

    validateRegister(register) {
        return this.hasOnlyLetters(register);
    }

    validateCellPhone(cellPhone) {
        return this.hasOnlyNumbers(cellPhone);
    }

    sanitize(string) {
        return string.replace(/ /g, '');
    }

    hasOnlyNumbers(value) {
        this.sanitize(value);
        return /^\d+$/.test(value);
    }

    hasOnlyLetters(value) {
        this.sanitize(value);
        return /^[a-zA-Z]+$/.test(value);
    }
};

module.exports = {
    User
};