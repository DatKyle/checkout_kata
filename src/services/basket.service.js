import localforage from "localforage";
import { get as getProduct } from "./products.service";

function getItemDetails(item) {
    const product = getProduct(item.id);
    return {
        id: product.id,
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

    return items.map(getItemDetails);
}

export async function addItem(item) {
    const items = await getLocalForge()
    
    items.push(item);
    setLocalForge(items);
    return item;
}

export async function updateItem(updatedItem) {
    const items = await getLocalForge()
    
    const foundItem = items.find(storedItem => storedItem.id === updatedItem.id)
    Object.assign(foundItem, updatedItem);

    setLocalForge(items);
    return foundItem;
}

export async function removeItem(id) {
    const items = await getLocalForge()
    setLocalForge(items.filter(item => item.id !== id));
    return true;
}

export function resetItems(){
    localforage.removeItem("basket")
    return true;
}

export async function getDetails(items) {
    return items.map(getItemDetails);
}