import { useEffect, useState } from "react";
import { useBasket } from "./basket.context";

import { getDetails as getBasketDetails } from "../../services/basket.service";

export function CheckoutModal() {
    const { basket, editBasket, resetItems } = useBasket();
    const [basketDetails, setBasketDetails] = useState([]);

    useEffect(() => {
        getBasketDetails(basket).then((details) => setBasketDetails(details))
    }, [basket]);

    return (
        <div className="modal">
            <div className="content checkout">
                <div className="header">
                    <h2 className="title">Checkout</h2>
                    <span className="close" onClick={() => editBasket()}>X</span>
                </div>
                <div className="basket items">
                    <h2> Items </h2>
                    <div className="header">
                        <p>Name</p>
                        <p>Quantity</p>
                        <p>Total unit price</p>
                        <p>Savings</p>
                    </div>
                    {basketDetails.map(item => <BasketItem key={item.sku} item={item} />)}
                </div>
                <div className="basket total">
                    <BasketTotal items={basketDetails} />
                </div>
                <div className="basket actions">
                    <button className="success" onClick={() => resetItems()}>
                        Pay
                    </button>
                    <button className="danger" onClick={() => editBasket()}>
                        Edit Basket
                    </button>
                </div>
            </div>
        </div >
    );
}

function BasketItem({ item }) {

    const savings = item.totalBasicPrice - item.totalPrice;

    return (
        <div className="item">
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.totalPrice}p</p>
            <p>{savings > 0 ? `${savings}p` : `-`}</p>
        </div>
    )
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
            <p className="total">Total: </p>
            <p className="price">{totalPrice}p </p>
            {saving !== 0 ?
                <p className="saved">{saving}p </p>
                : null
            }
        </>
    );
}  