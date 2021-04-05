import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"
import BrandList from "../components/Brands/BrandList"
import DynamicLayout from "../components/Layout/Layout"
import SEO from "../components/seo"

export default function Brandselection({ data, location, pageContext }) {
  
  const { state } = location
  const props = state
  console.log(state)
  return (
    <DynamicLayout location={location} brand={props} email={props.email}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Router basepath={`/brandselection`}>
        <BrandList path={`/`} brand={props} email={props.email} pageContext={pageContext}/>
      </Router>
    </DynamicLayout>
  )
}