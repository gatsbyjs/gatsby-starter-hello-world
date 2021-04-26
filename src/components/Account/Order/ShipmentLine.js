import React from "react"
import { Link } from "gatsby"
import * as styles from "./ShipmentLine.module.css"




const ShipmentLine = props => {
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
          { (props.order_closed == "True") 
          ? <p className={styles.order_closed}>{`ORDER CLOSED`}</p>
          : <p className={styles.order_open}>{`ONGOING FULFILLMENT`}</p>
          }
          { (props.order_closed == "True")
          ? <p style={{fontSize: '0.9em',display:'inline-flex',textAlign: 'center',width: `100%`,justifyContent: `center`}}>
          All Makers have shipped<br/>
          or declined your order
          </p>
          : <p style={{fontSize: '0.9em',display:'inline-flex',textAlign: 'center',width: `100%`,justifyContent: `center`}}>
          {`Makers will ship or decline`}<br/>
          {`by ${props.shipment_date}`}
          </p>
        }
          </div>
          <div className={styles.right_div}>
            <a href={`https://app.thegoodtrends.com/bc-shipmnent/${props.order_id}`} target="_blank">
              <button className={styles.button}>TRACK SHIPMENT</button>
            </a>
          </div>
        </div>
    )
}

export { ShipmentLine as default }
