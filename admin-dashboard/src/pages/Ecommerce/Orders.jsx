import React, { useEffect, useState } from "react";
import { CustomButton } from "../../custom";
import { HiTrash, HiTruck } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../config/motion";
import { useDeliverOrderMutation, useOrdersQuery } from "../../api/summaryApi";
import Loading from "../../components/Loading";

const Orders = () => {
  const { data: orders, isLoading } = useOrdersQuery();
  const [deliverOrder] = useDeliverOrderMutation();

  const handleDeliver = (id) => {
    deliverOrder({id, isDelivered: "success"});
  }
  
  if (isLoading) return <Loading />;
  return (
    <motion.div {...fadeAnimation}>
      <div className="card m-4">
        {orders.map((order) => (
          <div className="py-4 border-b border-gray-600">
            <p className="text-gray-400 text-sm">{order.createdAt.substring(0, 10)}</p>
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-8">
                {order.items.map((item) => (
                  <div className="grid grid-cols-12 gap-4 mb-2">
                    <img src={item.images[0]} alt="" className="col-span-1" />
                    <p className="col-span-11">{item.productName}</p>
                  </div>
                ))}
              </div>
              <div className="col-span-6 md:col-span-4">
                <table>
                  <tbody>
                    <tr>
                      <td>Product Price:</td>
                      <td>Ks {order.productsPrice}</td>
                    </tr>
                    <tr>
                      <td>Shipping Fees:</td>
                      <td>Ks {order.shippingFees}</td>
                    </tr>
                    <tr>
                      <td>Total Price:</td>
                      <td>Ks {order.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                {order.isDelivered === "pending" ? (
                  <CustomButton title="Not Deliver" variant="btn-danger" onClick={() => handleDeliver(order._id)}/>
                ) : (
                  <CustomButton title="Deliver" variant="btn-success"/>
                )}
                {order.isPaid ? (
                  <CustomButton title="Paid" variant="btn-warning" customStyle="ml-2"/>
                ) : (
                  <CustomButton title="Not Pay" variant="btn-danger" customStyle="ml-2"/>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;
