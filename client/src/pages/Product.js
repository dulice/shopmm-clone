import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Alert,
  Rating,
} from "@mui/material";
import { useSingleProductQuery } from "../api/productApi";
import Loading from "../components/Loading";
import ProductService from "../components/ProductService";
import ProductImage from "../components/ProductImage";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartProductSlice";
import Discount from "../components/Discount";
import QuantityButton from "../components/QuantityButton";

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useSingleProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <Container sx={{ minWidth: "1024px", marginY: "2rem" }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Grid container spacing={3} mb="2rem">
            <Grid item xs={4}>
              <ProductImage product={product} />
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography variant="h6">{product.productName}</Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating name="read-only" value={product.rating} readOnly />
                  <Typography fontSize={14} sx={{ ml: 2 }} color="gray">
                    {product.reviews.length > 0
                      ? product.reviews.length("people reviews.")
                      : "No rating yet"}
                  </Typography>
                </Box>
                <Discount product={product} />
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Typography variant="body2">Quantity</Typography>
                  <QuantityButton
                    quantity={quantity}
                    setQuantity={setQuantity}
                    product={product}
                  />
                </Box>
                <Alert severity="success">
                  only {product.stock} items left.
                </Alert>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained">Buy Now</Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <ProductService />
            </Grid>
          </Grid>
          <Stack spacing={2} mb="2rem">
            <Typography variant="h6" fontSize="1rem" fontWeight="700">
              Product details of {product.productName}
            </Typography>
            <ul className="inherit">
              {product.description.split(".").map((des, index) => (
                <li key={index}>{des}</li>
              ))}
            </ul>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Product;
