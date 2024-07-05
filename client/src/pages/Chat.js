import {
  Avatar,
  CardContent,
  Card,
  Container,
  Box,
  Typography,
  Divider,
  Alert,
  TextField,
  Button,
  CardMedia,
  IconButton,
  CardActions,
  Paper,
  CardHeader,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "./Product";
import { useSelector } from "react-redux";
import { useSingleProductQuery } from "../api/productApi";
import { ArrowBack } from "@mui/icons-material";
import { blue, green } from "@mui/material/colors";

const Chat = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useSingleProductQuery(id);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [ownerId, setOwnerId] = useState("");

  useEffect(() => {
    setReceiver(data?.ownerName);
    setOwnerId(data?.ownerId);
  }, [data]);

  socket.off("room-message").on("room-message", (messages) => {
    setMessages(messages);
  });

  const orderId = (id1, id2, id3) => {
    if (id1 > id2) {
      return id1 + "_" + id2 + "_" + id3;
    } else {
      return id2 + "_" + id1 + "_" + id3;
    }
  };

  const handleSendMessage = (e) => {
    const conversationId = orderId(user._id, ownerId, id);
    e.preventDefault();
    socket.emit("new-message", {
      conversationId,
      productId: id,
      sender: user.username,
      receiver,
      message,
    });
    socket.on("room-message", (messages) => {
      setMessages(messages);
    });
    setMessage("");
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Container>
        <Card sx={{ my: 4 }}>
          <CardHeader
            avatar={
              <>
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBack />
                </IconButton>
                <Avatar sx={{ bgcolor: green[500] }}>
                  {data.ownerName[0].toUpperCase()}
                </Avatar>
              </>
            }
            title={data.ownerName}
          />
          <Divider />
          <CardContent>
            <Box sx={{ height: "60vh", overflowY: "scroll" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Card sx={{ width: "fit-content", my: 2, display: "flex" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 50 }}
                    src={data.images[0]}
                    alt=""
                  />
                  <CardContent>
                    <Typography variant="body2"> {data.productName}</Typography>
                  </CardContent>
                </Card>
              </Box>
              {messages.map((msg) => (
                <Box
                  key={msg._id}
                  sx={{
                    display: "flex",
                    my: 2,
                    ...(user.username === msg.sender && {
                      flexDirection: "row-reverse",
                    }),
                  }}
                >
                  {user.username === msg.sender ? (
                    <Avatar sx={{bgcolor: blue[400]}}>{msg.sender[0].toUpperCase()}</Avatar>
                  ) : (
                    <Avatar sx={{bgcolor: green[500]}}>{user.username[0].toUpperCase()}</Avatar>
                  )}
                  <Alert
                    icon={false}
                    severity={
                      user.username === msg.sender ? "warning" : "primary"
                    }
                    variant="filled"
                    style={{ margin: "0 0.5rem" }}
                  >
                    {msg.message}
                  </Alert>
                </Box>
              ))}
            </Box>
          </CardContent>
          <CardActions>
            <Paper
              component="form"
              onSubmit={handleSendMessage}
              sx={{ display: "flex", width: "100%" }}
            >
              <TextField
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
              />
              <Button variant="contained" disabled={message.length < 1}>
                <SendIcon />
              </Button>
            </Paper>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default Chat;
