const { Product } = require('./Product');

class Camera extends Product {
    constructor(description, price, brand, megapixels) {
        super(description, price, brand);
        this.megapixels = megapixels;
    }
}

module.exports = {
    Camera
}