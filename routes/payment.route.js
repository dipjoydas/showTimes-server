const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors())
const {createPaymentIntent} =require('../controller/payment.controller')
router.post('/create-payment-intent',createPaymentIntent)
module.exports =router 