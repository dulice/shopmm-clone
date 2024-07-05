import { Container, IconButton } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrderDetailQuery } from "../api/orderApi";
import Loading from "../components/Loading";
import OrderItem from "../components/OrderItem";
import ReviewInput from "../components/ReviewInput";
import { ArrowBack } from "@mui/icons-material";

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useOrderDetailQuery(id);
  return (
    <Container>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
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
