import { useEffect, useState } from 'react';

import { getAll } from '../../services/products.service';

import { useBasket } from '../basket/basket.context';

import { Product } from './produst';

export function ProductList() {
    const { basket } = useBasket()
    const [products, setProducts] = useState([]);
    const [editProducts, setEditProducts] = useState(false);

    useEffect(() => {
        const allProducts = getAll();

        setProducts(allProducts);
    }, []);

    const basketIsEmpty = basket.length;

    function toggelEditProducts() {
        setEditProducts(!editProducts);
    }

    return (
        <>
            {   /* edit product button */
                !basketIsEmpty ? <button onClick={() => setEditProducts(!editProducts)}>
                    {editProducts ? "Checkout" : "Edit Products"}
                </button >
                    : null
            }

            {   /* display all the products */
                !editProducts && products && products.length > 0 ?
                    products.map((product) => <Product key={product.id} product={product} />)
                    : null
            }
        </>
    );
}