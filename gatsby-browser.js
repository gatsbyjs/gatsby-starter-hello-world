import "./src/styles/global.css"
import React from 'react';
// Stripe
import { CartProvider } from 'use-shopping-cart'
import getStripe from "./src//utils/stripejs"
// Fauna DB
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import fetch from 'isomorphic-fetch';
const { GRAPHQL_URL } = process.env

// Initiate Stripe promise
const stripePromise = getStripe()

// Initializes the Apollo Client
export const query = graphql`
  query PageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
// Initiate Apollo
  const client = new ApolloClient({
    uri: GRAPHQL_URL,
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





