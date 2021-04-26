import React from "react"
import { Link } from "gatsby"
import { CircleLoading } from 'react-loadingg'
import DynamicLayout from "../../Layout/DynamicLayout"
import SEO from "../../seo"
import InvoiceLine from "./InvoiceLine"
import { gql } from "graphql-tag"
import { useQuery } from "@apollo/client"

import * as styles from "../../../pages/styles/home.module.css"


const InvoicePage = (props) => {

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
    }
  }
  `

  const { loading, error, data } = useQuery(GETORDERS, {
    variables: {
      email: props.invoiceEmail,
    },
  })

  return (
    <DynamicLayout location={props.location} email={props.invoiceEmail}>
    <SEO title="Home" keywords={[`reorder`, `app`, `react`]} />
      <div>
        <div className={styles.content_container}>
          <div className={styles.home__header_sub_menu}>
            <h2 style={{marginBottom:`0px`}}>View payments and invoices from your past orders</h2>
          </div>
          { loading 
          ? <CircleLoading color="#ff5757" />
          :
          <div style={{width:`100%`}}>
            {data.getCustomerOrders
              .sort((a,b) => (a.order_id > b.order_id) ? -1 : 1 )
              .map((node) => {
              return (
                 <InvoiceLine { ...node } />
              )
            })}
          </div>
        }
      </div>
    </div>
    </DynamicLayout>


   

  )
}

export { InvoicePage as default }
