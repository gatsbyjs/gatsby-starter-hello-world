import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/seo"
import ProductCard from "../../components/Products/ProductCard"
import * as styles from "../styles/home.module.css"
import { useShoppingCart } from "use-shopping-cart"

export default function Home({ data, location, pageContext }) {

  const { cartDetails } = useShoppingCart()
  const { brand_id } = pageContext


  const qitems = Object.keys(cartDetails).reduce((acc, cur) => {
     return ((cartDetails[cur]['brand_id'] === brand_id) ? acc+cartDetails[cur]['quantity'] : acc) },0)

  const [casecount, setCasecount] = useState(qitems)

  const p_list = data.all_ordered_products.edges.reduce((acc, cur) => {return acc.concat([cur.node.data.product_id])},[])

  const meetmin=(casecount >= data.brand.data.brand_mixmatch_moq)

  console.log(meetmin)
  return (
    <Layout location={location} pageContext={pageContext} >
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div  className={styles.brand_summary_container}>
        <div className={styles.brand_center_header}>
        <div className={styles.brand_left_container}>
          <span><b>Brand minimum</b><br/>{`${data.brand.data.brand_mixmatch_moq}`} case{(data.brand.data.brand_mixmatch_moq>1) && 's'}.</span>
        </div>
        <div className={`brand_right_container${meetmin ? '__belowmin' : '__abovemin'}`}>
          <span><b>Currently in cart</b><br/> {`${casecount}`} case{(casecount>1) && 's'}.</span>
        </div>
        </div>
      </div>


      <div className={styles.content_container}>
        <div className={styles.home__header_sub_menu}>
          <h2>Previous orders from {`${data.brand.data.brand_name}`}</h2>
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
          <h2>From the same maker</h2>
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
            product_average_local_shipping
            product_wholesale_price
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
            product_average_local_shipping
            product_wholesale_price
          }
        }
      }
    }
    brand: airtable(data: { brand_id: { eq: $brand_id } }, table: {eq: "brand_catalog"}) {
      id
      data {
        brand_name
        brand_image_url
        brand_mixmatch_moq
      }
    }
  }
`
