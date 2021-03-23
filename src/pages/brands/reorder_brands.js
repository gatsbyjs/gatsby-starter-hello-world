import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import Img from "gatsby-image"

import Layout from "../../components/Layout/Layout"
import SEO from "../../components/seo"
import ProductCard from "../../components/Products/ProductCard"
import * as styles from "../styles/home.module.css"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { useShoppingCart } from "use-shopping-cart"


export default function Home({ data, location, pageContext }) {

  const { cartDetails } = useShoppingCart()
  const { brand_id } = pageContext


  const qitems = Object.keys(cartDetails).reduce((acc, cur) => {
     return ((cartDetails[cur]['product_data'] == brand_id) ? acc+cartDetails[cur]['quantity'] : acc) },0)

  const [casecount, setCasecount] = useState(qitems)

  const p_list = data.all_ordered_products.edges.reduce((acc, cur) => {return acc.concat([cur.node.data.product_id])},[])
  
  return (
    <Layout location={location} pageContext={pageContext} >
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className={styles.brand_summary_container}>
        <div className={styles.brand_left_container}>
          Currently have {casecount} in the basket.
          Minimum case order is
        </div>

        <div className={styles.brand_right_container}>
          
        </div>
      </div>

      <div className={styles.content_container}>
        <div className={styles.home__header_sub_menu}>
          <h2>Previous orders</h2>
        </div>
        <div className={styles.home__contentGrid}>
          {data.all_ordered_products.edges.map(({ node }) => {
            return (
              <ProductCard
                key={node.id}
                product={{ ...node.data }}
                brand_id={brand_id}
                setCasecount={setCasecount}
                casecount={casecount}
              />
            )
          })}
        </div>
        <div className={styles.home__header_sub_menu}>
          <h2>Other great products you might like</h2>
        </div>
        <div className={styles.home__contentGrid}>
          {data.all_brand_products.edges.filter( (edge) => !(p_list.includes(edge.node.data.product_id)) ).map(({ node }) => {
            return (
              <ProductCard
                key={node.id}
                product={{ ...node.data }}
                brand_id={brand_id}
                setCasecount={setCasecount}
                casecount={casecount}
              />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($brand_id: String, $email: String) {
    all_brand_products: allAirtable(
      filter: {
        table: { eq: "product_catalog" }
        data: { brand_id: { eq: $brand_id } }
      }
      limit: 50
      ) 
     {
      edges {
        node {
          id
          data {
            name
            price
            product_id
            image_url_1
            brand_mixmatch_moq
          }
        }
      }
    }
    all_ordered_products: allAirtable(
      filter: {
        table: { eq: "ordered_products" }
        data: { brand_id: { eq: $brand_id }, email: { eq: $email } }
      }
      limit: 50
    ) {
      edges {
        node {
          id
          data {
            name
            price
            product_id
            image_url_1
          }
        }
      }
    }
    brand: airtable(data: { brand_id: { eq: $brand_id } }) {
      id
      data {
        brand_name
        brand_image_url
        brand_mixmatch_moq
      }
    }
  }
`
