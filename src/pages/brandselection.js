import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"
import BrandList from "../components/Brands/BrandList"
import DynamicLayout from "../components/Layout/DynamicLayout"
import SEO from "../components/seo"

export default function Brandselection() {
  
  return (
      <Router basepath={`/brandselection`}>
        <BrandList path={`/:brand_id`} />
      </Router>
  )
}