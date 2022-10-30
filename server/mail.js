const nodemailer = require("nodemailer");

const orderEmailTemplate = (order, user) => {
  return `
    <>
        <img
        src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1C8nrfCzqK1RjSZFpXXakSXXa.png"
        alt=""
        />
        <h5>Your Package has been shipped!</h5>
        <p>Hi ${order.address.fullName},</p>
        <br />
        <p>
        We are pleased to share that the item(s) from your order ${order._id} have
        been shipped.
        </p>
        <br />
        <p><b>DELIVERY DETAILS</b></p>
        <br />
        <table>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>${order.address.fullName}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>
                        ${order.address.address}, ${order.address.city},
                        ${order.address.state}
                    </td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>${order.phoneNumber}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${user.email}</td>
                </tr>
            </tbody>
        </table>
        <br />
        <p><b>DELIVERY DETAILS</b></p>
        <br />
        <table>
            <tbody>
                ${order.items.map(item => 
                    `
                        <tr>
                            <td>${order.items.images[0]}</td>
                            <td>
                                <p color="orange">${item.productName}</p>
                                <p color="orange">Ks ${item.price}</p>
                                <p>Quantity ${item.quantity}</p>
                            </td>
                        </tr>  
                    `
                )}                             
            </tbody>
        </table>
        <br />
        <table>
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td>Ks ${order.productsPrice}</td>
                </tr>
                <tr>
                    <td>Shipping fess</td>
                    <td>Ks ${order.shippingFees}</td>
                </tr>
                <tr>
                    <td color="orange">Total (GST Incl) </td>
                    <td>${order.totalPrice}</td>
                </tr>
            </tbody>
        </table>
    </>
    `;
};

async function sendMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  let info = {
    from: process.env.AUTH_EMAIL, // sender address
    to: "mywenoon@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }

  // send mail with defined transport object
  transporter.sendMail(info, (err) => {
    if(err) {
        console.log("error: ", err);
    } else {
        console.log("mail sent successfully");
    }
  });
}

module.exports = sendMail();
