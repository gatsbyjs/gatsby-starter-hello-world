import React from "react"
import { Link } from "gatsby"
import * as bstyles from "./BrandCard.module.css"

const BrandCardDynamic = ({ brand, email }) => {
  
  const toTitleCase = str => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  console.log(email)

  return (
    <div className={bstyles.productItem}>
      <Link to={`/brandselection/`} state={{...brand, email}}>
        <div className={bstyles.productItem__imgContainer}>
          <img
            src={brand.brand_image_url}
            alt={brand.name}
            style={{ margin: `0 0 0.25rem 0` }}
          />
        </div>
        <div className={bstyles.brandName__container}>
          <p className={bstyles.productItem__text}>
            {toTitleCase(brand.brand_name)}
          </p>
        </div>
      </Link>
    </div>
  )
}

export { BrandCardDynamic as default }
