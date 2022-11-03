import { Box, Container, Grid } from '@mui/material';
import React from 'react'
import { useProductsQuery } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const Sale = () => {
    const { data, isLoading } = useProductsQuery(30);
    const products = data?.filter(el => el.discount > 0);
  return (
    <Box paddingY={2} minWidth={1024}>
      <Container>
        <img style={{width: "100%"}} src="https://gcp-img.slatic.net/lazada/b8ba0502-4031-4c13-8db5-c368ca11208f_MM-1920-250.jpg" alt='' />
        <Grid container spacing={2} alignItems="stretch">
          {isLoading ? (
            <Loading />
          ) : (
            products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default Sale