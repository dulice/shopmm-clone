require('dotenv').config();
const express = require("express");
const { sendMail } = require('../mail');
const Order = require('../models/OrderSchema');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL =  process.env.CLIENT_URL || "http://localhost:3000";
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.send(200).json(newOrder);
    sendMail();
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.send(200).json(orders);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
})

router.post('/checkout', async (req, res) => {
  const items = req.body.items.map(item => {
    _id = item._id;
    ownerId = item.ownerId;
    productName = item.productName;
    slug = item.slug;
    images = item.images;
    discount = item.discount;
    price = item.price;
  })
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      // cart: JSON.stringify(items)
    }
  })

  const discountAmount = (price, discount) => {
    let result = price - (price * discount) / 100;
    if(discount > 0 ) {
      return result;
    } else {
      return price;
    }
  };

  const line_items = req.body.items.map(item => {
    return {
      price_data: {
        currency: "mmk",
        product_data: {
          name: item.productName,
          images: [item.images[0]],
          metadata: {
            id: item._id
          },
        },
        unit_amount: discountAmount(item.price, item.discount) * 100
      },
      quantity: item.quantity
    }   
  })

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'MM', 'PK', 'BD', 'LK', 'NP'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 2990 * 100,
              currency: 'mmk',
            },
            display_name: 'Fast shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            }
          }
        },
      ],
      customer: customer.id,
      line_items,
      mode: 'payment',
      success_url: `${CLIENT_URL}/success`,
      cancel_url: `${CLIENT_URL}/checkout`,
    });
    // console.log(JSON.stringify(session));
    res.send({url: session.url});
  });

  //Webhooks

// const endpointSecret = "whsec_a3134fa333fead0099150f703bbd3e555d7fa7d817d41a167893fdf266b380ca";

// router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let data;
//   let eventType;
//   if(endpointSecret) {
//     let event;
  
//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//       console.log("Webhook verified");
//     } catch (err) {
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       console.log(`first error: ${err.message}`);
//       return;
//     }
//     data = event.data.object;
//     eventType = event.type;
//   } else {
//     data = req.body.data.object;
//     eventType = req.body.type;
//   }

//   // Handle the event
//   if(eventType.type === "checkout.session.completed") {
//     stripe.customers.retrieve(data.customer).then(customer => {
//       console.log("customer", customer);
//       console.log("data", data);
//     }).catch(err => console.log(err.message) );
//   }

//   res.send().end();
// });

// customer orders
router.get("/userOrder/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const order = await Order.find({ customerId });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// single order
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  

module.exports = router;