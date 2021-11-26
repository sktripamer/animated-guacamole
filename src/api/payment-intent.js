const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { amount, currency = "usd" } = JSON.parse(event.body);
(async () => {
try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });

  res.status(200).json({body:JSON.stringify(paymentIntent)})
} catch (e) {
  res.json({body: 'error ' + e})
}
})()
