import { Container, Grid, Typography, Box, Button } from "@mui/material";
import ProductCard from "./ProductCard";
import { useProductsQuery } from "../api/productApi";
import Loading from "./Loading";
import { Link } from 'react-router-dom';
import { KeyboardDoubleArrowRight } from "@mui/icons-material";

const LatestProduct = () => {
  const { data, isLoading } = useProductsQuery(6);

  return (
    <Box paddingY={2}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" color="orange" paddingY={1}>
            Latest Product
          </Typography>
          <Button style={{color: "#F26924"}} endIcon={<KeyboardDoubleArrowRight />}>
            <Link className="inherit" to="new-arrival">SHOP MORE</Link>
          </Button>
        </Box>
        <Grid container spacing={2} alignItems="stretch">
          {isLoading ? (
            <Loading />
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

export default LatestProduct;
