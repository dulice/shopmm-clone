import { Avatar, CardContent, Card, Container, Box, Typography, Divider, Alert, TextField, Button, CardMedia } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { socket } from 'layouts/profile';
import { useSelector } from 'react-redux';
import { useGetProductQuery } from "api/productApi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useUsersQuery } from 'api/summaryApi';

const Chat = () => {
    const { user } = useSelector(state => state.user);
    const { id } = useParams();
    const { data } = useGetProductQuery(id);
    const { data: users } = useUsersQuery();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState("");
    const [receiverId ,setReceiverId] = useState("");

    useEffect(() => {
        const receiver = users?.find(user => user.username === messages[0]?.sender);
        setReceiver(receiver?.username);
        setReceiverId(receiver?._id);
    },[data, receiver, messages]);

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
        const conversationId = orderId(data?.ownerId, receiverId, id);
        e.preventDefault();
        socket.emit('new-message', {conversationId, productId: id, sender: user.username,  receiver, message});
        socket.on('room-message', (messages) => {
            setMessages(messages);
        })
        setMessage("");
    }
    
  return (
    <DashboardLayout>
        <Container>
            <Card sx={{ position: "relative"}}>
                <CardContent>
                    <Box sx={{display: "flex", alignItems: "center", my: 2}}>
                        <Avatar img="" alt="" />
                        <Typography variant="body2" ml={2}>{receiver}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{height: "60vh", overflowY: "scroll", marginBottom: 5}}>
                        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                            <Card sx={{width: "fit-content", my: 2, display: "flex"}}>
                                <CardMedia component="img" sx={{width: 50}} src={data?.images[0]} alt="" />
                                <CardContent>
                                    <Typography variant="h6"> {data?.productName}</Typography>
                                    <Typography variant="body2">Ks {data?.price}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                        {messages?.map(msg => (
                            <Box key={msg._id} sx={{display: "flex", my: 2, ...(user.username === msg.sender && {flexDirection: "row-reverse"})}}>
                                <Avatar img="" alt=""/>
                                <Alert icon={false} severity={user.username === msg.sender ? "warning" : "info"} variant='filled' style={{margin: "0 0.5rem"}}>
                                    {msg.message}
                                </Alert>
                            </Box>
                        ))}
                    </Box>
                    <form onSubmit={handleSendMessage}>
                        <Box sx={{position: "absolute", bottom: 0, left: 20, right: 0}}>
                            <TextField placeholder="Message..." sx={{width: "90%"}} value={message} onChange={(e) => setMessage(e.target.value)} />
                            <Button><SendIcon/></Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    </DashboardLayout>
  )
}

export default Chat