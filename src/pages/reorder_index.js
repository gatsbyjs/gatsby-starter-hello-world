import React, { useState, useEffect } from "react"
//import gql from "graphql-tag"
//import { useQuery } from "@apollo/react-hooks"
import { graphql, Link } from "gatsby"

//import Img from "gatsby-image"
//import Checkout from "../components/checkout"
//import Image from "../components/image"

import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import BrandCard from "../components/Brands/BrandCard"
import * as styles from "./styles/home.module.css"

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
      <div className="content-container">
        <div className={styles.home__about}>
          <div>
            <h2>Contact us.</h2>
            <p>
              If you need any help with your reorder, contact us at info@thegoodtrends.com
            </p>
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
  }
`
