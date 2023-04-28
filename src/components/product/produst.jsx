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
    const { minQuantity, maxQuantity } = getQuantityLimits(product);

    const [quantity, setQuantity] = useState(minQuantity);

    return (
        <div>
            <p>{product.name} @ {product.unitPrice}
                {product.specialPrice ? ` or ${product.specialPrice.quantity} @ ${product.specialPrice.unitPrice}` : null}
            </p>
            <input type='number' value={quantity} min={minQuantity} max={maxQuantity} onChange={(event) => { setQuantity(event.target.value) }} />
            <ProductButtons id={product.id} quantity={parseInt(quantity)} minQuantity={minQuantity} setQuantity={setQuantity} />
        </div>
    );
}

function ProductButtons({ id, quantity, minQuantity, setQuantity }) {
    const { basket, addItem, updateItem, removeItem } = useBasket();
    if (basket.find(item => item.id === id))
        return (
            <>
                <button onClick={() => {
                    updateItem({ id, quantity });
                }}>
                    Update
                </button>

                <button onClick={() => {
                    removeItem(id);
                    setQuantity(minQuantity);
                }}>
                    Remove
                </button>
            </>
        );

    return (
        <button onClick={() => {
            addItem({ id, quantity });
        }}> Add </button>
    );
}