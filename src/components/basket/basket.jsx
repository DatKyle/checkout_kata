import { useBasket } from "./basket.context";

export function Basket() {
    const { basket } = useBasket();

    return (
        <>
            {basket.length ?
                basket.map(item => <BasketItem key={item.id} item={item} />)
                : null}
        </>
    );
}

function BasketItem({ item }) {

    return (
        <div>
            <p>{item.id} - {item.quantity}</p>
        </div>
    );
}