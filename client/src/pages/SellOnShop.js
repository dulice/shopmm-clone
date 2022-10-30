import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@mui/material'
const SellOnShop = () => {
  return (
    <>
        <Container>
            <img src='https://icms-image.slatic.net/images/ims-web/d2aab9e8-1315-45c8-9d08-49fb964afbfd.jpg' alt="" />
            <img src='https://laz-img-cdn.alicdn.com/tfs/TB1u_xGf_M11u4jSZPxSuuhcXXa.jpg#width=1188&height=470_1200x1200q75.jpg_.webp' alt=""/>
            <Link to="/signup">
                <img src="https://laz-img-cdn.alicdn.com/tfs/TB1uQwUPpP7gK0jSZFjSuw5aXXa.jpg#width=1188&height=200_1200x1200q75.jpg_.webp" alt="" />
            </Link>
            <img src="https://laz-img-cdn.alicdn.com/tfs/TB1RIBxcOpE_u4jSZKbSuvCUVXa.jpg#width=1188&height=690_1200x1200q75.jpg_.webp" alt="" />
        </Container>
    </>
  )
}

export default SellOnShop