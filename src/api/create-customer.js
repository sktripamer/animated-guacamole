const stripe = require("stripe")(process.env.STRIPE_SECRET);

export default async function handler(res) {
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
      const customer = await stripe.customers.create({
        email: "skt.r.i.pamer@gmail.com"
      });
     return res.status(200).json({customer})

    } catch (error) {
      return res.status(500).json({ error: "oops" })
    }
    
}
    
