import { useEffect, useState } from "react";
import { useBasket } from "./basket.context";
import { getDetails as getBasketDetails } from "../../services/basket.service";

export function Basket() {
    const { basket, resetItems, checkoutBasket } = useBasket();
    const [basketDetails, setBasketDetails] = useState([]);

    useEffect(() => {
        getBasketDetails(basket).then((details) => setBasketDetails(details))
    }, [basket]);

    if (basketDetails.length < 1)
        return (
            <div className="basket">
                <div className="header">
                    <h2>Basket</h2>
                </div>
                <div className="items empty">
                    <p>Empty Basket</p>
                </div>
            </div>
        );

    return (
        <div className="basket">
            <div className="header">
                <h2>Basket</h2>
            </div>
            <div className="items">
                {basketDetails.map(item => <BasketItem key={item.sku} item={item} />)}
            </div>
            <div className="total">
                <BasketTotal items={basketDetails} />
            </div>
            <div className="actions">
                <button className="primary" onClick={() => checkoutBasket()}> Checkout </button>
                <button className="warning" onClick={() => resetItems()}> Clear </button>
            </div>
        </div>
    );
}

function BasketItem({ item }) {
    const { removeItem } = useBasket();
    return (
        <div className="item">
            <div className="details">
                <div className="name">
                    <p className="sku">sku-{item.sku}</p>
                    <span className="separator">-</span>
                    <p className="name">{item.name}</p>
                </div>
                <div className="total">
                    <p>Qty: {item.quantity}</p>
                    <p>Total: {item.totalPrice}p</p>
                </div>
            </div>
            <div className="actions">
                <button className="danger"
                onClick={() => {
                    removeItem(item.sku);
                }}>
                    Remove
                </button>
            </div>
        </div>
    );
}

function BasketTotal({ items }) {
    let totalPrice = 0;
    let totalBasicPrice = 0;

    items.forEach(item => {
        totalPrice += item.totalPrice;
        totalBasicPrice += item.totalBasicPrice;
    });

    const saving = totalBasicPrice - totalPrice;

    return (
        <>
            <p className="price">Total: {totalPrice}p </p>
            {saving !== 0 ?
                <p className="savings">Saved: {saving}p </p>
                : null
            }
        </>
    );
}