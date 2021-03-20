
// Css import of global styles
import "./src/styles/global.css"
// Stripe
import { loadStripe } from '@stripe/stripe-js'
//import { CartProvider } from 'use-shopping-cart'
import React from 'react';
import getStripe from "./src//utils/stripejs"
// Fauna DB
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { graphql } from "gatsby"


// Initiate Stripe
const stripePromise = getStripe()

export const data = graphql`
  query PageQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
console.log(data.site.siteMetadata.siteURL+"/.netlify/functions/graphql"
	)
// Initiate Apollo
const client = new ApolloClient({
  uri: data.site.siteMetadata.siteURL+"/.netlify/functions/graphql",
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
//    <CartProvider mode="checkout-session" stripe={stripePromise} currency="USD">
		<ApolloProvider client={client}>		
		{element}
		</ApolloProvider>
// 	</CartProvider>
  	);
}






