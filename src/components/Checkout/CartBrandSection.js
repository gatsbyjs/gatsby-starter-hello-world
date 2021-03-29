import React from "react"
import numeral from "numeral"
import { useShoppingCart } from "use-shopping-cart"
import * as styles from "./CartBrandSection.module.css"
import {
  cartBrandQty,
  cartBrandShipping,
  cartBrandSubtotal,
  cartBrandTotal,
  caseClean,
} from "../../helpers/helpers"
import { Link } from "gatsby"

const CartBrandSection = ({ brand, pageContext }) => {
  const { cartDetails, clearCart } = useShoppingCart()

  const { email } = pageContext

  const qitems = cartBrandQty(cartDetails, brand.brand_id)

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
            {qitems >= brand.brand_mixmatch_moq ? (
              <button className={styles.brandcart__button_abovemin}>
                <span className={styles.buttontext}> Minimum Reached</span>
                <span className={styles.buttontext_hover}>Shop this brand</span>
              </button>
            ) : (
              <button className={styles.brandcart__button_belowmin}>
                <span className={styles.buttontext}>{brand.brand_mixmatch_moq - qitems} {caseClean(brand.brand_mixmatch_moq - qitems)} below min</span>
                <span className={styles.buttontext_hover}>Shop this brand</span>
              </button>
            )}
          </Link>
        </div>
      </div>

      {Object.keys(cartDetails)
        .filter(key => cartDetails[key]["brand_id"] === brand.brand_id)
        .map(key => {
          return (
            <div className={styles.brandcart__lineitem}>
              <div className={styles.brandcart__lineitemimgcontainer}>
                <img src={cartDetails[key]["image"]} />
              </div>

              <div className={styles.brandcart__lineitemleft}>
                <p>{`${cartDetails[key]["name"]}`}</p>
                <span style={{ color: `grey` }}>
                  {`Qty: ${cartDetails[key]["quantity"]}`} cases{" "}
                </span>
              </div>
              <div className={styles.brandcart__lineitemright}>
                {numeral(
                  cartDetails[key]["quantity"] * cartDetails[key]["price"]
                ).format("$0,0.00")}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export { CartBrandSection as default }
