import {
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import { randomProduct } from "../features/cartProductSlice";

const JustForYou = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/products");
        setProducts(randomProduct(data, data.length));
        setIsLoading(false);
      } catch (err) {
        console.log(err.response.data.message);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Box paddingY={2} minWidth={1024}>
      <Container>
        <Typography variant="h5" color="orange" paddingY={1}>
          Just For You
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          {isLoading ? (
            <Loading />
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default JustForYou;
