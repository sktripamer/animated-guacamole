import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';


export default function App() {

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // we will edit this
  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    const intent = await fetch(`/api/payment-intent`, {
      method: "POST",
      body: JSON.stringify({
          amount: 500,
        }),
      });
    const { paymentIntent } = await intent.json();


    
  await stripe.confirmCardPayment(paymentIntent.client_secret, {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: {
        email: profile.email,
      },
    },
  }); 
  };


//   const onSubmit = data => {
//     fetch(`/api/form`, {
//       method: `POST`,
//       body: JSON.stringify(data),
//       headers: {
//         "content-type": `application/json`,
//       },
//     })
//       .then(res => res.json())
//       .then(body => {
//         console.log(`response from API:`, body)
//       })
//   }

// handleSubmit()



  return (
    <form onSubmit={handleSubmit}>
      <CardElement /> 
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe('pk_test_51Jr6IuEIi9OXKxaBdi4aBOlRU6DgoMcQQNgDCOLo1p8TZDy29xR5tKWHP5C02bF7kKHpkWKq9DI9OCzClVtj8zi500XedIOBD3');

return (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
)

}
