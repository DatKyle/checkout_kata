import { useEffect, useState } from 'react';
import { getAll } from '../../services/products.service';

export function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const allProducts = getAll();

        setProducts(allProducts);
    }, []);

    return (
        <>
            {products && products.length > 0 ? products.map(Product) : null}
        </>
    );
}

function Product(product, index) {
    return (
        <div key={index} >
            <p>{product.name} @ {product.unitPrice} 
                {product.specialPrice ? ` or ${product.specialPrice.quantity} @ ${product.specialPrice.unitPrice}` : null}
            </p>
        </div>
    );
}
