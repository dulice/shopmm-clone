import {
  CardMedia,
  Grid,
  Typography,
  Card,
  CardActions,
  Button,
  CardContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartProductSlice";
import Discount from "./Discount";

const ProductCard = ({ product }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product));
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Grid item xs={6} sm={3} md={2} key={product._id}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Link to={`/product/${product._id}`} className="inherit">
            <CardMedia
              component="img"
              image={product.images[0]}
              height="150"
              sx={{
                objectFit: "contain",
              }}
            />
            <CardContent>
              <Typography variant="body2" minHeight={40}>
                {product.productName.substring(0, 27)}
                {product.productName.length > 27 && "..."}
              </Typography>
              <Discount product={product} />
            </CardContent>
          </Link>
          <CardActions>
            <Button variant="contained" onClick={handleAddToCart}>
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
