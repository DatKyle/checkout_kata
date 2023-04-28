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
        setBasket(produce((draft = []) => {
            draft.push(item);
        }));
    };

    return (
        <BasketContext.Provider value={{ basket, addItem }}>
            {children}
        </BasketContext.Provider>
    );
}
