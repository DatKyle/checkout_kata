import { createContext, useContext, useEffect, useState } from "react";
import { produce } from "immer";

import {
    getBasket,
    addItem as addBasketItem,
    updateItem as updateBasketItem,
    removeItem as removeBasketItem,
    resetItems as resetBasketItems
} from "../../services/basket.service";
import { CheckoutModal } from "./checkout-modal";

const BasketContext = createContext({
    basket: [],
    addItem: (item) => { },
    updateItem: (item) => { },
    removeItem: (sku) => { },
    resetItems: () => { },
    checkoutBasket: () => {},
    editBasket: () => {}
});

export function useBasket() {
    return useContext(BasketContext);
}

export function BasketContextProvider({ children }) {
    const [basket, setBasket] = useState([]);
    const [checkout, setcheckout] = useState(false);

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
        setcheckout(false);
    }

    function checkoutBasket() {
        setcheckout(true);
    }
    
    function editBasket() {
        setcheckout(false);
    }

    return (
        <BasketContext.Provider value={{ basket, addItem, updateItem, removeItem, resetItems, checkoutBasket, editBasket }}>
            {checkout ? <CheckoutModal /> : null}
            {children}
        </BasketContext.Provider>
    );
}
