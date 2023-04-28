const products = [
    {
        name: "a",
        unitPrice: 50,
        specialPrice: {
            quantity: 3,
            UnitPrice: 130
        }
    },
    {
        name: "b",
        unitPrice: 30,
        specialPrice: {
            quantity: 2,
            UnitPrice: 45
        }
    },
    {
        name: "c",
        unitPrice: 20
    },
    {
        name: "d",
        unitPrice: 15
    }
]

export default function getAll(){
    return products;
}