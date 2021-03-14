import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import React from 'react';
import getStripe from "./src//utils/stripejs"

// Remember to add your public Stripe key
const stripePromise = getStripe()

export const wrapRootElement = ({ element }) => {
  return (
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="USD">{element}</CartProvider>
  	);
}