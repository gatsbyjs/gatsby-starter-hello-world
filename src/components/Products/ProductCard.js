import React, { useState, useEffect, useRef } from "react"
import numeral from "numeral"
import * as pstyles from "./ProductCard.module.css"
import QtyPicker from "./QtyPicker"
import { usePrevious } from "../../hooks/usePrevious"
import { useShoppingCart } from "use-shopping-cart"

const ProductCard = ({ product, setCasecount, casecount,brand_id }) => {

  const {
    addItem,
    cartDetails,
    incrementItem,
    decrementItem,
    clearCart,
    removeItem,
  } = useShoppingCart()

  const [pcount, setPcount] = useState((
          typeof cartDetails[String(product.product_id)] === "undefined")
            ? 0
            : cartDetails[String(product.product_id)]["quantity"]
        )

  const prevPcount = usePrevious(pcount)

  const cart_product = {
    name: product.name,
    sku: product.product_id,
    price: parseFloat(product.product_wholesale_price),
    currency: "USD",
    image: product.image_url_1,
    brand_id: brand_id,
    shipping: parseFloat(product.product_average_local_shipping),
  }

  useEffect(() => {
    if (!(pcount > 1 && prevPcount === 0)) {
      setCasecount(casecount + pcount - prevPcount)
      //console.log(pcount)
      //console.log(prevPcount)
      if (pcount > prevPcount) {
        if ((product.product_id in cartDetails) && (pcount > cartDetails[product.product_id].quantity)) {  
          incrementItem(product.product_id, pcount - prevPcount)
        } else {
          addItem(cart_product)
        }
      } else if (pcount === 0 && prevPcount === 1) {
        removeItem(product.product_id)
      } else if (pcount < prevPcount) {
        decrementItem(product.product_id, prevPcount - pcount)
      }
    }
    else if (pcount === 1) {
        console.log(prevPcount);
    }

    //console.log(cartDetails)
    //console.log(String(product.product_id))
    //clearCart()
    }, [pcount])

  return (
    <div className={pstyles.productItem}>
      <div className={pstyles.productItem__imgContainer}>
        <img
          src={product.image_url_1}
          alt={product.name}
          style={{ margin: `0 0 0.25rem 0` }}
        />
      </div>
      <p className={pstyles.productItem__text}>{product.name}</p>
      <p
        className={`${pstyles.productItem__text} ${pstyles.productItem__textLight}`}
      >
        WS {numeral(product.product_wholesale_price).format("$0,0.00")}
      </p>
      <div className={pstyles.qtypicker}>
          <QtyPicker
            setPcount={setPcount}
            pcount={
              typeof cartDetails[String(product.product_id)] === "undefined"
                ? 0
                : cartDetails[String(product.product_id)]["quantity"]
            }
          />
      </div>
    </div>
  )
}

export { ProductCard as default }
