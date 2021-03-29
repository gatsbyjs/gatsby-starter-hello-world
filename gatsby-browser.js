import "./src/styles/global.css"
import React from 'react';
// Stripe
import { CartProvider } from 'use-shopping-cart'
import getStripe from "./src//utils/stripejs"
// Fauna DB
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import fetch from 'isomorphic-fetch';

const gurl  = process.env.GRAPHQL_URL

// Initiate Stripe
const stripePromise = getStripe()

// Initiate Apollo
  const client = new ApolloClient({
    uri: gurl,
  })

export const wrapRootElement = ({ element }) => {
  return (
  <ApolloProvider client={client} >
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="USD">
          
      {element}
    
    </CartProvider>
  </ApolloProvider>
    );
}






