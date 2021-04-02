import React, { useState, useRef, useEffect } from "react"

import { useQuery } from "@apollo/client"
import { gql } from "graphql-tag"

import SimpleLayout from "../components/Layout/SimpleLayout"
import * as styles from "./styles/home.module.css"
import { navigate } from "gatsby"
import AddToHomeScreen from 'gatsby-plugin-pwainstall'



export default function Home({ data, location, pageContext }) {
  const [useremail, setUseremail] = useState("")
  const [errormessage, setErrormessage] = useState("")
  const [isloggedin,setIsloggedin]=useState(false)

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
    setUseremail(e.target.value.toLowerCase())
  }

  const handleClick = () => {
    if (typeof results.data !== 'undefined') {
        if (useremail !== "" && results.data.getCustomer) {
          setIsloggedin(true)
          navigate(`/customer/${useremail}`, {
            state: { useremail },
          })} else {
            setErrormessage("We couldn't recognize this email")
          }
    }
  }

  useEffect(() => {
    if (isloggedin) {
      navigate(`/customer/${useremail}`, {
            state: { useremail },
      })}
      },[])
  
  const Form = () => (
    <form>
      <input
        className={styles.signin__input}
        type="text"
        name="email"
        value={useremail}
        onChange={handleChange}
      />
      <br/>
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
            <h1>Reorder fast and efficiently</h1>
            <p>Enter your account email address.</p>
            {Form()}
          </div>
          <div className={styles.home_center_subcomponent}>
            <AddToHomeScreen suspend='2' acceptedUri='/' dismmissedUri='/'>
                Install Our App
            </AddToHomeScreen>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
