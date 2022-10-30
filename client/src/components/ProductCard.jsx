import React from "react";
import {
  CardMedia,
  Grid,
  Typography,
  Card,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartProductSlice";

const ProductCard = ({ product }) => {
  const discountAmount = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const dispatch = useDispatch();
  return (
    <>
      <Grid item xs={2} key={product._id}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Link to={`/product/${product._id}`} className="inherit">
            <CardMedia
              component="img"
              image={product.images[0]}
              height="150"
              sx={{
                objectFit: "contain",
              }}
            />
            <Box sx={{px: "8px", pt: "8px"}}>
              <Typography variant="body2" minHeight={40}>
                {product.productName.substring(0, 27)}
                {product.productName.length > 27 && "..."}
              </Typography>
              <Typography variant="h5" color="orange">
                Ks {product.discount > 0
                  ? discountAmount(product.price, product.discount)
                  : product.price}
              </Typography>
              {product.discount > 0 && (
                <Typography variant="body2">
                  <span style={{ textDecoration: "line-through gray" }}>
                    Ks {product.price}
                  </span>{" "}
                  {product.discount}%
                </Typography>
              )}
            </Box>
          </Link>
          <CardActions>
            <Button variant="contained" onClick={() => dispatch(addToCart(product))}>
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
