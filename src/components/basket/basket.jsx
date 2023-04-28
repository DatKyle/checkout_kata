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
    const { removeItem } = useBasket();

    return (
        <div>
            <p>{item.id} - {item.quantity}
                <button onClick={() => {
                    removeItem(item.id);
                }}>
                    Remove
                </button>
            </p>
        </div>
    );
}