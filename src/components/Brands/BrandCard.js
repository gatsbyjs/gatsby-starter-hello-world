import React from "react"
import { Link } from "gatsby"
import * as bstyles from "./BrandCard.module.css"

const BrandCard = ({ brand, email }) => {
  return (
    <div className={bstyles.productItem}>
      <Link to={`/customer/${email}/${brand.brand_id}`}>
        <img
          src={brand.brand_image_url}
          alt={brand.name}
          style={{ margin: `0 0 0.25rem 0` }}
        />
        <p className={bstyles.productItem__text}>{brand.brand_name}</p>
      </Link>
    </div>
  )
}

export { BrandCard as default }
