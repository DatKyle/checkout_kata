import { createContext, useContext, useEffect, useState } from "react";
import { produce } from "immer";

import {
    getBasket,
    addItem as addBasketItem,
    updateItem as updateBasketItem,
    removeItem as removeBasketItem
} from "../../services/basket.service";

const BasketContext = createContext({
    basket: [],
    addItem: (item) => { },
    updateItem: (item) => { },
    removeItem: (id) => { }
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
        let foundItem = basket.find((product) => product.id === item.id);
        if (!foundItem) {
            addBasketItem(item)
            setBasket(produce((draft) => {
                draft.push({ id: item.id, quantity: item.quantity });
            }));
        }
    };

    function updateItem(item) {
        updateBasketItem(item);
        setBasket(produce((draft) => {
            let foundItem = draft.find((product) => product.id === item.id);
            foundItem.quantity = item.quantity
        }));
    };

    function removeItem(id) {
        removeBasketItem(id);
        setBasket(basket.filter(item => item.id !== id));
    };

    return (
        <BasketContext.Provider value={{ basket, addItem, updateItem, removeItem }}>
            {children}
        </BasketContext.Provider>
    );
}
