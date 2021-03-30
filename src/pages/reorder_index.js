import React from "react"
//import gql from "graphql-tag"
//import { useQuery } from "@apollo/react-hooks"
import { graphql } from "gatsby"

//import Img from "gatsby-image"
//import Checkout from "../components/checkout"
//import Image from "../components/image"

import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import BrandCard from "../components/Brands/BrandCard"
import * as styles from "./styles/home.module.css"
import { cleanPhone } from "../helpers/helpers"


export default function Home({ data, location, pageContext }) {
  const { email } = pageContext
  return (
    <Layout location={location} pageContext={pageContext}>
      <SEO title="Reorder | The Good Trends" keywords={[`gatsby`, `application`, `react`]} />
      <div className="content-container">
        <h1> Reorder from your previous orders </h1>
        <div className={styles.home__contentGrid}>
          {data.allAirtable.edges.map(({ node }) => {
            return <BrandCard key={node.id} brand={{ ...node.data }} email={email} />
          })}
        </div>
      </div>
      <div className="content_container">
        <div className={styles.home__advisorcontainer}>
          <div className={styles.home__advisorimg}>
            <img style={{borderRadius: `50%`}} src={data.customer.data.owner_picture[0].url}/>
          </div>
          <div className={styles.home__advisortext}>
            <h3>Hi! This is {data.customer.data.owner_first_name[0]}</h3>
            <p>
              If you need any help with your reorder - or need inspiration with additional curation - you can contact me anytime.
            </p>

          </div>
          <div className={styles.home__advisorcta}>
          <a href={`mailto:${data.customer.data.owner_email}`}><button className={styles.advisor__button}>EMAIL ME</button></a>
          <a href={`sms:${data.customer.data.owner_phone[0]}&body=Hi%20${data.customer.data.owner_first_name[0]}`}><button className={styles.advisor__button}>TEXT ME</button></a>
          </div>
          </div>
      </div>

    </Layout>
  )
}

export const query = graphql`
  query($email: String) {
    allAirtable(filter: { table: { eq: "ordered_brands" }, data: {email: {eq: $email}}}, limit: 50) {
      edges {
        node {
          id
          data {
            email
            brand_id
            brand_image_url
            brand_name
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
        owner_picture {
          url
        }
        owner_first_name
        owner_last_name
        owner_phone
        owner_email
      }
    }
  }
`
