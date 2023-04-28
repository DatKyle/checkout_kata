import { Basket } from "./components/basket/basket";
import { BasketContextProvider } from "./components/basket/basket.context";
import { ProductList } from "./components/product/list-products";

function App() {
  return (
    <>
      <BasketContextProvider>
        <ProductList />
        <Basket />
      </BasketContextProvider>
    </>
  );
}

export default App;
