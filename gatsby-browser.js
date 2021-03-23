
// Css import of global styles
import "./src/styles/global.css"
import React from 'react';
// Stripe
//import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import getStripe from "./src//utils/stripejs"
// Fauna DB
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { graphql } from "gatsby"


// Initiate Stripe
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
  uri: "https://tgtreorder.netlify.app/.netlify/functions/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: "Bearer <CLIENT_KEY>",
      },
    })
  },
})



export const wrapRootElement = ({ element }) => {
  return (
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="USD">
		<ApolloProvider client={client}>		
		{element}
		</ApolloProvider>
 	</CartProvider>
  	);
}






