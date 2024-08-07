import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Alert,
  Rating,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { useSingleProductQuery } from "../api/productApi";
import Loading from "../components/Loading";
import ProductService from "../components/ProductService";
import ProductImage from "../components/ProductImage";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartProductSlice";
import Discount from "../components/Discount";
import QuantityButton from "../components/QuantityButton";
import { deepOrange } from "@mui/material/colors";
import { io } from "socket.io-client";
import { ArrowBack } from "@mui/icons-material";

export const socket = io(process.env.REACT_APP_API_URL);

const Product = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { data: product, isLoading } = useSingleProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [currentRoom, setCurrentRoom] = useState("");
  const [ownerId, setOwnerId] = useState("");

  useEffect(() => {
    setOwnerId(product?.ownerId);
  }, [product]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const orderId = (id1, id2, id3) => {
    if (id1 > id2) {
      return id1 + "_" + id2 + "_" + id3;
    } else {
      return id2 + "_" + id1 + "_" + id3;
    }
  };

  const handleChat = () => {
    if (!user) return navigate("/login");
    const roomId = orderId(user._id, ownerId, id);
    navigate(`/chat/${id}`);
    socket.emit("room", roomId, currentRoom);
    setCurrentRoom(roomId);
  };

  return (
    <Container sx={{ marginY: "2rem" }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Grid container spacing={3} mb="2rem">
            <Grid item xs={12} sm={4}>
              <ProductImage product={product} />
            </Grid>
            <Grid item sm={8} md={4}>
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
                      ? `${product.reviews.length} people reviews.`
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
                  <Button variant="contained" onClick={handleAddToCart}>
                    <Link to="/cartProducts" className="inherit">
                      Buy Now
                    </Link>
                  </Button>
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
            <Grid item sm={6} md={4}>
              <ProductService />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={10}>
              <Typography variant="h6" fontSize="1rem" fontWeight="700">
                Product details of {product.productName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
                <Typography variant="body2" fontSize="1rem" fontWeight="700">
                  Seller: {product.ownerName}
                </Typography>

                <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={handleChat}>
                  <ChatIcon />
                </Avatar>
              </Box>
            </Grid>
          </Grid>
          <div dangerouslySetInnerHTML={{__html: product.description}}></div>
          <Box>
            {product.reviews.map((review) => (
              <Card key={review._id}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar img="" alt="" />
                      <Typography variant="body2" color="gray">
                        {review.reviewerName}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body2">{review.comment}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Product;
