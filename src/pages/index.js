import React from "react"
import gql from "graphql-tag"
//import { useQuery } from "@apollo/react-hooks"
import { graphql } from "gatsby"

//import Img from "gatsby-image"

import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import ProductCard from "../components/Products/ProductCard"
import * as styles from "./styles/home.module.css"

export default function Home({ data, location }) {
  return (
    <Layout location={location} name="name">
      <SEO title="Reorder | The Good Trends" keywords={[`gatsby`, `application`, `react`]} />
      <div className="content-container">
        <div className={styles.home__contentGrid}>
          {data.allAirtable.edges.map(({ node }) => {
            return <ProductCard key={node.id} product={{ ...node.data }} />
          })}
        </div>
      </div>
      <div className="content-container">
        <div className={styles.home__about}>
          <div>
            <h2 className="heading-first">Contact us.</h2>
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
