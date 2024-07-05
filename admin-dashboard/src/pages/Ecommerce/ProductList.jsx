import React, { useEffect, useState } from "react";
import { CustomButton } from "../../custom";
import { BiShow, BiSolidEyedropper, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../config/motion";
import {
  useDeleteProductMutation,
  useGetMyProductsQuery,
} from "../../api/productApi";
import { Loading } from "../../components";
import Table from "../../components/table/Table";
import { columns } from "../../data/table/column";
import { useSelector } from "react-redux";

const ProductList = () => {
  const { user } = useSelector((state) => state.user);
  const { data: products, isLoading } = useGetMyProductsQuery(user._id);
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };
  const thead = ["Id", "Product_Name", "Price", "Actions"];
  if (isLoading) return <Loading />;
  return (
    <motion.div {...fadeAnimation}>
      <div className="m-4 card relative overflow-x-auto">
        <Table
          columns={columns(thead)}
          data={products.map((product, index) => {
            return {
              Id: index + 1,
              Product_Name: (
                <div className="grid grid-cols-12 gap-4">
                  <img className="col-span-1" src={product.images[0]} alt="" />
                  <p className="col-span-11">{product.productName}</p>
                </div>
              ),
              Price: "Ks " + product.price,
              Actions: (
                <div className="flex gap-2">
                  <CustomButton
                    title={<BiShow />}
                    variant="btn-success"
                    onClick={() => navigate(`/products/${product._id}`)}
                  />
                  <CustomButton
                    title={<BiSolidEyedropper />}
                    variant="btn-warning"
                    onClick={() => navigate(`/products/${product._id}/edit`)}
                  />
                  <CustomButton
                    title={<BiTrash />}
                    variant="btn-danger"
                    onClick={() => handleDelete(product._id)}
                  />
                </div>
              ),
            };
          })}
        />
      </div>
    </motion.div>
  );
};

export default ProductList;
