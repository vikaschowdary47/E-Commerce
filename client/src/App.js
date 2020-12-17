import { useState, useEffect, useContext } from "react";
import "./App.css";
import { NavBar, Products } from "./components";
import { Login, Signup } from "./components/Auth";
import { commerce } from "./lib/commerce";
import { GlobalContextProvider, GlobalContext } from "./context/GlobalState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
        <NavBar isAuthenticated={isAuthenticated} />
        {!isAuthenticated ? (
          <>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </>
        ) : (
          <Router>
            <Products />
          </Router>
        )}
      </div>
    </GlobalContextProvider>
  );
}

export default App;
