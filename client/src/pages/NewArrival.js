import { Box, Container, Grid } from '@mui/material';
import React from 'react'
import { useProductsQuery } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const NewArrival = () => {
    const { data, isLoading } = useProductsQuery(30);
  return (
    <Box paddingY={2} minWidth={1024}>
      <Container>
        <img style={{width: "100%"}} src="https://gcp-img.slatic.net/lazada/9fb68475-459a-40dc-a742-c4bbd827cd20_MM-1920-300.jpg" alt='' />
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
  )
}

export default NewArrival