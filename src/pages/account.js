import React from "react"
import { Router } from "@reach/router"
import InvoicePage from "../components/Account/Order/InvoicePage"
import ShipmentPage from "../components/Account/Order/ShipmentPage"

export default function Merchandising(props) {
  return (
      <Router basepath={`/account`}>
        <InvoicePage path={`/invoices/:invoiceEmail`} location={props.location}/>
        <ShipmentPage path={`/shipments/:shipmentEmail`} location={props.location}/>
      </Router>
  )
}