import { useState } from "react";
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
    const { basket, addItem } = useBasket();

    const { minQuantity, maxQuantity } = getQuantityLimits(product);

    const [quantity, setQuantity] = useState(minQuantity);

    return (
        <div>
            <p>{product.name} @ {product.unitPrice}
                {product.specialPrice ? ` or ${product.specialPrice.quantity} @ ${product.specialPrice.unitPrice}` : null}
            </p>
            <input type='number' value={quantity} min={minQuantity} max={maxQuantity} onChange={(event) => { setQuantity(event.target.value) }} />
            <button onClick={() => {
                addItem({ id: product.id, quantity })
            }}> Add To Basket </button>
        </div>
    );
}
