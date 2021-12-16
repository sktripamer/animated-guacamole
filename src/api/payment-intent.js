const stripe = require("stripe")(process.env.STRIPE_SECRET);

 export default async function handler(req, res) {
//const { amount, currency = "usd" } = JSON.parse(body);

try {
  const customerID = await getCustomer(req.body);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: 'usd',
    customer: customerID,
    setup_future_usage: "on_session",
  });

  res.status(200).json({body:paymentIntent})
} catch (e) {
  res.json({body: 'error ' + e})
}

}

async function getCustomer(emailSend) {
  // if (!event.body) {
  //   res.json({body: 'error invalid body'})
  // }
  // const body = JSON.parse(event.body);
  // const { email } = body;
  
  // if (!email) {
  //   res.json({body: 'error no email'})
  //   return;
  // }

  try {
    // Create a new customer
    const customerID = await stripe.customers.create({
      email: emailSend
    });
   return customerID.id;

  } catch (error) {
    return error;
  }
  
}
  
