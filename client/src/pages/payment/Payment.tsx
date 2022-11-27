// import { useEffect, useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';

// import { loadStripe, Stripe } from '@stripe/stripe-js';

// import CheckoutForm from './CheckoutForm';

// function Payment() {
//   const [stripePromise, setStripePromise] = useState({});
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     void fetch('/config').then(async r => {
//       const { publishableKey } = await r.json();
//       setStripePromise(loadStripe(publishableKey));
//     });
//   }, []);

//   useEffect(() => {
//     fetch('/create-payment-intent', {
//       method: 'POST',
//       body: JSON.stringify({})
//     }).then(async result => {
//       var { clientSecret } = await result.json();
//       setClientSecret(clientSecret);
//     });
//   }, []);

//   return (
//     <>
//       <h1>React Stripe and the Payment Element</h1>
//       {clientSecret && stripePromise && (
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </>
//   );
// }

// export default Payment;
