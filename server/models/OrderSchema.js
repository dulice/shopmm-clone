const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerId: { type: String, require: true},
    items: { type: Array, default: [] },
    productsPrice: { type: String, require: true },
    shippingFees: { type: String, require: true },
    totalPrice: { type: String, require: true},
    address: { type: Object, require: true },
    isPaid: {type: Boolean, default: false},
    isDelivered: {type: String, default: "pending" },
},{timestamp: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;