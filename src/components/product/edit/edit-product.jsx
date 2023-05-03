import { useState } from "react";
import { useProduct } from "../product.context";

import "./edit-product.css"

export function EditProduct({ product }) {
    const { addProduct } = useProduct();

    const [name, setName] = useState(product ? product.name : "");
    const [unitPrice, setUnitPrice] = useState(product ? product.unitPrice : "");
    const [specialQuantity, setSpecialQuantity] = useState(product && product.specialPrice ? product.specialPrice.quantity : "");
    const [specialUnitPrice, setSpecialUnitPrice] = useState(product && product.specialPrice ? product.specialPrice.unitPrice : "");
    const [minQuantity, setMinQuantity] = useState(product && product.orderSize ? product.orderSize.min : "");
    const [maxQuantity, setMaxQuantity] = useState(product && product.orderSize ? product.orderSize.max : "");
    return (
        <div className="row">
            <input name='name' type='text' value={name} onChange={e => setName(e.target.value)} />
            <input name='unitPrice' type='number' value={unitPrice} onChange={e => setUnitPrice(Number(e.target.value))} />
            <input name='speicalQuantity' type='number' value={specialQuantity} onChange={e => setSpecialQuantity(Number(e.target.value))} />
            <input name='speicalUnitPrice' type='number' value={specialUnitPrice} onChange={e => setSpecialUnitPrice(Number(e.target.value))} />
            <input name='minQuantity' type='number' value={minQuantity} onChange={e => setMinQuantity(Number(e.target.value))} />
            <input name='maxQuantity' type='number' value={maxQuantity} onChange={e => setMaxQuantity(Number(e.target.value))} />

            <div>
                <button onClick={() => {

                    const hasSpecialPrice = specialQuantity && specialUnitPrice;
                    const hasOrderSize = minQuantity && maxQuantity;

                    addProduct({
                        id: product ? product.id : null,
                        name,
                        unitPrice,
                        specialPrice: hasSpecialPrice ? {
                            quantity: specialQuantity,
                            unitPrice: specialUnitPrice
                        } : null,
                        orderSize: hasOrderSize ? {
                            min: minQuantity,
                            max: maxQuantity
                        } : null
                    });
                }}> {product ? "Update" : "Add"}</button>

                {product ? (
                    <button onClick={()=>{}}>
                        Remove
                    </button>
                )
                    : null}

            </div>
        </div>
    );
}