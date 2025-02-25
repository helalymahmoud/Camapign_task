// import React, { useState, useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('pk_test_51QtWEZEb9BOEMSCOajvuJCHTXwNAK5qne5cCOAdLV8H3y8gJRmTV7ca8lr86kKc1xYplimQmXdLpoSbyk8Ln4TGZ00NTxiLPqU');

// function PaymentForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       const response = await fetch('/graphql', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({  
//           query: `
//             mutation {
//               createPaymentIntent(amount: 1000, currency: "usd")
//             }
//           `,
//         }),
//       });

//       const data = await response.json();
//       setClientSecret(data.data.createPaymentIntent); 
//     };

//     fetchClientSecret();
//   }, []);
 
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements || !clientSecret) {
//       return; 
//     }

//     const cardElement = elements.getElement(CardElement); 

//     if (!cardElement) {
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//       },
//     });

//     if (error) {
//       console.error('Payment failed', error.message);
//     } else {
//       console.log('Payment successful!', paymentIntent);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || !clientSecret}>Pay</button>
//     </form>
//   );
// }

// export default function App() {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// }
