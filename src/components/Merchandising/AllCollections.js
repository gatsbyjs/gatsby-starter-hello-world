import React from "react"
import { Link } from "gatsby"
import { CircleLoading } from "react-loadingg"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"

import DynamicLayout from "../Layout/DynamicLayout"
import SEO from "../seo"
import CollectionCardDynamic from "./CollectionCardDynamic"

import * as styles from "../../pages/styles/home.module.css"

const CollectionList = props => {
 
  const GETCOLLECTIONS = gql`
    query {
      getCollections {
        banner_image
        banner_title
        banner_description    
        collection_name
        collection_bc_id
    }
  }
  `
  console.log(props)
  const { state } = props.location
  const email= state.email

  const { loading, error, data } = useQuery(GETCOLLECTIONS)

  return (
    <DynamicLayout location={props.location} email={email}>
      <SEO title="Home" keywords={[`reorder`, `app`, `react`]} />
      <div>
        <div className={styles.content_container}>
          <div className={styles.home__header_sub_menu}>
            <h2 style={{ marginBottom: `0px` }}>
              Browse all collections
            </h2>
          </div>
          <div className={styles.collection__contentGrid}>
            {loading ? (
              <CircleLoading color="#ff5757" />
            ) : (
                data.getCollections.map(node => {
                  return <CollectionCardDynamic key={node.id} collection={{ ...node }} email={email} />
                })
            )}
          </div>
        </div>
      </div>
    </DynamicLayout>
  )
}

export { CollectionList as default }
