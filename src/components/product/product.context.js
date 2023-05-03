import { createContext, useContext, useEffect, useState } from "react";

import { getAll, add } from "../../services/products.service";
import { produce } from "immer";

const ProductContext = createContext({
    products: [],
    addProduct: (product) => { }
});

export function useProduct() {
    return useContext(ProductContext);
}

export function ProductContextProvider({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAll().then(storedProducts => setProducts(storedProducts))
    }, []);

    function addProduct(product) {
        product.id = products.length + 1;
        add(product);
        setProducts(produce(draft => {
            draft.push(product);
        }))
    };

    return (
        <ProductContext.Provider value={{ products, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
}