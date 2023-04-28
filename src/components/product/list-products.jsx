import { useEffect, useState } from 'react';

import { getAll } from '../../services/products.service';


import { Product } from './produst';

export function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const allProducts = getAll();

        setProducts(allProducts);
    }, []);

    return (
        <>
            {products && products.length > 0 ?
                products.map((product) => <Product key={product.id} product={product} />)
                : null}
        </>
    );
}