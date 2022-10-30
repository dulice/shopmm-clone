import { Alert, Box, Container, Grid } from "@mui/material";
import React from "react"; 
import { useLocation } from "react-router-dom";
import { useSearchProductQuery } from "../api/productApi";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const { search } = useLocation();
  const { data, isLoading } = useSearchProductQuery(search);
  return (
    <>
      <Box paddingY={2} minWidth={1024}>
        <Container>
          <Grid container spacing={2} alignItems="stretch">
            {isLoading ? (
              <Loading />
            ) : data?.length > 0 ? (
              data?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <Alert severity="warning">No product Found.</Alert>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Search;
