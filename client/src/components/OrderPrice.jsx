import React from "react";
import { useSelector } from "react-redux";

const OrderPrice = () => {
  const { productsPrice, shippingFees, totalPrice } = useSelector(
    (state) => state.cartItems
  );
  return (
    <>
      <table style={{margin: "1rem 0"}}>
        <tbody>
          <tr>
            <td>SubTotal: </td>
            <td style={{ color: "#F26924", fontWeight: 700 }}>Ks {productsPrice.toLocaleString()} </td>
          </tr>
          <tr>
            <td>Shipping Fees: </td>
            <td style={{color: "#F26924", fontWeight: 700}}>Ks {shippingFees.toLocaleString()} </td>
          </tr>
          <tr>
            <td>Total: </td>
            <td style={{ color: "#F26924", fontWeight: 700 }}>Ks {totalPrice.toLocaleString()} </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderPrice;
