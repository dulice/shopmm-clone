import {
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import { randomProduct } from "../features/cartProductSlice";
import { useProductsQuery } from "../api/productApi";

const JustForYou = () => {
  const [products, setProducts] = useState([]);
  const { data, isLoading } = useProductsQuery(30);

  useEffect(() => {
    data && setProducts(randomProduct(data, 18));
  }, [data]);

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
