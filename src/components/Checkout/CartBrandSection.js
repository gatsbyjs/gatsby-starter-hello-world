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



const CartBrandSection = ({ brand, pageContext }) => {
  const { cartDetails, clearCart } = useShoppingCart()
  
  const qitems=cartBrandQty(cartDetails,brand.brand_id)
  console.log(qitems)

  return (
    <div className={styles.brandcart__container}>
      <div className={styles.brandcart__header}>
        <div className={styles.brandcart__headername}>
          <p style={{fontWeight: `bold`}}>{brand.brand_name}</p>
        </div>
        <div className={styles.brandcart__headertotals}>
          <span><b>WS Total:</b> {numeral(cartBrandSubtotal(cartDetails,brand.brand_id)).format("$0,0.00")}</span><br/>
          <span><b>Shipping:</b> {numeral(cartBrandShipping(cartDetails,brand.brand_id)).format("$0,0.00")}</span>
        </div>
        <div className={styles.brandcart__headerbutton}>
         <button className={styles.brandcart__button}>
         { ( qitems >= brand.brand_brand_mixmatch_moq ) ?
          'Minimum Reached'
          : `Add ${brand.brand_brand_mixmatch_moq-qitems} cases to checkout`
         }

         </button>
        </div>
      </div>
    
      <div className={styles.brandcart__lineitem}>
        <div className={styles.brandcart__lineitemimgcontainer}>
          <img alt=""  />
        </div>
        <div className={styles.brandcart__lineitemleft}></div>
        <div className={styles.brandcart__lineitemright}></div>
      </div>
    </div>
  )
}

export { CartBrandSection as default }
