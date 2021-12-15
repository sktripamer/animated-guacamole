import React, { useState, useEffect } from "react";


export default function CustomerForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  //const [clientSecret, setClientSecret] = useState("");


//   useEffect(() => {
//     window
//       .fetch("/api/create-customer", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//              amount: 500,
//         }),
//       })
//       .then((res) => {
//         return res.json();
//       })
//       .then((body) => {
//         console.log(body)
//       });
//   }, []);


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
    try {

    ev.preventDefault();
    setProcessing(true);

    const input = this.refs.myInput;
    const inputValue = input.value;

    const request = await fetch("/api/create-customer", {
        method: 'POST',
        body: JSON.stringify({
          inputValue
        }),
      });

    const customer = (await request.json())
    console.log(customer)
    setError(null);
    setProcessing(false);
    setSucceeded(true);
    } catch (error){
    console.log('Failed to create customer');
    console.log(error);
    setProcessing(false);
    setError(error);
    }

  };

  return (
    <form id="customer-form" onSubmit={handleSubmit}>
      <input type="text" ref="myInput" />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Create Customer"
          )}
        </span>
      </button>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Customer creation succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          Stripe dashboard.
        </a>
        Refresh the page to pay again.
      </p>
    </form>
  );
}
