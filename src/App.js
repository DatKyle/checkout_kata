import { BasketContextProvider } from "./components/basket/basket.context";
import { ProductList } from "./components/product/list-products";
function App() {
  return (
    <>
      <BasketContextProvider>
        <ProductList />
      </BasketContextProvider>
    </>
  );
}

export default App;
