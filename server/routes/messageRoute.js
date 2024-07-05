const router = require('express').Router();
const Message = require('../models/MessageSchema');
const User = require('../models/UserSchema');

router.get('/admin-message', async (req, res) => {
    try {
        const {receiver, productId} = req.query
        const users = await Message.find({receiver, productId}).distinct("sender");
        const data = await Promise.all(users.map(user => {
            return User.findOne({username: user})
        }))
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

module.exports = router;