const products = [
    {
        id: 1,
        name: "a",
        unitPrice: 50,
        specialPrice: {
            quantity: 3,
            unitPrice: 130
        },
        orderSize: {
            min: 1,
            max: 99
        }
    },
    {
        id: 2,
        name: "b",
        unitPrice: 30,
        specialPrice: {
            quantity: 2,
            unitPrice: 45
        },
        orderSize: {
            min: 1,
            max: 99
        }
    },
    {
        id: 3,
        name: "c",
        unitPrice: 20
    },
    {
        id: 4,
        name: "d",
        unitPrice: 15
    }
]

export function getAll() {
    return products;
}