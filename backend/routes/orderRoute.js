import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', isAuth, isAdmin, asyncHandler(async (req, res) => {
  const products = await Order.find({}).populate('user');
  res.send(products);
}));

router.get('/mine', isAuth, asyncHandler(async (req, res) => {
  const products = await Order.find({ user: req.user._id });
  res.send(products);
}));

router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Order.find().distinct('category');
  res.send(categories);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Order.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    throw Error('Order not found.');
  }
}));
router.post('/', isAuth, asyncHandler(async (req, res) => {
  const product = new Order({
    orderItems: req.body.cartItems,
    payment: req.body.payment,
    shipping: req.body.shipping,
    itemPrice: req.body.itemPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
    taxPrice: req.body.taxPrice,
    user: req.user._id,
  });
  const newOrder = await product.save();
  res.send({ message: 'Order Created', data: newOrder });
}));
router.put('/:id/pay', isAuth, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.payment.paymentResult = {
      orderID: req.body.orderID,
      payerID: req.body.payerID,
      paymentID: req.body.paymentID,
    };
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid', data: updatedOrder });
  } else {
    throw Error('Order does not exist.');
  }
}));


router.put('/:id/deliver', isAuth, isAdmin, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.send({ message: 'Order Delivered', data: updatedOrder });
  } else {
    throw Error('Order does not exist.');
  }
}));

router.put('/:id', isAuth, isAdmin, asyncHandler(async (req, res) => {
  const product = await Order.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.features = req.body.features || product.features;

    const updatedOrder = await product.save();
    res.send({ message: 'Order Updated', data: updatedOrder });
  } else {
    throw Error('Order does not exist.');
  }
}));
router.delete('/:id', isAuth, isAdmin, asyncHandler(async (req, res) => {
  const product = await Order.findById(req.params.id);
  if (product) {
    const removeOrder = await product.remove();
    res.send({ message: 'Order Deleted', data: removeOrder });
  } else {
    throw Error('Order already removed.');
  }
}));
router.get('/:id/mpesa', (req, res) => {
  let date = new Date()
  let timestamp = date.getDate() + "" + "" + date.getMonth() + "" + "" + date.getFullYear() + "" + "" + date.getHours() + "" + "" + date.getMinutes() + "" + "" + date.getSeconds()

  res.status(200).json({ message: "We're up and running. Happy Coding", time: new Buffer.from(timestamp).toString('base64'), token: headers })
})

router.get('/access_token', access, (req, res) => {
  res.status(200).json({ access_token: req.access_token })
})

function access(req, res, next) {
  // access token
  let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  let auth = new Buffer.from("YMLlmQpGTWOYaQp0ubpnnfqJ6BdyJbZH:Mit7YOOLAjS5agT0").toString('base64');

  request(
      {
          url: url,
          headers: {
              "Authorization": "Basic " + auth
          }
      },
      (error, response, body) => {
          if (error) {
              console.log(error)
          }
          else {
              // let resp = 
              req.access_token = JSON.parse(body).access_token
              next()
          }
      }
  )
}


function access_token() {
  // access token
  let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  let auth = new Buffer.from("YMLlmQpGTWOYaQp0ubpnnfqJ6BdyJbZH:Mit7YOOLAjS5agT0").toString('base64');

  request(
      {
          url: url,
          headers: {
              "Authorization": "Basic " + auth
          }
      },
      (error, response, body) => {
          if (error) {
              console.log(error)
          }
          else {
              // let resp = 
             return JSON.parse(body).access_token
          }
      }
  )
}
router.post('/:id/mpesa/stk',isAuth, access,asyncHandler(async (req, res) => {
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      auth = "Bearer " + req.access_token
  let date = new Date()
  const timestamp = date.getFullYear() + "" + "" + date.getMonth() + "" + "" + date.getDate() + "" + "" + date.getHours() + "" + "" + date.getMinutes() + "" + "" + date.getSeconds()
  const password = new Buffer.from('174379' + 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' + timestamp).toString('base64')

  request(
      {
          url: url,
          method: "POST",
          headers: {
              "Authorization": auth
          },
          json: {
              "BusinessShortCode": "174379",
              "Password": password,
              "Timestamp": timestamp,
              "TransactionType": "CustomerPayBillOnline",
              "Amount": "1",
              "PartyA": "254725468798",
              "PartyB": "174379",
              "PhoneNumber": "254725468798",
              "CallBackURL": "http://102.167.22.10/stk_callback",
              "AccountReference": "Test",
              "TransactionDesc": "TestPay"
          }
      },
      function (error, response, body) {
          if (error) {
              console.log(error)
          }
          else {
              res.status(200).json(body)
          }
      }
  )
}))

export default router;
