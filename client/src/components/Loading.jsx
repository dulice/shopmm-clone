import { Skeleton, Box, Grid } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(6)].map( (_, i)=> (
        <Grid item xs={2} key={i}>
          <Box sx={{mt: 3}}>
            <Skeleton animation="wave" variant="rectangular" height={118} />
            <Skeleton animation="wave" width="90%" height={15} />
            <Skeleton animation="wave" width="90%" height={15} />
            <Skeleton animation="wave" width="60%" height={50} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default Loading