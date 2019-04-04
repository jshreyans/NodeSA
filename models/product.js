const path = require('path');
const fs = require('fs');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const productPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(productPath, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(productPath, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        const productPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        fs.readFile(productPath, (err, fileContent) => {
            if (err) 
                cb([]);
            cb(JSON.parse(fileContent));
        });
    }
};