const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { amount, currency = "gbp" } = JSON.parse(event.body);

try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  // return {
  //   statusCode: 200, // http status code
  //   body: JSON.stringify({
  //     paymentIntent
  //   }),
  // };
  res.status(200).json({body:JSON.stringify(paymentIntent)})
} catch (e) {
  res.status(500).json({body:e})
}

// export default async function handler(req, res) {
//   const { success_url, cancel_url, amount, product } = req.body

//   try {
//     await runCorsMiddleware(req, res)

//     try {
//       const session = await stripe.checkout.sessions.create({
//         success_url: success_url,
//         cancel_url: cancel_url,
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             quantity: 1,
//             price_data: {
//               unit_amount: amount * 100,
//               currency: 'usd',
//               product: product,
//             },
//           },
//         ],
//         mode: 'payment',
//       })

//       res.status(200).json({ message: '🕺 Stripe checkout created ok', url: session.url })
//     } catch (error) {
//       res.status(500).json({ message: '🚫 Stripe checkout error' })
//     }
//   } catch (error) {
//     res.status(403).json({ message: '🚫 Request blocked by CORS' })
//   }
// }
