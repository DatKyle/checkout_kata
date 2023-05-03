import { createContext, useContext, useEffect, useState } from "react";

import { getAll, add, update, remove} from "../../services/products.service";
import { produce } from "immer";

const ProductContext = createContext({
    products: [],
    addProduct: (product) => { },
    updateProduct: (product) => { },
    removeProduct: (id) => { }
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

    function updateProduct(updatedProduct) {
        update(updatedProduct);
        setProducts(produce(draft => {
            let foundProduct = draft.find(product => product.id === updatedProduct.id);
            foundProduct = updatedProduct;
        }))
    };

    function removeProduct(productId) {
        remove(productId);
        setProducts(products.filter(product => product.id !== productId))
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    );
}