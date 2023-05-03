import localforage from "localforage";

const defaultProducts = [
    {
        id: 1,
        name: "a",
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
        id: 2,
        name: "b",
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
        id: 3,
        name: "c",
        unitPrice: 20
    },
    {
        id: 4,
        name: "d",
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
    const foundProduct = products.find(product => product.id === updatedProduct.id);
    Object.assign(foundProduct, updatedProduct);
    setLocalForge(products);
    return foundProduct;
}

export async function getAll() {
    return await getLocalForge();
}

export async function get(id) {
    const products = await getLocalForge();
    return products.find(item => item.id === id);
}