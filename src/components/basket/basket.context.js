import { createContext, useContext, useState } from "react";
import { produce } from "immer";

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

    function addItem(item) {
        let foundItem = basket.find((product) => product.id === item.id);
        if (!foundItem)
            setBasket(produce((draft) => {
                draft.push({ id: item.id, quantity: item.quantity });
            }));
    };

    function updateItem(item) {
        setBasket(produce((draft) => {
            let foundItem = draft.find((product) => product.id === item.id);
            foundItem.quantity = item.quantity
        }));
    };

    function removeItem(id) {
        setBasket(basket.filter(item => item.id !== id));
    };

    return (
        <BasketContext.Provider value={{ basket, addItem, updateItem, removeItem}}>
            {children}
        </BasketContext.Provider>
    );
}
