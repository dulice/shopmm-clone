import { Add, Remove } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartProductSlice";

const QuantityButton = ({quantity, setQuantity, product, item}) => {
  const dispatch = useDispatch();
  
  const handleQuantity = (e) => {
    const { value } = e.target;
    if (quantity <= 1) {
      setQuantity(1);
    } else if (quantity >= product?.stock || quantity >= item.stock) {
      setQuantity(product?.stock || item.stock);
    } else {
      setQuantity(value);
    }
  };

  const handleIncrease = () => {
    if(item) {
      dispatch(addToCart(item));
    } else {
      setQuantity(quantity >= product.stock ? product.stock : quantity + 1)
    }
  }

  const handleDecrease = () => {
    if(item) {
      dispatch(removeFromCart(item));
    } else {
      setQuantity(quantity <= 1 ? 1 : quantity - 1)
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleDecrease}
      >
        <Remove />
      </Button>
      <input className="quantity-input"
        type="number"
        size="small"
        value={item ? item.quantity : quantity}
        onChange={handleQuantity}
      />
      <Button
        variant="outlined"
        onClick={handleIncrease}
        disabled={item && item.quantity >= item.stock}
      >
        <Add />
      </Button>
    </>
  );
};

export default QuantityButton;
