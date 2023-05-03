import { useState } from 'react';

import { useBasket } from '../basket/basket.context';
import { useProduct } from './product.context';

import { Product } from './produst';
import { EditProduct } from './edit/edit-product';

export function ProductList() {
    const { basket } = useBasket();
    const { products } = useProduct();
    const [editProducts, setEditProducts] = useState(false);

    const basketIsEmpty = basket.length > 0;

    return (
        <>
            {   /* edit product button */
                !basketIsEmpty ? <button onClick={() => setEditProducts(!editProducts)}>
                    {editProducts ? "Checkout" : "Edit Products"}
                </button >
                    : null
            }

            {   /* display all the products */
                !editProducts ? <ViewProducts products={products} /> : <EditProducts products={products} />
            }
        </>
    );
}

function ViewProducts({ products }) {
    return products && products.length > 0 ?
        products.map((product) => <Product key={product.id} product={product} />)
        : null
}

function EditProducts({ products }) {
    return <div className='edit products'>
        {
            products && products.length > 0 ?
                products.map((product) => <EditProduct key={product.id} product={product} />)
                : null
        }
        <EditProduct product={null} />
    </div>
}