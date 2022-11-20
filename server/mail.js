const nodemailer = require("nodemailer");

const orderEmailTemplate = (order) => {
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
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.AUTH_EMAIL,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          expires: 1484314697598,
        },
      });

  let info = {
    from: process.env.AUTH_EMAIL, // sender address
    to: "mywenoon@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>Products</h1>`, // html body
    auth: {
        user: process.env.AUTH_EMAIL,
        refreshToken: "1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx",
        accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
        expires: 1484314697598,
    }
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
