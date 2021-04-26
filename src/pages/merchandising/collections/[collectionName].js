import React from "react"
import { Link } from "gatsby"
import { CircleLoading } from "react-loadingg"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"

import DynamicLayout from "../../../components/Layout/DynamicLayout"
import SEO from "../../../components/seo"
import BrandCardDynamic from "../../../components/Brands/BrandCardDynamic"

import * as styles from "../../styles/home.module.css"

const BrandCollection = props => {
  // Queries to get all the orders from the brand products object

  const GETBRANDS = gql`
    query($collection_name: String!) {
      getBrandsFromCollection(collection_name: $collection_name) {
        brand_id
        brand_image_url
        brand_mixmatch_moq
        brand_name
        title
      }
    }
  `

  const { state } = props.location
  const email= state.email

  const { loading, error, data } = useQuery(GETBRANDS, {
    variables: {
      collection_name: props.params.collectionName,
    },
  })

  return (
    <DynamicLayout location={props.location} email={email}>
      <SEO title="Home" keywords={[`reorder`, `app`, `react`]} />
      <div>
        <div className={styles.content_container}>
          <div className={styles.home__header_sub_menu}>
            <h2 style={{ marginBottom: `0px` }}>
              Explore the collection
            </h2>
          </div>
          <div className={styles.home__contentGrid}>
            {loading ? (
              <CircleLoading color="#ff5757" />
            ) : (
                data.getBrandsFromCollection.map(node => {
                  return <BrandCardDynamic key={node.id} brand={{ ...node }} email={email} />
                })
            )}
          </div>
        </div>
      </div>
    </DynamicLayout>
  )
}

export { BrandCollection as default }
