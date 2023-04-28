import { useEffect, useState } from "react";
import { useBasket } from "./basket.context";
import { getDetails as getBasketDetails } from "../../services/basket.service";

export function Basket() {
    const { basket } = useBasket();
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
        </div>
    );
}

function BasketItem({ item }) {
    const { removeItem } = useBasket();

    return (
        <div>
            <p>{item.name} - {item.quantity} - {item.totalPrice}
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
    items.forEach(item => {
        totalPrice += item.totalPrice;
    });

    return (
        <p>Total: {totalPrice}</p>
    );
}