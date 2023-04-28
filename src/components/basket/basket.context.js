import { createContext, useContext } from "react";
import produce from "immer";

const BasketContext = createContext({
    basket: [],
    addItem: (item) => { }
});

export function useBasket() {
    return useContext(BasketContext);
}

export function BasketContext({ children }) {
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
