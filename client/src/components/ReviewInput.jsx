import {
  TextField,
  FormControl,
  Box,
  Rating,
  Button,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useReviewMutation } from "../api/productApi";

const ReviewInput = ({ item }) => {
  const { user } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewProduct, { isLoading }] = useReviewMutation();

  // submit a review
  const handleSubmit = async (id) => {
    try {
      const data = await reviewProduct({
        id,
        user: user._id,
        reviewerName: user.username,
        comment,
        rating,
      }).unwrap();

      setComment("");
      toast.success("Thanks for your review");
      console.log(data);
    } catch (err) {
      console.log(err.data.message);
    }
  };
  return (
    <Box sx={{ mb: 5 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(item._id);
        }}
      >
        <Stack spacing={2}>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
          <FormControl fullWidth>
            <TextField
              label="Write a review"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              multiline
            />
          </FormControl>
          <Button variant="contained" color="warning" type="submit" disabled={isLoading}>
            {isLoading ? <> Submitting <CircularProgress size={20} sx={{ marginLeft: "10px" }} /> </> : "Submit"}
          </Button>
          <Divider />
        </Stack>
      </form>
    </Box>
  );
};

export default ReviewInput;
