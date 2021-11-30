import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import CheckoutForm from "../components/stripeCheckoutForm";
import "../components/style.css"
export default function App() {

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   // we will edit this
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const {error, paymentMethod} = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     // const intent = await fetch(`/api/payment-intent`, {
//     //   method: "POST",
//     //   body: JSON.stringify({
//     //     amount: 500,
//     //   }),
//     //   headers: {
//     //     "content-type": `application/json`,
//     //    },
//     // });


      // fetch(`/api/payment-intent`, {
      // method: "POST",
      // body: JSON.stringify({
      //     amount: 500,
      //   }),
      // headers: {
      //     "content-type": `application/json`,
      //    },
      // })
      // .then(res => res.json())
      // .then(body => {
      //   console.log(body)
      //   stripe.confirmCardPayment(body.body.client_secret, {
      //     payment_method: {
      //       card: elements.getElement(CardElement),
      //       billing_details: {
      //         email: "coolio123@gmail.com",
      //       },
      //     },
      //   });
      // })
    

//     // const { paymentIntent } = await intent.json();
//     // console.log(paymentIntent)


    
 
//   };


//   // const onSubmit = data => {
//   //   fetch(`/api/form`, {
//   //     method: `POST`,
//   //     body: JSON.stringify(data),
//   //     headers: {
//   //       "content-type": `application/json`,
//   //     },
//   //   })
//   //     .then(res => res.json())
//   //     .then(body => {
//   //       console.log(`response from API:`, body)
//   //     })
//   // }

// // handleSubmit()



//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement /> 
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

const promise = loadStripe('pk_test_51Jr6IuEIi9OXKxaBdi4aBOlRU6DgoMcQQNgDCOLo1p8TZDy29xR5tKWHP5C02bF7kKHpkWKq9DI9OCzClVtj8zi500XedIOBD3');

return (
  <div className="App">
    <Elements stripe={promise}>
      <CheckoutForm />
    </Elements>
  </div>
);

}

// import React from "react"
// import { useForm } from "react-hook-form"

// export default function App() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()
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

//   console.log({ errors })

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       style={{ display: `block`, width: 400 }}
//     >
//       <label htmlFor="first-name">First name</label>
//       <input
//         id="first-name"
//         type="text"
//         style={{ display: `block`, marginBottom: 16 }}
//         {...register("First name", { required: true, maxLength: 80 })}
//       />

//       <label htmlFor="last-name">Last name</label>
//       <input
//         id="last-name"
//         type="text"
//         style={{ display: `block`, marginBottom: 16 }}
//         {...register("Last name", { required: true, maxLength: 100 })}
//       />

//       <label htmlFor="email">Email</label>
//       <input
//         id="email"
//         type="text"
//         style={{ display: `block`, marginBottom: 16 }}
//         {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
//       />

//       <label htmlFor="tel">Mobile number</label>
//       <input
//         id="tel"
//         type="tel"
//         style={{ display: `block`, marginBottom: 16 }}
//         {...register("Mobile number", {
//           required: true,
//           minLength: 6,
//           maxLength: 12,
//         })}
//       />

//       <label htmlFor="title">Title</label>
//       <select
//         {...register("Title", { required: true })}
//         style={{ display: `block`, marginBottom: 16 }}
//       >
//         <option value="Mr">Mr</option>
//         <option value="Mrs">Mrs</option>
//         <option value="Miss">Miss</option>
//         <option value="Dr">Dr</option>
//       </select>

//       <input type="submit" />
//     </form>
//   )
// }
