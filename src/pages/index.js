import React, { useState, useEffect } from "react"

import { useQuery } from "@apollo/client"
import { graphql } from "gatsby"
import { gql } from "apollo-boost"
import logo from "../images/logo.png"

import SimpleLayout from "../components/Layout/SimpleLayout"
import ProductCard from "../components/Products/ProductCard"
import * as styles from "./styles/home.module.css"
import { navigate } from "gatsby"
const { GRAPHQL_URL } = process.env

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

  const Form = () => (
    <form>
      <input
        className={styles.signin__input}
        type="text"
        name="email"
        value={useremail}
        onChange={handleChange}
      />
      <input
        className={styles.order__button}
        type="button"
        value="Login"
        onClick={handleClick}
      /><br/>
      <label className={styles.signin__error}>{errormessage}</label>
    </form>
  )

  return (
    <SimpleLayout location={location}>
      <div className="content-container">
        <div className={styles.home_center_container}>
          <div className={styles.home_center_subcomponent}>
            <h1>Reorder in a breeze</h1>
            <p>Enter your account email address.</p>
            {Form()}
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
