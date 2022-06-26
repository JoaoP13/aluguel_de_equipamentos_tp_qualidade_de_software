class ProductStock {
    constructor(products) {
        this.products = products;
    }

    addProduct(product) {
        this.products.push(product);
    }

    getAllProducts() {
        return this.products;
    }

    getAllProductsByDescription(description) {
        return this.products.reduce((accum, curr) => {
            if (description.toUpperCase() === curr.description.toUpperCase())
                accum.push(curr);
            
            return accum;
        }, []);
    }

    getAllProductsByPrice(price) {
        return this.products.reduce((accum, curr) => {
            if (+price === curr.price)
                accum.push(curr);
            
            return accum;
        }, []);
    }

    getAllProductsByBrand(brand) {
        return this.products.reduce((accum, curr) => {
            if (brand.toUpperCase() === curr.brand.toUpperCase())
                accum.push(curr);
            
            return accum;
        }, []);
    }

    removeProductStock(product) {
        let productIndex = this.products.indexOf(product);

        if (productIndex !== -1) {
            this.products.slice(productIndex, 1);
        }
    }
};

module.exports = {
    ProductStock
};
