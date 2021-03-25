import React from "react"
import numeral from "numeral"
import { useShoppingCart } from "use-shopping-cart"
import * as styles from "./CartBrandSection.module.css"
import {
  cartBrandQty,
  cartBrandShipping,
  cartBrandSubtotal,
  cartBrandTotal,
} from "../../helpers/helpers"
import { Link } from "gatsby"

const CartBrandSection = ({ brand, pageContext }) => {
  const { cartDetails, clearCart } = useShoppingCart()
  const { email } = pageContext
  const qitems = cartBrandQty(cartDetails, brand.brand_id)
  console.log(cartDetails)
  
console.log(brand.brand_mixmatch_moq)
  return (
    <div className={styles.brandcart__container}>
      <div className={styles.brandcart__header}>
        <div className={styles.brandcart__headername}>
          <p style={{ fontWeight: `bold` }}>{brand.brand_name}</p>
        </div>
        <div className={styles.brandcart__headertotals}>
          <span>
            <b>WS Total:</b>{" "}
            {numeral(cartBrandSubtotal(cartDetails, brand.brand_id)).format(
              "$0,0.00"
            )}
          </span>
          <br />
          <span>
            <b>Shipping:</b>{" "}
            {numeral(cartBrandShipping(cartDetails, brand.brand_id)).format(
              "$0,0.00"
            )}
          </span>
        </div>
        <div className={styles.brandcart__headerbutton}>
          <Link to={`/customer/${email}/${brand.brand_id}`}>
            <button className={styles.brandcart__button}>
              {(qitems >= brand.brand_mixmatch_moq)
                ? "Minimum Reached"
                : `Add ${
                    brand.brand_mixmatch_moq - qitems
                  } cases to checkout`}
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.brandcart__lineitem}>
        <div className={styles.brandcart__lineitemimgcontainer}>
          <img alt="" />
        </div>
        <div className={styles.brandcart__lineitemleft}></div>
        <div className={styles.brandcart__lineitemright}></div>
      </div>
    </div>
  )
}

export { CartBrandSection as default }
