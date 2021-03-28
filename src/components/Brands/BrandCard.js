import React from "react"
import { Link } from "gatsby"
import * as bstyles from "./BrandCard.module.css"

const BrandCard = ({ brand, email }) => {
  
  const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}


  return (
    <div className={bstyles.productItem}>
      <Link to={`/customer/${email}/${brand.brand_id}`}>
        <div className={bstyles.productItem__imgContainer}>
        <img
          src={brand.brand_image_url}
          alt={brand.name}
          style={{ margin: `0 0 0.25rem 0` }}
        />
        </div>
        <p className={bstyles.productItem__text}>{toTitleCase(brand.brand_name)}</p>
      </Link>
    </div>
  )
}

export { BrandCard as default }
