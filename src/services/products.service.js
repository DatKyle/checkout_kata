const products = [
    {
        name: "a",
        unitPrice: 50,
        specialPrice: {
            quantity: 3,
            unitPrice: 130
        }
    },
    {
        name: "b",
        unitPrice: 30,
        specialPrice: {
            quantity: 2,
            unitPrice: 45
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

export function getAll(){
    return products;
}