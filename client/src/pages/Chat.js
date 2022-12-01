import { Avatar, CardContent, Card, Container, Box, Typography, Divider, Alert, TextField, Button, CardMedia } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { socket } from './Product';
import { useSelector } from 'react-redux';
import { useSingleProductQuery } from "../api/productApi";

const Chat = () => {
    const { user } = useSelector(state => state.user);
    const { id } = useParams();
    const { data } = useSingleProductQuery(id);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState("");
    const [ownerId, setOwnerId] = useState("");

    useEffect(() => {
        setReceiver(data?.ownerName);
        setOwnerId(data?.ownerId);
    },[data]);

    socket.off('room-message').on('room-message', (messages) =>{
        setMessages(messages);
    });

    const orderId = (id1, id2, id3) => {
        if(id1 > id2) {
            return id1 + '_' + id2 + '_' + id3;
        } else {
            return id2 + '_' + id1 + '_' + id3;
        }
    }

    const handleSendMessage = (e) => {
        const conversationId = orderId(user._id, ownerId, id);
        e.preventDefault();
        socket.emit('new-message', {conversationId, productId: id, sender: user.username,  receiver, message});
        socket.on('room-message', (messages) => {
            setMessages(messages);
        })
        setMessage("");
    }
    
  return (
    <div>
        <Container>
            <Card sx={{ position: "relative"}}>
                <CardContent>
                    <Box sx={{display: "flex", alignItems: "center", my: 2}}>
                        <Avatar img="" alt="" />
                        <Typography variant="body2" ml={2}>{data?.ownerName}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{height: "60vh", overflowY: "scroll"}}>
                        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                            <Card sx={{width: "fit-content", my: 2, display: "flex"}}>
                                <CardMedia component="img" sx={{width: 50}} src={data?.images[0]} alt="" />
                                <CardContent>
                                    <Typography variant="body2"> {data?.productName}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                        {messages.map(msg => (
                            <Box key={msg._id} sx={{display: "flex", my: 2, ...(user.username === msg.sender && {flexDirection: "row-reverse"})}}>
                                <Avatar img="" alt=""/>
                                <Alert icon={false} severity={user.username === msg.sender ? "warning" : "primary"} variant='filled' style={{margin: "0 0.5rem"}}>
                                    {msg.message}
                                </Alert>
                            </Box>
                        ))}
                    </Box>
                    <form onSubmit={handleSendMessage}>
                        <Box sx={{position: "absolute", bottom: 0, left: 0, right: 0}}>
                            <TextField placeholder="Message..." sx={{width: "94%"}} value={message} onChange={(e) => setMessage(e.target.value)} />
                            <Button><SendIcon/></Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    </div>
  )
}

export default Chat