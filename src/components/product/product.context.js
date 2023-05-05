import { createContext, useContext, useEffect, useState } from "react";

import { getAll, add, update, remove} from "../../services/products.service";
import { produce } from "immer";

const ProductContext = createContext({
    products: [],
    addProduct: (product) => { },
    updateProduct: (product) => { },
    removeProduct: (sku) => { }
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
        add(product);
        setProducts(produce(draft => {
            draft.push(product);
        }))
    };

    function updateProduct(updatedProduct) {
        update(updatedProduct);
        setProducts(produce(draft => {
            let foundProduct = draft.find(product => product.sku === updatedProduct.sku);
            foundProduct = updatedProduct;
        }))
    };

    function removeProduct(productSku) {
        remove(productSku);
        setProducts(products.filter(product => product.sku !== productSku))
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    );
}