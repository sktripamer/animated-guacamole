import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // useEffect(() => {
  //   window
  //     .fetch("/api/payment-intent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //            amount: 500,
  //       }),
  //     })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((body) => {
  //       console.log(body)
  //       setClientSecret(body.body.client_secret);
  //     });
  // }, []);
  async function createIntent() {
    try {
      // Retrieve email and username of the currently logged in user.
      // getUserFromDB() is *your* implemention of getting user info from the DB

      const request = await fetch('/api/payment-intent', {
        method: 'POST',
        body: JSON.stringify({
          amount: 500,
        }),
      });
      const intent = (await request.json());
      // Update your user in DB to store the customerID
      // updateUserInDB() is *your* implementation of updating a user in the DB
      return intent;
    } catch (error) {
      console.log('Failed to create intent');
      console.log(error);
      return null;
    }
  }

  // fetch(`/api/payment-intent`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //       amount: 500,
  //     }),
  //   headers: {
  //       "content-type": `application/json`,
  //      },
  //   })
  //   .then(res => res.json())
  //   .then(body => {
  //     console.log(body)
  //     stripe.confirmCardPayment(body.body.client_secret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //         billing_details: {
  //           email: "coolio123@gmail.com",
  //         },
  //       },
  //     });
  //   })

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const intent = await createIntent();
    console.log(intent.body.client_secret)
    setClientSecret(intent.body.client_secret);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          Stripe dashboard.
        </a>
        Refresh the page to pay again.
      </p>
    </form>
  );
}
