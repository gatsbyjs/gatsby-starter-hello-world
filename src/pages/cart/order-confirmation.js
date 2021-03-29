import React, { useState } from "react"

import { useQuery } from "@apollo/client"
import { gql } from "graphql-tag"

import SimpleLayout from "../../components/Layout/SimpleLayout"
import * as styles from "../styles/home.module.css"
import { navigate } from "gatsby"


export default function Home({ data, location, pageContext }) {
  const [useremail, setUseremail] = useState("")
  const [errormessage, setErrormessage] = useState("")

  const GETCUSTOMER = gql`
    query($email: String!) {
      getCustomer(email: $email) {
        email
        unique_link_short
        lead
      }
    }
  `
  const results = useQuery(GETCUSTOMER, {
    variables: {
      email: useremail,
    },
  })

  const handleChange = e => {
    setUseremail(e.target.value)
  }

  const handleClick = () => {
    if (typeof results.data !== 'undefined') {
        if (useremail !== "" && results.data.getCustomer) {
          navigate(`/customer/${useremail}`, {
            state: { useremail },
          })} else {
            setErrormessage("We couldn't recognize this email")
          }
    }
  }
  return (
    <SimpleLayout location={location}>
      <div className="content-container">
        <div className={styles.home_center_container}>
          <div className={styles.home_center_subcomponent}>
            <h1>Reorder in a breeze</h1>
            <p>Enter your account email address.</p>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
