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
const categories = require('./data');


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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})