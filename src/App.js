import "./App.css";
import { ProductContextProvider } from "./components/product/product.context";
import { BasketContextProvider } from "./components/basket/basket.context";

import { Basket } from "./components/basket/basket";
import { ProductList } from "./components/product/list-products";

function App() {
  return (
    <>
      <ProductContextProvider>
        <BasketContextProvider>
          <ProductList />
          <Basket />
        </BasketContextProvider>
      </ProductContextProvider>
    </>
  );
}

export default App;
