import { useState } from "react";
import { useProduct } from "../product.context";

import "./edit-product.css"

export function EditProduct({ product }) {
    const { addProduct, updateProduct, removeProduct } = useProduct();

    const [name, setName] = useState(product ? product.name : "");
    const [unitPrice, setUnitPrice] = useState(product ? product.unitPrice : "");
    const [specialQuantity, setSpecialQuantity] = useState(product && product.specialPrice ? product.specialPrice.quantity : "");
    const [specialUnitPrice, setSpecialUnitPrice] = useState(product && product.specialPrice ? product.specialPrice.unitPrice : "");
    const [minQuantity, setMinQuantity] = useState(product && product.orderSize ? product.orderSize.min : 1);
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
                {!product ? (<button onClick={() => {
                    let newProduct = {
                        name,
                        unitPrice
                    }

                    if (specialQuantity && specialUnitPrice)
                        newProduct.specialPrice = {
                            quantity: specialQuantity,
                            unitPrice: specialUnitPrice
                        }

                    if (minQuantity || maxQuantity)
                        newProduct.orderSize = {
                            min: minQuantity || null,
                            max: maxQuantity || null
                        }

                    addProduct(newProduct);
                }}>
                    Add
                </button>
                )
                    : null
                }

                {product ? (
                    <>
                        <button onClick={() => {
                            let updatedProduct = {
                                id: product.id,
                                name,
                                unitPrice
                            }

                            if (specialQuantity && specialUnitPrice)
                                updatedProduct.specialPrice = {
                                    quantity: specialQuantity,
                                    unitPrice: specialUnitPrice
                                }

                            if (minQuantity || maxQuantity)
                                updatedProduct.orderSize = {
                                    min: minQuantity || null,
                                    max: maxQuantity || null
                                }

                            updateProduct(updatedProduct);
                        }}>
                            Update
                        </button>
                        <button onClick={() => removeProduct(product.id)}>
                            Remove
                        </button>
                    </>
                )
                    : null}

            </div>
        </div>
    );
}