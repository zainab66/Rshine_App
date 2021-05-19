// const express = require('express');
// const router = express.Router();
 const expressAsyncHandler = require('express-async-handler');
// const authorize = require("../middleware/authorize")
// const Order = require('../models/orderModel.js');

// module.exports = router;
const authorize = require("../middleware/authorize")
const { addOrder, getOrders,updateOrder } = require("../controller/order");
const router = require("express").Router();
const Order = require("../models/orderModel");
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox7f066ce9ef0e4c698e5437c98ba86cc2.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});
const nodemailer = require('nodemailer');

// router.post('/',authorize, expressAsyncHandler(async (req, res) => {
//     if (req.body.orderItems.length === 0) {
//       res.status(400).send({ message: 'Cart is empty' });
//     } else {
//       const order = new Order({
//         orderItems: req.body.orderItems,
//         //shippingAddress: req.body.shippingAddress,
//       //  paymentMethod: req.body.paymentMethod,
//         itemsPrice: req.body.itemsPrice,
//         shippingPrice: req.body.shippingPrice,
//         taxPrice: req.body.taxPrice,
//         totalPrice: req.body.totalPrice,
//         user: req.user._id,
//       });
//       const createdOrder = await order.save();
//       res
//         .status(201)
//         .send({ message: 'New Order Created', order: createdOrder });
//     }
//   })
// );



router.put('/:id/pay', authorize, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'email name'
    );

    const email = order.user.email;
    const name = order.user.name;

    console.log('order.user.name',order.user.name,order.user.email)
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
          user: '',
          pass: ''
        }
      })
    
      let mailOptions = {
        from: '',
        to: email,
        subject: `New order ${order._id}`,
        html:`<h1>Thanks for shopping with us</h1>
          <p>
          Hi ${order.user.name},</p>
          <p>We have finished processing your order.</p>
          <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
          <table>
          <thead>
          <tr>
          <td><strong>Product</strong></td>
          <td><strong>Quantity</strong></td>
          <td><strong align="right">Price</strong></td>
          </thead>
          <tbody>
          ${order.items
            .map(
              (item) => `
            <tr>
            <td>${item.name}</td>
            <td align="center">${item.qty}</td>
            <td align="right"> $${item.price.toFixed(2)}</td>
            </tr>
          `
            )
            .join('\n')}
          </tbody>
          <tfoot>
          <tr>
          <td colspan="2">Items Price:</td>
          <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
          </tr>
          <tr>
          <td colspan="2">Tax Price:</td>
          <td align="right"> $${order.taxPrice.toFixed(2)}</td>
          </tr>
          <tr>
          <td colspan="2">Shipping Price:</td>
          <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
          </tr>
          <tr>
          <td colspan="2"><strong>Total Price:</strong></td>
          <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
          </tr>
          </table>
          <h2>Shipping address</h2>
          <p>
          ${order.fullName},<br/>
          ${order.address},<br/>
          ${order.city},<br/>
          ${order.country},<br/>
          ${order.postalCode}<br/>
          </p>
          <hr/>
          <p>
          Thanks for shopping with us.
          </p>`}
    
      smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
          res.send(error)
        } else {
          res.send('success')
        }
      })
      smtpTransport.close();


      // const data = {
      //   from: 'Excited User <me@samples.mailgun.org>',
      //   to:`${order.user.name} <${order.user.email}>`,
      //   subject: `New order ${order._id}`,
      //   text: `<h1>Thanks for shopping with us</h1>
      //   <p>
      //   Hi ${order.user.name},</p>
      //   <p>We have finished processing your order.</p>
      //   <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
      //   <table>
      //   <thead>
      //   <tr>
      //   <td><strong>Product</strong></td>
      //   <td><strong>Quantity</strong></td>
      //   <td><strong align="right">Price</strong></td>
      //   </thead>
      //   <tbody>
      //   ${order.items
      //     .map(
      //       (item) => `
      //     <tr>
      //     <td>${item.name}</td>
      //     <td align="center">${item.qty}</td>
      //     <td align="right"> $${item.price.toFixed(2)}</td>
      //     </tr>
      //   `
      //     )
      //     .join('\n')}
      //   </tbody>
      //   <tfoot>
      //   <tr>
      //   <td colspan="2">Items Price:</td>
      //   <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
      //   </tr>
      //   <tr>
      //   <td colspan="2">Tax Price:</td>
      //   <td align="right"> $${order.taxPrice.toFixed(2)}</td>
      //   </tr>
      //   <tr>
      //   <td colspan="2">Shipping Price:</td>
      //   <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
      //   </tr>
      //   <tr>
      //   <td colspan="2"><strong>Total Price:</strong></td>
      //   <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
      //   </tr>
      //   <tr>
      //   <td colspan="2">Payment Method:</td>
      //   <td align="right">${order.paymentMethod}</td>
      //   </tr>
      //   </table>
      //   <h2>Shipping address</h2>
      //   <p>
      //   ${order.shippingAddress.fullName},<br/>
      //   ${order.shippingAddress.address},<br/>
      //   ${order.shippingAddress.city},<br/>
      //   ${order.shippingAddress.country},<br/>
      //   ${order.shippingAddress.postalCode}<br/>
      //   </p>
      //   <hr/>
      //   <p>
      //   Thanks for shopping with us.
      //   </p>`
      // };
      // mg.messages().send(data, function (error, body) {
      //   console.log(body);
      // });
    


      // mailgun()
      //   .messages()
      //   .send(
      //     {
      //       from: 'Amazona <amazona@mg.yourdomain.com>',
      //       to: `${order.user.name} <${order.user.email}>`,
      //       subject: `New order ${order._id}`,
      //       html: payOrderEmailTemplate(order),
      //     },
      //     (error, body) => {
      //       if (error) {
      //         console.log(error);
      //       } else {
      //         console.log(body);
      //       }
      //     }
      //   );









      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);



router.post("/addOrder", authorize, addOrder);
router.get("/getOrders", authorize, getOrders);

router.get('/mine', authorize, expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
})
);

router.get('/getCustomerOrders', authorize, expressAsyncHandler(async (req, res) => {
  const CustomerOrders = await Order.find({});
  res.send(CustomerOrders);
})
);




router.get('/:id',authorize,expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);



router.post(`/order/update`, authorize, updateOrder);


module.exports = router;