import { useState, useEffect } from "react";
import "./App.css";
import { NavBar, Products } from "./components";
import { commerce } from "./lib/commerce";
import { GlobalContextProvider } from "./context/GlobalState";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products, "products");
  return (
    <GlobalContextProvider>
      <div className="App">
        <NavBar />
        <Products />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
