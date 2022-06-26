const { CompanyUserStock } = require('./database/companyUser.stock');
const { ConsumerUserStock } = require('./database/consumerUser.stock');
const { ProductStock } = require('./database/product.stock');
const { ConsumerUser } = require('./models/ConsumerUser');
const { CompanyUser } = require('./models/CompanyUser');
const { Notebook } = require('./models/Notebook');
const { SmartPhone } = require('./models/SmartPhone');
const { Camera } = require('./models/Camera');
const { menuOptions } = require('./common/menuOptions');

const prompt = require('prompt-sync')();

function inicializeStock() {
    const defaultCompanyUser = new CompanyUser('default', 'defaultCompanyUser', '123456', '12345678');
    const defaultConsumerUser = new ConsumerUser('default', 'defaultConsumerUser', '123456', 1000, '12345678');
    const defaultNotebook = new Notebook('Notebook usado, comprado no ano de 2014', 600, 'HP', '520Gb', '6Gb', 'dual core i3');
    const defaultSmartPhone = new SmartPhone('Galaxy com a tela trincada', 200, 'Samsung', '20Gb', '1Gb', 'pentium');
    const defaultCamera = new Camera('Câmera semiprofissional, usada', 1500, 'Canon', '150Mp');

    const companyStock = new CompanyUserStock([]);
    const consumerStock = new ConsumerUserStock([]);
    const productStock = new ProductStock([]);

    companyStock.addCompanyUser(defaultCompanyUser);
    consumerStock.addConsumerUser(defaultConsumerUser);
    productStock.addProduct(defaultNotebook);
    productStock.addProduct(defaultSmartPhone);
    productStock.addProduct(defaultCamera);

    return {
        companyStock,
        consumerStock,
        productStock
    }
}

function auth(consumerUsers, companyUsers) {
    const authProps = {};

    console.log('Olá! Digite o registro e a senha para entrar o sistema:\n');
    authProps.register = prompt('Registro: ');
    authProps.password = prompt('Senha: ');

    for (companyUser of companyUsers) {
        if (authProps.register === companyUser.register && authProps.password === companyUser.password) {
            return companyUser;
        }
    }

    for (consumerUser of consumerUsers) {
        if (authProps.register === consumerUser.register && authProps.password === consumerUser.password) {
            return consumerUser;
        }
    }

    throw new Error('Nenhum usuário encontrado! Encerrando o sistema.');
}

function normalizeMenu(user) {
    if (user.canRegisterProduct) {
        return {
            ...menuOptions,
            '*': 'Registrar produto',
        }
    }

    return {
        ...menuOptions,
        '3': 'Consultar saldo',
        '4': 'Pesquisar produto por descrição',
        '5': 'Pesquisar produto por marca',
        '6': 'Pesquisar produto por preço',
        '7': 'Alugar produto'
    }
}

function showObjectKeyAndValues(menu) {
    Object.entries(menu).forEach(([key, value]) => console.log(`${key}: ${value}`));
}

function listProdutos(products) {
    products.forEach((product, index) => console.log(`${index}: Descrição - ${product.description}; Preço - ${product.price}`));
}

function app() {
    const stock = inicializeStock();
    let user;
    let menu;
    let menuSelection;
    let searchValue;
    let indexProductSelected;
    let searchResult;
    
    try {
        user = auth(stock.companyStock.getCompanyUsers(), stock.consumerStock.getConsumerUsers());
    } catch (error) {
        console.log(error.message);
        return;
    }

    menu = normalizeMenu(user);
    showObjectKeyAndValues(menu);

    menuSelection = prompt('Escolha a opção desejada: ');

    while (!menu[menuSelection]) {
        console.log('Opss, opção escolhida inválida. Escolha novamente!');
        showObjectKeyAndValues(menu);
        menuSelection = prompt('Escolha a opção desejada: ');
    }

    switch (menuSelection) {
        case '1':
            listProdutos(stock.productStock.getAllProducts());
            break;
        case '2':
            break;
        case '3':
            console.log(user.getMoney());
            break;
        case '4':
            searchValue = prompt('Digite a descrição: ');
            searchResult = stock.productStock.getAllProductsByDescription(searchValue);

            if (!searchResult.length) {
                console.log('Ops, nenhum produto encontrado com essa descrição!');
            } else {
                searchResult.forEach((product) => showObjectKeyAndValues(product));
            }

            break;
        case '5':
            searchValue = prompt('Digite a marca: ');
            searchResult = stock.productStock.getAllProductsByBrand(searchValue);

            if (!searchResult.length) {
                console.log('Ops, nenhum produto encontrado com essa descrição!');
            } else {
                searchResult.forEach((product) => showObjectKeyAndValues(product));
            }

            break;
        case '6':
            searchValue = prompt('Digite o preço: ');
            searchResult = stock.productStock.getAllProductsByPrice(searchValue);

            if (!searchResult.length) {
                console.log('Ops, nenhum produto encontrado com essa descrição!');
            } else {
                searchResult.forEach((product) => showObjectKeyAndValues(product));
            }

            break;
        case '7':
            listProdutos(stock.productStock.getAllProducts());
            indexProductSelected = prompt('Escolha o produto que deseja alugar: ');
            let product = stock.productStock.getAllProducts()[indexProductSelected];

            while (!product) {
                console.log('Produto não encontrado! Tente novamente...');
                indexProductSelected = prompt('Escolha o produto que deseja alugar: ');
                product = stock.productStock.getAllProducts()[indexProductSelected];
            }

            if (user.money < product.price) {
                console.log('Você não tem saldo suficiente para alugar este produto!');
                return;
            }

            console.log('Você alugou o produto: ');
            showObjectKeyAndValues(product);

            stock.productStock.removeProductStock(product);
            user.decreaseMoney(product.price);

            console.log(`Seu novo saldo é: ${user.money}`);
        default:
            break;
    }

    return;
}

app();