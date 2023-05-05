import { createContext, useContext, useEffect, useState } from "react";
import { produce } from "immer";

import {
    getBasket,
    addItem as addBasketItem,
    updateItem as updateBasketItem,
    removeItem as removeBasketItem,
    resetItems as resetBasketItems
} from "../../services/basket.service";

const BasketContext = createContext({
    basket: [],
    addItem: (item) => { },
    updateItem: (item) => { },
    removeItem: (sku) => { },
    resetItems: () => { }
});

export function useBasket() {
    return useContext(BasketContext);
}

export function BasketContextProvider({ children }) {
    const [basket, setBasket] = useState([]);

    useEffect(() => {
        getBasket().then(storedBasket => setBasket(storedBasket))
    }, []);

    function addItem(item) {
        let foundItem = basket.find((product) => product.sku === item.sku);
        if (!foundItem) {
            addBasketItem(item)
            setBasket(produce((draft) => {
                draft.push({ sku: item.sku, quantity: item.quantity });
            }));
        }
    };

    function updateItem(item) {
        updateBasketItem(item);
        setBasket(produce((draft) => {
            let foundItem = draft.find((product) => product.sku === item.sku);
            foundItem.quantity = item.quantity
        }));
    };

    function removeItem(sku) {
        removeBasketItem(sku);
        setBasket(basket.filter(item => item.sku !== sku));
    };

    function resetItems() {
        resetBasketItems()
        setBasket([]);
    }

    return (
        <BasketContext.Provider value={{ basket, addItem, updateItem, removeItem, resetItems }}>
            {children}
        </BasketContext.Provider>
    );
}
