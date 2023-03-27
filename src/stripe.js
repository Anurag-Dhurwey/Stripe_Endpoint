require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function postCharge(req, res) {
  let {amount, receipt_email,metadata,description} = req.body

  try {
      const payment = await stripe.paymentIntents.create({
          amount,
          currency: "INR",
          description: "Payment",
          automatic_payment_methods: {
            enabled: true,
          },
          receipt_email,
          description,
          metadata,
      })

      console.log("Payment", payment.client_secret)
      res.json({
        payment,
          message: "Confirmation pending",
          success: true
      })
  } catch (error) {
      console.log("Error", error)
      res.json({
          message: "Payment Failed",
          success: false
      })
  }
  }
  
  module.exports = postCharge