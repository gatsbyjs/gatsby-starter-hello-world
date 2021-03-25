import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/seo"
import ProductCard from "../../components/Products/ProductCard"
import * as styles from "../styles/home.module.css"

export default function Home({ data, location }) {
  return (
    ""
  )
}

export const query = graphql`
  query($brand_id: String) {
    allAirtable(filter: { table: { eq: "product_catalog" }, data: { brand_id: {eq: $brand_id}}}, limit: 50) {
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
