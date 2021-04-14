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
import Referral from "../components/Referral/Referral"
import BrandCardDynamic from "../components/Brands/BrandCardDynamic"
import * as styles from "./styles/home.module.css"

export default function Home({ data, location, pageContext }) {
  
  const { email } = pageContext

  const p_list = data.ordered_brands.edges.reduce((acc, cur) => {
    return acc.concat([cur.node.data.product_id])
  }, [])


  return (
    <Layout location={location} email={email}>
      <SEO
        title="Reorder | The Good Trends"
        keywords={[`gatsby`, `application`, `react`]}
      />
      <div className={styles.home__cta}>
        <div className={styles.home__ctaText}>
          <h3 style={{ margin: `0px`, fontSize: "2em" }}>
            Welcome back {data.customer.data.Company}
            <br/>
            <span style={{ fontSize: "0.6em" }}>Enjoy Free shipping on all orders in April</span>
          </h3>
        </div>
      </div>
      <div className="content-container">
        <h1> Reorder from your previous orders </h1>
        <div className={styles.home__contentGrid}>
          {data.ordered_brands.edges.map(({ node }) => {
            return (
              <BrandCard key={node.id} brand={{ ...node.data }} email={email} />
            )
          })}
        </div>
      </div>

      <Referral 
      email={email} 
      link={data.customer.data.unique_link_short}
      link_code={data.customer.data.unique_link_code_short}
       />

      <div className="content_container">
        <div className={styles.home__advisorcontainer}>
          <div className={styles.home__advisorimg}>
            <img
              style={{ borderRadius: `50%` }}
              src={data.customer.data.owner_picture[0].url}
            />
          </div>
          <div className={styles.home__advisortext}>
            <h3>Hi! This is {data.customer.data.owner_first_name[0]}</h3>
            <p>
              If you need any help with your reorder - or need inspiration with
              additional curation - you can contact me anytime.
            </p>
          </div>
          <div className={styles.home__advisorcta}>
            <a href={`mailto:${data.customer.data.owner_email}`}>
              <button className={styles.advisor__button}>EMAIL ME</button>
            </a>
            <a
              href={`sms:${data.customer.data.owner_phone[0]}&body=Hi%20${data.customer.data.owner_first_name[0]}`}
            >
              <button className={styles.advisor__button}>TEXT ME</button>
            </a>
          </div>
        </div>
      </div>

      <div className="content-container">
        <h1> Stock for summer </h1>
        <div className={styles.home__contentGrid}>
          {data.featured_brands.edges
            .filter(edge => !(p_list.includes(edge.node.data.brand_id)))
            .map(({ node }) => {
            return (
              <BrandCardDynamic key={node.id} brand={{ ...node.data }} email={email} />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($email: String) {
    ordered_brands: allAirtable(
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
    featured_brands: allAirtable(
      filter: {
        table: { eq: "brand_catalog" }
        data: { is_featured_on_app: { eq: "Yes" } }
      }
      limit: 100
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
            title
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
        unique_link_short
        unique_link_code_short
      }
    }
  }
`
