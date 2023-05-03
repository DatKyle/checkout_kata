import { createContext, useContext, useEffect, useState } from "react";

import {
    getAll
} from "../../services/products.service";

const ProductContext = createContext({
    products: [],
    addProduct: (item) => { }
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

    };

    return (
        <ProductContext.Provider value={{ products, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
}