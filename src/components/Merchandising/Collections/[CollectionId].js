import React, { useState } from "react"
import { graphql } from "gatsby"
import { CircleLoading } from 'react-loadingg'
import ProductCard from "../../Brands/BrandCard"
import DynamicLayout from "../../Layout/DynamicLayout"
import SEO from "../seo"
import { useShoppingCart } from "use-shopping-cart"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"

import * as styles from "../../../pages/styles/home.module.css"


const Collections = ({ location,params }) => {

  const { state } = location
  const collection = state
  const email= collection.email

  const { cartDetails } = useShoppingCart()
  
  const qitems = Object.keys(cartDetails).reduce((acc, cur) => {
     return ((cartDetails[cur]['brand_id'] === brand.brand_id) ? acc+cartDetails[cur]['quantity'] : acc) },0)

  const [casecount, setCasecount] = useState(qitems)

  // Queries to get the brand products object
  const GETCOLLECTION = gql`
    query($brand_id: String!) {
      brand_products: getBrandProducts(brand_id: $brand_id){
        name
        price
        product_id
        image_url_1
        product_average_local_shipping
        product_wholesale_price
        is_in_stock
      }
    }
  `

  // To test
  console.log(params)

  const { loading, error, data } = useQuery(GETCOLLECTION, {
    variables: {
      brand_id: params,
    },
  })

  return (

  <DynamicLayout location={location} email={email}>
  <SEO title="Search brand collection" keywords={[`collections`, `the good trends`]} />
    <div>

      <div className={styles.content_container}>
        <div className={styles.home__header_sub_menu}>
          <h2 style={{marginBottom:`0px`}}>{`${collection.name}`}</h2>
        </div>
        { loading 
        ? <CircleLoading color="#ff5757" />
        :
        <div className={styles.home__contentGrid}>
          {data.brands
            .map((node) => {
            return (
              <BrandCard
                key={node.id}
                brand={node}
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


