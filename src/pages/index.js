import React, { useState, useEffect } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { graphql, Link } from "gatsby"

import Img from "gatsby-image"

import Layout from "../components/Layout/Layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Checkout from "../components/checkout"
import ProductCard from "../components/Products/ProductCard"
import * as styles from "./styles/home.module.css"

export default function Home({ data, location }) {
  return (
    <Layout location={location}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={styles.home__cta}>
        // Header banner
        <div className={styles.home__ctaText}>
          <h2>Plants Are Like Muffins</h2>
          <p>But for your soul</p>
        </div>
        <Link className={styles.home__ctaButton} to="/shop">
          Shop Products
        </Link>
      </div>
      <div className="content-container">
        <h2 className="heading-first">Products to reorder</h2>
        <div className={styles.home__contentGrid}>
          {data.allAirtable.edges.map(({ node }) => {
            return <ProductCard id={node.id} product={{ ...node.data }} />
          })}
        </div>
      </div>
      <div className="content-container">
        <div className={styles.home__about}>
          <div>
            <h2 className="heading-first">Muffins?</h2>
            <p>
              No muffins are available for purchase, but we certainly like to
              eat muffins here. We deliver plants in the Greater Ottawa Area
            </p>
          </div>
          <div className={styles.home__aboutAdditional}>
            <h3>About Muffin's Plants</h3>
          </div>
        </div>
      </div>

      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "product_catalog" } }, limit: 50) {
      edges {
        node {
          id
          data {
            name
            mrrp
            product_id
            image_url_1
          }
        }
      }
    }
  }
`
