import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { useSlugProductQuery } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { Navigate, useParams } from "react-router-dom";

const Category = () => {
  const { slug } = useParams();
  const { data, isLoading } = useSlugProductQuery(slug);
  return (
    <Box paddingY={2}>
      <Container>
        <Grid container spacing={2} alignItems="stretch">
          {isLoading ? (
            <Loading />
          ) : data?.length <= 0 ? (
            <Navigate to={'/'} />
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
