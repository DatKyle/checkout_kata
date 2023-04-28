import { useEffect, useState } from "react";
import { useBasket } from "./basket.context";
import { getDetails as getBasketDetails } from "../../services/basket.service";

export function Basket() {
    const { basket } = useBasket();
    const [ basketDetails, setBasketDetails ] = useState([]);

    useEffect(() => {
        getBasketDetails(basket).then((details) => setBasketDetails(details))
    }, [basket]);

    return (
        <>
            {basketDetails.length ?
                basketDetails.map(item => <BasketItem key={item.id} item={item} />)
                : null}
        </>
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