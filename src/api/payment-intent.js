const stripe = require("stripe")(process.env.STRIPE_SECRET);


 export default async function handler(body, res) {
//const { amount, currency = "usd" } = JSON.parse(body);

try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: 'usd',
  });

  res.status(200).json(paymentIntent)
} catch (e) {
  res.json({body: 'error ' + e})
}

}
