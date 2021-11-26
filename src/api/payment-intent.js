const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { amount, currency = "gbp" } = JSON.parse(event.body);
(async () => {
try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });

  res.status(200).json({body:JSON.stringify(paymentIntent)})
} catch (e) {
  res.status(500).json({body:e})
}
})()
