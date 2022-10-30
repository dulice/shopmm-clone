import React from 'react'
import { Carousel } from 'react-responsive-carousel'

const ProductImage = ({product}) => {
  return (
    <>
        <Carousel autoPlay={false} showArrows={true} useKeyboardArrows={true}>
        {product.images.map((image, index) => (
            <div key={index}>
                <img src={image} alt="" />
            </div>
        ))}
      </Carousel>
    </>
  )
}

export default ProductImage