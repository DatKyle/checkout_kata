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
    const { basket, updateItem } = useBasket();

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
        <div className="product">
            <div className="headers">
                <h3 className="name">{product.name}</h3>
                <pre className="sku">sku-{product.sku}</pre>
            </div>
            <div className="pricing">
                <p className="normal">
                    <span>normal: </span>
                    {product.unitPrice}p
                </p>
                {product.specialPrice ?
                    <p className="special">
                        <span>special: </span>
                        {product.specialPrice.quantity} for {product.specialPrice.unitPrice}p
                    </p>
                    : null
                }
            </div>
            <div className="actions">
                <input type='number' value={quantity} min={minQuantity} max={maxQuantity} onChange={(event) => {
                    if (basket.find(item => item.sku === product.sku))
                        updateItem({ sku: product.sku, quantity: parseInt(event.target.value) });
                    setQuantity(event.target.value)
                }} />
                <ProductButtons sku={product.sku} quantity={parseInt(quantity)} />
            </div>
        </div>
    );
}

function ProductButtons({ sku, quantity }) {
    const { basket, addItem, removeItem } = useBasket();
    if (basket.find(item => item.sku === sku))
        return (
            <>
                <button className="danger" onClick={() => {
                    removeItem(sku);
                }}>
                    Remove
                </button>
            </>
        );

    return (
        <button className="primary" onClick={() => {
            addItem({ sku, quantity });
        }}> Add </button>
    );
}