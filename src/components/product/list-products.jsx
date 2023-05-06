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
        <div className='productList'>
            <div className="header">
                <h2>{editProducts ? "Edit" : ""} Products</h2>
                {   /* edit product button */
                    !basketIsEmpty ? <button className='toggleEdit' onClick={() => setEditProducts(!editProducts)}>
                        {editProducts ? "Checkout" : "Edit Products"}
                    </button >
                        : null
                }
            </div>
            {   /* display all the products */
                !editProducts ? <ViewProducts products={products} /> : <EditProducts products={products} />
            }
        </div>
    );
}

function ViewProducts({ products }) {
    return (
        <div className='view products'>
            {products && products.length > 0 ?
                products.map((product) => <Product key={product.sku} product={product} />)
                : null
            }
        </div>
    )
}

function EditProducts({ products }) {
    return <div className='edit products'>
        <div className='row header'>
            <p>sku</p>
            <p>name</p>
            <p>unit price</p>
            <p>special quantity</p>
            <p>special unit price</p>
            <p>min quantity</p>
            <p>max quantity</p>
            <p>actions</p>
        </div>
        <div className="products">
            {
                products && products.length > 0 ?
                    products.map((product) => <EditProduct key={product.sku} product={product} />)
                    : null
            }
        </div>
        <div className='add'>
            <EditProduct product={null} />
        </div>
    </div>
}