import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { useSlugProductQuery } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import Error from "./Error";

const Category = () => {
  const { slug } = useParams();
  const { data, isLoading } = useSlugProductQuery(slug);
  return (
    <Box paddingY={2} minWidth={1024}>
      <Container>
        <Grid container spacing={2} alignItems="stretch">
          {isLoading ? (
            <Loading />
          ) : data?.length <= 0 ? (
            <Error />
          ) : (
            data?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Category;
