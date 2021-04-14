import React, { useState } from "react"

import { useQuery } from "@apollo/client"
import { gql } from "graphql-tag"
import { graphql,navigate } from "gatsby"

import SimpleLayout from "../../components/Layout/SimpleLayout"
import * as styles from "../styles/home.module.css"
import Referral from "../../components/Referral/Referral"



export default function Home({ data, location, pageContext }) {

  return (
    <SimpleLayout location={location}>
      <div className="content-container">
        <div className={styles.home_center_container}>
          <div className={styles.home_center_subcomponent}>
            <h1>Thank you for your order!</h1>
            <p>Your order has been processed successfully. You will receive a confirmation of the order in your inbox shortly.</p>
            
          </div>
        </div>
      </div>
      
      <Referral 
      email={data.customer.data.email} 
      link={data.customer.data.unique_link_short}
      link_code={data.customer.data.unique_link_code_short}
       />

    </SimpleLayout>
  )
}

export const query = graphql`
  query($email: String) {
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
        owner_picture {
          url
        }
        owner_first_name
        owner_last_name
        owner_phone
        owner_email
        unique_link_short
        unique_link_code_short
      }
    }
  }
`