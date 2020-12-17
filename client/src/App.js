import { useState, useEffect, useContext } from "react";
import "./App.css";
import { NavBar, Products } from "./components";
import { Login, Signup } from "./components/Auth";
import { commerce } from "./lib/commerce";
import { GlobalContextProvider, GlobalContext } from "./context/GlobalState";

function App() {
  const [products, setProducts] = useState([]);
  const data = useContext(GlobalContext);
  const { isAuthenticated } = data;
  console.log(data);
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(products, "products");
  return (
    <GlobalContextProvider>
      <div className="App">
        <NavBar />
        {!isAuthenticated ? (
          <Login />
        ) : (
          <>
            <Products />
          </>
        )}
      </div>
    </GlobalContextProvider>
  );
}

export default App;
