import React from "react"
import { Link } from "gatsby"
import { CircleLoading } from 'react-loadingg'
import DynamicLayout from "../../Layout/DynamicLayout"
import SEO from "../../seo"
import ShipmentLine from "./ShipmentLine"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"

import * as styles from "../../../pages/styles/home.module.css"


const ShipmentPage = (props) => {
  
  // Queries to get all the orders from the brand products object
  const GETORDERS = gql`
  query($email : String!) {
    getCustomerOrders(email: $email) {
      order_id
      payment_date
      order_date
      payment_method
      order_total_inc_tax
      payment_status
      shipment_date
      order_closed
    }
  }
  `

  const { loading, error, data } = useQuery(GETORDERS, {
    variables: {
      email: props.shipmentEmail,
    },
  })

  return (
    <DynamicLayout location={props.location} email={props.shipmentEmail}>
    <SEO title="Home" keywords={[`reorder`, `app`, `react`]} />
      <div>
        <div className={styles.content_container}>
          <div className={styles.home__header_sub_menu}>
            <h2 style={{marginBottom:`0px`}}>Track shipments for your orders</h2>
          </div>
          { loading 
          ? <CircleLoading color="#ff5757" />
          :
          <div style={{width:`100%`}}>
            {data.getCustomerOrders
              .sort((a,b) => (a.order_id > b.order_id) ? -1 : 1 )
              .map((node) => {
              return (
                 <ShipmentLine { ...node } />
              )
            })}
          </div>
        }
      </div>
    </div>
    </DynamicLayout>


   

  )
}

export { ShipmentPage as default }
