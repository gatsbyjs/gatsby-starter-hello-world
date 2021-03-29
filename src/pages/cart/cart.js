import React, { useState } from "react"
import numeral from "numeral"
import { useShoppingCart } from "use-shopping-cart"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/seo"
import { graphql, Link, navigate } from "gatsby"
import {
  cartAboveMOQ,
  brandsInCart,
  cartWholesaleTotal,
  cartShippingTotal,
  cartTotal,
} from "../../helpers/helpers"

import { logOrder } from "../../utils/airtable"

import * as styles from "../styles/home.module.css"
import CartBrandSection from "../../components/Checkout/CartBrandSection"

export default function Cart({ data, location, pageContext }) {

  const { cartDetails } = useShoppingCart()

  const { email } = pageContext

  const brandMinimums = data.brands.edges.reduce((acc, cur) => {
    let key = { [cur.node.data.brand_id]: cur.node.data.brand_mixmatch_moq }
    return { ...acc, ...key }
  }, {})

  const cartReady = cartAboveMOQ(cartDetails, brandMinimums)

  const b_list = brandsInCart(cartDetails)

  const placeOrder = async () => {
    var url=process.env.ORDER_URL;
    
    let payload={
      'email' : email,
      'cart' : cartDetails
    }
    console.log(payload)
    console.log(url)
    logOrder(payload)

    fetch(url, {
    method : 'POST', 
    mode : 'cors', 
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(payload),
    }).then(navigate(`/customer/${email}/order-confirmation`, {
           state: { email }})
    ).catch(error => {
                    throw(error);
                })
  }

  return (
    <Layout location={location} pageContext={pageContext}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div style={{ padding: `0 1rem`, width: `100%` }}>
        
        <div className={styles.cart__summary}>
          <h1 className={styles.cart__summary_header}>Cart summary</h1>
          <span>
            {cartReady
              ? "All brand minimums are met. Your cart is ready to checkout."
              : "Certain brands are below their minimums. Edit your cart."}
          </span>
        </div>

        <div>
          {data.brands.edges
            .filter(edge => b_list.includes(edge.node.data.brand_id))
            .map(({ node }) => {
              return <CartBrandSection key={node.id} brand={{ ...node.data }} pageContext={pageContext} />
            })}
        </div>

        <div className={styles.order__summarycontainer}>
          <div className={styles.order__summaryshipping}>
            <h2>Shipping Details</h2>
            <span>{`${data.customer.data.First_Name} ${data.customer.data.Last_Name}` }<br/>
            {`${data.customer.data.Company}`}<br/>
            {data.customer.data.shipping_address1}<br/>
            {data.customer.data.shipping_city}, {data.customer.data.shipping_state_or_province}, {data.customer.data.shipping_postal_code}<br/>
            {data.customer.data.country}
            </span>
          </div>
          <div className={styles.order__summarypayment}>
            <h2>Payment Terms</h2>
            <span>Your payment terms are {data.customer.data.terms_day__from_terms_mapping_[0]} days<br/>
                Payment by {data.customer.data.payment_method[0]}

            </span>
          </div>
          <div className={styles.order__summarytotals}>
            <h2>Order totals</h2>
            <p>
              <span>
                <b>Subtotal</b>
              </span>
              <span style={{float:`right`}}>
                {" "}
                {numeral(cartWholesaleTotal(cartDetails)).format("$0,0.00")}
              </span>
            </p>
            <p>
              <span >
                <b>Shipping</b>
              </span>
              <span style={{float:`right`}}>
              {" "}
                {numeral(cartShippingTotal(cartDetails)).format("$0,0.00")}
              </span>
            </p>
            <p>
              <span>
                <b>Total</b>
              </span>
              <span style={{float:`right`}}>{" "}{numeral(cartTotal(cartDetails)).format("$0,0.00")}</span>
            </p>
          </div>
        </div>
        <div className={styles.order__buttoncontainer}>
          {cartReady ? 
          (<button className={ styles.order__button} onClick={placeOrder} value={cartDetails}>PLACE ORDER</button>)
          :  (<button className={ styles.order__button__belowmin} value={cartDetails}>CART BELOW MINIMUMS</button>)
          }
          <br/>
          <span>
          {cartReady
              ?  (<i>Your cart is ready to checkout</i>)
              :  (<i>Certain brands are below their acceptable minimums. Edit your cart to place your order</i>)
          }
            
           </span>   
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($email: String) {
    brands: allAirtable(
      filter: {
        table: { eq: "ordered_brands" }
        data: { email: { eq: $email } }
      }
      limit: 50
    ) {
      edges {
        node {
          id
          data {
            email
            brand_id
            brand_image_url
            brand_name
            brand_mixmatch_moq
          }
        }
      }
    }
    customer: airtable(
      data: { email: { eq: $email } }
      table: { eq: "customers" }
    ) {
      id
      data {
        email
        brand_image_url
        brand_mixmatch_moq
        First_Name
        Last_Name
        Company
        shipping_address1
        shipping_address2
        shipping_city
        shipping_company
        shipping_country
        shipping_state_or_province
        shipping_postal_code
        payment_method
        terms_day__from_terms_mapping_
      }
    }
  }
`
