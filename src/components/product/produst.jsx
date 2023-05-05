import { useEffect, useState } from "react";
import { useBasket } from '../basket/basket.context';

function getQuantityLimits(product) {

    let minQuantity = 1;
    let maxQuantity = 999;

    if (product.orderSize) {
        minQuantity = product.orderSize.min ?? minQuantity;
        maxQuantity = product.orderSize.max ?? maxQuantity;
    }

    return { minQuantity, maxQuantity };
}

export function Product({ product }) {
    const { basket } = useBasket();

    const { minQuantity, maxQuantity } = getQuantityLimits(product);

    const [quantity, setQuantity] = useState(minQuantity);

    const item = basket.find(item => item.sku === product.sku);

    useEffect(() => {
        if (item)
            setQuantity(item.quantity);
        else
            setQuantity(minQuantity);
    }, [item, minQuantity])

    return (
        <div>
            <p>{product.name} @ {product.unitPrice}
                {product.specialPrice ? ` or ${product.specialPrice.quantity} @ ${product.specialPrice.unitPrice}` : null}
            </p>
            <input type='number' value={quantity} min={minQuantity} max={maxQuantity} onChange={(event) => { setQuantity(event.target.value) }} />
            <ProductButtons sku={product.sku} quantity={parseInt(quantity)} />
        </div>
    );
}

function ProductButtons({ sku, quantity }) {
    const { basket, addItem, updateItem, removeItem } = useBasket();
    if (basket.find(item => item.sku === sku))
        return (
            <>
                <button onClick={() => {
                    updateItem({ sku, quantity });
                }}>
                    Update
                </button>

                <button onClick={() => {
                    removeItem(sku);
                }}>
                    Remove
                </button>
            </>
        );

    return (
        <button onClick={() => {
            addItem({ sku, quantity });
        }}> Add </button>
    );
}