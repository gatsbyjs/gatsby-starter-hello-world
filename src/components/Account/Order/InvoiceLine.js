import React from "react"
import { Link } from "gatsby"
import * as styles from "./InvoiceLine.module.css"




const InvoiceLine = props => {
  console.log(props)
  console.log(props.order_id)
    return (
        <div className={styles.container}>
          <div className={styles.left_div}>
            <h2>{`Order #${props.order_id}`}</h2>
            <p>
              {`Placed on ${props.order_date}`}<br/>
              {`Order value $${props.order_total_inc_tax}`}
            </p>
          </div>
          <div className={styles.middle_div}>
          { (props.payment_status == "Unpaid") 
          ? <p className={styles.payment_status_unpaid}>{`${props.payment_status.toUpperCase()}`}</p>
          : <p className={styles.payment_status_paid}>{`${props.payment_status.toUpperCase()}`}</p>
          }
          <p style={{fontSize: '0.9em',display:'inline-flex',textAlign: 'center',width: `100%`,justifyContent: `center`}}>{`Payment date ${props.payment_date}`}<br/>
          {`By ${props.payment_method}`}
          </p>
          </div>
          <div className={styles.right_div}>
            <a href={`https://app.thegoodtrends.com/bc-invoice/${props.order_id}`} target="_blank">
              <button className={styles.button}>VIEW INVOICE</button>
            </a>
          </div>
        </div>
    )
}

export { InvoiceLine as default }
