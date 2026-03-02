import { ItemCounter } from "./ShopingCar/ItemCounter";


interface ItemInCart {
    productName: string;
    quantity: number;
}
const itemsInCart: ItemInCart[] = [
    { productName: 'producto', quantity: 1 }   
];
export function FirstStepsApp() {
    return (
        <>
            <div>
                { /*<ItemCounter name = "Ivan" quantity={1}/>*/}
                {itemsInCart.map(({ productName, quantity }) => (
                    <ItemCounter key={productName} name={productName} quantity={quantity} />
                ))}
            </div>

        </>)
}
