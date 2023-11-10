
require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const createPaymentIntent =async (req,res)=>{
    try{
        const paymentInfo = req.body;
    const amount = paymentInfo.totalTicketPrice * 100;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
        
        
    });
    res.json({ clientSecret: paymentIntent.client_secret })

    }catch(error){
        console.log(error)

    }

}
module.exports ={createPaymentIntent}