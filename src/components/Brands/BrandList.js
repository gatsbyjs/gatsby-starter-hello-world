import React, { useState } from "react"
import { graphql } from "gatsby"
import { CircleLoading } from 'react-loadingg'
import ProductCard from "../Products/ProductCard"
import { useShoppingCart } from "use-shopping-cart"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"

import * as styles from "../../pages/styles/home.module.css"


const BrandList = ({ location, brand, email, pageContext }) => {

  const { cartDetails } = useShoppingCart()
  
  const qitems = Object.keys(cartDetails).reduce((acc, cur) => {
     return ((cartDetails[cur]['brand_id'] === brand.brand_id) ? acc+cartDetails[cur]['quantity'] : acc) },0)

  const [casecount, setCasecount] = useState(qitems)

  // Queries to get the brand products object
  const GETBRAND = gql`
    query($brand_id: String!) {
      brand_products: getBrandProducts(brand_id: $brand_id){
        name
        price
        product_id
        image_url_1
        product_average_local_shipping
        product_wholesale_price
      }
    }
  `

  const { loading, error, data } = useQuery(GETBRAND, {
    variables: {
      brand_id: brand.brand_id,
    },
  })

  const meetmin=(casecount >= brand.brand_mixmatch_moq)

  return (

  <DynamicLayout location={location} brand={brand} email={email}>
  <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div>
      <div className={styles.brand_summary_container}>
        <div className={styles.brand_center_header}>
        <div className={styles.brand_left_container}>
          <span><b>Brand minimum</b><br/>{`${brand.brand_mixmatch_moq}`} case{(brand.brand_mixmatch_moq>1) && 's'}</span>
        </div>
        <div className={meetmin ? styles.brand_right_container_abovemin : styles.brand_right_container_belowmin}>
          <span><b>Currently in cart</b><br/> {`${casecount}`} case{(casecount>1) && 's'}</span>
        </div>
        </div>
      </div>


      <div className={styles.content_container}>
        <div className={styles.home__header_sub_menu}>
          <h2 style={{marginBottom:`0px`}}>Previous orders from {`${brand.brand_name}`}</h2>
          <span style={{fontColor: `grey`}}>{`${brand.title}`}</span>
        </div>
        { loading 
        ? <CircleLoading color="#ff5757" />
        :
        <div className={styles.home__contentGrid}>
          {data.brand_products.map((node) => {
            return (
              <ProductCard
                key={node.product_id}
                product={{ ...node }}
                brand_id={brand.brand_id}
                setCasecount={setCasecount}
                casecount={casecount}
              />
            )
          })}
        </div>
      }
    </div>
  </div>
  </DynamicLayout>
  )
}

export { BrandList as default }


