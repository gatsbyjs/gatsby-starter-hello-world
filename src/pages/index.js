
import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import Checkout from "../components/checkout"

export default function Home({data}) {
  return ( 
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Link to="/page-2/">Go to page 2</Link> 
      
      {data.allAirtable.edges.map(({ node }) => (
            <>
                <h1>{node.data.name}</h1>
                <img src={node.data.image_url_1}/>
            </>
      ))
      }

    </Layout>
  )
}

export const query = graphql`
  {
    allAirtable(limit: 20) {
      totalCount
      pageInfo {
        currentPage
        hasNextPage
      }
      edges {
        node {
          data {
            image_url_1
            image_url_2
            name
          }
        }
      }
    }
  }
`