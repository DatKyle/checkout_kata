import localforage from "localforage";

const defaultProducts = [
    {
        sku: "a",
        name: "apples",
        unitPrice: 50,
        specialPrice: {
            quantity: 3,
            unitPrice: 130
        },
        orderSize: {
            min: 1,
            max: 99
        }
    },
    {
        sku: "b",
        name: "bananas",
        unitPrice: 30,
        specialPrice: {
            quantity: 2,
            unitPrice: 45
        },
        orderSize: {
            min: 1,
            max: 99
        }
    },
    {
        sku: "c",
        name: "carrots",
        unitPrice: 20
    },
    {
        sku: "d",
        name: "dates",
        unitPrice: 15
    }
]

function setLocalForge(items) {
    return localforage.setItem("products", items);
}

async function getLocalForge() {
    const products = await localforage.getItem("products")
    return products ? products : defaultProducts;
}

export async function add(product) {
    const products = await getLocalForge();
    products.push(product);
    setLocalForge(products);
    return product;
}

export async function update(updatedProduct) {
    const products = await getLocalForge();
    const foundProduct = products.find(product => product.sku === updatedProduct.sku);
    Object.assign(foundProduct, updatedProduct);
    setLocalForge(products);
    return foundProduct;
}

export async function remove(sku) {
    const products = await getLocalForge();
    setLocalForge(products.filter(product => product.sku !== sku));
    return true;
}

export async function getAll() {
    return await getLocalForge();
}

export async function get(sku) {
    const products = await getLocalForge();
    return products.find(item => item.sku === sku);
}