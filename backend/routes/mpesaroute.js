const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
import Order from '../models/orderModel';
import User from '../models/usermodel';
import { isAuth, isAdmin } from '../util';


const router = express.Router();
const urls = {
    'stk': "",
    "simulate": "",
    "base_url": ""
}
const maker = access_token()
const headers = {
    "Authorization": "Bearer " + maker
}


router.get('/mpesa', (req, res) => {
    let date = new Date()
    let timestamp = date.getDate() + "" + "" + date.getMonth() + "" + "" + date.getFullYear() + "" + "" + date.getHours() + "" + "" + date.getMinutes() + "" + "" + date.getSeconds()

    res.status(200).json({ message: "We're up and running. Happy Coding", time: new Buffer.from(timestamp).toString('base64'), token: headers })
})

router.get('/access_token', access, (req, res) => {
    res.status(200).json({ access_token: req.access_token })
})



router.get('/register', access, (req, resp) => {
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    let auth = "Bearer " + req.access_token

    request(
        {
            url: url,
            method: "POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "ShortCode": "600383",
                "ResponseType": "Complete",
                "ConfirmationURL": "http://102.166.165.113/confirmation",
                "ValidationURL": "http://102.166.165.113/validation"
            }
        },
        function (error, response, body) {
            if (error) { console.log(error) }
            resp.status(200).json(body)
        }
    )
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


router.get('/stk', access,(req, res) => {

    const amount =  Order.find({ totalPrice: req.body.totalPrice });
    const mobile =  User.find({  mobilenumber:req.body.mobilenumber})
    const moment = require("moment")
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    auth = "Bearer " + req.access_token
    let timestamp = moment().format('YYYYMMDDHHmmss')
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
                "PhoneNumber": '254725468798',
                "CallBackURL": "http://102.166.165.113/stk_callback",
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
})




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


export default router;