import React, { useState } from "react"

import { useQuery } from "@apollo/client"
import { gql } from "graphql-tag"

import SimpleLayout from "../../components/Layout/SimpleLayout"
import * as styles from "../styles/home.module.css"
import { navigate } from "gatsby"


export default function Home({ data, location, pageContext }) {

  return (
    <SimpleLayout location={location}>
      <div className="content-container">
        <div className={styles.home_center_container}>
          <div className={styles.home_center_subcomponent}>
            <h1>Thank you for your order!</h1>
            <p>Your order has been processed successfully. You will receive a confirmation of the order in your inbox shortly.</p>
            
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
