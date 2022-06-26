const { Product } = require('./Product');

class SmartPhone extends Product {
    constructor(description, price, brand, hd, ram, cpu) {
        super(description, price, brand);
        this.hd = hd;
        this.ram = ram;
        this.cpu = cpu;
    }
}

module.exports = {
    SmartPhone
}