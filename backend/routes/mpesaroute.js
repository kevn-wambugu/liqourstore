const router = express.Router();
import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

router.get('/mpesa', (req, res) => {
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
router.post('/stk',isAuth, access,asyncHandler(async (req, res) => {
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