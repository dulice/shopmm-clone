import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useOrderDetailQuery } from "../api/orderApi";
import Loading from "../components/Loading";
import OrderItem from "../components/OrderItem";
import ReviewInput from "../components/ReviewInput";

const Review = () => {
  const { id } = useParams();
  const { data, isLoading } = useOrderDetailQuery(id);
  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        data?.items.map((item) => (
          <div key={item._id}>
            <OrderItem item={item} />
            <ReviewInput item={item} />
          </div>
        ))
      )}
    </Container>
  );
};

export default Review;
