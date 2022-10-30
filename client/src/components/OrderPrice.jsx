import React from "react";
import { useSelector } from "react-redux";

const OrderPrice = () => {
  const { productsPrice, shippingFees, totalPrice } = useSelector(
    (state) => state.cartItems
  );
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>SubTotal: </td>
            <td> {productsPrice} </td>
          </tr>
          <tr>
            <td>Shipping Fees: </td>
            <td> {shippingFees} </td>
          </tr>
          <tr>
            <td>Total: </td>
            <td> {totalPrice} </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderPrice;
