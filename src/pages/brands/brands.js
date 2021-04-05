import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"
import { BrandList } from "../../components/brands/BrandList"
import Layout from "../../components/Layout/Layout"


export default function Home({ data, location, pageContext }) {
  
  const { state = {} } = location
  const { email, brand_id } = state

  return (
    <Layout>
      <Router basepath={`/customer`}>
        <BrandList path={`/${email}/brand`} brand_id={brand_id} email={email} pageContext={pageContext}/>
      </Router>
    </Layout>
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
