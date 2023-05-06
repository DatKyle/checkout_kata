import localforage from "localforage";
import { get as getProduct } from "./products.service";

async function getItemDetails(item) {
    const product = await getProduct(item.sku);
    return {
        sku: product.sku,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.unitPrice,
        totalPrice: calculatePrice(product, item.quantity),
        totalBasicPrice: calculateStandardPrice(product.unitPrice, item.quantity),
        specialPrice: product.specialPrice ? {
            quantity: product.specialPrice.unitPrice,
            unitPrice: product.specialPrice.unitPrice
        } : null
    }
}

function calculatePrice(product, quantity){
    let totalPrice = 0;
    
    if(product.specialPrice){
        totalPrice = Math.floor(quantity / product.specialPrice.quantity) * product.specialPrice.unitPrice
        totalPrice += (quantity % product.specialPrice.quantity) * product.unitPrice
        return totalPrice;
    }

    return quantity * product.unitPrice;
}

function calculateStandardPrice(unitPrice, quantity){
    return quantity * unitPrice;
}

function setLocalForge(items) {
    return localforage.setItem("basket", items);
}

async function getLocalForge() {
    const items = await localforage.getItem("basket")
    return items ? items : [];
}

export async function getBasket() {
    let items = await getLocalForge();

    return Promise.all(items.map(async item => await getItemDetails(item)));
}

export async function addItem(item) {
    const items = await getLocalForge()
    
    items.push(item);
    setLocalForge(items);
    return item;
}

export async function updateItem(updatedItem) {
    const items = await getLocalForge()
    
    const foundItem = items.find(storedItem => storedItem.sku === updatedItem.sku)
    Object.assign(foundItem, updatedItem);

    setLocalForge(items);
    return foundItem;
}

export async function removeItem(sku) {
    const items = await getLocalForge()
    setLocalForge(items.filter(item => item.sku !== sku));
    return true;
}

export function resetItems(){
    localforage.removeItem("basket")
    return true;
}

export async function getDetails(items) {
    return Promise.all(items.map(async item => await getItemDetails(item)));
}