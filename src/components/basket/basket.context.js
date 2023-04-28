import { createContext, useContext, useState } from "react";
import { produce } from "immer";

const BasketContext = createContext({
    basket: [],
    addItem: (item) => { }
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

    return (
        <BasketContext.Provider value={{ basket, addItem }}>
            {children}
        </BasketContext.Provider>
    );
}
