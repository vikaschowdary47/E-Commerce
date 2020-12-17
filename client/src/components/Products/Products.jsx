import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import "./Products.css";
import { GlobalContext } from "../../context/GlobalState";

const products = [
  {
    id: 1,
    name: "shoes",
    description: "running shoes",
    price: 100,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Leu3gBUFL.jpg",
  },
  {
    id: 2,
    name: "Books",
    description: "Reading books",
    price: 200,
    image:
      "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
  },
  {
    id: 10,
    name: "shoes",
    description: "running shoes",
    price: 100,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Leu3gBUFL.jpg",
  },
  {
    id: 3,
    name: "Books",
    description: "Reading books",
    price: 200,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Leu3gBUFL.jpg",
  },
  {
    id: 4,
    name: "shoes",
    description: "running shoes",
    price: 100,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Leu3gBUFL.jpg",
  },
  {
    id: 5,
    name: "Books",
    description: "Reading books",
    price: 200,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Leu3gBUFL.jpg",
  },
  {
    id: 6,
    name: "shoes",
    description: "running shoes",
    price: 100,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Leu3gBUFL.jpg",
  },
  {
    id: 7,
    name: "Books",
    description: "Reading books",
    price: 200,
    image: "https://images-na.ssl-images-amazon.com/images/I/41Leu3gBUFL.jpg",
  },
];

const Products = () => {
  const data = useContext(GlobalContext);
  // console.log(data);
  return (
    <main className="main">
      <Grid container justify="center" spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
