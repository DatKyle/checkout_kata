import { useEffect, useState } from "react";
import { useBasket } from "./basket.context";
import { getDetails as getBasketDetails } from "../../services/basket.service";

export function Basket() {
    const { basket, resetItems } = useBasket();
    const [basketDetails, setBasketDetails] = useState([]);

    useEffect(() => {
        getBasketDetails(basket).then((details) => setBasketDetails(details))
    }, [basket]);

    if (basketDetails.length < 1)
        return null;

    return (
        <div>
            <div>
                {basketDetails.map(item => <BasketItem key={item.id} item={item} />)}
            </div>
            <div>
                <BasketTotal items={basketDetails} />
            </div>
            <div>
                <button onClick={() => alert("checkout")}> Checkout </button>
                <button onClick={() => resetItems()}> Clear </button>
            </div>
        </div>
    );
}

function BasketItem({ item }) {
    const { removeItem } = useBasket();

    const saving = item.totalBasicPrice - item.totalPrice;

    return (
        <div>
            <p>{item.name} - {item.quantity} - {item.totalPrice} {saving !== 0 ? `(${saving} saved)` : null}
                <button onClick={() => {
                    removeItem(item.id);
                }}>
                    Remove
                </button>
            </p>
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
        <p>Total: {totalPrice} {saving !== 0 ? `(${saving} saved)` : null}</p>
    );
}