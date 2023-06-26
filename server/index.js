const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const passportStrategy = require('./passport');
const passport = require('passport');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const imageRoute = require('./routes/imageRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const messageRoute = require('./routes/messageRoute');
const categories = require('./data');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Message = require('./models/MessageSchema');
const path = require('path');

const app = express();
app.use(cookieSession({
    name: 'session',
    keys: ['dulice'],
    maxAge: 1000 * 60 * 60 * 24 ,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: '*', 
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: "50mb"}));

const http = createServer(app);
const io = new Server(http, {
    cors: {
    origin: '*', 
    }
})

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('MongoDB Connected');
});

app.get('/categories', (req, res) => {
    res.send(categories);
})
app.use('/auth', authRoute );
app.use('/upload', imageRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute );
app.use('/messages', messageRoute);

const conversationMessage = async (conversationId) => {
    const message = await Message.aggregate([
        {$match: {conversationId}}
    ]);
    return message;
};

io.on("connection", (socket) => {
    socket.on('room', async (newRoom, previousRoom) => {
        socket.join(newRoom);
        socket.leave(previousRoom);
        const roomMessages = await conversationMessage(newRoom);
        socket.emit('room-message', roomMessages);
    })

    socket.on('new-message', async ({conversationId, productId, sender, receiver, message}) => {
        const newMessage = new Message({
            conversationId,
            productId,
            sender,
            receiver,
            message
        });
        await newMessage.save();
        const roomMessages = await conversationMessage(conversationId);
        io.to(conversationId).emit('room-message', roomMessages);
        socket.broadcast.emit('notification', conversationId);
    })
})

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

const __variableOfChoice = path.resolve();
app.use(express.static(path.join(__variableOfChoice, '/client/build')));
app.use(express.static(path.join(__variableOfChoice, '/dashboard/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__variableOfChoice, '/cliend/build/index.html'));
    res.sendFile(path.join(__variableOfChoice, '/dashboard/build/index.html'));
});

app.use((err, req, res, next) => {
    res.status(500).json({message: err.message})
})

http.listen(server);