import React from "react"
import { Link } from "gatsby"
import * as bstyles from "./CollectionCard.module.css"

const CollectionCardDynamic = (props) => {
  
  const toTitleCase = str => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  return (
    <div className={bstyles.productItem}>
      <Link to={`/merchandising/collections/${props.collection.collection_name}`} state={{email : props.email}}>
        <div className={bstyles.productItem__imgContainer}>
          <img
            src={props.collection.banner_image}
            alt={props.collection.collection_name}
            style={{ margin: `0 0 0.25rem 0` }}
          />
        </div>
        <div className={bstyles.brandName__container}>
          <p className={bstyles.productItem__text}>
            {toTitleCase(props.collection.collection_name)}
          </p>
        </div>
      </Link>
    </div>
  )
}

export { CollectionCardDynamic as default }
