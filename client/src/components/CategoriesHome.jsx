import {
  Card,
  CardMedia,
  CardActions,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useCategoriesQuery } from "../api/productApi";
import { randomProduct } from "../features/cartProductSlice";
import Loading from "./Loading";

const CategoriesHome = () => {
  const { data, isLoading } = useCategoriesQuery();

  const filterCategory = [
    ...new Map(data?.map((item) => [item.slug, item])).values(),
  ];
  const categories = randomProduct(filterCategory, 16);

  return (
    <Box>
      <Container>
        <Typography variant="h5" color="orange" py={1}>Categories</Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <Grid container spacing={2} alignItems="stretch">
            {categories.map((category, index) => (
              <Grid item xs={1.5} key={index}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    image={category.firstImage}
                    height="100"
                  />
                  <CardActions>
                    <Link to={`/slug/${category.slug}`} className="nav-link">
                      <Typography variant="body2">{category.slug}</Typography>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CategoriesHome;
